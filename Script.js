let secretNumber;
let attempts;
let isGameActive;

const guessInput = document.getElementById('guessInput');
const submitGuessButton = document.getElementById('submitGuess');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const messageArea = document.getElementById('messageArea');
const attemptsDisplay = document.getElementById('attemptsValue');
const scoreDisplay = document.getElementById('scoreValue');

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
submitGuessButton.addEventListener('click', handleGuess);

guessInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && isGameActive) {
        handleGuess();
    }
});

function startGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    isGameActive = true;
    
    guessInput.value = '';
    guessInput.disabled = false;
    submitGuessButton.disabled = false;
    messageArea.textContent = 'Make your first guess!';
    messageArea.className = 'alert alert-info';
    attemptsDisplay.textContent = attempts;
    
    startButton.classList.add('d-none');
    restartButton.classList.add('d-none');
    
    guessInput.focus();
}

function handleGuess() {
    if (!isGameActive) return;

    const guess = parseInt(guessInput.value);
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
        messageArea.textContent = 'Please enter a valid number between 1 and 100';
        messageArea.className = 'alert alert-warning';
        guessInput.value = '';
        return;
    }

    attempts++;
    attemptsDisplay.textContent = attempts;
    
    if (guess < secretNumber) {
        messageArea.textContent = 'Too low!';
        messageArea.className = 'alert alert-danger';
    } else if (guess > secretNumber) {
        messageArea.textContent = 'Too high!';
        messageArea.className = 'alert alert-danger';
    } else {
        messageArea.textContent = `Congratulations! You've guessed the number in ${attempts} attempts.`;
        messageArea.className = 'alert alert-success';
        
        endGame();
    }
    
    guessInput.value = '';
    guessInput.focus();
}

function endGame() {
    isGameActive = false;
    guessInput.disabled = true;
    submitGuessButton.disabled = true;
    restartButton.classList.remove('d-none');
    
    updateScore();
}

function updateScore() {
    const baseScore = 100;
    const score = Math.max(baseScore - (attempts - 1) * 10, 10); 
    scoreDisplay.textContent = score;
}

startGame();