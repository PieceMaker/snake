import config from './config.js';
import navigation from './navigation.js';
import snake from './grid.js';
import Render from './render.js';

const canvas = document.querySelector('canvas');
canvas.width = config.boardWidth;
canvas.height = config.boardHeight;
const renderer = new Render(canvas);

document.onkeydown = function(event) {
    navigation.changeDirection(event);
}

const loop = function() {
    if(!snake.hasCollision()) {
        const hasEatenApple = snake.hasEatenApple();
        if(hasEatenApple) {
            snake.spawnApple();
        }

        renderer.clearCanvas();
        renderer.drawGrid();
        renderer.drawSnake(snake.snakeSegments);
        renderer.drawApple(snake.appleLocation);

        snake.moveSnake(navigation.currentDirection, hasEatenApple);

        setTimeout(function () {
            loop();
        }, 100);
    }
}

loop();