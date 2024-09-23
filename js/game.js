const gameArea = document.getElementById('gameArea');
const snakeContainer = document.getElementById('snake');
const food = document.getElementById('food');

const scale = 20; 
let width = gameArea.clientWidth; 
let height = gameArea.clientHeight;
let rows = Math.floor(height / scale); 
let columns = Math.floor(width / scale); 
const speed = 100; 

let snake;
let snakeDirection;
let foodPosition;
let gameOver = false;
let lastUpdateTime = 0;

window.addEventListener('resize', () => {
    width = gameArea.clientWidth;
    height = gameArea.clientHeight;
    rows = Math.floor(height / scale);
    columns = Math.floor(width / scale);
    draw();
});

function init() {
    gameArea.style.width = `${width}px`;
    gameArea.style.height = `${height}px`;
    resetGame();
    requestAnimationFrame(gameLoop);
}

function resetGame() {
    snake = [{ x: Math.floor(columns / 2) * scale, y: Math.floor(rows / 2) * scale }];
    snakeDirection = 'RIGHT';
    foodPosition = { x: 0, y: 0 };
    gameOver = false;
    spawnFood();
}

function gameLoop(timestamp) {
    if (gameOver) {
        setTimeout(() => {
            resetGame();
            requestAnimationFrame(gameLoop);
        }, 1000);
        return;
    }

    if (timestamp - lastUpdateTime > speed) {
        update();
        lastUpdateTime = timestamp;
    }

    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    let head = { ...snake[0] };

    if (canMoveToFood(head)) {
        moveTowardsFood(head);
    }

    if (head.x === foodPosition.x && head.y === foodPosition.y) {
        snake.push({ ...snake[snake.length - 1] });
        spawnFood();
    } else { 
        snake.pop();
    }

    if (checkCollision(head)) {
        gameOver = true;
        return;
    }

    snake.unshift(head);
}

function moveTowardsFood(head) {
    const path = findPath(head, foodPosition);

    if (path.length > 1) {
        const nextStep = path[1];
        if (nextStep.x < head.x) snakeDirection = 'LEFT';
        else if (nextStep.x > head.x) snakeDirection = 'RIGHT';
        else if (nextStep.y < head.y) snakeDirection = 'UP';
        else if (nextStep.y > head.y) snakeDirection = 'DOWN';

        switch (snakeDirection) {
            case 'LEFT':
                head.x -= scale;
                break;
            case 'RIGHT':
                head.x += scale;
                break;
            case 'UP':
                head.y -= scale;
                break;
            case 'DOWN':
                head.y += scale;
                break;
        }
    }
}

function canMoveToFood(start) {
    const path = findPath(start, foodPosition);
    if (path.length === 0) return false;

    const nextPosition = path[1];
    return isSafe(nextPosition);
}

function findPath(start, goal) {
    const directions = [
        { x: -scale, y: 0 },  // LEFT
        { x: scale, y: 0 },   // RIGHT
        { x: 0, y: -scale },  // UP
        { x: 0, y: scale }    // DOWN
    ];

    const queue = [{ position: start, path: [] }];
    const visited = new Set();
    visited.add(`${start.x},${start.y}`);

    while (queue.length > 0) {
        const { position, path } = queue.shift();
        const newPath = [...path, position];

        for (const direction of directions) {
            const newPosition = {
                x: position.x + direction.x,
                y: position.y + direction.y
            };

            if (newPosition.x === goal.x && newPosition.y === goal.y) {
                return [...newPath, newPosition];
            }

            if (isSafe(newPosition) && !visited.has(`${newPosition.x},${newPosition.y}`)) {
                visited.add(`${newPosition.x},${newPosition.y}`);
                queue.push({ position: newPosition, path: newPath });
            }
        }
    }

    return [];
}

function isSafe(position) {
    return (
        position.x >= 0 &&
        position.x < width &&
        position.y >= 0 &&
        position.y < height &&
        !snake.some(segment => segment.x === position.x && segment.y === position.y)
    );
}

function spawnFood() {
    let newPosition;
    do {
        newPosition = {
            x: Math.floor(Math.random() * columns) * scale,
            y: Math.floor(Math.random() * rows) * scale
        };
    } while (!isSafe(newPosition));

    foodPosition = newPosition;
    food.style.left = `${foodPosition.x}px`;
    food.style.top = `${foodPosition.y}px`;
}

function draw() {
    snakeContainer.innerHTML = '';
    for (let segment of snake) {
        const segmentDiv = document.createElement('div');
        segmentDiv.classList.add('snake-segment');
        segmentDiv.style.left = `${segment.x}px`;
        segmentDiv.style.top = `${segment.y}px`;
        snakeContainer.appendChild(segmentDiv);
    }

    food.style.left = `${foodPosition.x}px`;
    food.style.top = `${foodPosition.y}px`;
}

function checkCollision(head) {
    if (
        head.x < 0 ||
        head.x >= width ||
        head.y < 0 ||
        head.y >= height ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {a
        return true;
    }
    return false;
}

init();
