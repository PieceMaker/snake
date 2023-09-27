import config from './config.js';

const canvas = document.querySelector('canvas');
canvas.width = config.boardWidth;
canvas.height = config.boardHeight;

const ctx = canvas.getContext('2d');

const drawGrid = function(ctx) {
    const numCellsInRow = config.boardWidth / config.cellSize;

    for(let rowNum = 0; rowNum < numCellsInRow; rowNum++) {
        for(let colNum = 0; colNum < numCellsInRow; colNum++) {
            console.error(`Drawing row ${ rowNum }, column ${ colNum }.`);
            ctx.fillStyle = (rowNum + colNum) % 2 === 0 ? config.primaryTileColor : config.secondaryTileColor;
            ctx.fillRect(colNum * config.cellSize, rowNum * config.cellSize, config.cellSize, config.cellSize);
        }
    }
}

const drawSnakeSegment = function(ctx, segmentColumn, segmentRow) {
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

const drawSnake = function(ctx) {
    for(let snakeSegment = 0; snakeSegment < config.snakeStartLength; snakeSegment++) {
        drawSnakeSegment(ctx, config.snakeStartColumn - snakeSegment, config.snakeStartRow);
    }
}

drawGrid(ctx);
drawSnake(ctx);