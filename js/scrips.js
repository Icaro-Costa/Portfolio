window.onload = function() {
    document.body.classList.add('no-scroll');
};

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
}