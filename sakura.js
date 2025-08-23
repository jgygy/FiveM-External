(function () {
    var canvas = document.createElement('canvas');
    canvas.id = 'sakura-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var sakuraList = [];
    var num = 50;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function Sakura() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.s = Math.random() * 3 + 1;
        this.r = Math.random() * 6 + 1;
        this.w = Math.random() * 12 + 4;
        this.h = Math.random() * 7 + 3;
        this.rot = Math.random() * 360;
        this.rotSpeed = Math.random() * 2 - 1;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 + 1;
    }

    Sakura.prototype.draw = function () {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot * Math.PI / 180);
        ctx.scale(this.s, this.s);
        
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 192, 203, 0.8)';
        ctx.ellipse(0, 0, this.w, this.h, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 150, 180, 0.8)';
        ctx.lineWidth = 0.5;
        ctx.moveTo(0, 0);
        ctx.lineTo(this.w * 0.8, this.h * 0.8);
        ctx.stroke();
        
        ctx.restore();
    };

    Sakura.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
        this.rot += this.rotSpeed;

        if (this.y > canvas.height) {
            this.y = -this.h * 2;
            this.x = Math.random() * canvas.width;
        }
        if (this.x > canvas.width + this.w || this.x < -this.w) {
            this.x = Math.random() * canvas.width;
            this.y = -this.h * 2;
        }
    };

    function init() {
        for (var i = 0; i < num; i++) {
            sakuraList.push(new Sakura());
        }
        animate();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < sakuraList.length; i++) {
            sakuraList[i].update();
            sakuraList[i].draw();
        }
        requestAnimationFrame(animate);
    }

    init();
})();