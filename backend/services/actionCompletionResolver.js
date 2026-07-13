/**
 * SmartPrep Action Completion Resolver
 * Resolves the lifecycle state of a student recommendation based on authoritative database evidence.
 */

/**
 * Resolves the state for a given action based on student activity evidence.
 * @param {Object} action - The normalized CanonicalStudentAction object.
 * @param {Object} evidence - The pre-fetched database evidence.
 * @param {Array} evidence.quizAttempts - User's chapter quiz attempts from chapter_quiz_attempts.
 * @param {Array} evidence.mockResults - User's mock results from mock_results.
 * @param {Array} evidence.lessonSessions - User's lesson sessions from student_lesson_sessions.
 * @param {Array} evidence.revisions - User's revision sessions from student_revisions.
 * @returns {'AVAILABLE' | 'STARTED' | 'IN_PROGRESS' | 'COMPLETED'} The lifecycle state.
 */
function resolveActionState(action, evidence = {}) {
  const {
    quizAttempts = [],
    mockResults = [],
    lessonSessions = [],
    revisions = []
  } = evidence;

  const { type, chapterId, mockId, topicId } = action;

  // Extract the version timestamp/offset from the instance ID
  // instanceId format is: [definitionId]::[version]
  // e.g. REVISE_CRITICAL_CHAPTER::phy_units::none::2 (version is 2 attempts)
  // or COMPLETE_DUE_REVISION::phy_units::none::1783576209515 (version is timestamp)
  const idParts = action.id ? action.id.split("::") : [];
  const versionVal = idParts[idParts.length - 1];

  switch (type) {
    case 'RESUME_ACTIVE_LESSON': {
      if (!chapterId) return 'AVAILABLE';
      // Find the corresponding lesson session
      const session = lessonSessions.find(s => s.chapter_id === chapterId);
      if (!session) return 'AVAILABLE';

      // Check if a subsequent quiz attempt exists after this session was started
      const startedEpoch = new Date(session.started_at).getTime();
      const hasCompletedQuiz = quizAttempts.some(q => 
        q.chapter_id === chapterId && 
        new Date(q.completed_at || q.created_at).getTime() > startedEpoch
      );

      if (hasCompletedQuiz || session.status === 'completed') {
        return 'COMPLETED';
      }

      if (session.scroll_progress === 100 || session.status === 'viewed_to_end') {
        return 'IN_PROGRESS'; // Viewed to end but quiz not submitted yet
      }

      if (session.scroll_progress > 0) {
        return 'IN_PROGRESS';
      }

      return 'STARTED';
    }

    case 'COMPLETE_PENDING_QUIZ': {
      if (!chapterId) return 'AVAILABLE';

      const triggerTime = Number(versionVal);
      const isTime = !isNaN(triggerTime) && triggerTime > 10000000000;

      if (isTime) {
        const matchingAttempt = quizAttempts.find(q => {
          if (q.chapter_id !== chapterId) return false;
          const attemptTime = new Date(q.completed_at || q.created_at).getTime();
          return attemptTime > triggerTime;
        });
        if (matchingAttempt) {
          return 'COMPLETED';
        }
      } else {
        const currentCount = quizAttempts.filter(q => q.chapter_id === chapterId).length;
        const baseAttempts = isNaN(triggerTime) ? 0 : triggerTime;
        if (currentCount > baseAttempts) {
          return 'COMPLETED';
        }
      }

      const session = lessonSessions.find(s => s.chapter_id === chapterId);
      if (session) {
        if (session.scroll_progress === 100 || session.status === 'viewed_to_end') {
          return 'IN_PROGRESS';
        }
        return 'STARTED';
      }

      return 'AVAILABLE';
    }

    case 'COMPLETE_DUE_REVISION':
    case 'REVISE_CRITICAL_CHAPTER':
    case 'POST_MOCK_REVISION':
    case 'MAINTAIN_STRONG_TOPIC': {
      if (!chapterId) return 'AVAILABLE';

      const triggerTime = Number(versionVal);
      const isTime = !isNaN(triggerTime) && triggerTime > 10000000000;

      if (isTime) {
        // Check if a completed revision exists in student_revisions after triggerTime
        const matchingRev = revisions.find(r => 
          r.chapter_id === chapterId && 
          r.status === 'completed' &&
          new Date(r.completed_at).getTime() > triggerTime
        );
        if (matchingRev) {
          return 'COMPLETED';
        }

        // Or check if a new quiz attempt is submitted for this chapter
        const matchingAttempt = quizAttempts.find(q => 
          q.chapter_id === chapterId && 
          new Date(q.completed_at || q.created_at).getTime() > triggerTime
        );
        if (matchingAttempt) {
          return 'COMPLETED';
        }

        // Check if a revision session is currently started/in_progress
        const activeRev = revisions.find(r => 
          r.chapter_id === chapterId && 
          r.status === 'started' &&
          new Date(r.started_at).getTime() > triggerTime
        );
        if (activeRev) {
          return 'STARTED';
        }
      } else {
        const currentCount = quizAttempts.filter(q => q.chapter_id === chapterId).length;
        const baseAttempts = isNaN(triggerTime) ? 0 : triggerTime;
        if (currentCount > baseAttempts) {
          return 'COMPLETED';
        }
      }

      return 'AVAILABLE';
    }

    case 'PRACTICE_WEAK_TOPIC': {
      if (!chapterId) return 'AVAILABLE';

      const triggerTime = Number(versionVal);
      const isTime = !isNaN(triggerTime) && triggerTime > 10000000000;

      if (isTime) {
        const matchingAttempt = quizAttempts.find(q => 
          q.chapter_id === chapterId && 
          new Date(q.completed_at || q.created_at).getTime() > triggerTime
        );
        if (matchingAttempt) {
          return 'COMPLETED';
        }
      } else {
        const currentCount = quizAttempts.filter(q => q.chapter_id === chapterId).length;
        const baseAttempts = isNaN(triggerTime) ? 0 : triggerTime;
        if (currentCount > baseAttempts) {
          return 'COMPLETED';
        }
      }

      const session = lessonSessions.find(s => s.chapter_id === chapterId);
      if (session) {
        return 'IN_PROGRESS';
      }

      return 'AVAILABLE';
    }

    case 'BUILD_MORE_MOCK_EVIDENCE':
    case 'TAKE_RECOMMENDED_MOCK': {
      if (!mockId) return 'AVAILABLE';

      // Mock completion is mapped by checking if a new mock_results row exists for this mockId
      // versionVal is mockAttemptsCount at trigger time
      const triggerCount = parseInt(versionVal, 10);
      const baseCount = isNaN(triggerCount) ? 0 : triggerCount;

      const matchingMocks = mockResults.filter(m => m.mock_id === mockId);
      
      // If we have more mocks now than when recommended, it is completed
      if (matchingMocks.length > baseCount) {
        return 'COMPLETED';
      }

      return 'AVAILABLE';
    }

    case 'START_NEW_LESSON': {
      if (!chapterId) return 'AVAILABLE';

      const hasAttempt = quizAttempts.some(q => q.chapter_id === chapterId);
      if (hasAttempt) return 'COMPLETED';

      const session = lessonSessions.find(s => s.chapter_id === chapterId);
      if (session) {
        if (session.scroll_progress > 0) return 'IN_PROGRESS';
        return 'STARTED';
      }

      return 'AVAILABLE';
    }

    default:
      return 'AVAILABLE';
  }
}

module.exports = { resolveActionState };
