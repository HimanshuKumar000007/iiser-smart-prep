const SYLLABUS = {
    physics: {
        name: 'Physics', color: '#ef4444', icon: 'atom', topics: [
            { name: 'Kinematics - 1D Motion', priority: 'high', class: 11, time: 45, completed: false },
            { name: 'Newton\'s Laws of Motion', priority: 'high', class: 11, time: 45, completed: false },
            { name: 'Work, Energy & Power', priority: 'high', class: 11, time: 45, completed: false },
            { name: 'Rotational Dynamics', priority: 'high', class: 11, time: 60, completed: false },
            { name: 'Gravitation', priority: 'medium', class: 11, time: 45, completed: false },
            { name: 'Thermodynamics', priority: 'critical', class: 11, time: 60, completed: false },
            { name: 'Kinetic Theory of Gases', priority: 'medium', class: 11, time: 45, completed: false },
            { name: 'Simple Harmonic Motion', priority: 'medium', class: 11, time: 45, completed: false },
            { name: 'Wave Motion', priority: 'high', class: 11, time: 45, completed: false },
            { name: 'Electrostatics - Coulomb\'s Law', priority: 'critical', class: 12, time: 60, completed: false },
            { name: 'Current Electricity', priority: 'critical', class: 12, time: 60, completed: false },
            { name: 'Moving Charges & Magnetism', priority: 'high', class: 12, time: 60, completed: false },
            { name: 'EMI & Alternating Current', priority: 'high', class: 12, time: 45, completed: false },
            { name: 'Ray Optics & Wave Optics', priority: 'critical', class: 12, time: 60, completed: false },
            { name: 'Modern Physics', priority: 'critical', class: 12, time: 60, completed: false }
        ]
    },
    chemistry: {
        name: 'Chemistry', color: '#06b6d4', icon: 'flask', topics: [
            { name: 'Atomic Structure', priority: 'high', class: 11, time: 45, completed: false },
            { name: 'Periodic Properties', priority: 'high', class: 11, time: 45, completed: false },
            { name: 'Chemical Bonding', priority: 'critical', class: 11, time: 60, completed: false },
            { name: 'Thermodynamics', priority: 'critical', class: 11, time: 60, completed: false },
            { name: 'Chemical Equilibrium', priority: 'critical', class: 11, time: 60, completed: false },
            { name: 'Ionic Equilibrium', priority: 'high', class: 11, time: 60, completed: false },
            { name: 'Redox Reactions', priority: 'medium', class: 11, time: 45, completed: false },
            { name: 's-Block Elements', priority: 'medium', class: 11, time: 45, completed: false },
            { name: 'p-Block Elements', priority: 'high', class: 11, time: 45, completed: false },
            { name: 'Organic Basics & Nomenclature', priority: 'high', class: 11, time: 60, completed: false },
            { name: 'Hydrocarbons', priority: 'medium', class: 11, time: 60, completed: false },
            { name: 'Solid State', priority: 'medium', class: 12, time: 45, completed: false },
            { name: 'Solutions & Colligative Properties', priority: 'high', class: 12, time: 45, completed: false },
            { name: 'Electrochemistry', priority: 'critical', class: 12, time: 60, completed: false },
            { name: 'Chemical Kinetics', priority: 'critical', class: 12, time: 60, completed: false },
            { name: 'Coordination Compounds', priority: 'high', class: 12, time: 45, completed: false },
            { name: 'Aldehydes, Ketones & Acids', priority: 'critical', class: 12, time: 60, completed: false }
        ]
    },
    mathematics: {
        name: 'Math', color: '#f59e0b', icon: 'function', topics: [
            { name: 'Trigonometric Functions', priority: 'critical', class: 11, time: 60, completed: false },
            { name: 'Complex Numbers', priority: 'high', class: 11, time: 60, completed: false },
            { name: 'Quadratic Equations', priority: 'high', class: 11, time: 45, completed: false },
            { name: 'Permutations & Combinations', priority: 'high', class: 11, time: 60, completed: false },
            { name: 'Binomial Theorem', priority: 'high', class: 11, time: 60, completed: false },
            { name: 'Sequences & Series', priority: 'high', class: 11, time: 45, completed: false },
            { name: 'Straight Lines', priority: 'critical', class: 11, time: 60, completed: false },
            { name: 'Circles & Conic Sections', priority: 'critical', class: 11, time: 60, completed: false },
            { name: 'Limits & Continuity', priority: 'critical', class: 11, time: 45, completed: false },
            { name: 'Differentiation', priority: 'critical', class: 11, time: 45, completed: false },
            { name: 'Application of Derivatives', priority: 'critical', class: 12, time: 60, completed: false },
            { name: 'Indefinite Integration', priority: 'critical', class: 12, time: 60, completed: false },
            { name: 'Definite Integration', priority: 'critical', class: 12, time: 60, completed: false },
            { name: 'Differential Equations', priority: 'high', class: 12, time: 60, completed: false },
            { name: 'Vectors & 3D Geometry', priority: 'critical', class: 12, time: 60, completed: false },
            { name: 'Probability', priority: 'high', class: 12, time: 60, completed: false }
        ]
    },
    biology: {
        name: 'Biology', color: '#22c55e', icon: 'dna', topics: [
            { name: 'Cell - The Unit of Life', priority: 'critical', class: 11, time: 45, completed: false },
            { name: 'Cell Cycle & Division', priority: 'critical', class: 11, time: 45, completed: false },
            { name: 'Transport in Plants', priority: 'high', class: 11, time: 45, completed: false },
            { name: 'Mineral Nutrition', priority: 'high', class: 11, time: 45, completed: false },
            { name: 'Photosynthesis', priority: 'critical', class: 11, time: 60, completed: false },
            { name: 'Respiration in Plants', priority: 'critical', class: 11, time: 60, completed: false },
            { name: 'Plant Growth & Development', priority: 'high', class: 11, time: 45, completed: false },
            { name: 'Digestion & Absorption', priority: 'critical', class: 11, time: 45, completed: false },
            { name: 'Breathing & Gas Exchange', priority: 'critical', class: 11, time: 45, completed: false },
            { name: 'Body Fluids & Circulation', priority: 'critical', class: 11, time: 45, completed: false },
            { name: 'Excretory System', priority: 'high', class: 11, time: 45, completed: false },
            { name: 'Neural Control & Coordination', priority: 'critical', class: 11, time: 45, completed: false },
            { name: 'Chemical Coordination', priority: 'critical', class: 11, time: 45, completed: false },
            { name: 'Reproduction in Organisms', priority: 'high', class: 12, time: 45, completed: false },
            { name: 'Genetics & Evolution', priority: 'critical', class: 12, time: 60, completed: false },
            { name: 'Ecosystem & Environment', priority: 'high', class: 12, time: 45, completed: false }
        ]
    }
};

// GLOBAL APP STATE
let appState = {
    user: { name: 'Aspirant', startDate: null },
    stats: {
        streak: 0,
        longestStreak: 0,
        totalXP: 0,
        totalFocusMinutes: 0,
        sessionsCompleted: 0,
        lastActiveDate: null
    },
    taskQueue: {
        today: [],
        rescheduled: []
    },
    dailyTasks: {} // for legacy compatibility
};

let currentFilter = 'all';
let currentTaskId = null;
let focusTimerInterval = null;
let focusTimeRemaining = 0;
let focusTotalTime = 0;

// Initialization
function init() {
    const saved = localStorage.getItem('IAT2026_SMART');
    if (saved) {
        appState = JSON.parse(saved);

        // Backwards compatibility migration
        if (!appState.taskQueue) appState.taskQueue = { today: [], rescheduled: [] };

        updateStreak();
        generateSmartDailyTasks();
        renderAll();
    } else {
        welcomeSetup();
    }
}

function welcomeSetup() {
    document.body.innerHTML += `
                <div class="focus-modal active" id="welcomeModal" style="z-index: 3000; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                    <div style="text-align: center; max-width: 400px; background: var(--bg-card); padding: 2rem; border-radius: 1rem; border: 1px solid var(--glass-border);">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🎯</div>
                        <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Welcome to Smart Scheduler</h2>
                        <p style="color: var(--text-muted); margin-bottom: 2rem;">Auto-generates your ideal path to IAT 2026.</p>
                        <input type="text" id="setupName" placeholder="Your Name" style="width: 100%; padding: 1rem; background: var(--bg-secondary); border: 1px solid var(--glass-border); border-radius: 12px; color: white; margin-bottom: 1rem; font-size: 1rem;">
                        <button onclick="completeSetup()" style="width: 100%; padding: 1rem; background: var(--accent-purple); color: white; border: none; border-radius: 12px; font-weight: 700; cursor: pointer;">Begin</button>
                    </div>
                </div>
            `;
}

function completeSetup() {
    appState.user.name = document.getElementById('setupName').value || 'Aspirant';
    appState.user.startDate = new Date().toISOString();
    appState.stats.lastActiveDate = new Date().toDateString();

    saveData();
    document.getElementById('welcomeModal').remove();
    generateSmartDailyTasks();
    renderAll();
}

function saveData() {
    localStorage.setItem('IAT2026_SMART', JSON.stringify(appState));
}

function resetData() {
    if (confirm('Delete all data and restart?')) {
        localStorage.removeItem('IAT2026_SMART');
        location.reload();
    }
}

// Smart Logic
function calculateSmartTime(topic) {
    let baseTime = topic.time || 45;
    const priorityMultiplier = { 'critical': 1.5, 'high': 1.2, 'medium': 1.0, 'low': 0.8 };
    const classMultiplier = topic.class === 12 ? 1.1 : 1.0;
    const finalTime = Math.round(baseTime * (priorityMultiplier[topic.priority] || 1.0) * classMultiplier);
    return Math.ceil(finalTime / 5) * 5; // round to nearest 5
}

function generateSmartDailyTasks() {
    const today = new Date().toDateString();

    if (appState.taskQueue.today.length > 0 && appState.taskQueue.today[0].date === today) {
        return; // Already generated for today
    }

    const tasks = [];
    const subjects = Object.keys(SYLLABUS);

    // Re-add any incomplete tasks from yesterday
    const rescheduled = appState.taskQueue.rescheduled.filter(t => t.scheduledFor === today);
    rescheduled.forEach(task => {
        tasks.push({ ...task, isRescheduled: true, date: today });
    });
    appState.taskQueue.rescheduled = appState.taskQueue.rescheduled.filter(t => t.scheduledFor !== today);

    // Add new tasks
    const subjectStats = subjects.map(s => {
        const completed = SYLLABUS[s].topics.filter(t => t.completed).length;
        const total = SYLLABUS[s].topics.length;
        return { subject: s, ratio: total > 0 ? completed / total : 0 };
    }).sort((a, b) => a.ratio - b.ratio); // focus on lowest completion first

    const neededTasks = 5 - tasks.length;
    for (let i = 0; i < neededTasks && i < 4; i++) {
        const subjKey = subjectStats[i % 4].subject;
        const subject = SYLLABUS[subjKey];

        const incomplete = subject.topics.filter(t => !t.completed);
        if (incomplete.length > 0) {
            const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
            incomplete.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

            const topic = incomplete[0];
            const smartTime = calculateSmartTime(topic);

            tasks.push({
                id: Date.now() + i,
                subject: subjKey,
                topicName: topic.name,
                priority: topic.priority,
                class: topic.class || 11,
                allocatedTime: smartTime,
                completed: false,
                skipped: false,
                date: today,
                xp: smartTime * (topic.priority === 'critical' ? 2 : topic.priority === 'high' ? 1.5 : 1)
            });
        }
    }

    appState.taskQueue.today = tasks;
    appState.dailyTasks[today] = tasks; // sync legacy
    saveData();
}

// Streak
function updateStreak() {
    const today = new Date().toDateString();
    const lastActive = appState.stats.lastActiveDate;

    if (!lastActive) {
        appState.stats.streak = 0;
    } else {
        const lastDate = new Date(lastActive);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

        if (diffDays > 1) {
            appState.stats.streak = 0;
        }
    }
}

function incrementStreak() {
    const today = new Date().toDateString();
    if (appState.stats.lastActiveDate !== today) {
        appState.stats.streak++;
        appState.stats.lastActiveDate = today;
        if (appState.stats.streak > appState.stats.longestStreak) {
            appState.stats.longestStreak = appState.stats.streak;
        }
    }
}

// Render functions
function renderAll() {
    renderHeader();
    renderStats();
    renderDateStrip();
    renderTasks();
}

function renderHeader() {
    document.getElementById('headerStreak').textContent = appState.stats.streak;
    document.getElementById('headerXP').textContent = appState.stats.totalXP + " XP";
}

function renderStats() {
    const h = Math.floor(appState.stats.totalFocusMinutes / 60);
    const m = appState.stats.totalFocusMinutes % 60;
    document.getElementById('totalFocusTime').innerHTML = `${h}<span>h</span> ${m.toString().padStart(2, '0')}<span>m</span>`;

    const todayTasks = appState.taskQueue.today;
    const compTasks = todayTasks.filter(t => t.completed).length;
    document.getElementById('tasksCompletedCount').textContent = `${compTasks}/${todayTasks.length}`;
    const pct = todayTasks.length > 0 ? (compTasks / todayTasks.length) * 100 : 0;
    document.getElementById('tasksProgressBar').style.width = `${pct}%`;
}

function renderDateStrip() {
    const container = document.getElementById('dateStripContainer');
    if (!container) return;
    container.innerHTML = '';

    const today = new Date();
    for (let i = -3; i <= 3; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const isToday = i === 0;

        const el = document.createElement('div');
        el.className = `date-item ${isToday ? 'active' : ''}`;
        el.innerHTML = `
                    <span class="date-day">${d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    <span class="date-num">${d.getDate()}</span>
                    <span class="date-month">${d.toLocaleDateString('en-US', { month: 'short' })}</span>
                `;
        container.appendChild(el);
    }
}

function filterTasks(filter, el) {
    currentFilter = filter;
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    renderTasks();
}

function renderTasks() {
    const container = document.getElementById('taskList');
    container.innerHTML = '';

    let tasks = appState.taskQueue.today || [];
    if (currentFilter !== 'all') {
        tasks = tasks.filter(t => t.subject === currentFilter);
    }

    let todayXP = 0;

    tasks.forEach(task => {
        const isCompleted = task.completed;
        if (isCompleted) todayXP += Math.floor(task.xp);

        let el = document.createElement('div');
        el.className = `task-item ${isCompleted ? 'completed' : ''}`;

        const subj = SYLLABUS[task.subject];

        // Content
        el.innerHTML = `
                    <div class="checkbox" onclick="toggleTask(${task.id})">${isCompleted ? '<i class="ph ph-check"></i>' : ''}</div>
                    <div class="task-content">
                        <div class="task-title" onclick="toggleTask(${task.id})" style="cursor: pointer;">${task.topicName}</div>
                        <div class="task-meta">
                            <span class="priority ${task.priority}">${task.priority}</span>
                            <span class="tag"><i class="ph ph-${subj.icon}"></i> ${subj.name}</span>
                            <span class="tag"><i class="ph ph-clock"></i> ${task.allocatedTime}m</span>
                        </div>
                    </div>
                `;

        if (!isCompleted) {
            const actions = document.createElement('div');
            actions.className = 'task-actions';
            actions.innerHTML = `
                        <button class="btn-skip" onclick="skipTask(${task.id})" title="Reschedule for tomorrow"><i class="ph ph-calendar-plus"></i></button>
                        <button class="task-play-btn" onclick="openFocusModeForTask(${task.id})" title="Start Session"><i class="ph ph-play-circle" style="font-size:1.5rem"></i></button>
                    `;
            el.appendChild(actions);
        } else {
            const xpEl = document.createElement('div');
            xpEl.className = 'task-xp';
            xpEl.textContent = `+${Math.floor(task.xp)} XP`;
            el.appendChild(xpEl);
        }

        container.appendChild(el);
    });

    document.getElementById('xpDisplay').textContent = `+${todayXP} XP Today`;
}

// Actions
function toggleTask(id) {
    const task = appState.taskQueue.today.find(t => t.id === id);
    if (!task) return;

    task.completed = !task.completed;

    // Mark complete in syllabus
    const topic = SYLLABUS[task.subject].topics.find(t => t.name === task.topicName);
    if (topic) topic.completed = task.completed;

    if (task.completed) {
        appState.stats.totalXP += Math.floor(task.xp);
        showToast('Task Done!', `+${Math.floor(task.xp)} XP`);
        createConfetti();
        incrementStreak();
    } else {
        appState.stats.totalXP -= Math.floor(task.xp);
    }

    saveData();
    renderAll();
}

function skipTask(id) {
    const taskIndex = appState.taskQueue.today.findIndex(t => t.id === id);
    if (taskIndex > -1) {
        const task = appState.taskQueue.today.splice(taskIndex, 1)[0];
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        task.scheduledFor = tomorrow.toDateString();
        appState.taskQueue.rescheduled.push(task);

        // Add a new task to replace it
        appState.taskQueue.today.push({
            ...task,
            id: Date.now(),
            topicName: `${SYLLABUS[task.subject].topics[0].name} (Replacement)`,
            priority: 'medium',
            xp: 50,
            allocatedTime: 25
        });

        saveData();
        showToast('Rescheduled', 'Moved to tomorrow\'s plan');
        renderAll();
    }
}

// Focus Mode
function openFocusModeForTask(id) {
    const task = appState.taskQueue.today.find(t => t.id === id);
    if (!task || task.completed) return;

    currentTaskId = task.id;
    focusTotalTime = task.allocatedTime * 60;
    focusTimeRemaining = focusTotalTime;

    const subj = SYLLABUS[task.subject];
    document.getElementById('focusIcon').innerHTML = `<i class="ph ph-${subj.icon}" style="color:${subj.color}"></i>`;
    document.getElementById('focusTopic').textContent = task.topicName;
    document.getElementById('focusDetails').textContent = `Class ${task.class} • ${task.allocatedTime} mins • ${task.priority.toUpperCase()} priority`;

    updateFocusTimerDisplay();

    document.getElementById('focusModal').classList.add('active');
    document.getElementById('startBtn').style.display = 'flex';
    document.getElementById('stopBtn').style.display = 'none';
}

function toggleFocusTimer() {
    if (focusTimerInterval) return; // already running
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('stopBtn').style.display = 'flex';

    focusTimerInterval = setInterval(() => {
        focusTimeRemaining--;
        updateFocusTimerDisplay();

        if (focusTimeRemaining <= 0) {
            completeFocus();
        }
    }, 1000);
}

function updateFocusTimerDisplay() {
    const m = Math.floor(focusTimeRemaining / 60).toString().padStart(2, '0');
    const s = (focusTimeRemaining % 60).toString().padStart(2, '0');
    document.getElementById('focusTimer').textContent = `${m}:${s}`;
}

function completeFocus() {
    if (focusTimerInterval) {
        clearInterval(focusTimerInterval);
        focusTimerInterval = null;
    }

    if (currentTaskId) {
        const task = appState.taskQueue.today.find(t => t.id === currentTaskId);
        if (task && !task.completed) {
            const timeSpent = Math.ceil((focusTotalTime - focusTimeRemaining) / 60);
            appState.stats.totalFocusMinutes += timeSpent;
            appState.stats.sessionsCompleted++;
            toggleTask(task.id);
        }
    }

    closeFocus();
}

function closeFocus() {
    if (focusTimerInterval) {
        clearInterval(focusTimerInterval);
        focusTimerInterval = null;
    }
    currentTaskId = null;
    document.getElementById('focusModal').classList.remove('active');
    renderAll();
}

function showToast(title, msg) {
    document.querySelector('#toast div:first-child').textContent = title;
    document.getElementById('toastMsg').textContent = msg;
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function createConfetti() {
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
    for (let i = 0; i < 50; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.background = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(c);

        const anim = c.animate([
            { transform: `translate3d(0, 0, 0) rotate(0)`, opacity: 1 },
            { transform: `translate3d(${Math.random() * 100 - 50}px, 100vh, 0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], { duration: 1000 + Math.random() * 1000, easing: 'cubic-bezier(.37,0,.63,1)' });

        anim.onfinish = () => c.remove();
    }
}

// Boot
document.addEventListener('DOMContentLoaded', init);
