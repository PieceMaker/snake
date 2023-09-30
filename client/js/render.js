import config from './config.js';

class Render {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    get numCellsInColumn() {
        return config.boardHeight / config.cellSize;
    }

    get numCellsInRow() {
        return config.boardWidth / config.cellSize;
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawGrid() {
        const columnIndices = Array
            .from(Array(this.numCellsInColumn).keys());
        const rowIndices = Array
            .from(Array(this.numCellsInRow).keys());

        rowIndices
            .forEach((rowIndex) => {
                columnIndices
                    .forEach((columnIndex) => {
                        this.ctx.fillStyle = (rowIndex + columnIndex) % 2 === 0 ? config.primaryTileColor : config.secondaryTileColor;
                        this.ctx.fillRect(
                            columnIndex * config.cellSize,
                            rowIndex * config.cellSize,
                            config.cellSize,
                            config.cellSize
                        );
                    });
            });
    }

    drawSnake(snake) {
        snake.snakeSegments
            .forEach(this._drawSnakeSegment.bind(this));
    }

    _drawSnakeSegment(segment) {
        this.ctx.fillStyle = config.snakeColor;
        this.ctx.fillRect(
            segment.column * config.cellSize,
            segment.row * config.cellSize,
            config.cellSize,
            config.cellSize
        );

        const segmentUpperLeft = {
            x: segment.column * config.cellSize,
            y: (segment.row + 1) * config.cellSize
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

        this.ctx.beginPath();
        this.ctx.strokeStyle = 'black';
        this.ctx.moveTo(segmentUpperLeft.x, segmentUpperLeft.y);
        this.ctx.lineTo(segmentLowerLeft.x, segmentLowerLeft.y);
        this.ctx.lineTo(segmentLowerRight.x, segmentLowerRight.y);
        this.ctx.lineTo(segmentUpperRight.x, segmentUpperRight.y);
        this.ctx.lineTo(segmentUpperLeft.x, segmentUpperLeft.y);
        this.ctx.stroke();
    }
}

export default Render;