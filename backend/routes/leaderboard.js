const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// GET /api/leaderboard/:period
// Returns top 10 users by best_score
router.get('/api/leaderboard/:period', async (req, res) => {
  try {
    const { period } = req.params;
    const limit = parseInt(req.query.limit) || 10;

    // Since user_stats is pre-aggregated, we just fetch and sort by best_score
    // For time-based filtering, we'd need to query mock_results instead
    
    let query = supabase
      .from('user_stats')
      .select('user_id, best_score, avg_score, total_mocks, total_correct, total_questions');

    // If period-based filtering is needed, query mock_results instead
    let leaderboard = [];
    
    if (period === 'all') {
      // Use pre-aggregated user_stats (fastest)
      const { data: stats, error } = await query
        .order('best_score', { ascending: false })
        .limit(limit);

      if (error) throw error;

      // Get user names
      const userIds = stats.map(s => s.user_id);
      const { data: users } = await supabase
        .from('users')
        .select('id, name, email')
        .in('id', userIds);

      leaderboard = stats.map(stat => {
        const user = users?.find(u => u.id === stat.user_id);
        return {
          user_id: stat.user_id,
          name: user?.name || user?.email?.split('@')[0] || 'Anonymous',
          best_score: stat.best_score,
          accuracy: Math.round(stat.avg_score || 0),
          attempts: stat.total_mocks
        };
      });
    } else {
      // For time-based periods, query individual mock_results
      const cutoffDate = new Date();
      if (period === 'weekly') {
        cutoffDate.setDate(cutoffDate.getDate() - 7);
      } else if (period === 'monthly') {
        cutoffDate.setMonth(cutoffDate.getMonth() - 1);
      }

      const { data: attempts, error: attemptsError } = await supabase
        .from('mock_results')
        .select('user_id, score')
        .gte('created_at', cutoffDate.toISOString());

      if (attemptsError) throw attemptsError;

      // Group by user and get best score for this period
      const userScores = {};
      attempts.forEach(attempt => {
        const uid = attempt.user_id;
        if (!userScores[uid]) {
          userScores[uid] = attempt.score;
        } else {
          userScores[uid] = Math.max(userScores[uid], attempt.score);
        }
      });

      // Get user names
      const userIds = Object.keys(userScores);
      const { data: users } = await supabase
        .from('users')
        .select('id, name, email')
        .in('id', userIds);

      leaderboard = userIds
        .map(uid => {
          const user = users?.find(u => u.id === uid);
          return {
            user_id: uid,
            name: user?.name || user?.email?.split('@')[0] || 'Anonymous',
            best_score: userScores[uid],
            accuracy: 0, // Would need to calculate from mock_results
            attempts: 0 // Would need to count from mock_results
          };
        })
        .sort((a, b) => b.best_score - a.best_score)
        .slice(0, limit);
    }

    res.json({ data: leaderboard, success: true });
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/leaderboard/user-rank/:userId
// Returns user's rank, score, and percentile
router.get('/api/leaderboard/user-rank/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { period = 'all' } = req.query;

    let userRankData = null;
    let totalUsers = 0;
    let userBestScore = 0;
    let userAvgAccuracy = 0;

    if (period === 'all') {
      // Use pre-aggregated user_stats
      const { data: userStats, error } = await supabase
        .from('user_stats')
        .select('best_score, avg_score, total_mocks')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
      
      if (!userStats) {
        return res.json({ data: null, message: 'No stats found' });
      }

      userBestScore = userStats.best_score;
      userAvgAccuracy = userStats.avg_score || 0;

      // Get all stats to calculate rank
      const { data: allStats, error: allError } = await supabase
        .from('user_stats')
        .select('user_id, best_score');

      if (allError) throw allError;

      // Calculate rank: count how many users have higher scores
      const betterScores = allStats.filter(s => s.best_score > userBestScore).length;
      const rank = betterScores + 1;
      totalUsers = allStats.length;

      userRankData = {
        rank,
        best_score: userBestScore,
        accuracy: Math.round(userAvgAccuracy),
        total_users: totalUsers
      };
    } else {
      // For time-based periods, query mock_results
      const cutoffDate = new Date();
      if (period === 'weekly') {
        cutoffDate.setDate(cutoffDate.getDate() - 7);
      } else if (period === 'monthly') {
        cutoffDate.setMonth(cutoffDate.getMonth() - 1);
      }

      // Get user's best score in this period
      const { data: userAttempts, error: userError } = await supabase
        .from('mock_results')
        .select('score')
        .eq('user_id', userId)
        .gte('created_at', cutoffDate.toISOString());

      if (userError) throw userError;

      if (!userAttempts || userAttempts.length === 0) {
        return res.json({ data: null, message: 'No attempts in this period' });
      }

      userBestScore = Math.max(...userAttempts.map(a => a.score));

      // Get all users' best scores to calculate rank
      const { data: allAttempts, error: allError } = await supabase
        .from('mock_results')
        .select('user_id, score')
        .gte('created_at', cutoffDate.toISOString());

      if (allError) throw allError;

      const userBestScores = {};
      allAttempts.forEach(attempt => {
        if (!userBestScores[attempt.user_id]) {
          userBestScores[attempt.user_id] = attempt.score;
        } else {
          userBestScores[attempt.user_id] = Math.max(
            userBestScores[attempt.user_id],
            attempt.score
          );
        }
      });

      const betterScores = Object.values(userBestScores).filter(s => s > userBestScore).length;
      const rank = betterScores + 1;
      totalUsers = Object.keys(userBestScores).length;

      userRankData = {
        rank,
        best_score: userBestScore,
        accuracy: Math.round(userAvgAccuracy),
        total_users: totalUsers
      };
    }

    // Get user name
    const { data: userData } = await supabase
      .from('users')
      .select('name, email')
      .eq('id', userId)
      .single();

    const userName = userData?.name || userData?.email?.split('@')[0] || 'You';

    res.json({
      data: {
        ...userRankData,
        name: userName
      },
      success: true
    });
  } catch (error) {
    console.error('User rank error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
