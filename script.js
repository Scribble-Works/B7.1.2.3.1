// Initialize audio
const correctSound = new Audio('assets/brass-fanfare-reverberated-146263.mp3');
const wrongSound = new Audio('assets/cartoon-fail-trumpet-278822.mp3');

// 10 Questions
const questions = [
    {
        model: '<div class="group"><span class="item">🟢</span><span class="item">🟢</span></div><div class="group"><span class="item">🟢</span><span class="item">🟢</span></div><div class="group"><span class="item">🟢</span><span class="item">🟢</span></div><div class="group"><span class="item">🟢</span><span class="item">🟢</span></div>',
        caption: "8 bottle tops in 4 pairs",
        options: ["A) 2³", "B) 3²"],
        correct: "A",
        correctAnswer: "2³",
        explanation: "We have 8 tops. This is made by multiplying 2 × 2 × 2. The factor 2 is used 3 times, so it's 2³."
    },
    {
        model: '<div class="bundle">🟫🟫🟫</div><div class="bundle">🟫🟫🟫</div><div class="bundle">🟫🟫🟫</div>',
        caption: "9 sticks in 3 bundles of 3",
        options: ["A) 2⁴", "B) 3²"],
        correct: "B",
        correctAnswer: "3²",
        explanation: "3 bundles of 3 sticks = 3 × 3 = 9. When a number is multiplied by itself, we write it as a square: 3²."
    },
    {
        model: '<div class="grid5x5"><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span></div>',
        caption: "25 bottle tops in a 5×5 array",
        options: ["A) 5²", "B) 2⁵"],
        correct: "A",
        correctAnswer: "5²",
        explanation: "5 rows of 5 tops = 5 × 5 = 25. This is 5 squared, written as 5²."
    },
    {
        model: '<div class="small-group">🟢🟢</div><div class="small-group">🟢🟢</div><div class="small-group">🟢🟢</div><div class="small-group">🟢🟢</div><div class="small-group">🟢🟢</div><div class="small-group">🟢🟢</div><div class="small-group">🟢🟢</div><div class="small-group">🟢🟢</div>',
        caption: "16 bottle tops in 8 pairs",
        options: ["A) 4²", "B) 2⁴"],
        correct: "B",
        correctAnswer: "2⁴",
        explanation: "Each pair is 2. We double 2 four times: 2 → 4 → 8 → 16. So 2 × 2 × 2 × 2 = 2⁴."
    },
    {
        model: '<div class="group"><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span></div><div class="group"><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span></div>',
        caption: "6 bottle tops in 2 groups of 3",
        options: ["A) 3 × 2", "B) 2 × 3"],
        correct: "A",
        correctAnswer: "3 × 2",
        explanation: "There are 2 groups of 3 tops. This is 3 + 3 = 3 × 2. The repeated factor here is 3, used 2 times."
    },
    {
        model: '<div class="bundle">🟫🟫</div><div class="bundle">🟫🟫</div><div class="bundle">🟫🟫</div><div class="bundle">🟫🟫</div>',
        caption: "8 sticks in 4 bundles of 2",
        options: ["A) 2³", "B) 4²"],
        correct: "A",
        correctAnswer: "2³",
        explanation: "4 bundles of 2 = 2 × 4, and 4 = 2 × 2, so total = 2 × 2 × 2 = 2³."
    },
    {
        model: '<div class="group"><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span><span class="item">🟢</span></div>',
        caption: "4 bottle tops in 1 group",
        options: ["A) 4", "B) 2²"],
        correct: "B",
        correctAnswer: "2²",
        explanation: "4 can be expressed as 2 × 2. That’s 2 repeated twice → 2²."
    },
    {
        model: '<div class="bundle">🟫🟫🟫🟫</div><div class="bundle">🟫🟫🟫🟫</div><div class="bundle">🟫🟫🟫🟫</div>',
        caption: "12 sticks in 3 bundles of 4",
        options: ["A) 3 × 4", "B) 2² × 3"],
        correct: "B",
        correctAnswer: "2² × 3",
        explanation: "Each bundle has 4 sticks, and 4 = 2 × 2 = 2². So total = 2² × 3."
    },
    {
        model: '<div class="small-group">🟢🟢🟢</div><div class="small-group">🟢🟢🟢</div><div class="small-group">🟢🟢🟢</div>',
        caption: "9 bottle tops in 3 groups of 3",
        options: ["A) 3²", "B) 9"],
        correct: "A",
        correctAnswer: "3²",
        explanation: "3 groups of 3 = 3 × 3 = 9. This is 3 multiplied by itself → 3²."
    },
    {
        model: '<div class="group"><span class="item">🟢</span><span class="item">🟢</span></div><div class="group"><span class="item">🟢</span><span class="item">🟢</span></div>',
        caption: "4 bottle tops in 2 pairs",
        options: ["A) 2²", "B) 4"],
        correct: "A",
        correctAnswer: "2²",
        explanation: "2 pairs of 2 = 2 × 2 = 4. The factor 2 is used twice → 2²."
    }
];

let currentQuestion = 0;
let score = 0;

// DOM Elements
const introScreen = document.getElementById('intro-screen');
const cardScreen = document.getElementById('card-screen');
const finalScreen = document.getElementById('final-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const currentEl = document.getElementById('current');
const cardInner = document.getElementById('card-inner');
const cardFront = document.getElementById('card-front');
const cardBack = document.getElementById('card-back');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    correctSound.load();
    wrongSound.load();
    startBtn.addEventListener('click', startQuiz);
    restartBtn.addEventListener('click', restartQuiz);
});

function startQuiz() {
    introScreen.classList.remove('active');
    cardScreen.classList.add('active');
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        showFinalScreen();
        return;
    }

    const q = questions[currentQuestion];
    currentEl.textContent = currentQuestion + 1;

    // Render FRONT
    cardFront.innerHTML = `
        <h3>Which expression matches this model?</h3>
        <div class="model">${q.model}</div>
        <p><em>${q.caption}</em></p>
        <div class="options">
            <button class="option-btn" data-choice="A">${q.options[0]}</button>
            <button class="option-btn" data-choice="B">${q.options[1]}</button>
        </div>
    `;

    // Render BACK (will be shown after flip)
    cardBack.innerHTML = `
        <h3>Correct: <span style="color:#2e7d32">${q.correctAnswer}</span></h3>
        <div class="explanation">${q.explanation}</div>
        <p class="feedback" id="feedback">...</p>
    `;

    // Reset flip
    cardInner.style.transform = 'rotateY(0deg)';

    // Add event listeners to front buttons
    cardFront.querySelectorAll('.option-btn').forEach(btn => {
        btn.onclick = () => {
            const isCorrect = btn.dataset.choice === q.correct;
            if (isCorrect) score++;

            // Update feedback on back
            const feedbackEl = document.getElementById('feedback');
            feedbackEl.textContent = isCorrect ? "✅ Correct!" : "❌ Good try!";
            feedbackEl.style.color = isCorrect ? "#2e7d32" : "#c62828";

            // Flip card
            setTimeout(() => {
                cardInner.style.transform = 'rotateY(180deg)';
            }, 50);

            // Play sound and advance
            setTimeout(() => {
                const sound = isCorrect ? correctSound : wrongSound;
                sound.currentTime = 0;
                sound.play().catch(() => {});

                setTimeout(() => {
                    currentQuestion++;
                    loadQuestion();
                }, 1000);
            }, 300);
        };
    });
}

function showFinalScreen() {
    cardScreen.classList.remove('active');
    finalScreen.classList.add('active');
    document.getElementById('final-score').textContent = 
        `You got ${score} out of ${questions.length} correct!`;
}

function restartQuiz() {
    finalScreen.classList.remove('active');
    startQuiz();
}