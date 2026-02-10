const wordDisplay = document.getElementById('wordDisplay');
const keyboard = document.getElementById('keyboard');
const mistakesSpan = document.getElementById('mistakes');

const words = ['SHAWARMA', 'KHINKALI', 'LOBIANI', 'KHAWAPURI', 'MWVADI'];
let selectedWord = '';
let guessedLetters = [];
let mistakes = 0;

function initGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    mistakes = 0;
    mistakesSpan.innerText = mistakes;
    renderWord();
    renderKeyboard();
}

function renderWord() {
    wordDisplay.innerHTML = selectedWord
        .split('')
        .map(letter => guessedLetters.includes(letter) ? letter : '_')
        .join(' ');

    if (!wordDisplay.innerHTML.includes('_')) {
        setTimeout(() => {
            alert('Winner!');
            initGame();
        }, 200);
    }
}

function renderKeyboard() {
    keyboard.innerHTML = '';
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
        const btn = document.createElement('button');
        btn.innerText = letter;
        btn.onclick = () => handleGuess(letter, btn);
        keyboard.appendChild(btn);
    });
}

function handleGuess(letter, btn) {
    btn.disabled = true;
    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        renderWord();
    } else {
        mistakes++;
        mistakesSpan.innerText = mistakes;
        if (mistakes === 6) {
            setTimeout(() => {
                alert('Game Over! Word was: ' + selectedWord);
                initGame();
            }, 200);
        }
    }
}

function resetGame() {
    initGame();
}

initGame();