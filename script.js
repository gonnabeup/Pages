document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bgmusic');
    
    function playMusic() {
        audio.play().then(() => {
            console.log('🎵 Эпичная музыка запущена!');
        }).catch(e => {
            console.log('🔇 Autoplay заблокирован:', e);
        });
    }
    
    // Запуск по первому клику
    document.addEventListener('click', function handler() {
        playMusic();
        document.removeEventListener('click', handler);
    }, { once: true });
    
    // Запуск по первому нажатию клавиши
    document.addEventListener('keydown', function handler() {
        playMusic();
        document.removeEventListener('keydown', handler);
    }, { once: true });
    
    // Попытка автозапуска через таймер
    setTimeout(() => {
        playMusic();
    }, 1000);
    
    // Перезапуск при возврате на вкладку
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && audio.paused) {
            playMusic();
        }
    });
    
    // Touch для мобильных
    document.addEventListener('touchstart', function handler() {
        playMusic();
        document.removeEventListener('touchstart', handler);
    }, { once: true });
});
