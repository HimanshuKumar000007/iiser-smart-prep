let current = 0;
let questions = [];
let score = 0;

fetch("data/mock01.json")
    .then(res => res.json())
    .then(data => {
        questions = data.questions;
        showQuestion();
    });

function showQuestion() {
    let q = questions[current];
    document.getElementById("questionBox").innerHTML = `
    <p>${q.question}</p>
    ${q.options.map((o, i) =>
        `<button onclick="check(${i})">${o}</button>`
    ).join("")}
  `;
}

function check(ans) {
    if (ans === questions[current].correct) score += 4;
    else score -= 1;
    nextQuestion();
}

function nextQuestion() {
    current++;
    if (current < questions.length) showQuestion();
    else alert("Test finished. Score: " + score);
}
function calculateResult() {
    let score = 0;
    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    const sectionScore = {
        Physics: 0,
        Chemistry: 0,
        Mathematics: 0,
        Biology: 0
    };

    questions.forEach(q => {
        if (q.selection === null) {
            skipped++;
        } else if (q.selection === q.correct) {
            score += 4;
            correct++;
            sectionScore[q.subject] += 4;
        } else {
            score -= 1;
            wrong++;
            sectionScore[q.subject] -= 1;
        }
    });

    return { score, correct, wrong, skipped, sectionScore };
}
