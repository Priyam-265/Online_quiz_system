// Curated coding questions
const codingQuestions = [
    {
        id: 1,
        text: "What will be the output of the following JavaScript code?",
        code: `for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}`,
        answers: [
            "0, 1, 2",
            "3, 3, 3",
            "0, 0, 0",
            "1, 2, 3"
        ],
        correct: 1
    },
    {
        id: 2,
        text: "Which of these is NOT a JavaScript data type?",
        code: "",
        answers: [
            "undefined",
            "boolean",
            "float",
            "symbol"
        ],
        correct: 2
    },
    {
        id: 3,
        text: "What does the following Python code output?",
        code: `x = [1, 2, 3]
y = x
y.append(4)
print(x)`,
        answers: [
            "[1, 2, 3]",
            "[1, 2, 3, 4]",
            "[4, 3, 2, 1]",
            "Error"
        ],
        correct: 1
    },
    {
        id: 4,
        text: "What is the time complexity of accessing an element in an array by index?",
        code: "",
        answers: [
            "O(1)",
            "O(n)",
            "O(log n)",
            "O(n²)"
        ],
        correct: 0
    },
    {
        id: 5,
        text: "Which CSS selector has the highest specificity?",
        code: "",
        answers: [
            "#header .menu li:hover",
            "body #header .menu",
            "#header.nav",
            "div#header.menu"
        ],
        correct: 3
    },
    {
        id: 6,
        text: "What will this Java code output?",
        code: `String s1 = "Hello";
String s2 = "Hello";
String s3 = new String("Hello");
System.out.println(s1 == s2);
System.out.println(s1 == s3);`,
        answers: [
            "true, true",
            "false, false",
            "true, false",
            "false, true"
        ],
        correct: 2
    },
    {
        id: 7,
        text: "What is the purpose of the 'use strict' directive in JavaScript?",
        code: "",
        answers: [
            "To enable faster execution of code",
            "To enforce stricter parsing and error handling",
            "To enable experimental features",
            "To disable all warnings"
        ],
        correct: 1
    },
    {
        id: 8,
        text: "Which algorithm uses a divide and conquer approach?",
        code: "",
        answers: [
            "Bubble Sort",
            "Merge Sort",
            "Insertion Sort",
            "Selection Sort"
        ],
        correct: 1
    },
    {
        id: 9,
        text: "What does the following SQL query do?",
        code: `SELECT COUNT(*), country 
FROM Users 
GROUP BY country 
HAVING COUNT(*) > 10;`,
        answers: [
            "Counts all users from countries with more than 10 users",
            "Counts users from the first 10 countries",
            "Selects 10 users from each country",
            "Counts users where country ID is greater than 10"
        ],
        correct: 0
    },
    {
        id: 10,
        text: "What is the output of this C++ code?",
        code: `#include <iostream>
using namespace std;

int main() {
    int x = 5;
    cout << x++ + ++x;
    return 0;
}`,
        answers: [
            "10",
            "11",
            "12",
            "Undefined behavior"
        ],
        correct: 3
    }
];

let questions = [];
let gameState = {
    started: false,
    finished: false,
    currentQuestion: 0,
    correct: 0,
    wrong: 0,
    empty: 0,
    selectedAnswer: null
};

// Initialize when page loads
window.addEventListener('load', async () => {
    animateBackButton();
    animateIntroContent();
    detectColorScheme();
    // Pre-load questions when page loads
    await loadQuestions();
});

// Load questions from our curated list
async function loadQuestions() {
    try {
        showLoadingMessage();

        // Transform our questions to match the expected format
        questions = codingQuestions.map((q, index) => {
            return {
                id: q.id,
                text: q.text,
                code: q.code,
                answers: [...q.answers],
                correct: q.correct,
                selection: null
            };
        });

        hideLoadingMessage();
        return true;
    } catch (error) {
        console.error('Error loading questions:', error);
        hideLoadingMessage();

        // Show error message to user
        const loadingMsg = document.getElementById('loading-message');
        loadingMsg.textContent = 'Failed to load questions. Please try again.';
        loadingMsg.classList.remove('hidden');

        return false;
    }
}

function showLoadingMessage() {
    document.getElementById('startBtn').disabled = true;
    document.getElementById('loading-message').classList.remove('hidden');
}

function hideLoadingMessage() {
    document.getElementById('startBtn').disabled = false;
    document.getElementById('loading-message').classList.add('hidden');
}

// GSAP animations for smooth transitions
function animateBackButton() {
    gsap.to(".back-button", {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.3
    });
}

function animateIntroContent() {
    gsap.fromTo(".intro-title",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.5 }
    );

    gsap.fromTo(".intro-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.7 }
    );

    gsap.fromTo(".intro-button",
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.9 }
    );
}

// Detect system preference and apply theme
function detectColorScheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('themeIcon').className = 'fas fa-sun';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.getElementById('themeIcon').className = 'fas fa-moon';
    }
}

// Toggle theme manually
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('themeToggle').addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            document.getElementById('themeIcon').className = 'fas fa-moon';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('themeIcon').className = 'fas fa-sun';
        }
    });
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (e.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('themeIcon').className = 'fas fa-sun';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.getElementById('themeIcon').className = 'fas fa-moon';
    }
});

function goBack() {
    // Smooth exit animation before navigation
    gsap.to(".game", {
        scale: 0.95,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            window.location.href = 'hoome.html';
        }
    });
}

async function startQuiz() {
    // If questions aren't loaded, fetch them first
    if (questions.length === 0) {
        const success = await loadQuestions();
        if (!success) {
            return; // Don't start quiz if questions failed to load
        }
    }

    gameState.started = true;
    document.getElementById('game').setAttribute('data-game-started', 'true');
    document.body.classList.add('game-started');

    // Smooth transition for intro content
    gsap.to("#intro-content", {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
            document.getElementById('intro-content').classList.add('hidden');
            document.getElementById('indicator').classList.remove('hidden');

            // Animate indicator appearance
            gsap.fromTo("#indicator",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );

            renderCurrentQuestion();
            updateIndicator();
        }
    });
}

function renderCurrentQuestion() {
    const gameArea = document.getElementById('game-area');
    const question = questions[gameState.currentQuestion];
    if (!question) {
        showResults();
        return;
    }

    // Determine language for syntax highlighting
    let langClass = '';
    if (question.code) {
        if (question.code.includes('console.log') || question.code.includes('var ') || question.code.includes('function')) {
            langClass = 'javascript';
        } else if (question.code.includes('print(') || question.code.includes('def ') || question.code.includes('import ')) {
            langClass = 'python';
        } else if (question.code.includes('cout') || question.code.includes('#include')) {
            langClass = 'cpp';
        } else if (question.code.includes('SELECT') || question.code.includes('FROM')) {
            langClass = 'sql';
        } else if (question.code.includes('System.out.println') || question.code.includes('public class')) {
            langClass = 'java';
        }
    }

    gameArea.innerHTML = `
        <div class="question">
            <div class="question-inner">
                <h2 class="question-text">${question.text}</h2>
                ${question.code ? `
                    <div class="code-block">
                        <pre><code class="${langClass}">${question.code}</code></pre>
                    </div>
                ` : ''}
                <ul class="question-answers">
                    ${question.answers.map((answer, index) => `
                        <li ${index === question.correct && gameState.finished ? 'class="is-true"' : ''} ${question.selection === index ? 'data-selected="true"' : ''}>
                            <input type="radio" name="q_${question.id}" value="q${question.id}-${index}" id="q${question.id}-${index}" onchange="selectAnswer(${index})" ${question.selection === index ? 'checked' : ''}>
                            <label class="question-answer" for="q${question.id}-${index}">${answer}</label>
                        </li>
                    `).join('')}
                </ul>
            </div>
            ${!gameState.finished ? `<button class="question-button" onclick="nextQuestion()">${gameState.currentQuestion !== questions.length - 1 ? 'Next Question' : 'Finish Quiz'}</button>` : ''}
        </div>
    `;

    // Apply syntax highlighting if there's code
    if (question.code) {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }

    // Enhanced GSAP animations for questions
    gsap.fromTo(gameArea.querySelector(".question-text"),
        { x: 40, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
    );

    if (question.code) {
        gsap.fromTo(gameArea.querySelector(".code-block"),
            { x: 40, opacity: 0, scale: 0.95 },
            { x: 0, opacity: 1, scale: 1, duration: 0.5, delay: 0.1, ease: "power2.out" }
        );
    }

    gsap.fromTo(gameArea.querySelectorAll("li"),
        { opacity: 0, x: 40, scale: 0.9 },
        { x: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }
    );
}

function selectAnswer(index) {
    gameState.selectedAnswer = index;
}

function nextQuestion() {
    const currentQ = questions[gameState.currentQuestion];
    currentQ.selection = gameState.selectedAnswer;

    if (currentQ.selection === null) {
        gameState.empty++;
    } else if (currentQ.selection === currentQ.correct) {
        gameState.correct++;
    } else {
        gameState.wrong++;
    }

    gameState.selectedAnswer = null;
    gameState.currentQuestion++;
    updateIndicator();
    renderCurrentQuestion();
}

function updateIndicator() {
    const indicator = document.getElementById('indicator');
    indicator.innerHTML = '';

    for (let i = 0; i < questions.length; i++) {
        const indicatorItem = document.createElement('div');
        indicatorItem.className = 'indicator-item';
        if (i < gameState.currentQuestion) {
            indicatorItem.classList.add('completed');
        }
        indicator.appendChild(indicatorItem);
    }
}

function showResults() {
    gameState.finished = true;
    document.getElementById('game').setAttribute('data-game-finished', 'true');
    document.getElementById('correct-count').textContent = gameState.correct;
    document.getElementById('wrong-count').textContent = gameState.wrong;
    document.getElementById('empty-count').textContent = gameState.empty;
    document.getElementById('game-area').innerHTML = '<div class="correction"></div>';

    const correction = document.querySelector('.correction');
    questions.forEach((question, index) => {
        // Determine language for syntax highlighting
        let langClass = '';
        if (question.code) {
            if (question.code.includes('console.log') || question.code.includes('var ') || question.code.includes('function')) {
                langClass = 'javascript';
            } else if (question.code.includes('print(') || question.code.includes('def ') || question.code.includes('import ')) {
                langClass = 'python';
            } else if (question.code.includes('cout') || question.code.includes('#include')) {
                langClass = 'cpp';
            } else if (question.code.includes('SELECT') || question.code.includes('FROM')) {
                langClass = 'sql';
            } else if (question.code.includes('System.out.println') || question.code.includes('public class')) {
                langClass = 'java';
            }
        }

        const questionEl = document.createElement('div');
        questionEl.className = 'question';
        questionEl.innerHTML = `
            <div class="question-inner">
                <h2 class="question-text">${question.text}</h2>
                ${question.code ? `
                    <div class="code-block">
                        <pre><code class="${langClass}">${question.code}</code></pre>
                    </div>
                ` : ''}
                <ul class="question-answers">
                    ${question.answers.map((answer, i) => `
                        <li ${i === question.correct ? 'class="is-true"' : ''} ${question.selection === i ? 'data-selected="true"' : ''}>
                            <input type="radio" name="q_${question.id}_r" value="q${question.id}-${i}" id="q${question.id}-${i}_r" ${question.selection === i ? 'checked' : ''}>
                            <label class="question-answer" for="q${question.id}-${i}_r">${answer}</label>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
        correction.appendChild(questionEl);
    });

    // Apply syntax highlighting to code in correction view
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
    });

    // Animate results
    gsap.fromTo(".result-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" }
    );
}

async function restartQuiz() {
    gameState = { started: false, finished: false, currentQuestion: 0, correct: 0, wrong: 0, empty: 0, selectedAnswer: null };

    document.getElementById('game').removeAttribute('data-game-started');
    document.getElementById('game').removeAttribute('data-game-finished');
    document.body.classList.remove('game-started');
    document.getElementById('intro-content').classList.remove('hidden');
    document.getElementById('indicator').classList.add('hidden');
    document.getElementById('game-area').innerHTML = '';

    // Animate restart
    gsap.to("#intro-content", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
    });

    // Reload questions
    await loadQuestions();
}