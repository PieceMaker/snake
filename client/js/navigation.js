class Navigation {
    #currentDirection = 'right';

    get currentDirection() {
        return this.#currentDirection;
    }

    set currentDirection(newDirection) {
        console.log(`Setting new direction to ${ newDirection }`);
        this.#currentDirection = newDirection;
    }

    changeDirection(event) {
        if(event.code === 'ArrowLeft') {
            if(this.currentDirection !== 'right') {
                this.currentDirection = 'left';
            }
        } else if(event.code === 'ArrowRight') {
            if(this.currentDirection !== 'left') {
                this.currentDirection = 'right';
            }
        } else if(event.code === 'ArrowUp') {
            if(this.currentDirection !== 'down') {
                this.currentDirection = 'up';
            }
        } else if(event.code === 'ArrowDown') {
            if(this.currentDirection !== 'up') {
                this.currentDirection = 'down';
            }
        }
        console.log(this.currentDirection);
    }
}

export default new Navigation();