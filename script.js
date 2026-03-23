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
          window.scrollY > 40 ? '0 4px 24px rgba(171, 71, 36, 0.08)' : 'none';
      });
    }

    /* ---- Portfolio Filter ---- */
    var filterBtns = document.querySelectorAll('.pf-filter');
    var pfCards = document.querySelectorAll('.pf-card');

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.dataset.filter;
        pfCards.forEach(function (card) {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('pf-hidden');
          } else {
            card.classList.add('pf-hidden');
          }
        });
      });
    });

    /* ---- Load Thumbnails via oEmbed ---- */
    pfCards.forEach(function (card) {
      var videoUrl = card.dataset.videoUrl;
      var externalUrl = card.dataset.externalUrl;

      if (videoUrl) {
        fetch('https://www.tiktok.com/oembed?url=' + encodeURIComponent(videoUrl))
          .then(function (res) { return res.json(); })
          .then(function (data) {
            if (data.thumbnail_url) {
              var img = document.createElement('img');
              img.className = 'pf-card-thumb';
              img.alt = data.title || 'TikTok video';
              img.onload = function () { img.classList.add('loaded'); };
              img.src = data.thumbnail_url;
              card.appendChild(img);

              if (data.title) {
                var titleEl = card.querySelector('.pf-card-title');
                if (titleEl) {
                  titleEl.textContent = data.title.length > 50
                    ? data.title.substring(0, 50) + '\u2026'
                    : data.title;
                }
              }
            }
          })
          .catch(function () {});
      }

      if (externalUrl && externalUrl.includes('facebook.com')) {
        var pageName = externalUrl.split('facebook.com/')[1];
        if (pageName) {
          var img = document.createElement('img');
          img.className = 'pf-card-thumb';
          img.alt = 'PriorBay Resort';
          img.onload = function () { img.classList.add('loaded'); };
          img.onerror = function () { this.remove(); };
          img.src = 'https://graph.facebook.com/' +
            encodeURIComponent(pageName) + '/picture?type=large&redirect=true&width=720&height=720';
          card.appendChild(img);
        }
      }
    });

    /* ---- Video Modal ---- */
    var modal = document.getElementById('videoModal');
    var modalFrame = document.getElementById('vmFrame');
    var modalClose = document.getElementById('vmClose');
    var modalExternal = document.getElementById('vmExternal');

    function openVideoModal(videoId, videoUrl) {
      var loader = '<div class="vm-loader"><div class="vm-spinner"></div></div>';
      var iframe = '<iframe src="https://www.tiktok.com/embed/v2/' + videoId +
        '" allowfullscreen allow="encrypted-media"></iframe>';
      modalFrame.innerHTML = loader + iframe;
      modalExternal.href = videoUrl;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(function () {
        modalFrame.innerHTML = '<div class="vm-loader"><div class="vm-spinner"></div></div>';
      }, 350);
    }

    pfCards.forEach(function (card) {
      card.addEventListener('click', function () {
        var videoId = card.dataset.videoId;
        var videoUrl = card.dataset.videoUrl;
        var externalUrl = card.dataset.externalUrl;

        if (videoId && videoUrl) {
          openVideoModal(videoId, videoUrl);
        } else if (externalUrl) {
          window.open(externalUrl, '_blank', 'noopener');
        }
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', closeVideoModal);
    }
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) { closeVideoModal(); }
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeVideoModal();
      }
    });
  });
})();
