const headerEl = document.getElementById('header');
const burgerEl = document.getElementById('burgerMenu');

const classes = {
  SHOW_BURGER_CLASS: 'show',
};

const expandBurgerMenu = (navbarEl) => {
  navbarEl.style.height = 247;
  navbarEl.style.display = 'block';
  navbarEl.classList.add(classes.SHOW_BURGER_CLASS);
};

const closeBurgerMenu = (navbarEl) => {
  navbarEl.style.display = 'none';
  navbarEl.style.height = 0;
  navbarEl.classList.remove(classes.SHOW_BURGER_CLASS);
};

burgerEl.addEventListener('click', function toggleBurger() {
  const navEl = document.getElementById('navbar');
  
  if (!navEl.classList.contains(classes.SHOW_BURGER_CLASS)) {
    expandBurgerMenu(navEl);
  } else {
    closeBurgerMenu(navEl);
  }
});
