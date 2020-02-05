document.getElementById('small-menu').addEventListener('click', openMenu);

let smallMenu = document.getElementById('nav-display-small');
function openMenu() {
  smallMenu.style.display = 'block';
}
document.getElementById('exit').addEventListener('click', closeMenu);
function closeMenu() {
  smallMenu.style.display = 'none';
}
