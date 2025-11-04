// --- Game Variables ---
let currentAnswer = 0;
let score = 0;
let level = 1;
let lives = 3; 
let questionsAnsweredInLevel = 0; 
const QUESTIONS_PER_LEVEL = 10; 
const MAX_LEVEL = 2; // Game ends after level 2
let gameActive = false;

// --- DOM Elements ---
const problemDisplay = document.getElementById('math-problem');
const answerInput = document.getElementById('user-answer');
const submitBtn = document.getElementById('submit-btn');
const startBtn = document.getElementById('start-btn');
const scoreSpan = document.getElementById('score');
const levelSpan = document.getElementById('level');
const feedbackDiv = document.getElementById('feedback');
const livesSpan = document.getElementById('lives-span'); 
const progressBarShell = document.getElementById('level-progress-bar'); // The container
const progressText = document.getElementById('progress-text'); // Progress text (0/10)


// --- Utility Functions ---

/**
 * Generates a random number in the range [min, max].
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Initializes the progress bar with 10 empty segments.
 */
function initializeProgressBar() {
    progressBarShell.innerHTML = ''; // Clear any previous segments
    for (let i = 0; i < QUESTIONS_PER_LEVEL; i++) {
        const segment = document.createElement('div');
        segment.classList.add('progress-segment');
        // Give each segment an ID based on its index (0 to 9)
        segment.id = `segment-${i}`; 
        progressBarShell.appendChild(segment);
    }
}

/**
 * Generates a problem strictly adhering to B71.2.2.2 (Multi-digit by 1- or 2-digit).
 */
function generateProblem() {
    // 1. Determine size of the first number (Multi-digit: 3 or 4 digits)
    const firstNumDigits = (level === 2) ? getRandomInt(3, 4) : 3; // Increase complexity in Level 2
    let num1Min = (firstNumDigits === 3) ? 100 : 1000;
    let num1Max = (firstNumDigits === 3) ? 999 : 9999;
    
    // 2. Determine size of the second number (1- or 2-digit)
    const secondNumDigits = (level === 2) ? getRandomInt(1, 2) : 1; 
    let num2Min = (secondNumDigits === 1) ? 2 : 10;
    let num2Max = (secondNumDigits === 1) ? 9 : 99;

    // 3. Select operator (50/50 split)
    const operator = ['×', '÷'][getRandomInt(0, 1)]; 

    let num1, num2, answer, problemString;

    if (operator === '×') {
        num1 = getRandomInt(num1Min, num1Max);
        num2 = getRandomInt(num2Min, num2Max);
        answer = num1 * num2;
    } else { // Division (ensure clean integer answer)
        let quotient = getRandomInt(5, 50); 
        num2 = getRandomInt(num2Min, num2Max);

        num1 = quotient * num2; 
        answer = quotient;

        // Re-check: Ensure num1 is still multi-digit 
        while (num1 < 100) { 
            quotient = getRandomInt(10, 100);
            num1 = quotient * num2;
            answer = quotient;
        }
    }

    problemString = `${num1} ${operator} ${num2} = ?`;
    currentAnswer = answer;
    problemDisplay.textContent = problemString;
    answerInput.value = ''; // Clear previous input
    feedbackDiv.textContent = '';
    answerInput.focus();
}

/**
 * Manages game flow (Level Up / Game Over) and handles coloring of the progress bar segments.
 * @param {boolean} isCorrect - Status of the last answer.
 */
function updateProgress(isCorrect) {
    // Determine which segment to color (0-based index of the segment just completed)
    const segmentIndex = questionsAnsweredInLevel - 1; 
    const currentSegment = document.getElementById(`segment-${segmentIndex}`);
    
    // 1. Apply Color Feedback to the segment
    if (currentSegment) {
        if (isCorrect) {
            currentSegment.classList.add('segment-correct');
        } else {
            currentSegment.classList.add('segment-incorrect');
        }
    }

    // 2. Update Progress Text
    progressText.textContent = `${questionsAnsweredInLevel} / ${QUESTIONS_PER_LEVEL}`;

    // 3. Check for Level Completion
    if (questionsAnsweredInLevel >= QUESTIONS_PER_LEVEL) {
        
        if (level < MAX_LEVEL) {
            // Level UP
            level++;
            levelSpan.textContent = level;
            questionsAnsweredInLevel = 0; // Reset progress
            feedbackDiv.textContent = `🎉 Level ${level - 1} Complete! Starting Level ${level}! 🎉`;
            
            // Wait, then reset bar structure and generate new problem
            setTimeout(() => {
                initializeProgressBar(); // Reset the bar structure for the new level
                generateProblem();
            }, 2000); 

        } else {
            // Final Level Complete - Game Over (Win)
            gameOver(true); 
        }
    } else {
        // If not level complete, just generate the next problem
        generateProblem();
    }
}

/**
 * Checks the user's answer against the correct answer.
 */
function checkAnswer() {
    if (!gameActive) return;

    const userAnswer = parseInt(answerInput.value, 10);

    if (isNaN(userAnswer)) {
        feedbackDiv.textContent = "Please enter a number.";
        return;
    }

    if (userAnswer === currentAnswer) {
        // ✅ Correct Answer (Gain point, advance progress)
        score++;
        questionsAnsweredInLevel++; 
        feedbackDiv.textContent = "✅ Correct! Progressing...";
        scoreSpan.textContent = score;
        
        // Pass 'true' (correct) to updateProgress
        setTimeout(() => updateProgress(true), 1000); 

    } else {
        // ❌ Incorrect Answer: DEDUCT POINT, DEDUCT LIFE, ADVANCE PROGRESS
        
        // 1. DEDUCT POINT
        if (score > 0) { 
            score--;
            scoreSpan.textContent = score;
        }
        
        // 2. ADVANCE PROGRESS (Uses up one of the 10 questions)
        questionsAnsweredInLevel++; 
        
        // 3. DEDUCT LIFE
        lives--;
        livesSpan.textContent = lives;

        if (lives <= 0) {
            // Color the final segment immediately before game over
            updateProgress(false); 
            gameOver(false); 
            return; 
        }

        feedbackDiv.textContent = `❌ Incorrect. The answer was ${currentAnswer}. You lost 1 point and 1 life. ${lives} ${lives === 1 ? 'life' : 'lives'} remaining.`;
        
        // Pass 'false' (incorrect) to updateProgress
        setTimeout(() => updateProgress(false), 2000); 
    }
}


/**
 * Ends the game and displays the final score.
 * @param {boolean} didWin - True if the game ended by completing all levels.
 */
function gameOver(didWin) {
    gameActive = false;
    
    if (didWin) {
        problemDisplay.textContent = `🏆 CONGRATULATIONS! You Mastered the Levels! Final Score: ${score}.`;
        feedbackDiv.textContent = "You successfully completed all levels!";
    } else {
        problemDisplay.textContent = `❌ GAME OVER! You reached Level ${level} with a score of ${score}.`;
        feedbackDiv.textContent = "Better luck next time! Click Start Game to try again.";
    }

    // Hide input/submit and show start button
    startBtn.style.display = 'inline-block';
    submitBtn.style.display = 'none';
    answerInput.style.display = 'none';
}

/**
 * Initializes the game state.
 */
function startGame() {
    score = 0;
    level = 1;
    lives = 3; 
    questionsAnsweredInLevel = 0; // Reset progress
    gameActive = true;
    
    scoreSpan.textContent = score;
    levelSpan.textContent = level;
    livesSpan.textContent = lives;
    
    // Show game elements
    startBtn.style.display = 'none';
    submitBtn.style.display = 'inline-block';
    answerInput.style.display = 'inline-block';
    
    feedbackDiv.textContent = 'Solve the problem and fill the progress bar!';
    
    // Initialize bar structure and generate the first problem
    initializeProgressBar();
    updateProgress(false); // Called initially just to generate the first problem and set text 0/10
}

// --- Event Listeners ---
startBtn.addEventListener('click', startGame);
submitBtn.addEventListener('click', checkAnswer);

// Allow pressing Enter key to submit
answerInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// Initial state setup 
submitBtn.style.display = 'none';
answerInput.style.display = 'none';