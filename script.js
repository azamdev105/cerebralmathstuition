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
}());
