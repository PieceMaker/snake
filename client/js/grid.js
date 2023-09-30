import config from './config.js';

class Grid {
    #appleLocation = { row: -1, column: -1 };
    #grid = {};

    constructor() {
        this.init();
    }

    get appleLocation() {
        return this.#appleLocation;
    }

    get numCellsInColumn() {
        return config.boardHeight / config.cellSize;
    }

    get numCellsInRow() {
        return config.boardWidth / config.cellSize;
    }

    init() {
        const columnIndices = Array
            .from(Array(this.numCellsInColumn).keys());
        const rowIndices = Array
            .from(Array(this.numCellsInRow).keys());

        rowIndices
            .forEach((rowIndex) => {
                columnIndices
                    .forEach((columnIndex) => {
                        this.#grid[`${ rowIndex }-${ columnIndex }`] = {
                            row: rowIndex,
                            column: columnIndex,
                            isOccupied: false
                        };
                    });
            });

        this.snakeSegments = Array
            .from(Array(config.snakeStartLength).keys())
            .map((offset) => {
                return {
                    column: config.snakeStartColumn - offset,
                    row: config.snakeStartRow
                };
            });
        this.snakeSegments
            .forEach((segment) => {
                this.setCellOccupation(segment, true);
            });
        this.spawnApple();
    }

    hasCollision() {
        const jsonSegments = this.snakeSegments
            .map(JSON.stringify);
        const segmentsSet = new Set(jsonSegments);
        return segmentsSet.size < this.snakeSegments.length;
    }

    hasEatenApple() {
        const snakeHead = this.snakeSegments[0];
        return snakeHead.column === this.appleLocation.column && snakeHead.row === this.appleLocation.row;
    }

    moveSnake(direction, grow = false) {
        // Remove last segment
        if(!grow) {
            const removedSegment = this.snakeSegments.pop();
            this.setCellOccupation(removedSegment, false);
        }

        const previousHead = this.snakeSegments[0];
        let newHead = previousHead;

        if(direction === 'right') {
            newHead = {
                column: (previousHead.column + this.numCellsInColumn + 1) % this.numCellsInColumn,
                row: previousHead.row
            };
        } else if(direction === 'left') {
            newHead = {
                column: (previousHead.column + this.numCellsInColumn - 1) % this.numCellsInColumn,
                row: previousHead.row
            };
        } else if(direction === 'up') {
            newHead = {
                column: previousHead.column,
                row: (previousHead.row + this.numCellsInColumn - 1) % this.numCellsInRow
            };
        } else if(direction === 'down') {
            newHead = {
                column: previousHead.column,
                row: (previousHead.row + this.numCellsInColumn + 1) % this.numCellsInRow
            };
        } else {
            throw new Error(`Unrecognized direction "${ direction }"`);
        }

        this.snakeSegments.unshift(newHead);
        this.setCellOccupation(newHead, true);
    }

    setCellOccupation(segment, isOccupied) {
        this.#grid[`${ segment.row }-${ segment.column }`].isOccupied = isOccupied;
    }

    spawnApple() {
        if(this.#appleLocation.row > -1 && this.#appleLocation.column > -1) {
            this.setCellOccupation(this.#appleLocation, false);
        }
        const emptyCells = Object.values(this.#grid)
            .filter(({ isOccupied }) => !isOccupied);
        this.#appleLocation = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        this.setCellOccupation(this.#appleLocation, true);
    }
}

export default new Grid();