/**
 * Portfolio – Le Thi Khanh Linh
 * Language toggle, mobile nav, scroll animations, navbar shadow
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    /* ---- Language Toggle ---- */
    const btnVI = document.getElementById('btnVI');
    const btnEN = document.getElementById('btnEN');

    function setLang(lang) {
      document.querySelectorAll('[data-vi]').forEach(function (el) {
        el.textContent = lang === 'vi' ? el.dataset.vi : el.dataset.en;
      });
      btnVI.classList.toggle('active', lang === 'vi');
      btnEN.classList.toggle('active', lang === 'en');
      document.documentElement.lang = lang === 'vi' ? 'vi' : 'en';
    }

    if (btnVI && btnEN) {
      btnVI.addEventListener('click', function () {
        setLang('vi');
      });
      btnEN.addEventListener('click', function () {
        setLang('en');
      });
    }

    /* ---- Hamburger ---- */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('open');
      });
      navLinks.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          navLinks.classList.remove('open');
        });
      });
    }

    /* ---- Scroll Fade In ---- */
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.fade-in').forEach(function (el) {
      observer.observe(el);
    });

    /* ---- Navbar shadow on scroll ---- */
    const navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', function () {
        navbar.style.boxShadow =
          window.scrollY > 40 ? '0 4px 30px rgba(233,30,140,0.1)' : 'none';
      });
    }
  });
})();
