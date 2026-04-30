(function () {
  var header = document.querySelector('header');
  var ticking = false;
  var isScrolled = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  function update() {
    var shouldScroll = window.scrollY > 40;
    if (shouldScroll !== isScrolled) {
      isScrolled = shouldScroll;
      header.classList.toggle('scrolled', isScrolled);
    }
    ticking = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.style.animationDelay = e.target.dataset.reveal + 'ms';
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  var supportGrid = document.querySelector('.support-grid');
  if ('IntersectionObserver' in window && supportGrid) {
    var gridIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var cards = e.target.querySelectorAll('.card-support');
        cards.forEach(function (card, i) {
          card.style.animationDelay = (i * 80) + 'ms';
          card.classList.add('revealed');
        });
        gridIo.unobserve(e.target);
      });
    }, { threshold: 0.1 });
    gridIo.observe(supportGrid);
  }

  var faqList = document.querySelector('.faq-list');
  if (faqList) {
    var currentOpen = null;
    faqList.addEventListener('click', function (e) {
      var btn = e.target.closest('.faq-question');
      if (!btn) return;
      var answer = document.getElementById(btn.getAttribute('aria-controls'));
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      if (currentOpen && currentOpen !== btn) {
        var prevAnswer = document.getElementById(currentOpen.getAttribute('aria-controls'));
        currentOpen.setAttribute('aria-expanded', 'false');
        prevAnswer.setAttribute('aria-hidden', 'true');
      }
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      answer.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
      currentOpen = isOpen ? null : btn;
    });

    if ('IntersectionObserver' in window) {
      var faqIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var items = e.target.querySelectorAll('.faq-item');
          items.forEach(function (item, i) {
            item.style.animationDelay = (i * 80) + 'ms';
            item.classList.add('revealed');
          });
          faqIo.unobserve(e.target);
        });
      }, { threshold: 0.1 });
      faqIo.observe(faqList);
    }
  }
}());
