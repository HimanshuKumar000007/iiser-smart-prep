const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'frontend/mock_test/data/mock09.json');
const outputPath = path.join(__dirname, 'mock09_paper.md');

const data = require(jsonPath);

let md = `# ${data.testId.replace(/_/g, ' ')}\n`;
md += `**Duration:** ${data.duration} mins | **Total Marks:** ${data.totalMarks}\n\n`;
md += `## Table of Contents\n`;
md += `- [Student Version](#student-version)\n`;
md += `- [Teacher Version](#teacher-version)\n\n`;

md += `---\n\n`;

// STUDENT VERSION
md += `# Student Version\n\n`;
md += `**Instructions:**\n`;
md += `- Correct: +4\n- Incorrect: -1\n- Unanswered: 0\n\n`;

let currentSection = "";
data.questions.forEach((q, index) => {
    if (q.section !== currentSection) {
        currentSection = q.section;
        md += `### Section ${q.section}: ${q.subject}\n\n`;
    }
    md += `**Q${index + 1}.** ${q.question}\n\n`;
    md += `A) ${q.options[0]}\n`;
    md += `B) ${q.options[1]}\n`;
    md += `C) ${q.options[2]}\n`;
    md += `D) ${q.options[3]}\n\n`;
});

md += `---\n\n`;

// TEACHER VERSION
md += `# Teacher Version\n\n`;
data.questions.forEach((q, index) => {
    md += `**Q${index + 1}.** ${q.question} [${q.difficulty}]\n`;
    md += `*Topic: ${q.subject}*\n\n`;
    md += `A) ${q.options[0]}\n`;
    md += `B) ${q.options[1]}\n`;
    md += `C) ${q.options[2]}\n`;
    md += `D) ${q.options[3]}\n\n`;

    const correctMap = ['A', 'B', 'C', 'D'];
    md += `> **Correct Answer:** ${correctMap[q.correct]}\n\n`;
    md += `> **Explanation:**\n> ${q.explanation.replace(/<br>/g, '\n> ').replace(/<strong>/g, '**').replace(/<\/strong>/g, '**')}\n\n`;
    md += `---\n\n`;
});

fs.writeFileSync(outputPath, md);
console.log('Markdown paper generated.');
