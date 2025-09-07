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

// Function to decode HTML entities
function decodeHtmlEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

// Function to fetch questions from Open Trivia DB API
async function fetchQuestionsFromAPI() {
    try {
        showLoadingMessage();
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple');

        if (!response.ok) {
            throw new Error('Failed to fetch questions from API');
        }

        const data = await response.json();

        if (data.response_code !== 0) {
            throw new Error('API returned error code: ' + data.response_code);
        }

        // Transform API data to our format
        questions = data.results.map((apiQuestion, index) => {
            const allAnswers = [...apiQuestion.incorrect_answers, apiQuestion.correct_answer];
            // Shuffle answers so correct answer isn't always last
            const shuffledAnswers = shuffleArray(allAnswers);
            const correctIndex = shuffledAnswers.indexOf(apiQuestion.correct_answer);

            return {
                id: index,
                text: decodeHtmlEntities(apiQuestion.question),
                answers: shuffledAnswers.map(answer => decodeHtmlEntities(answer)),
                correct: correctIndex,
                selection: null
            };
        });

        hideLoadingMessage();
        return true;
    } catch (error) {
        console.error('Error fetching questions:', error);
        hideLoadingMessage();

        // Show error message to user
        const loadingMsg = document.getElementById('loading-message');
        loadingMsg.textContent = 'Failed to load questions. Please try again.';
        loadingMsg.classList.remove('hidden');

        return false;
    }
}

// Function to shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function showLoadingMessage() {
    document.getElementById('startBtn').disabled = true;
    document.getElementById('loading-message').classList.remove('hidden');
}

function hideLoadingMessage() {
    document.getElementById('startBtn').disabled = false;
    document.getElementById('loading-message').classList.add('hidden');
}

// Initialize when page loads
window.addEventListener('load', async () => {
    animateBackButton();
    animateIntroContent();
    detectColorScheme();
    // Pre-load questions when page loads
    await fetchQuestionsFromAPI();
});

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
        document.documentElement.classList.add('dark');
        document.getElementById('themeIcon').className = 'fas fa-sun text-text-primary dark:text-white text-xl';
    } else {
        document.documentElement.classList.remove('dark');
        document.getElementById('themeIcon').className = 'fas fa-moon text-text-primary dark:text-white text-xl';
    }
}

// Toggle theme manually
document.getElementById('themeToggle').addEventListener('click', function () {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
        document.documentElement.classList.remove('dark');
        document.getElementById('themeIcon').className = 'fas fa-moon text-text-primary dark:text-white text-xl';
    } else {
        document.documentElement.classList.add('dark');
        document.getElementById('themeIcon').className = 'fas fa-sun text-text-primary dark:text-white text-xl';
    }
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (e.matches) {
        document.documentElement.classList.add('dark');
        document.getElementById('themeIcon').className = 'fas fa-sun text-text-primary dark:text-white text-xl';
    } else {
        document.documentElement.classList.remove('dark');
        document.getElementById('themeIcon').className = 'fas fa-moon text-text-primary dark:text-white text-xl';
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
        const success = await fetchQuestionsFromAPI();
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

    gameArea.innerHTML = `
        <div class="question">
            <div class="question-inner">
                <h2 class="question-text text-text-primary dark:text-white my-5">${question.text}</h2>
                <ul class="question-answers p-0 list-none">
                    ${question.answers.map((answer, index) => `
                        <li class="mt-2.5 ${index === question.correct && gameState.finished ? 'is-true' : ''}" ${question.selection === index ? 'data-selected="true"' : ''}>
                            <input type="radio" name="q_${question.id}" value="q${question.id}-${index}" id="q${question.id}-${index}" onchange="selectAnswer(${index})" ${question.selection === index ? 'checked' : ''} class="hidden">
                            <label class="question-answer flex py-3 px-6 pr-4 text-sm rounded overflow-hidden items-center border-2 border-accent/30 text-text-primary dark:text-white cursor-pointer relative bg-white/90 dark:bg-zinc-800/90 transition-all duration-300 hover:bg-accent/10" for="q${question.id}-${index}">${answer}</label>
                        </li>
                    `).join('')}
                </ul>
            </div>
            ${!gameState.finished ? `<button class="question-button bg-accent border-0 py-3.5 px-6.5 text-text-primary dark:text-white rounded mt-5 text-base cursor-pointer font-medium hover:bg-accent/80 transition-colors" onclick="nextQuestion()">${gameState.currentQuestion !== questions.length - 1 ? 'Next Question' : 'Finish Quiz'}</button>` : ''}
        </div>
    `;

    // Enhanced GSAP animations for questions
    gsap.fromTo(gameArea.querySelector(".question-text"),
        { x: 40, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
    );

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
        indicatorItem.className = 'indicator-item w-3 h-1 rounded-md bg-text-secondary dark:bg-gray-400 relative';
        if (i < gameState.currentQuestion) {
            indicatorItem.classList.add('completed');
        }
        if (i > 0) {
            indicatorItem.classList.add('ml-2');
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
    document.getElementById('game-area').innerHTML = '<div class="correction w-full"></div>';

    const correction = document.querySelector('.correction');
    questions.forEach((question, index) => {
        const questionEl = document.createElement('div');
        questionEl.className = 'question flex h-full flex-col w-full mt-7.5 first:mt-0';
        questionEl.innerHTML = `
            <div class="question-inner my-auto">
                <h2 class="question-text text-text-primary dark:text-white my-5 opacity-100">${question.text}</h2>
                <ul class="question-answers p-0 list-none">
                    ${question.answers.map((answer, i) => `
                        <li class="mt-2.5 ${i === question.correct ? 'is-true' : ''}" ${question.selection === i ? 'data-selected="true"' : ''}>
                            <input type="radio" name="q_${question.id}_r" value="q${question.id}-${i}" id="q${question.id}-${i}_r" ${question.selection === i ? 'checked' : ''} class="hidden pointer-events-none">
                            <label class="question-answer flex py-3 px-6 pr-4 text-sm rounded overflow-hidden items-center border-2 text-text-primary dark:text-white cursor-pointer relative transition-all duration-300" for="q${question.id}-${i}_r">${answer}</label>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
        correction.appendChild(questionEl);
    });

    // Animate results
    gsap.fromTo(".result-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" }
    );
}

async function restartQuiz() {
    gameState = {
        started: false,
        finished: false,
        currentQuestion: 0,
        correct: 0,
        wrong: 0,
        empty: 0,
        selectedAnswer: null
    };
    questions = []; // Clear questions to force reload

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

    // Pre-load new questions
    await fetchQuestionsFromAPI();
}