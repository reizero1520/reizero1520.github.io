// Get the canvas element and context
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

// Set the canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Car variables
var playerCar = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 100,
  width: 50,
  height: 100,
  speed: 5,
  color: "red"
};

var obstacle = {
  x: Math.random() * (canvas.width - 50),
  y: -50,
  width: 50,
  height: 50,
  speed: 3,
  color: "blue"
};

// Scoreboard variables
var score = 0;
var level = 1;
var scoreElement = document.getElementById("score");
var levelElement = document.getElementById("level");

// Game state variables
var isGameOver = false;
var currentLevelCompleted = false;

// Keyboard input variables
var keys = {
  ArrowLeft: false,
  ArrowRight: false
};

// Event listeners for keyboard input
document.addEventListener("keydown", function (event) {
  if (event.code in keys) {
    keys[event.code] = true;
  }
});

document.addEventListener("keyup", function (event) {
  if (event.code in keys) {
    keys[event.code] = false;
  }
});

// Game loop
function gameLoop() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Update the player car position based on keyboard input
  if (keys.ArrowLeft && playerCar.x > 0) {
    playerCar.x -= playerCar.speed;
  }

  if (keys.ArrowRight && playerCar.x < canvas.width - playerCar.width) {
    playerCar.x += playerCar.speed;
  }

  // Update the obstacle position
  obstacle.y += obstacle.speed;

  // Check for collision with player car
  if (checkCollision(playerCar, obstacle)) {
    // Game over logic
    endGame();
  }

  // Reset obstacle if it goes beyond the canvas
  if (obstacle.y > canvas.height) {
    obstacle.x = Math.random() * (canvas.width - 50);
    obstacle.y = -50;
    incrementScore();
  }

  // Draw the player car
  context.fillStyle = playerCar.color;
  context.fillRect(playerCar.x, playerCar.y, playerCar.width, playerCar.height);

  // Draw the obstacle
  context.fillStyle = obstacle.color;
  context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    // Update the scoreboard
    scoreElement.textContent = score;
    levelElement.textContent = level;
  
    // Check if the current level is completed
    if (score >= level * 10 && !currentLevelCompleted) {
      levelUp();
      currentLevelCompleted = true;
    }
  
    // Check if the game is over
    if (isGameOver) {
      showGameOverScreen();
    } else {
      // Continue the game loop
      requestAnimationFrame(gameLoop);
    }
  }
  
  // Start the game
  resetGame();
  gameLoop();
  
  // Function to check collision between two objects
  function checkCollision(obj1, obj2) {
    var rect1 = {x: obj1.x, y: obj1.y, width: obj1.width, height: obj1.height};
    var rect2 = {x: obj2.x, y: obj2.y, width: obj2.width, height: obj2.height};
  
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }
  
  // Function to increment the score and update the level
  function incrementScore() {
    score += 1;
    if (score % 10 === 0) {
      level += 1;
      currentLevelCompleted = false;
    }
  }
  
  // Function to end the game
  function endGame() {
    isGameOver = true;
    stopMusic();
    // Add your logic for game over behavior
  }
  
  // Function to level up the game
  function levelUp() {
    // Add your logic for level up behavior
  }
  
  // Function to show the game over screen
  function showGameOverScreen() {
    // Add your logic for displaying the game over screen
  }
  
  // Function to reset the game
  function resetGame() {
    score = 0;
    level = 1;
    isGameOver = false;
    currentLevelCompleted = false;
    // Add your logic for resetting the game state
  }
  
