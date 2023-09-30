import config from './config.js';

const canvas = document.querySelector('canvas');
canvas.width = config.boardWidth;
canvas.height = config.boardHeight;

const ctx = canvas.getContext('2d');

let currentColumn = config.snakeStartColumn;
let currentRow = config.snakeStartRow;
const numCellsInRow = config.boardWidth / config.cellSize;

const drawGrid = function(ctx) {
    for(let rowNum = 0; rowNum < numCellsInRow; rowNum++) {
        for(let colNum = 0; colNum < numCellsInRow; colNum++) {
            ctx.fillStyle = (rowNum + colNum) % 2 === 0 ? config.primaryTileColor : config.secondaryTileColor;
            ctx.fillRect(colNum * config.cellSize, rowNum * config.cellSize, config.cellSize, config.cellSize);
        }
    }
}

const drawSnakeSegment = function(ctx, segmentColumn, segmentRow) {
    if(segmentColumn < 0) {
        segmentColumn += numCellsInRow;
    }
    if(segmentRow < 0) {
        segmentRow += numCellsInRow;
    }

    ctx.fillStyle = config.snakeColor;
    ctx.fillRect(segmentColumn * config.cellSize, segmentRow * config.cellSize, config.cellSize, config.cellSize);

    const segmentUpperLeft = { x: segmentColumn * config.cellSize, y: (segmentRow + 1) * config.cellSize };
    const segmentLowerLeft = { x: segmentUpperLeft.x, y: segmentUpperLeft.y - config.cellSize };
    const segmentUpperRight = { x: segmentUpperLeft.x + config.cellSize, y: segmentUpperLeft.y };
    const segmentLowerRight = { x: segmentUpperLeft.x + config.cellSize, y: segmentUpperLeft.y - config.cellSize };

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(segmentUpperLeft.x, segmentUpperLeft.y);
    ctx.lineTo(segmentLowerLeft.x, segmentLowerLeft.y);
    ctx.lineTo(segmentLowerRight.x, segmentLowerRight.y);
    ctx.lineTo(segmentUpperRight.x, segmentUpperRight.y);
    ctx.lineTo(segmentUpperLeft.x, segmentUpperLeft.y);
    ctx.stroke();
}

const drawSnake = function(ctx, column, row) {
    for(let snakeSegment = 0; snakeSegment < config.snakeStartLength; snakeSegment++) {
        drawSnakeSegment(ctx, column - snakeSegment, row);
    }
}

const clearCanvas = function(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const animationLoop = function(ctx) {
    clearCanvas(ctx);
    drawGrid(ctx);
    drawSnake(ctx, currentColumn, currentRow);

    currentColumn = (currentColumn + 1) % numCellsInRow;

    setTimeout(function() { animationLoop(ctx); }, 100);
}

animationLoop(ctx);