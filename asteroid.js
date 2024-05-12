alert(document.domain);

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const player = { x: canvas.width / 2, y: canvas.height - 100, width: 50, height: 50, speed: 2 };
const bullets = [];
const asteroids = [];
const sparks = []; // Array to store sparks

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black'; // Change background color to black
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white'; // Change ship color to white
    ctx.beginPath();
    ctx.moveTo(player.x, player.y - player.height / 2);
    ctx.lineTo(player.x + player.width / 2, player.y + player.height / 2);
    ctx.lineTo(player.x - player.width / 2, player.y + player.height / 2);
    ctx.closePath();
    ctx.fill();
    bullets.forEach(bullet => {
        bullet.y -= 5;
        ctx.fillStyle = 'white';
        ctx.fillRect(bullet.x, bullet.y, 5, 10);
        // Check bullet collision with asteroids
        asteroids.forEach((asteroid, aIndex) => {
            if (bullet.x >= asteroid.x && bullet.x <= asteroid.x + asteroid.width &&
                bullet.y >= asteroid.y && bullet.y <= asteroid.y + asteroid.height) {
                bullets.splice(bullets.indexOf(bullet), 1);
                asteroids.splice(aIndex, 1);
                // Add sparks
                for (let i = 0; i < 10; i++) {
                    sparks.push({ x: asteroid.x + asteroid.width / 2, y: asteroid.y + asteroid.height / 2, dx: Math.random() * 4 - 2, dy: Math.random() * 4 - 2, color: Math.random() < 0.5 ? 'green' : 'yellow' });
                }
            }
        });
    });
    asteroids.forEach((asteroid, aIndex) => {
        asteroid.y += 2;
        ctx.fillStyle = 'red';
        ctx.fillText('POC', asteroid.x, asteroid.y);
        // Check asteroid collision with player
        if (asteroid.x >= player.x - player.width / 2 && asteroid.x <= player.x + player.width / 2 &&
            asteroid.y + asteroid.height >= player.y - player.height / 2 && asteroid.y + asteroid.height <= player.y + player.height / 2) {
            asteroids.splice(aIndex, 1);
        }
    });
    // Draw sparks
    sparks.forEach(spark => {
        spark.x += spark.dx;
        spark.y += spark.dy;
        ctx.fillStyle = spark.color;
        ctx.fillRect(spark.x, spark.y, 3, 3);
    });
}

function update() {
    draw();
    requestAnimationFrame(update);
}

update();

setInterval(() => {
    bullets.push({ x: player.x, y: player.y - 20 });
}, 500);

setInterval(() => {
    asteroids.push({ x: Math.random() * canvas.width, y: 0, width: 50, height: 50 });
}, 1000);

addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' && player.x > 0) {
        player.x -= 5; // Decreased speed for left movement
    } else if (e.key === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x += 5; // Decreased speed for right movement
    }
});

