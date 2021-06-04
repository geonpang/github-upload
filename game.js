const angleSensitivity = 5;

class Player {
    constructor(xPos, yPos, direction = 0) {
        this.x = xPos;
        this.y = yPos;
        this.vx = 0;
        this.vy = 0;
        this.a = direction;
        this.da = 0;
    }
    draw() {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }

    drawVelocity() {
        ctx.beginPath();
        ctx.strokeStyle = '#80ffff';
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.vx / 4 * Math.sin(this.a), this.y - this.v / 4 * Math.cos(this.a));
        ctx.stroke();
    }

    drawAngle() {
        ctx.beginPath();
        ctx.strokeStyle = "ff80ff";
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 20 * Math.sin(this.a), this.y + 20 * Math.cos(this.a));
        ctx.stroke();
    }

    move() {
        this.x += this.vx / fps;
        this.y += this.vy / fps;
        this.a += this.da * angleSensitivity / fps;

        this.vx *= res;
        this.vy *= res;
        this.da *= res;

        if (this.x < 0) { this.x += 640; }
        else if (this.x > 640) { this.x -= 640; }

        if (this.y < 0) { this.y += 480; }
        else if (this.y > 480) { this.y -= 480; }
    }
}

let player = new Player(320, 400, Math.PI);
let fps = 50;
let res = Math.pow(0.9, 1 / fps);

let showVelocity = false;
let trail = false;

function loop() {
    setInterval(function () {
        if (!trail) {
            ctx.clearRect(0, 0, 640, 480);
        }


        if (keyState['a']) { if (!keyState['d']) { player.vx += Math.cos(player.a); player.vy += Math.sin(player.a); } }
        else if (keyState['d']) { player.vx -= Math.cos(player.a); player.vy -= Math.sin(player.a); };
        if (keyState['w']) { if (!keyState['s']) { player.vx += Math.sin(player.a); player.vy += Math.cos(player.a); } }
        else if (keyState['s']) { player.vx -= Math.sin(player.a); player.vy -= Math.cos(player.a); };
        if (keyState['ArrowLeft']) { if (!keyState['ArrowRight']) { player.da += (angleSensitivity / fps); } }
        else if (keyState['ArrowRight']) { player.da -= (angleSensitivity / fps); }

        player.move();
        player.draw();
        player.drawAngle();
        if (showVelocity) {
            player.drawVelocity();
        }
    }, 1000 / fps);
}

loop();

let keyState = { ArrowLeft: false, ArrowRight: false, w: false, a: false, s: false, d: false };
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
    switch (event.key) {
        case 'h':
            showVelocity = !showVelocity;
            break;
        case 'j':
            trail = !trail;
            break;
    }
})