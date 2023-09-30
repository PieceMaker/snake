import config from './config.js';

class Snake {
    constructor() {
        this.snakeSegments = Array
            .from(Array(config.snakeStartLength).keys())
            .map((offset) => {
                return {
                    column: config.snakeStartColumn - offset,
                    row: config.snakeStartRow
                };
            });
    }

    get numCellsInColumn() {
        return config.boardHeight / config.cellSize;
    }

    get numCellsInRow() {
        return config.boardWidth / config.cellSize;
    }

    hasCollision() {
        const jsonSegments = this.snakeSegments
            .map(JSON.stringify);
        const segmentsSet = new Set(jsonSegments);
        return segmentsSet.size < this.snakeSegments.length;
    }

    moveSnake(direction) {
        // Remove last segment
        this.snakeSegments.pop();
        const previousHead = this.snakeSegments[0];

        if(direction === 'right') {
            this.snakeSegments.unshift({
                column: (previousHead.column + 1) % this.numCellsInColumn,
                row: previousHead.row
            });
        } else if(direction === 'left') {
            this.snakeSegments.unshift({
                column: (previousHead.column - 1) % this.numCellsInColumn,
                row: previousHead.row
            });
        } else if(direction === 'up') {
            this.snakeSegments.unshift({
                column: previousHead.column,
                row: (previousHead.row - 1) % this.numCellsInRow
            });
        } else if(direction === 'down') {
            this.snakeSegments.unshift({
                column: previousHead.column,
                row: (previousHead.row + 1) % this.numCellsInRow
            });
        } else {
            console.error(`Unrecognized direction "${ direction }"`);
        }
    }
}

export default new Snake();