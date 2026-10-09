/* Arts Martiaux de Brunoy — main.js */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Mobile Menu Toggle
  var toggle = document.getElementById('mobile-toggle') || document.querySelector('.mobile-toggle');
  var nav = document.getElementById('main-nav') || document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  // 2. Scroll Reveal Animations
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .reveal-zoom').forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal, .reveal-zoom').forEach(function (el) {
      el.classList.add('active');
    });
  }

  // 3. Lightbox Functionality
  var lightbox = document.querySelector('.lightbox');
  var lightboxImg = document.querySelector('.lightbox img');
  var lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox && lightboxImg) {
    document.addEventListener('click', function (e) {
      var item = e.target.closest('.gallery-item, [data-lightbox]');
      if (item) {
        var img = item.querySelector('img') || (item.tagName === 'IMG' ? item : null);
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || 'Arts Martiaux de Brunoy';
          lightbox.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      }
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  // 4. Gallery Category Filter Buttons
  var filterButtons = document.querySelectorAll('.gallery-filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-grid-item');

  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.getAttribute('data-filter');

        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        galleryItems.forEach(function (item) {
          var itemCat = item.getAttribute('data-category');
          if (cat === 'all' || itemCat === cat || (itemCat && itemCat.indexOf(cat) !== -1)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
});
