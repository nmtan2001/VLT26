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
        const types = ['', '', '', '✨', '✦', '💫'];
        const type = types[Math.floor(Math.random() * types.length)];
        const colors = ['#FF6B9D', '#FF8EBA', '#FFB6C1', '#FFC0CB', '#FF8A80', '#FFD700'];
        return {
            x: Math.random() * this.canvas.width,
            y: -20,
            size: Math.random() * 15 + 10,
            speedY: Math.random() * 1.5 + 0.5,
            speedX: Math.random() * 0.6 - 0.3,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 2 - 1,
            type: type,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.5 + 0.3
        };
    }

    drawHeart(particle) {
        this.ctx.save();
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate(particle.rotation * Math.PI / 180);
        this.ctx.globalAlpha = particle.opacity;
        this.ctx.fillStyle = particle.color;
        this.ctx.font = `${particle.size}px Arial`;
        this.ctx.fillText(particle.type, 0, 0);
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
            this.drawHeart(p);
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

function createCuteStars() {
    const starEmojis = ['⭐', '✨', '💫', '✦', '🌟'];
    const starPositions = [
        { left: '5%', top: '10%', delay: '0s' },
        { left: '92%', top: '25%', delay: '1.5s' },
        { left: '8%', top: '75%', delay: '2.5s' },
        { left: '88%', top: '85%', delay: '0.8s' },
        { right: '3%', top: '45%', delay: '2s' },
        { right: '90%', top: '55%', delay: '1s' }
    ];

    const isMobile = window.innerWidth < 768;
    const starsToShow = isMobile ? 2 : 6;

    for (let i = 0; i < starsToShow; i++) {
        const star = document.createElement('div');
        star.className = 'cute-star';
        star.textContent = starEmojis[Math.floor(Math.random() * starEmojis.length)];
        const pos = starPositions[i];
        Object.assign(star.style, {
            left: pos.left,
            right: pos.right,
            top: pos.top,
            animationDelay: pos.delay
        });
        document.body.appendChild(star);
    }
}

function createSparkles() {
    const sparkleCount = window.innerWidth < 768 ? 8 : 15;
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 2}s`;
        document.body.appendChild(sparkle);
    }
}

function addHeartTrail() {
    let lastTrailTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTrailTime < 100) return;
        lastTrailTime = now;

        if (Math.random() < 0.3) {
            const trail = document.createElement('div');
            trail.className = 'heart-trail';
            trail.textContent = ['', '💕', '💗', '💖'][Math.floor(Math.random() * 4)];
            trail.style.left = `${e.clientX}px`;
            trail.style.top = `${e.clientY}px`;
            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 4000);
        }
    });
}

function addBlinkingEmoji() {
    const container = document.querySelector('.container');
    if (!container) return;

    const emojiWrap = document.createElement('div');
    emojiWrap.className = 'blinking-emoji';
    emojiWrap.style.cssText = `
        position: absolute;
        top: -30px;
        right: 20px;
        font-size: 2rem;
        z-index: 10;
    `;
    emojiWrap.textContent = '😊';
    container.appendChild(emojiWrap);
}

window.addEventListener('DOMContentLoaded', () => {
    new HeartsParticles();
    createFloatingHearts();
    createCuteStars();
    createSparkles();
    addHeartTrail();
    addBlinkingEmoji();
});

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');

    noButton.classList.add('shake');
    setTimeout(() => noButton.classList.remove('shake'), 500);

    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;

    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.transition = 'font-size 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    yesButton.style.fontSize = `${currentSize * 1.3}px`;

    createClickSparkles();
}

function createClickSparkles() {
    const yesButton = document.querySelector('.yes-button');
    const rect = yesButton.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'heart-trail';
        sparkle.textContent = ['', '✨', '💫'][Math.floor(Math.random() * 3)];
        const angle = (i / 8) * Math.PI * 2;
        const distance = 60 + Math.random() * 40;
        sparkle.style.left = `${centerX + Math.cos(angle) * distance}px`;
        sparkle.style.top = `${centerY + Math.sin(angle) * distance}px`;
        sparkle.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.style.left = `${centerX + Math.cos(angle) * distance * 2}px`;
            sparkle.style.top = `${centerY + Math.sin(angle) * distance * 2 - 100}px`;
            sparkle.style.opacity = '0';
        }, 50);

        setTimeout(() => sparkle.remove(), 700);
    }
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
