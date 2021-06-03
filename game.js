const angleSensitivity = 0.4;

class Player {
    constructor(xPos, yPos, velocity = 0, angle = 0) {
        this.x = xPos;
        this.y = yPos;
        this.v = velocity;
        this.a = angle;
        this.da = 0;
    }
    draw() {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
        ctx.fill();
    }

    drawVelocity() {
        ctx.beginPath();
        ctx.strokeStyle = '#ffffff'
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - (this.v/4 + 10) * Math.sin(this.a), this.y - (this.v/4 + 10) * Math.cos(this.a));
        ctx.stroke();
    }

    move() {
        this.x -= this.v * Math.sin(this.a) / fps;
        this.y -= this.v * Math.cos(this.a) / fps;
        this.a += this.da * angleSensitivity / fps;

        this.v *= Math.pow(0.9, 1 / fps);
        this.da *= Math.pow(0.9, 1 / fps);

        if (this.x < 0) { this.x += 640; }
        else if (this.x > 640) { this.x -= 640; }

        if (this.y < 0) { this.y += 480; }
        else if (this.y > 480) { this.y -= 480; }
    }
}

let player = new Player(320, 400);
let fps = 50;

let showVelocity = false;
let trail = false;

function loop() {
    setInterval(function () {
        if (!trail) {
            ctx.clearRect(0, 0, 640, 480);
        }

        if (keyState['ArrowLeft']) { player.da += 70/fps };
        if (keyState['ArrowRight']) { player.da -= 70/fps };
        if (keyState['ArrowUp']) { player.v += 70/fps };
        if (keyState['ArrowDown']) { player.v -= 70/fps };

        player.move();
        player.draw();
        if (showVelocity) {
            player.drawVelocity();
        }
    }, 1000 / fps);
}

loop();

let keyState = { ArrowLeft: false, ArrowRight: false, ArrowUp: false, ArrowDown: false };
document.addEventListener('keydown', function (event) {
    if (event.key in keyState) {
        keyState[event.key] = true;
    }
})
document.addEventListener('keyup', function (event) {
    if (event.key in keyState) {
        keyState[event.key] = false;
    }
})

document.addEventListener('keypress', function (event) {
    switch(event.key) {
        case 'h':
            showVelocity = !showVelocity;
            break;
        case 'j':
            trail = !trail;
            break;
    }
})