import config from './config.js';
import navigation from './navigation.js';
import snake from './snake.js';
import Render from './render.js';

const canvas = document.querySelector('canvas');
canvas.width = config.boardWidth;
canvas.height = config.boardHeight;
const renderer = new Render(canvas);

document.onkeydown = function(event) {
    navigation.changeDirection(event);
}

const animationLoop = function() {
    renderer.clearCanvas();
    renderer.drawGrid();
    renderer.drawSnake(snake);

    snake.moveSnake(navigation.currentDirection);

    setTimeout(function() { animationLoop(); }, 100);
}

animationLoop();