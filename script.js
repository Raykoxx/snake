const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const gridCount = canvas.width / gridSize;
let snake = [{ x: 10, y: 10 }];
let snakeDirection = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

document.getElementById('highScore').innerText = highScore;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    ctx.fillStyle = 'lime';
    snake.forEach(segment => ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize));

    updateSnake();
    checkCollision();
}

function updateSnake() {
    const head = { x: snake[0].x + snakeDirection.x, y: snake[0].y + snakeDirection.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * gridCount), y: Math.floor(Math.random() * gridCount) };
        score++;
        document.getElementById('score').innerText = score;

        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
            document.getElementById('highScore').innerText = highScore;
        }
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];

    if (head.x < 0 || head.x >= gridCount || head.y < 0 || head.y >= gridCount) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            resetGame();
        }
    }
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    snakeDirection = { x: 0, y: 0 };
    food = { x: 15, y: 15 };
    score = 0;
    document.getElementById('score').innerText = score;
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (snakeDirection.y === 0) snakeDirection = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (snakeDirection.y === 0) snakeDirection = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (snakeDirection.x === 0) snakeDirection = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (snakeDirection.x === 0) snakeDirection = { x: 1, y: 0 };
            break;
    }
});

setInterval(draw, 100);
