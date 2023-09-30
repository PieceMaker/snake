import config from './config.js';
import snake from './snake.js';

const canvas = document.querySelector('canvas');
canvas.width = config.boardWidth;
canvas.height = config.boardHeight;

const ctx = canvas.getContext('2d');
const numCellsInRow = config.boardWidth / config.cellSize;

const drawGrid = function(ctx) {
    for(let rowNum = 0; rowNum < numCellsInRow; rowNum++) {
        for(let colNum = 0; colNum < numCellsInRow; colNum++) {
            ctx.fillStyle = (rowNum + colNum) % 2 === 0 ? config.primaryTileColor : config.secondaryTileColor;
            ctx.fillRect(colNum * config.cellSize, rowNum * config.cellSize, config.cellSize, config.cellSize);
        }
    }
}

const drawSnakeSegment = function(ctx, snakeSegment) {
    ctx.fillStyle = config.snakeColor;
    ctx.fillRect(
        snakeSegment.column * config.cellSize,
        snakeSegment.row * config.cellSize,
        config.cellSize,
        config.cellSize
    );

    const segmentUpperLeft = {
        x: snakeSegment.column * config.cellSize,
        y: (snakeSegment.row + 1) * config.cellSize
    };
    const segmentLowerLeft = {
        x: segmentUpperLeft.x,
        y: segmentUpperLeft.y - config.cellSize
    };
    const segmentUpperRight = {
        x: segmentUpperLeft.x + config.cellSize,
        y: segmentUpperLeft.y
    };
    const segmentLowerRight = {
        x: segmentUpperLeft.x + config.cellSize,
        y: segmentUpperLeft.y - config.cellSize
    };

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(segmentUpperLeft.x, segmentUpperLeft.y);
    ctx.lineTo(segmentLowerLeft.x, segmentLowerLeft.y);
    ctx.lineTo(segmentLowerRight.x, segmentLowerRight.y);
    ctx.lineTo(segmentUpperRight.x, segmentUpperRight.y);
    ctx.lineTo(segmentUpperLeft.x, segmentUpperLeft.y);
    ctx.stroke();
}

const drawSnake = function(ctx) {
    snake.snakeSegments
        .forEach((snakeSegment) => {
            drawSnakeSegment(ctx, snakeSegment);
        });
}

const clearCanvas = function(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const animationLoop = function(ctx) {
    clearCanvas(ctx);
    drawGrid(ctx);
    drawSnake(ctx);
    snake.moveSnake('right');

    setTimeout(function() { animationLoop(ctx); }, 100);
}

animationLoop(ctx);