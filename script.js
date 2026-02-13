const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pookie please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please!"
];

let messageIndex = 0;

class HeartsParticles {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'hearts-canvas';
        document.body.prepend(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.isMobile = window.innerWidth < 768;
        this.maxParticles = this.isMobile ? 15 : 40;
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createHeart() {
        const colors = ['#FF6B9D', '#FF8EBA', '#FFB6C1', '#FFC0CB', '#FF8A80'];
        return {
            x: Math.random() * this.canvas.width,
            y: -20,
            size: Math.random() * 15 + 10,
            speedY: Math.random() * 1.5 + 0.5,
            speedX: Math.random() * 0.6 - 0.3,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 2 - 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.5 + 0.3
        };
    }

    drawHeart(x, y, size, rotation, color, opacity) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation * Math.PI / 180);
        this.ctx.globalAlpha = opacity;
        this.ctx.fillStyle = color;
        this.ctx.font = `${size}px Arial`;
        this.ctx.fillText('', 0, 0);
        this.ctx.restore();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.particles.length < this.maxParticles && Math.random() < 0.05) {
            this.particles.push(this.createHeart());
        }

        this.particles = this.particles.filter(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;
            this.drawHeart(p.x, p.y, p.size, p.rotation, p.color, p.opacity);
            return p.y < this.canvas.height + 20;
        });

        requestAnimationFrame(() => this.animate());
    }
}

function createFloatingHearts() {
    const heartPositions = [
        { left: '10%', top: '20%', delay: '0s' },
        { left: '85%', top: '15%', delay: '1s' },
        { left: '5%', top: '60%', delay: '2s' },
        { left: '90%', top: '70%', delay: '0.5s' },
        { right: '15%', top: '40%', delay: '1.5s' },
        { right: '8%', top: '80%', delay: '2.5s' },
        { left: '15%', top: '85%', delay: '3s' },
        { right: '5%', top: '30%', delay: '0.8s' }
    ];

    const isMobile = window.innerWidth < 768;
    const heartsToShow = isMobile ? 3 : 8;

    for (let i = 0; i < heartsToShow; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '';
        const pos = heartPositions[i];
        Object.assign(heart.style, {
            left: pos.left,
            right: pos.right,
            top: pos.top,
            animationDelay: pos.delay
        });
        document.body.appendChild(heart);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new HeartsParticles();
    createFloatingHearts();
});

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');

    noButton.classList.add('shake');
    setTimeout(() => noButton.classList.remove('shake'), 500);

    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;

    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.transition = 'font-size 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    yesButton.style.fontSize = `${currentSize * 1.3}px`;
}

function handleYesClick() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 9999
    };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#FF6B9D', '#FF8EBA', '#FFB6C1', '#FFC0CB'],
            shapes: ['circle'],
            scalar: randomInRange(0.4, 0.8)
        });

        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#FF6B9D', '#FF8EBA', '#FFB6C1', '#FFC0CB'],
            shapes: ['circle'],
            scalar: randomInRange(0.4, 0.8)
        });
    }, 250);

    document.body.classList.add('page-transition');
    setTimeout(() => {
        window.location.href = "yes_page.html";
    }, 300);
}
