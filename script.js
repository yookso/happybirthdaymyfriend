// Nhạc nền
const audio = new Audio();
audio.loop = true;
audio.src = document.getElementById('music-select').value;

const tryPlayAudio = () => {
    audio.play().catch(() => {
        const playOnInteract = () => {
            audio.play().catch(err => console.log("Lỗi phát nhạc:", err));
            document.removeEventListener('touchstart', playOnInteract);
            document.removeEventListener('click', playOnInteract);
        };
        document.addEventListener('touchstart', playOnInteract, { once: true });
        document.addEventListener('click', playOnInteract, { once: true });
    });
};

window.onload = tryPlayAudio;

document.getElementById('music-select').addEventListener('change', e => {
    audio.src = e.target.value;
    tryPlayAudio();
});

document.getElementById('play-pause').addEventListener('click', () => {
    audio.paused ? (audio.play(), document.getElementById('play-pause').textContent = '⏸️') : 
                   (audio.pause(), document.getElementById('play-pause').textContent = '▶️');
});

// Hiệu ứng pháo hoa
const createFirework = () => {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.cssText = `
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        background: radial-gradient(circle, ${['#ff6b6b', '#4ecdc4', '#ffe66d'][Math.floor(Math.random() * 3)]}, transparent);
    `;
    document.querySelector('.fireworks').appendChild(firework);
    setTimeout(() => firework.remove(), 700);
};
setInterval(createFirework, 600);

// Hiệu ứng confetti
setInterval(() => confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } }), 2500);

// Hiệu ứng mờ sang rõ
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Điều hướng
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.page).scrollIntoView({ behavior: 'smooth' });
    });
});

// Cập nhật navbar khi cuộn
window.addEventListener('scroll', () => {
    const pages = document.querySelectorAll('.page');
    let currentPage = null;
    pages.forEach(page => {
        const rect = page.getBoundingClientRect();
        if (rect.top >= -100 && rect.top <= window.innerHeight / 2) currentPage = page.id;
    });
    if (currentPage) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.nav-btn[data-page="${currentPage}"]`).classList.add('active');
    }
});

// Chế độ sáng/tối
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.getElementById('theme-toggle').textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});