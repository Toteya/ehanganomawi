// Handles standard interactivy of web application
$(document).ready(() => {
  const burgerIcon = document.querySelector('#burger');
  const navbarMenu = document.querySelector('#navbar-links');

  burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active');
  })
});