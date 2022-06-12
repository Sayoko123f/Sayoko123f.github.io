'use strict';
window.addEventListener('load', () => {
    // go top button
    document.querySelector('#goto-top-button').addEventListener('click', () => {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    });
    //  light, dark toggle
    document
        .querySelector('#light-mode-button')
        .addEventListener('click', () => {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
        });
    document
        .querySelector('#dark-mode-button')
        .addEventListener('click', () => {
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
        });
});
