document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bgmusic');
    
    // ГЛАВНАЯ ФУНКЦИЯ ЗАПУСКА МУЗЫКИ
    function playMusic() {
        audio.play().then(() => {
            console.log('🎵 Эпичная музыка запущена!');
            audio.volume = 0.7; // Громкость 70%
        }).catch(e => {
            console.log('🔇 Autoplay заблокирован:', e);
        });
    }
    
    // ✅ КЛИК МЫШЬЮ (основной триггер)
    document.body.addEventListener('click', playMusic, { once: true });
    
    // ✅ КАСАНИЕ (мобильные устройства)
    document.body.addEventListener('touchstart', playMusic, { once: true });
    
    // ✅ КЛАВИАТУРА (любая клавиша)
    document.body.addEventListener('keydown', playMusic, { once: true });
    
    // ✅ СКРОЛЛ (прокрутка страницы)
    window.addEventListener('scroll', playMusic, { once: true });
    
    // ✅ ДВИЖЕНИЕ МЫШИ (hover эффект)
    document.body.addEventListener('mousemove', playMusic, { once: true });
    
    // ✅ ПОЯВИЛАСЬ ВКЛАДКА (возврат пользователя)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && audio.paused) {
            playMusic();
        }
    });
    
    // ⚡ АГРЕССИВНЫЙ АВТОЗАПУСК (несколько попыток)
    let attempts = 0;
    function tryAutoplay() {
        attempts++;
        playMusic();
        if (attempts < 3) {
            setTimeout(tryAutoplay, 1500 * attempts); // 1.5s, 3s, 4.5s
        }
    }
    setTimeout(tryAutoplay, 500);
    
    // 🔄 ЛУП ПРОВЕРКА (если остановили)
    setInterval(() => {
        if (audio.paused && attempts > 0) {
            playMusic();
        }
    }, 10000); // Каждые 10 сек
});
