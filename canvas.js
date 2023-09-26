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

drawGrid(ctx);