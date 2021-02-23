/*
Game Board = 30x30 Square
Unit = 10 (scale)
*/

// Capture the canvas object and 2d context
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

// Capture Score
const score = document.querySelector(".score")
var result = 0;


// Square unit
const scale = 10;

// Create rows and collumns 
const rows = canvas.height / scale;
const columns = canvas.height / scale;

// Snakes are real and they like...Fruit
var snake;
var fruit;

// Keyboard events
window.addEventListener('keydown', (evt) => {
    // store direction as event.key as a string
    const direction = evt.key.replace('Arrow', '');
    // on keydown check to change snake's direction
    snake.changeDirection(direction);
});

// Game Loop (calls itself)
(function init(){
    // Create new snake
    snake = new Snake();
    fruit = new Fruit();

    // Pick random fruit location
    fruit.pickLocation();
    window.setInterval(() =>  {
        // Update snake and draw in new location / new image
        // Clear snake's pathing 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();
        // handle Fruit hitbox and interaction
        // when snake(x, y) == fruit(x, y) then add score, make snake bigger and generate a new fruit 
        snake.checkEat(fruit);
        snake.checkDeath();
        // tick update result
        score.textContent = result

    // refresh every [0.100s]
    }, 100);
    
}());

