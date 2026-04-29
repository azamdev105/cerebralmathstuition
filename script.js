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
}());
