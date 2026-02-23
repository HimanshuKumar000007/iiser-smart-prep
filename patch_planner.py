import sys
import re

with open('frontend/iat-planner-pro.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Header
header_old = """    <header class="app-header">
        <div class="header-content">
            <div class="brand">
                <div class="brand-icon"><i class="ph ph-atom"></i></div>
                <div class="brand-text">
                    <h1>IAT Sprint 2026</h1>
                    <span>Real Performance Tracker</span>
                </div>
            </div>
            <div class="header-actions">
                <button class="icon-btn" id="recBtn" onclick="openFocusMode()" title="Start Focus Session">
                    <i class="ph ph-record"></i>
                </button>
                <button class="icon-btn" onclick="showStats()"><i class="ph ph-chart-bar"></i></button>
                <button class="icon-btn" onclick="resetData()"><i class="ph ph-arrow-counter-clockwise"></i></button>
            </div>
        </div>
    </header>"""

header_new = """    <header class="app-header">
        <div class="header-content">
            <div class="brand">
                <div class="brand-icon"><i class="ph ph-atom"></i></div>
                <div class="brand-text">
                    <h1>Smart Scheduler</h1>
                    <span style="color: var(--accent-purple);">Dynamic IAT Planner</span>
                </div>
            </div>
            <div class="header-actions">
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <div style="font-weight: 700; color: var(--accent-orange); display: flex; align-items: center; gap: 0.25rem;">
                        <i class="ph ph-fire"></i> <span id="headerStreak">0</span>
                    </div>
                    <div style="font-weight: 700; color: var(--accent-purple); display: flex; align-items: center; gap: 0.25rem;">
                        <i class="ph ph-lightning"></i> <span id="headerXP">0 XP</span>
                    </div>
                </div>
                <button class="icon-btn" onclick="resetData()"><i class="ph ph-arrow-counter-clockwise"></i></button>
            </div>
        </div>
    </header>"""
if header_old in content:
    content = content.replace(header_old, header_new)
else:
    print("Warning: Header not found exactly!")

# 2. Main Container Replacement
# Replace from <main class="container"> down to <nav class="bottom-nav">
main_pattern = re.compile(r'<main class="container">.*?</main>', re.DOTALL)
main_new = """<main class="container">
        <!-- Date Strip UI -->
        <style>
            .date-strip-container {
                margin-top: 1rem;
                margin-bottom: 2rem;
                overflow-x: auto;
                scrollbar-width: none;
            }
            .date-strip-container::-webkit-scrollbar { display: none; }
            .date-strip-card {
                display: flex;
                gap: 0.75rem;
                padding-bottom: 0.5rem;
            }
            .date-item {
                background: var(--bg-secondary);
                border: 1px solid var(--glass-border);
                border-radius: 12px;
                padding: 0.75rem 1rem;
                min-width: 70px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.25rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            .date-item.active {
                background: rgba(99, 102, 241, 0.15);
                border-color: var(--accent-purple);
            }
            .date-day { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600; }
            .date-item.active .date-day { color: var(--accent-purple); }
            .date-num { font-size: 1.25rem; font-weight: 800; font-family: 'Space Grotesk'; }
            .date-month { font-size: 0.7rem; color: var(--text-muted); }
            
            .task-play-btn {
                width: 36px; height: 36px; border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                background: rgba(99, 102, 241, 0.1); color: var(--accent-purple);
                border: 1px solid rgba(99, 102, 241, 0.2); cursor: pointer; transition: all 0.2s;
            }
            .task-play-btn:hover { background: var(--accent-purple); color: white; transform: scale(1.05); }
        </style>
        
        <div class="date-strip-container">
            <div class="date-strip-card" id="dateStripContainer"></div>
        </div>

        <div class="stats-overview" style="margin-bottom: 2rem;">
            <div class="stat-card primary">
                <div class="stat-label"><i class="ph ph-clock"></i> Today's Focus</div>
                <div class="stat-value-large" id="totalFocusTime">0<span>h</span> 00<span>m</span></div>
                <div class="stat-sub" id="focusSub">Ready to track</div>
            </div>
            <div class="stat-card">
                <div class="stat-label"><i class="ph ph-target"></i> Tasks Completed</div>
                <div class="stat-value-large" id="tasksCompletedCount">0/5</div>
                <div class="progress-track" style="margin-top: 0.5rem;">
                    <div class="progress-fill-sub" id="tasksProgressBar" style="width: 0%; background: var(--accent-green);"></div>
                </div>
            </div>
        </div>

        <div class="section-header">
            <div class="section-title">Smart Daily Plan</div>
            <div class="xp-display" id="xpDisplay">+0 XP Today</div>
        </div>

        <div class="filter-pills">
            <div class="pill active" onclick="filterTasks('all', this)">All</div>
            <div class="pill" onclick="filterTasks('physics', this)">Physics</div>
            <div class="pill" onclick="filterTasks('chemistry', this)">Chemistry</div>
            <div class="pill" onclick="filterTasks('mathematics', this)">Math</div>
            <div class="pill" onclick="filterTasks('biology', this)">Biology</div>
        </div>

        <div class="task-list" id="taskList"></div>
    </main>"""
content = main_pattern.sub(main_new, content)

# 3. Focus Modal Re-Write
modal_pattern = re.compile(r'<!-- Focus Modal -->.*?<!-- Toast -->', re.DOTALL)
modal_new = """<!-- Focus Modal -->
    <div class="focus-modal" id="focusModal">
        <button class="close-focus" onclick="closeFocus()"><i class="ph ph-x"></i></button>
        <div class="focus-title" id="focusGreeting">Focus Session</div>
        <div class="focus-subtitle" id="focusDetails">Ready to make progress?</div>

        <div id="focusIcon" style="font-size: 4rem; margin-bottom: 1rem;"><i class="ph ph-target"></i></div>
        <div id="focusTopic" style="font-size: 1.5rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">-</div>

        <div class="focus-timer-display" id="focusTimer">00:00</div>

        <div class="focus-controls">
            <button class="focus-btn start" id="startBtn" onclick="toggleFocusTimer()">
                <i class="ph ph-play"></i> Start Session
            </button>
            <button class="focus-btn stop" id="stopBtn" onclick="completeFocus()" style="display: none;">
                <i class="ph ph-check-circle"></i> Complete Early
            </button>
        </div>
    </div>

    <!-- Toast -->"""
content = modal_pattern.sub(modal_new, content)

# 4. JavaScript Replacement
# We will replace the entire <script> content with our Smart Scheduler script
script_pattern = re.compile(r'<script>.*?</script>', re.DOTALL)

with open('smart_script.js', 'r', encoding='utf-8') as f:
    smart_script_content = f.read()

content = script_pattern.sub(f'<script>\\n{smart_script_content}\\n    </script>', content)

with open('frontend/iat-planner-pro.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patching complete!")
