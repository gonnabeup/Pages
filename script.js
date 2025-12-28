document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bgmusic');
    function updateBg() {
        document.body.style.setProperty('--bg-offset', -window.scrollY * 0.3);
    }
    updateBg();
    window.addEventListener('scroll', updateBg);
    const content = document.querySelector('.content');
    function updateMouse(e) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        document.body.style.setProperty('--mouse-x', x + '%');
        document.body.style.setProperty('--mouse-y', y + '%');
    }
    content.addEventListener('mouseenter', () => {
        document.body.style.setProperty('--spray-opacity', 0.2);
    });
    content.addEventListener('mousemove', updateMouse);
    content.addEventListener('mouseleave', () => {
        document.body.style.setProperty('--spray-opacity', 0);
        document.body.style.setProperty('--mouse-x', '50%');
        document.body.style.setProperty('--mouse-y', '50%');
    });
    function playMusic() {
        audio.play().then(() => {
            console.log('Music!');
            audio.volume = 0.7;
        }).catch(e => {
            console.log('Autoplay blocked:', e);
        });
    }
    document.body.addEventListener('click', playMusic, { once: true });
    document.body.addEventListener('touchstart', playMusic, { once: true });
    document.body.addEventListener('keydown', playMusic, { once: true });
    window.addEventListener('scroll', playMusic, { once: true });
    document.body.addEventListener('mousemove', playMusic, { once: true });
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && audio.paused) {
            playMusic();
        }
    });
    let attempts = 0;
    function tryAutoplay() {
        attempts++;
        playMusic();
        if (attempts < 3) {
            setTimeout(tryAutoplay, 1500 * attempts);
        }
    }
    setTimeout(tryAutoplay, 500);
    setInterval(() => {
        if (audio.paused && attempts > 0) {
            playMusic();
        }
    }, 10000);
});
