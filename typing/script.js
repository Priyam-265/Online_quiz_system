// // ------------------------- CONFIG -------------------------
// const commonWords = [
//   "the", "of", "and", "a", "to", "in", "is", "you", "that", "it", "he", "was",
//   "for", "on", "are", "as", "with", "his", "they", "i", "at", "be", "this", "have",
//   "from", "or", "one", "had", "by", "word", "but", "not", "what", "all", "were",
//   "we", "when", "your", "can", "said", "there", "each", "which", "she", "do",
//   "how", "their", "if", "will", "up", "other", "about", "out", "many", "then",
//   "them", "these", "so", "some", "her", "would", "make", "like", "into", "him",
//   "has", "two", "more", "go", "no", "way", "could", "my", "than", "first", "water",
//   "been", "call", "who", "its", "now", "find", "long", "down", "day", "did", "get",
//   "come", "made", "may", "part", "over", "new", "sound", "take", "only", "little",
//   "work", "know", "place", "year", "live", "me", "back", "give", "most", "very",
//   "after", "thing", "our", "just", "name", "good", "sentence", "man", "think",
//   "say", "great", "where", "help", "through", "much", "before", "line", "right",
//   "too", "mean", "old", "any", "same", "tell", "boy", "follow", "came", "want",
//   "show", "also", "around", "form", "three", "small", "set", "put", "end", "why",
//   "again", "turn", "here", "off", "went", "own", "under", "stop", "start", "city",
//   "earth", "eye", "light", "thought", "head", "story", "saw", "left", "don't",
//   "few", "while", "along", "might", "close", "something", "seem", "next", "hard",
//   "open", "example", "begin", "life", "always", "those", "both", "paper",
//   "together", "got", "group", "often", "run", "important", "until", "children",
//   "side", "feet", "car", "mile", "night", "walk", "white", "sea", "began", "grow",
//   "took", "river", "four", "carry", "state", "once", "book", "hear", "stop",
//   "without", "second", "later", "miss", "idea", "enough", "eat", "face", "watch",
//   "far", "indian", "really", "almost", "let", "above", "girl", "sometimes",
//   "mountain", "cut", "young", "talk", "soon", "list", "song", "being", "leave",
//   "family", "it's"
// ];

// let currentWords = [];
// let currentWordIndex = 0;
// let currentLetterIndex = 0;
// let correctChars = 0;
// let incorrectChars = 0;
// let isTestActive = false;
// let startTime = null;
// let timer = null;
// let testMode = 'time';
// let testValue = 15;
// let includePunctuation = false;
// let includeNumbers = false;
// let currentLevel = 'easy';
// let letterStates = [];
// let isPaused = false;
// let pauseStartTime = null;
// let totalPauseTime = 0;
// let scrollOffset = 0;

// // ------------------------- ELEMENTS -------------------------
// const testWordsEl = document.getElementById('test-words');
// const textContentEl = document.getElementById('text-content');
// const inputField = document.getElementById('input-field');
// const caret = document.getElementById('caret');
// const wpmEl = document.getElementById('wpm');
// const accuracyEl = document.getElementById('accuracy');
// const timeEl = document.getElementById('time');
// const resultsEl = document.getElementById('results');
// const endRestartBtn = document.getElementById('end-restart-btn');
// const pauseBtn = document.getElementById('pause-btn');
// const statsEl = document.getElementById('stats');
// const timerEl = document.getElementById('timer');

// // ------------------------- FUNCTIONS -------------------------
// function generateWords(count = 100) {
//   const words = [];
//   for (let i = 0; i < count; i++) {
//     let word = commonWords[Math.floor(Math.random() * commonWords.length)];
//     if (includePunctuation && Math.random() < 0.1) {
//       const punctuation = ['.', ',', '!', '?', ';', ':'];
//       word += punctuation[Math.floor(Math.random() * punctuation.length)];
//     }
//     if (includeNumbers && Math.random() < 0.05) {
//       word = Math.floor(Math.random() * 100).toString();
//     }
//     words.push(word);
//   }
//   return words;
// }

// function renderWords() {
//   textContentEl.innerHTML = '';
//   currentWords.forEach((word, wordIndex) => {
//     const wordEl = document.createElement('div');
//     wordEl.className = 'word inline-block mr-3';
//     wordEl.setAttribute('data-word', wordIndex);

//     word.split('').forEach((letter, letterIndex) => {
//       const letterEl = document.createElement('span');
//       letterEl.className = 'letter';
//       letterEl.textContent = letter;
//       letterEl.setAttribute('data-letter', letterIndex);

//       if (wordIndex < currentWordIndex || (wordIndex === currentWordIndex && letterIndex < currentLetterIndex)) {
//         letterEl.classList.add('typed');
//         if (letterStates[wordIndex] && letterStates[wordIndex][letterIndex]) {
//           letterEl.classList.add(letterStates[wordIndex][letterIndex] === 'correct' ? 'text-green-400' : 'text-errorRed');
//         }
//       }
//       wordEl.appendChild(letterEl);
//     });

//     textContentEl.appendChild(wordEl);
//   });

//   textContentEl.appendChild(caret);
//   textContentEl.style.transform = `translateY(-${scrollOffset}px)`;
//   updateCaret();
// }

// function updateCaret() {
//   const currentWord = document.querySelector(`[data-word="${currentWordIndex}"]`);
//   if (!currentWord) return;

//   const currentLetter = currentWord.querySelector(`[data-letter="${currentLetterIndex}"]`);
//   if (currentLetter) {
//     const rect = currentLetter.getBoundingClientRect();
//     const textRect = textContentEl.getBoundingClientRect();
//     caret.style.left = `${rect.left - textRect.left}px`;
//     caret.style.top = `${rect.top - textRect.top}px`;
//     caret.style.height = `${rect.height}px`;
//   }

//   // Scroll
//   const caretRect = caret.getBoundingClientRect();
//   const containerRect = testWordsEl.getBoundingClientRect();
//   if (caretRect.bottom > containerRect.bottom - 10) {
//     scrollOffset += 20;
//     textContentEl.style.transform = `translateY(-${scrollOffset}px)`;
//   } else if (caretRect.top < containerRect.top + 10) {
//     scrollOffset = Math.max(0, scrollOffset - 20);
//     textContentEl.style.transform = `translateY(-${scrollOffset}px)`;
//   }
// }

// function togglePause() {
//   if (!isTestActive) return;
//   isPaused = !isPaused;
//   inputField.disabled = isPaused;
//   pauseBtn.textContent = isPaused ? 'resume' : 'pause';
//   testWordsEl.classList.toggle('opacity-50', isPaused);

//   if (isPaused) {
//     clearInterval(timer);
//     pauseStartTime = Date.now();
//   } else {
//     totalPauseTime += Date.now() - pauseStartTime;
//     startTimer();
//   }
// }

// function startTimer() {
//   timer = setInterval(updateStats, 100);
// }

// function updateStats() {
//   if (!startTime) return;

//   const timeElapsed = (Date.now() - startTime - totalPauseTime) / 1000;
//   const wordsTyped = correctChars / 5;
//   const wpm = Math.round((wordsTyped / timeElapsed) * 60);
//   const accuracy = Math.round((correctChars / (correctChars + incorrectChars)) * 100) || 100;

//   let remaining = testValue;
//   if (testMode === 'time') {
//     remaining = Math.max(0, testValue - timeElapsed);
//     timeEl.textContent = Math.ceil(remaining);
//     const minutes = Math.floor(remaining / 60);
//     const seconds = Math.floor(remaining % 60);
//     timerEl.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
//     if (remaining <= 0) finishTest();
//   }

//   wpmEl.textContent = wpm;
//   accuracyEl.textContent = accuracy + '%';
// }

// function finishTest() {
//   isTestActive = false;
//   clearInterval(timer);
//   inputField.disabled = true;

//   const timeElapsed = (Date.now() - startTime - totalPauseTime) / 1000;
//   const wordsTyped = correctChars / 5;
//   const wpm = Math.round((wordsTyped / timeElapsed) * 60);
//   const accuracy = Math.round((correctChars / (correctChars + incorrectChars)) * 100) || 100;

//   statsEl.classList.add('flex');
//   document.getElementById('final-wpm').textContent = wpm;
//   document.getElementById('final-accuracy').textContent = accuracy + '%';
//   document.getElementById('final-characters').textContent = correctChars + '/' + (correctChars + incorrectChars);
//   document.getElementById('final-time').textContent = Math.round(timeElapsed) + 's';
//   resultsEl.classList.remove('hidden');
//   endRestartBtn.classList.remove('hidden');
//   pauseBtn.disabled = true;
// }

// // ------------------------- INPUT HANDLING -------------------------
// function handleKeyPress(char) {
//   if (isPaused) return;
//   if (!isTestActive) {
//     isTestActive = true;
//     startTime = Date.now();
//     startTimer();
//     pauseBtn.disabled = false;
//   }

//   const currentWord = currentWords[currentWordIndex];
//   const currentChar = currentWord[currentLetterIndex];
//   const letterEl = document.querySelector(`[data-word="${currentWordIndex}"] [data-letter="${currentLetterIndex}"]`);

//   if (!letterStates[currentWordIndex]) letterStates[currentWordIndex] = [];

//   if (char === currentChar) {
//     if (letterEl) letterEl.classList.add('text-green-400', 'typed');
//     letterStates[currentWordIndex][currentLetterIndex] = 'correct';
//     correctChars++;
//   } else {
//     if (letterEl) letterEl.classList.add('text-errorRed', 'typed');
//     letterStates[currentWordIndex][currentLetterIndex] = 'incorrect';
//     incorrectChars++;
//     if (currentLevel === 'hard') { finishTest(); return; }
//   }

//   currentLetterIndex++;
//   if (currentLetterIndex >= currentWord.length) {
//     currentWordIndex++;
//     currentLetterIndex = 0;
//     if (currentWordIndex >= currentWords.length) finishTest();
//   }

//   updateCaret();
//   updateStats();
// }

// function handleBackspace() {
//   if (isPaused || (!isTestActive && currentWordIndex === 0)) return;

//   if (currentLetterIndex === 0 && currentWordIndex === 0) return;

//   if (currentLetterIndex === 0) {
//     currentWordIndex--;
//     currentLetterIndex = currentWords[currentWordIndex].length;
//   }

//   currentLetterIndex--;
//   const letterEl = document.querySelector(`[data-word="${currentWordIndex}"] [data-letter="${currentLetterIndex}"]`);
//   if (letterEl) letterEl.classList.remove('typed', 'text-green-400', 'text-errorRed');
//   if (letterStates[currentWordIndex] && letterStates[currentWordIndex][currentLetterIndex]) {
//     if (letterStates[currentWordIndex][currentLetterIndex] === 'correct') correctChars--;
//     else incorrectChars--;
//     letterStates[currentWordIndex][currentLetterIndex] = null;
//   }
//   updateCaret();
//   updateStats();
// }

// // ------------------------- EVENT LISTENERS -------------------------
// inputField.addEventListener('input', (e) => {
//   const lastChar = e.target.value.slice(-1);
//   if (lastChar) {
//     handleKeyPress(lastChar);
//     e.target.value = '';
//   }
// });

// inputField.addEventListener('keydown', (e) => {
//   if (isPaused) { e.preventDefault(); return; }
//   if (e.key === 'Backspace') { e.preventDefault(); handleBackspace(); }
// });

// document.addEventListener('keydown', (e) => {
//   if (e.ctrlKey && e.key === 'Backspace') { e.preventDefault(); restartTest(); }
//   if (e.key === 'Escape' && isTestActive) { e.preventDefault(); togglePause(); }
//   if (e.ctrlKey && e.key === 'r') { e.preventDefault(); restartTest(); }
// });

// document.querySelectorAll('.config-btn').forEach(btn => {
//   btn.addEventListener('click', () => {
//     const type = btn.getAttribute('data-type');
//     const mode = btn.getAttribute('data-mode');
//     const value = btn.getAttribute('data-value');

//     if (type === 'punctuation') { includePunctuation = !includePunctuation; btn.classList.toggle('active'); }
//     if (type === 'numbers') { includeNumbers = !includeNumbers; btn.classList.toggle('active'); }
//     if (mode) {
//       document.querySelectorAll(`[data-mode="${mode}"]`).forEach(b => b.classList.remove('active'));
//       btn.classList.add('active');
//       testMode = mode;
//       testValue = parseInt(value);
//     }
//     restartTest();
//   });
// });

// document.querySelectorAll('.level-btn').forEach(btn => {
//   btn.addEventListener('click', () => {
//     document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
//     btn.classList.add('active');
//     currentLevel = btn.getAttribute('data-level');
//     restartTest();
//   });
// });

// // ------------------------- TEST CONTROL -------------------------
// function restartTest() {
//   currentWords = generateWords(100);
//   currentWordIndex = 0;
//   currentLetterIndex = 0;
//   correctChars = 0;
//   incorrectChars = 0;
//   isTestActive = false;
//   startTime = null;
//   clearInterval(timer);
//   letterStates = [];
//   scrollOffset = 0;
//   isPaused = false;
//   pauseStartTime = null;
//   totalPauseTime = 0;
//   pauseBtn.textContent = 'pause';
//   pauseBtn.disabled = true;

//   inputField.disabled = false;
//   inputField.value = '';
//   inputField.focus();

//   wpmEl.textContent = '0';
//   accuracyEl.textContent = '100%';
//   timeEl.textContent = testMode === 'time' ? testValue : '0';
//   timerEl.textContent = '00:00';

//   resultsEl.classList.add('hidden');
//   endRestartBtn.classList.add('hidden');
//   statsEl.classList.remove('flex');
//   testWordsEl.classList.remove('opacity-50');
//   textContentEl.style.transform = 'translateY(0px)';

//   renderWords();
// }

// // ------------------------- INIT -------------------------
// restartTest();
// document.addEventListener('click', () => inputField.focus());
// ------------------------- CONFIG -------------------------
const commonWords = [
  "the","of","and","a","to","in","is","you","that","it","he","was",
  "for","on","are","as","with","his","they","i","at","be","this","have",
  "from","or","one","had","by","word","but","not","what","all","were",
  "we","when","your","can","said","there","each","which","she","do",
  "how","their","if","will","up","other","about","out","many","then",
  "them","these","so","some","her","would","make","like","into","him",
  "has","two","more","go","no","way","could","my","than","first","water",
  "been","call","who","its","now","find","long","down","day","did","get",
  "come","made","may","part","over","new","sound","take","only","little",
  "work","know","place","year","live","me","back","give","most","very",
  "after","thing","our","just","name","good","sentence","man","think",
  "say","great","where","help","through","much","before","line","right",
  "too","mean","old","any","same","tell","boy","follow","came","want",
  "show","also","around","form","three","small","set","put","end","why",
  "again","turn","here","off","went","own","under","stop","start","city",
  "earth","eye","light","thought","head","story","saw","left","don't",
  "few","while","along","might","close","something","seem","next","hard",
  "open","example","begin","life","always","those","both","paper",
  "together","got","group","often","run","important","until","children",
  "side","feet","car","mile","night","walk","white","sea","began","grow",
  "took","river","four","carry","state","once","book","hear","stop",
  "without","second","later","miss","idea","enough","eat","face","watch",
  "far","indian","really","almost","let","above","girl","sometimes",
  "mountain","cut","young","talk","soon","list","song","being","leave",
  "family","it's"
];

let currentWords = [];
let currentWordIndex = 0;
let currentLetterIndex = 0;
let correctChars = 0;
let incorrectChars = 0;
let isTestActive = false;
let startTime = null;
let timer = null;
let testMode = 'time';
let testValue = 15;
let includePunctuation = false;
let includeNumbers = false;
let currentLevel = 'easy';
let letterStates = [];
let isPaused = false;
let pauseStartTime = null;
let totalPauseTime = 0;
let scrollOffset = 0;

// ------------------------- ELEMENTS -------------------------
const testWordsEl = document.getElementById('test-words');
const textContentEl = document.getElementById('text-content');
const inputField = document.getElementById('input-field');
const caret = document.getElementById('caret');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');
const timeEl = document.getElementById('time');
const resultsEl = document.getElementById('results');
const endRestartBtn = document.getElementById('end-restart-btn');
const pauseBtn = document.getElementById('pause-btn');
const statsEl = document.getElementById('stats');
const timerEl = document.getElementById('timer');

// ------------------------- FUNCTIONS -------------------------
function generateWords(count = 100) {
  const words = [];
  for (let i = 0; i < count; i++) {
    let word = commonWords[Math.floor(Math.random() * commonWords.length)];
    if (includePunctuation && Math.random() < 0.1) {
      const punctuation = ['.', ',', '!', '?', ';', ':'];
      word += punctuation[Math.floor(Math.random() * punctuation.length)];
    }
    if (includeNumbers && Math.random() < 0.05) {
      word = Math.floor(Math.random() * 100).toString();
    }
    words.push(word);
  }
  return words;
}

function renderWords() {
  textContentEl.innerHTML = '';
  currentWords.forEach((word, wordIndex) => {
    const wordEl = document.createElement('div');
    wordEl.className = 'word inline-block mr-3';
    wordEl.setAttribute('data-word', wordIndex);

    word.split('').forEach((letter, letterIndex) => {
      const letterEl = document.createElement('span');
      letterEl.className = 'letter';
      letterEl.textContent = letter;
      letterEl.setAttribute('data-letter', letterIndex);

      if (wordIndex < currentWordIndex || (wordIndex === currentWordIndex && letterIndex < currentLetterIndex)) {
        letterEl.classList.add('typed');
        if (letterStates[wordIndex] && letterStates[wordIndex][letterIndex]) {
          letterEl.classList.add(letterStates[wordIndex][letterIndex] === 'correct' ? 'text-green-400' : 'text-errorRed');
        }
      }
      wordEl.appendChild(letterEl);
    });

    textContentEl.appendChild(wordEl);
  });

  textContentEl.appendChild(caret);
  textContentEl.style.transform = `translateY(-${scrollOffset}px)`;
  updateCaret();
}

function updateCaret() {
  const currentWord = document.querySelector(`[data-word="${currentWordIndex}"]`);
  if (!currentWord) return;

  const currentLetter = currentWord.querySelector(`[data-letter="${currentLetterIndex}"]`);
  if (currentLetter) {
    const rect = currentLetter.getBoundingClientRect();
    const textRect = textContentEl.getBoundingClientRect();
    caret.style.left = `${rect.left - textRect.left}px`;
    caret.style.top = `${rect.top - textRect.top}px`;
    caret.style.height = `${rect.height}px`;
  }

  // Scroll
  const caretRect = caret.getBoundingClientRect();
  const containerRect = testWordsEl.getBoundingClientRect();
  if (caretRect.bottom > containerRect.bottom - 10) {
    scrollOffset += 20;
    textContentEl.style.transform = `translateY(-${scrollOffset}px)`;
  } else if (caretRect.top < containerRect.top + 10) {
    scrollOffset = Math.max(0, scrollOffset - 20);
    textContentEl.style.transform = `translateY(-${scrollOffset}px)`;
  }
}

function togglePause() {
  if (!isTestActive) return;
  isPaused = !isPaused;
  inputField.disabled = isPaused;
  pauseBtn.textContent = isPaused ? 'resume' : 'pause';
  testWordsEl.classList.toggle('opacity-50', isPaused);

  if (isPaused) {
    clearInterval(timer);
    pauseStartTime = Date.now();
  } else {
    totalPauseTime += Date.now() - pauseStartTime;
    startTimer();
  }
}

function startTimer() {
  timer = setInterval(updateStats, 100);
}

function updateStats() {
  if (!startTime) return;

  const timeElapsed = (Date.now() - startTime - totalPauseTime) / 1000;
  const wordsTyped = correctChars / 5;
  const wpm = Math.round((wordsTyped / timeElapsed) * 60);
  const accuracy = Math.round((correctChars / (correctChars + incorrectChars)) * 100) || 100;

  let remaining = testValue;
  if (testMode === 'time') {
    remaining = Math.max(0, testValue - timeElapsed);
    timeEl.textContent = Math.ceil(remaining);
    const minutes = Math.floor(remaining / 60);
    const seconds = Math.floor(remaining % 60);
    timerEl.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
    if (remaining <= 0) finishTest();
  }

  wpmEl.textContent = wpm;
  accuracyEl.textContent = accuracy + '%';
}

function finishTest() {
  isTestActive = false;
  clearInterval(timer);
  inputField.disabled = true;

  const timeElapsed = (Date.now() - startTime - totalPauseTime) / 1000;
  const wordsTyped = correctChars / 5;
  const wpm = Math.round((wordsTyped / timeElapsed) * 60);
  const accuracy = Math.round((correctChars / (correctChars + incorrectChars)) * 100) || 100;

  statsEl.classList.add('flex');
  document.getElementById('final-wpm').textContent = wpm;
  document.getElementById('final-accuracy').textContent = accuracy + '%';
  document.getElementById('final-characters').textContent = correctChars + '/' + (correctChars + incorrectChars);
  document.getElementById('final-time').textContent = Math.round(timeElapsed) + 's';
  resultsEl.classList.remove('hidden');
  endRestartBtn.classList.remove('hidden');
  pauseBtn.disabled = true;
}

// ------------------------- INPUT HANDLING -------------------------
function handleKeyPress(char) {
  if (isPaused) return;
  if (!isTestActive) {
    isTestActive = true;
    startTime = Date.now();
    startTimer();
    pauseBtn.disabled = false;
  }

  const currentWord = currentWords[currentWordIndex];
  const currentChar = currentWord[currentLetterIndex];
  const letterEl = document.querySelector(`[data-word="${currentWordIndex}"] [data-letter="${currentLetterIndex}"]`);

  if (!letterStates[currentWordIndex]) letterStates[currentWordIndex] = [];

  if (char === currentChar) {
    if (letterEl) letterEl.classList.add('text-green-400','typed');
    letterStates[currentWordIndex][currentLetterIndex] = 'correct';
    correctChars++;
  } else {
    if (letterEl) letterEl.classList.add('text-errorRed','typed');
    letterStates[currentWordIndex][currentLetterIndex] = 'incorrect';
    incorrectChars++;
    if (currentLevel === 'hard') { finishTest(); return; }
  }

  currentLetterIndex++;
  if (currentLetterIndex >= currentWord.length) {
    currentWordIndex++;
    currentLetterIndex = 0;
    if (currentWordIndex >= currentWords.length) finishTest();
  }

  updateCaret();
  updateStats();
}

function handleBackspace() {
  if (isPaused || (!isTestActive && currentWordIndex === 0)) return;

  if (currentLetterIndex === 0 && currentWordIndex === 0) return;

  if (currentLetterIndex === 0) {
    currentWordIndex--;
    currentLetterIndex = currentWords[currentWordIndex].length;
  }

  currentLetterIndex--;
  const letterEl = document.querySelector(`[data-word="${currentWordIndex}"] [data-letter="${currentLetterIndex}"]`);
  if (letterEl) letterEl.classList.remove('typed','text-green-400','text-errorRed');
  if (letterStates[currentWordIndex] && letterStates[currentWordIndex][currentLetterIndex]) {
    if (letterStates[currentWordIndex][currentLetterIndex] === 'correct') correctChars--;
    else incorrectChars--;
    letterStates[currentWordIndex][currentLetterIndex] = null;
  }
  updateCaret();
  updateStats();
}

// ------------------------- EVENT LISTENERS -------------------------
inputField.addEventListener('input', (e) => {
  const lastChar = e.target.value.slice(-1);
  if (lastChar) {
    handleKeyPress(lastChar);
    e.target.value = '';
  }
});

inputField.addEventListener('keydown', (e) => {
  if (isPaused) { e.preventDefault(); return; }
  if (e.key === 'Backspace') { e.preventDefault(); handleBackspace(); }
});

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Backspace') { e.preventDefault(); restartTest(); }
  if (e.key === 'Escape' && isTestActive) { e.preventDefault(); togglePause(); }
  if (e.ctrlKey && e.key === 'r') { e.preventDefault(); restartTest(); }
});

// LEVEL BUTTONS (only one active)
document.querySelectorAll('.level-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentLevel = btn.getAttribute('data-level');
    restartTest();
  });
});

// CONFIG BUTTONS
document.querySelectorAll('.config-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.getAttribute('data-type');
    const mode = btn.getAttribute('data-mode');
    const value = btn.getAttribute('data-value');

    if (type === 'punctuation') { includePunctuation = !includePunctuation; btn.classList.toggle('active'); }
    if (type === 'numbers') { includeNumbers = !includeNumbers; btn.classList.toggle('active'); }

    if (mode === 'time') {
      document.querySelectorAll(`[data-mode="time"]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      testMode = mode;
      testValue = parseInt(value);
    }

    restartTest();
  });
});

// ------------------------- TEST CONTROL -------------------------
function restartTest() {
  currentWords = generateWords(100);
  currentWordIndex = 0;
  currentLetterIndex = 0;
  correctChars = 0;
  incorrectChars = 0;
  isTestActive = false;
  startTime = null;
  clearInterval(timer);
  letterStates = [];
  scrollOffset = 0;
  isPaused = false;
  pauseStartTime = null;
  totalPauseTime = 0;
  pauseBtn.textContent = 'pause';
  pauseBtn.disabled = true;

  inputField.disabled = false;
  inputField.value = '';
  inputField.focus();

  wpmEl.textContent = '0';
  accuracyEl.textContent = '100%';
  timeEl.textContent = testMode === 'time' ? testValue : '0';
  timerEl.textContent = '00:00';

  resultsEl.classList.add('hidden');
  endRestartBtn.classList.add('hidden');
  statsEl.classList.remove('flex');
  testWordsEl.classList.remove('opacity-50');
  textContentEl.style.transform = 'translateY(0px)';

  renderWords();
}

// ------------------------- INIT -------------------------
restartTest();
document.addEventListener('click', () => inputField.focus());
