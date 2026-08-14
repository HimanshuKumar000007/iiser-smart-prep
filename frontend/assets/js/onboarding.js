// Onboarding State
const obState = {
  exam: null,
  level: null,
  days: 5,
  hours: 3,
  strong: [],
  weak: []
};

// Elements
const obModal = document.getElementById('onboarding-modal');
const stepEls = [
  document.getElementById('ob-step-1'),
  document.getElementById('ob-step-2'),
  document.getElementById('ob-step-3'),
  document.getElementById('ob-step-loading'),
  document.getElementById('ob-step-result')
];

const stepIndicatorEls = [
  document.getElementById('p-step-1'),
  document.getElementById('p-step-2'),
  document.getElementById('p-step-3'),
  document.getElementById('p-step-4')
];

let currentStepIndex = 0;

function safeTrack(event, properties) {
  try {
    if (window.posthog && typeof window.posthog.capture === 'function') {
      window.posthog.capture(event, properties);
    }
  } catch (_) {}
}

// Open Wizard Portal
function openOnboardingWizard() {
  obModal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent page scroll
  resetOnboardingState();
  showStep(0);
  safeTrack('assessment_started', {});
}

// Close Wizard Portal
function closeOnboardingWizard() {
  obModal.classList.remove('active');
  document.body.style.overflow = '';
}

// Reset State
function resetOnboardingState() {
  obState.exam = null;
  obState.level = null;
  obState.days = 5;
  obState.hours = 3;
  obState.strong = [];
  obState.weak = [];

  // Reset UI classes
  document.querySelectorAll('#onboarding-modal .ob-card').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('#onboarding-modal .ob-pill').forEach(p => {
    p.classList.remove('active-strong');
    p.classList.remove('active-weak');
  });

  // Reset inputs
  const daysSlider = document.getElementById('ob-days');
  const hoursSlider = document.getElementById('ob-hours');
  if (daysSlider) daysSlider.value = 5;
  if (hoursSlider) hoursSlider.value = 3;
  
  const daysVal = document.getElementById('ob-days-val');
  const hoursVal = document.getElementById('ob-hours-val');
  if (daysVal) daysVal.innerText = '5 Days';
  if (hoursVal) hoursVal.innerText = '3 Hours';

  updateLivePreview();
}

// Show Step Panel & Update Head Indicator
function showStep(index) {
  // Hide all step panels
  stepEls.forEach(el => {
    if (el) el.classList.remove('active');
  });
  
  // Show active step panel
  if (stepEls[index]) {
    stepEls[index].classList.add('active');
  }
  currentStepIndex = index;

  // Update Progress Nodes at the top
  // index 0 -> step 1 active
  // index 1 -> step 2 active
  // index 2 -> step 3 active
  // index 3 -> step 4 active (loading)
  // index 4 -> step 4 active (result)
  
  stepIndicatorEls.forEach((el, idx) => {
    if (!el) return;
    el.classList.remove('active', 'completed');
    
    // Connective lines
    const lineEl = el.nextElementSibling;
    if (lineEl && lineEl.classList.contains('ob-p-step-line')) {
      lineEl.classList.remove('completed');
    }

    if (idx === index || (index === 4 && idx === 3) || (index === 3 && idx === 3)) {
      el.classList.add('active');
    } else if (idx < index) {
      el.classList.add('completed');
      if (lineEl && lineEl.classList.contains('ob-p-step-line')) {
        lineEl.classList.add('completed');
      }
    }
  });
}

// Next Step Validation
function nextStep(step) {
  if (step === 1) {
    if (!obState.exam) return alert('Please select your exam goal to continue.');
    showStep(1);
  } else if (step === 2) {
    if (!obState.level) return alert('Please select your current preparation level.');
    showStep(2);
  } else if (step === 3) {
    startLoadingSequence();
  }
}

// Select Target Exam
function selectExam(exam, el) {
  if (exam === 'nest') {
    alert('NEST Only is coming soon! Please select IISER IAT Only or Both Exams to proceed.');
    return;
  }
  obState.exam = exam;
  document.querySelectorAll('#ob-step-1 .ob-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  updateLivePreview();
}

// Select current Level
function selectLevel(level, el) {
  obState.level = level;
  document.querySelectorAll('#ob-step-2 .ob-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  updateLivePreview();
}

// Setup routine listeners
document.getElementById('ob-days')?.addEventListener('input', (e) => {
  obState.days = parseInt(e.target.value);
  document.getElementById('ob-days-val').innerText = obState.days + (obState.days === 1 ? ' Day' : ' Days');
  updateLivePreview();
});

document.getElementById('ob-hours')?.addEventListener('input', (e) => {
  obState.hours = parseInt(e.target.value);
  document.getElementById('ob-hours-val').innerText = obState.hours + (obState.hours === 1 ? ' Hour' : ' Hours');
  updateLivePreview();
});

// Toggle Strong/Weak subjects (mutually exclusive)
function toggleSubject(type, subject, el) {
  if (type === 'strong') {
    const idx = obState.strong.indexOf(subject);
    if (idx > -1) {
      obState.strong.splice(idx, 1);
      el.classList.remove('active-strong');
    } else {
      // Remove from weak if it exists
      const weakIdx = obState.weak.indexOf(subject);
      if (weakIdx > -1) {
        obState.weak.splice(weakIdx, 1);
        // Deselect the corresponding weak pill in UI
        const weakPills = document.querySelectorAll('#ob-step-3 .ob-subject-selector:last-of-type .ob-pill');
        weakPills.forEach(wp => {
          if (wp.innerText === subject) wp.classList.remove('active-weak');
        });
      }
      obState.strong.push(subject);
      el.classList.add('active-strong');
    }
  } else if (type === 'weak') {
    const idx = obState.weak.indexOf(subject);
    if (idx > -1) {
      obState.weak.splice(idx, 1);
      el.classList.remove('active-weak');
    } else {
      // Remove from strong if it exists
      const strongIdx = obState.strong.indexOf(subject);
      if (strongIdx > -1) {
        obState.strong.splice(strongIdx, 1);
        // Deselect corresponding strong pill in UI
        const strongPills = document.querySelectorAll('#ob-step-3 .ob-subject-selector:first-of-type .ob-pill');
        strongPills.forEach(sp => {
          if (sp.innerText === subject) sp.classList.remove('active-strong');
        });
      }
      obState.weak.push(subject);
      el.classList.add('active-weak');
    }
  }
  updateLivePreview();
}

// Live Left Panel Preview Sync
function updateLivePreview() {
  // 1. Target Exam badge & details
  const badge = document.getElementById('preview-exam-badge');
  const matchVal = document.getElementById('preview-match-val');
  
  if (badge) {
    badge.className = 'ob-badge'; // reset classes
    if (obState.exam === 'both') {
      badge.innerText = 'IISER IAT + NEST';
      badge.classList.add('active-both');
      if (matchVal) matchVal.innerText = '92% Shared Synergy';
    } else if (obState.exam === 'iiser') {
      badge.innerText = 'IISER IAT ONLY';
      badge.classList.add('active-iiser');
      if (matchVal) matchVal.innerText = '100% Focused';
    } else if (obState.exam === 'nest') {
      badge.innerText = 'NEST ONLY';
      badge.classList.add('active-nest');
      if (matchVal) matchVal.innerText = '100% Focused';
    } else {
      badge.innerText = 'Awaiting Exam';
      if (matchVal) matchVal.innerText = '-';
    }
  }

  // 2. Readiness dial
  let readiness = 0;
  if (obState.level === 'beginner') readiness = 20;
  if (obState.level === 'intermediate') readiness = 42;
  if (obState.level === 'advanced') readiness = 68;

  const readinessVal = document.getElementById('preview-readiness-val');
  if (readinessVal) readinessVal.innerText = readiness + '%';

  const ringFill = document.getElementById('preview-ring-fill');
  if (ringFill) {
    const circumference = 251.2;
    const offset = circumference - (readiness / 100) * circumference;
    ringFill.style.strokeDashoffset = offset;
  }

  // 3. Workload pace
  const intensityVal = document.getElementById('preview-intensity-val');
  if (intensityVal) {
    const weeklyHours = obState.days * obState.hours;
    let label = 'Light pace';
    if (weeklyHours > 8 && weeklyHours <= 20) label = 'Balanced (' + weeklyHours + 'h/wk)';
    if (weeklyHours > 20 && weeklyHours <= 40) label = 'Intensive (' + weeklyHours + 'h/wk)';
    if (weeklyHours > 40) label = 'Extreme ⚠️ (' + weeklyHours + 'h/wk)';
    intensityVal.innerText = label;
  }

  // 4. Focus area
  const focusVal = document.getElementById('preview-focus-val');
  if (focusVal) {
    if (obState.weak.length > 0) {
      focusVal.innerText = 'Priority: ' + obState.weak.join(', ');
    } else {
      focusVal.innerText = 'Balanced Syllabus';
    }
  }

  // 5. Live Milestones Preview list
  const milestoneList = document.getElementById('preview-milestone-list');
  if (milestoneList) {
    if (!obState.exam) {
      milestoneList.innerHTML = `<p class="ob-placeholder-text">Choose your targets to draft a study curriculum in real-time.</p>`;
    } else {
      const subjectFocus = obState.weak.length > 0 ? obState.weak[0] : (obState.strong.length > 0 ? obState.strong[0] : 'Syllabus Core');
      let planHTML = '';
      if (obState.exam === 'both') {
        planHTML += `<div class="ob-preview-milestone">Week 1: Core Physics & Chem Intersections</div>`;
        planHTML += `<div class="ob-preview-milestone">Week 2: Targeted weak diagnostics in ${subjectFocus}</div>`;
        planHTML += `<div class="ob-preview-milestone">Week 3: Combined IAT & NEST Mock Sprinters</div>`;
      } else {
        const examLabel = obState.exam === 'iiser' ? 'IAT' : 'NEST';
        planHTML += `<div class="ob-preview-milestone">Week 1: ${examLabel} Foundations & Formula Mapping</div>`;
        planHTML += `<div class="ob-preview-milestone">Week 2: Focus Module: ${subjectFocus} Drilldown</div>`;
        planHTML += `<div class="ob-preview-milestone">Week 3: Full-length ${examLabel} Simulated Diagnostic</div>`;
      }
      milestoneList.innerHTML = planHTML;
    }
  }
}

// Loading Sequence Simulator
function startLoadingSequence() {
  showStep(3); // Show loading step panel

  const loaderPercent = document.getElementById('ob-loader-percent');
  const logsContainer = document.getElementById('ob-terminal-logs');

  if (logsContainer) {
    logsContainer.innerHTML = `<div class="terminal-line active">Initializing neural curriculum planner...</div>`;
  }

  let progress = 0;
  const intervalTime = 40; // Total 4 seconds (100 * 40ms)
  
  const timer = setInterval(() => {
    progress += 1;
    if (loaderPercent) {
      loaderPercent.innerText = progress + '%';
    }

    // Append Console Log Lines based on progress checkpoints
    if (progress === 20) {
      appendTerminalLine('Analyzing exam intersections...', 'active');
    }
    if (progress === 35) {
      markPreviousLogsDone();
      appendTerminalLine('Exam strategy locked: ' + (obState.exam === 'both' ? 'Unified IAT+NEST Synergy' : obState.exam.toUpperCase() + ' Focused'), 'done');
    }
    if (progress === 50) {
      appendTerminalLine('Calibrating readiness indices with database metrics...', 'active');
    }
    if (progress === 65) {
      markPreviousLogsDone();
      appendTerminalLine('Level calibrated: ' + obState.level.toUpperCase(), 'done');
    }
    if (progress === 75) {
      appendTerminalLine('Compiling schedules (' + (obState.days * obState.hours) + ' hrs/wk) & weak-point buffers...', 'active');
    }
    if (progress === 90) {
      markPreviousLogsDone();
      appendTerminalLine('Study schedule integrated: Focus prioritize on ' + (obState.weak.join('/') || 'Core Subjects'), 'done');
    }
    if (progress >= 100) {
      clearInterval(timer);
      appendTerminalLine('Roadmap generation complete. Launching portal...', 'done');
      setTimeout(() => {
        renderResults();
        showStep(4); // Show results step panel
      }, 500);
    }
  }, intervalTime);
}

function appendTerminalLine(text, statusClass) {
  const container = document.getElementById('ob-terminal-logs');
  if (!container) return;

  const line = document.createElement('div');
  line.className = 'terminal-line ' + statusClass;
  line.innerText = text;
  container.appendChild(line);
  
  // Auto scroll to bottom
  container.scrollTop = container.scrollHeight;
}

function markPreviousLogsDone() {
  const container = document.getElementById('ob-terminal-logs');
  if (!container) return;
  const activeLines = container.querySelectorAll('.terminal-line.active');
  activeLines.forEach(line => {
    line.classList.remove('active');
    line.classList.add('done');
  });
}

// Render final Roadmap Results
function renderResults() {
  // Populate Outcomes
  let readiness = 20;
  let percentile = 'Top 30%';
  if (obState.level === 'intermediate') {
    readiness = 42;
    percentile = 'Top 15%';
  } else if (obState.level === 'advanced') {
    readiness = 68;
    percentile = 'Top 5%';
  }

  const resReadiness = document.getElementById('res-readiness');
  const resProjection = document.getElementById('res-projection');
  if (resReadiness) resReadiness.innerText = readiness + '%';
  if (resProjection) resProjection.innerText = percentile;

  // Populate summary tags
  const resExam = document.getElementById('res-exam');
  const resLevel = document.getElementById('res-level');
  const resSchedule = document.getElementById('res-schedule-summary');

  if (resExam) {
    resExam.innerText = obState.exam === 'both' ? 'IISER IAT & NEST' : (obState.exam === 'iiser' ? 'IISER IAT' : 'NEST');
  }
  if (resLevel) {
    resLevel.innerText = obState.level.charAt(0).toUpperCase() + obState.level.slice(1);
  }
  if (resSchedule) {
    resSchedule.innerText = obState.days + ' days/wk (' + obState.hours + 'h/day)';
  }

  // Both Exams Optimizer intelligence box
  const resIntelligence = document.getElementById('res-intelligence');
  if (resIntelligence) {
    if (obState.exam === 'both') {
      resIntelligence.innerHTML = `
        <div style="background:rgba(6, 182, 212, 0.08); border:1px solid rgba(6, 182, 212, 0.25); border-radius:18px; padding:1.25rem; margin-bottom:1.5rem; display:flex; align-items:center; gap:12px;">
          <div style="font-size:1.8rem;">🚀</div>
          <div>
            <h4 style="color:#22d3ee; margin:0 0 0.2rem 0; font-size:0.95rem; font-weight:700;">Both Exams Optimizer Active</h4>
            <p style="color:#94a3b8; margin:0; font-size:0.82rem; line-height:1.4;">Shared syllabus synergy calculated at <strong>92%</strong>. Your weekly topics are optimized to cover both exams simultaneously without double-working.</p>
          </div>
        </div>
      `;
    } else {
      resIntelligence.innerHTML = '';
    }
  }

  // Populate dynamic Milestones timeline
  const resTimelineList = document.getElementById('res-timeline-list');
  if (resTimelineList) {
    const focusSub = obState.weak.length > 0 ? obState.weak[0] : (obState.strong.length > 0 ? obState.strong[0] : 'Syllabus Core');
    let timelineHTML = '';

    if (obState.exam === 'both') {
      timelineHTML += `
        <div class="ob-timeline-node">
          <span class="ob-timeline-week">Week 1 (Synergy Focus)</span>
          <p class="ob-timeline-topic">Align shared physics mechanics & chemistry basic concepts.</p>
        </div>
        <div class="ob-timeline-node accent">
          <span class="ob-timeline-week">Week 2 (Diagnostic Module)</span>
          <p class="ob-timeline-topic">Prioritize weak area revision in ${focusSub} and attempt target quizzes.</p>
        </div>
        <div class="ob-timeline-node">
          <span class="ob-timeline-week">Week 3 (Simulated Sprints)</span>
          <p class="ob-timeline-topic">Take first IAT + NEST unified mock sprint with performance profiling.</p>
        </div>
      `;
    } else {
      const examName = obState.exam === 'iiser' ? 'IISER IAT' : 'NEST';
      timelineHTML += `
        <div class="ob-timeline-node">
          <span class="ob-timeline-week">Week 1 (Fundamentals)</span>
          <p class="ob-timeline-topic">Drill high-weightage chapters for ${examName} and map core formulas.</p>
        </div>
        <div class="ob-timeline-node accent">
          <span class="ob-timeline-week">Week 2 (Topic Boosters)</span>
          <p class="ob-timeline-topic">Targeted problem solving in ${focusSub} to eliminate prep weak spots.</p>
        </div>
        <div class="ob-timeline-node">
          <span class="ob-timeline-week">Week 3 (Mock Diagnostics)</span>
          <p class="ob-timeline-topic">Full syllabus simulated mock challenge on actual ${examName} interface.</p>
        </div>
      `;
    }
    resTimelineList.innerHTML = timelineHTML;
  }
}

// Final CTA unlock action
function unlockDashboard() {
  closeOnboardingWizard();
  
  // Persist onboarding profile choices for the dashboard
  localStorage.setItem('onboarding_exam', obState.exam);
  localStorage.setItem('onboarding_level', obState.level);
  localStorage.setItem('onboarding_days', obState.days);
  localStorage.setItem('onboarding_hours', obState.hours);
  localStorage.setItem('onboarding_strong', JSON.stringify(obState.strong));
  localStorage.setItem('onboarding_weak', JSON.stringify(obState.weak));
  localStorage.setItem('onboarding_completed', 'true');

  safeTrack('assessment_completed', {
    exam: obState.exam,
    level: obState.level,
    days: obState.days,
    hours: obState.hours,
    strong: obState.strong,
    weak: obState.weak
  });

  // Redirect to signup page
  window.location.href = 'signup.html';
}

// Export to window for global access when bundled as a module
window.openOnboardingWizard = openOnboardingWizard;
window.closeOnboardingWizard = closeOnboardingWizard;
window.showStep = showStep;
window.nextStep = nextStep;
window.selectExam = selectExam;
window.selectLevel = selectLevel;
window.toggleSubject = toggleSubject;
window.unlockDashboard = unlockDashboard;
