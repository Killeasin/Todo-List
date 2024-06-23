document.addEventListener('DOMContentLoaded', function() {
    // Canvas setup
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Game variables
    let player = {
        x: canvas.width / 2,
        y: canvas.height - 50,
        width: 50,
        height: 50,
        speed: 5
    };

    let obstacles = [];
    let score = 0;
    let gameSpeed = 2;
    let keys = {};

    // Event listeners
    document.addEventListener('keydown', function(e) {
        keys[e.code] = true;
    });

    document.addEventListener('keyup', function(e) {
        keys[e.code] = false;
    });

    // Player movement function
    function movePlayer() {
        if (keys['ArrowUp'] && player.y > 0) {
            player.y -= player.speed;
        }
        if (keys['ArrowDown'] && player.y < canvas.height - player.height) {
            player.y += player.speed;
        }
        if (keys['ArrowLeft'] && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
            player.x += player.speed;
        }
    }

    // Obstacle generation function
    function createObstacle() {
        let obstacle = {
            x: Math.random() * canvas.width,
            y: -50,
            width: Math.random() * (canvas.width / 4) + 50,
            height: 20,
            color: `hsl(${Math.random() * 360}, 50%, 50%)`
        };
        obstacles.push(obstacle);
    }

    // Collision detection function
    function collisionDetection(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }

    // Game loop
    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Move player
        movePlayer();

        // Create obstacles
        if (Math.random() < 0.02) {
            createObstacle();
        }

        // Draw obstacles
        obstacles.forEach((obstacle, index) => {
            obstacle.y += gameSpeed;
            ctx.fillStyle = obstacle.color;
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

            // Check collision with player
            if (collisionDetection(player, obstacle)) {
                alert(`Game Over! Your final score is ${score}`);
                obstacles = [];
                score = 0;
                gameSpeed = 2;
            }

            // Remove obstacles off screen
            if (obstacle.y > canvas.height) {
                obstacles.splice(index, 1);
                score++;
                gameSpeed += 0.1;
            }
        });

        // Draw player
        ctx.fillStyle = 'blue';
        ctx.fillRect(player.x, player.y, player.width, player.height);

        // Draw score
        ctx.fillStyle = '#000';
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${score}`, 10, 30);

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});