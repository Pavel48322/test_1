//=========================================Создание переменных и констант===============================================
const isIOS = navigator.userAgent.toLowerCase().match(/iPhone|iPad|iPod/i);
const fullScreen = document.getElementsByClassName('full_screen')[0];
//======================================================================================================================

//===============================================Создание функций=======================================================
const hideImage = () => {
    // !isIOS && document.body.requestFullscreen();
    fullScreen.classList.add('full_screen_none');
    // isIOS && document.removeEventListener('touchend', () => hideImage());
    isIOS && document.removeEventListener('click', () => hideImage());
}

const contentLoaded = () => {
    setTimeout(() => {
        hideImage();
    }, 5000);

    document.removeEventListener("DOMContentLoaded", () => contentLoaded());
}
//======================================================================================================================

//=================================Отображение иконки запуска полноэкранного режима=====================================
if (isIOS) {
    fullScreen.classList.add('full_screen_ios');
} else {
    fullScreen.classList.add('full_screen_android');
}
//======================================================================================================================

//================================================Запуск событий========================================================
document.addEventListener('touchend', () => hideImage());

document.addEventListener('click', () => hideImage());

document.addEventListener("DOMContentLoaded", () => contentLoaded());
//======================================================================================================================