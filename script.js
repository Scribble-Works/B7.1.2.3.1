// Repeated factors problems with visual representations
const problems = [
    {
        text: "There are 3 groups of bottle tops. Each group has 4 bottle tops.",
        type: "bottle-tops",
        groups: 3,
        itemsPerGroup: 4,
        options: ["3 + 4 = 7", "3 × 4 = 12", "4 × 3 = 12", "3 + 3 + 3 + 3 = 12"],
        correct: 1
    },
    {
        text: "Bundle sticks are arranged in 5 groups with 2 sticks in each group.",
        type: "bundle-sticks",
        groups: 5,
        itemsPerGroup: 2,
        options: ["5 + 2 = 7", "5 × 2 = 10", "2 × 5 = 10", "2 + 2 + 2 + 2 + 2 = 10"],
        correct: 1
    },
    {
        text: "4 groups of bottle tops with 3 bottle tops in each group.",
        type: "bottle-tops",
        groups: 4,
        itemsPerGroup: 3,
        options: ["4 + 3 = 7", "4 × 3 = 12", "3 × 4 = 12", "3 + 3 + 3 + 3 = 12"],
        correct: 1
    },
    {
        text: "2 groups of bundle sticks with 6 sticks in each group.",
        type: "bundle-sticks",
        groups: 2,
        itemsPerGroup: 6,
        options: ["2 + 6 = 8", "2 × 6 = 12", "6 × 2 = 12", "6 + 6 = 12"],
        correct: 1
    },
    {
        text: "6 groups of bottle tops with 2 bottle tops in each group.",
        type: "bottle-tops",
        groups: 6,
        itemsPerGroup: 2,
        options: ["6 + 2 = 8", "6 × 2 = 12", "2 × 6 = 12", "2 + 2 + 2 + 2 + 2 + 2 = 12"],
        correct: 1
    },
    {
        text: "3 groups of bundle sticks with 5 sticks in each group.",
        type: "bundle-sticks",
        groups: 3,
        itemsPerGroup: 5,
        options: ["3 + 5 = 8", "3 × 5 = 15", "5 × 3 = 15", "5 + 5 + 5 = 15"],
        correct: 1
    },
    {
        text: "7 groups of bottle tops with 1 bottle top in each group.",
        type: "bottle-tops",
        groups: 7,
        itemsPerGroup: 1,
        options: ["7 + 1 = 8", "7 × 1 = 7", "1 × 7 = 7", "1 + 1 + 1 + 1 + 1 + 1 + 1 = 7"],
        correct: 1
    },
    {
        text: "4 groups of bundle sticks with 4 sticks in each group.",
        type: "bundle-sticks",
        groups: 4,
        itemsPerGroup: 4,
        options: ["4 + 4 = 8", "4 × 4 = 16", "4 + 4 + 4 + 4 = 16", "4 × 4 = 16"],
        correct: 1
    },
    {
        text: "2 groups of bottle tops with 8 bottle tops in each group.",
        type: "bottle-tops",
        groups: 2,
        itemsPerGroup: 8,
        options: ["2 + 8 = 10", "2 × 8 = 16", "8 × 2 = 16", "8 + 8 = 16"],
        correct: 1
    },
    {
        text: "5 groups of bundle sticks with 3 sticks in each group.",
        type: "bundle-sticks",
        groups: 5,
        itemsPerGroup: 3,
        options: ["5 + 3 = 8", "5 × 3 = 15", "3 × 5 = 15", "3 + 3 + 3 + 3 + 3 = 15"],
        correct: 1
    }
];

// DOM elements
const startScreen = document.getElementById('start-screen');
const activityScreen = document.getElementById('activity-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const problemText = document.getElementById('problem-text');
const problemCount = document.getElementById('problem-count');
const visualContainer = document.getElementById('visual-container');
const optionsContainer = document.getElementById('options-container');
const scoreElement = document.getElementById('score');
const feedbackMessage = document.getElementById('feedback-message');
const correctSound = document.getElementById('correctSound');
const incorrectSound = document.getElementById('incorrectSound');

// Game state
let currentProblemIndex = 0;
let score = 0;
let selectedAnswer = null;

// Initialize game
function initGame() {
    currentProblemIndex = 0;
    score = 0;
    showStartScreen();
}

// Show start screen
function showStartScreen() {
    startScreen.classList.remove('hidden');
    activityScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    resetButtons();
}

// Start the activity
function startActivity() {
    startScreen.classList.add('hidden');
    activityScreen.classList.remove('hidden');
    loadProblem();
}

// Load current problem
function loadProblem() {
    resetButtons();
    const current = problems[currentProblemIndex];
    problemText.textContent = current.text;
    problemCount.textContent = currentProblemIndex + 1;
    
    // Display visual representation
    displayVisual(current.type, current.groups, current.itemsPerGroup);
    
    // Display options
    displayOptions(current.options);
}

// Display visual representation
function displayVisual(type, groups, itemsPerGroup) {
    visualContainer.innerHTML = '';
    
    for (let i = 0; i < groups; i++) {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'group';
        
        for (let j = 0; j < itemsPerGroup; j++) {
            const item = document.createElement('div');
            if (type === 'bottle-tops') {
                item.className = 'bottle-top';
                item.textContent = '●';
            } else {
                item.className = 'bundle-stick';
            }
            groupDiv.appendChild(item);
        }
        
        visualContainer.appendChild(groupDiv);
    }
}

// Display options
function displayOptions(options) {
    optionsContainer.innerHTML = '';
    options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.textContent = option;
        optionBtn.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(optionBtn);
    });
}

// Reset option buttons
function resetButtons() {
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.classList.remove('selected');
        btn.disabled = false;
    });
    selectedAnswer = null;
}

// Play sound safely
function playSound(audioElement) {
    audioElement.currentTime = 0;
    audioElement.play().catch(e => console.log("Audio play prevented:", e));
}

// Handle answer selection
function selectAnswer(choiceIndex) {
    if (selectedAnswer !== null) return;
    selectedAnswer = choiceIndex;
    
    // Highlight selected button
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    buttons[choiceIndex].classList.add('selected');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    // Check answer
    const current = problems[currentProblemIndex];
    const isCorrect = choiceIndex === current.correct;
    
    if (isCorrect) {
        score++;
        playSound(correctSound);
    } else {
        playSound(incorrectSound);
    }
    
    // Move to next problem or end activity
    setTimeout(() => {
        currentProblemIndex++;
        if (currentProblemIndex < problems.length) {
            loadProblem();
        } else {
            endActivity();
        }
    }, 1800);
}

// End the activity
function endActivity() {
    activityScreen.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
    
    scoreElement.textContent = score;
    
    let feedback = '';
    let feedbackClass = '';
    
    if (score >= 9) {
        feedback = "Excellent! You understand repeated factors perfectly!";
        feedbackClass = 'excellent';
    } else if (score >= 7) {
        feedback = "Great job! You can identify repeated factor arrangements well!";
        feedbackClass = 'good';
    } else if (score >= 5) {
        feedback = "Good effort! Practice more repeated factor problems to improve.";
        feedbackClass = 'practice';
    } else {
        feedback = "Keep practicing! Understanding repeated factors is fundamental to multiplication.";
        feedbackClass = 'practice';
    }
    
    feedbackMessage.textContent = feedback;
    feedbackMessage.className = `feedback ${feedbackClass}`;
}

// Event listeners
startBtn.addEventListener('click', startActivity);
restartBtn.addEventListener('click', initGame);

// Initialize the game
initGame();