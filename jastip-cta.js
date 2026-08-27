(function() {
  function placeJastipCta() {
    var cta = document.querySelector('.jastip-cta');
    var titleBlock = document.querySelector('.page-hero, .hero, .hero-slider, .browse-header, .reader-header, .profile-header, .detail-hero');
    if (cta && cta.closest('.hero')) return true;
    if (!cta || !titleBlock || cta.previousElementSibling === titleBlock) return !!cta && !!titleBlock;
    var stockPromo = document.querySelector('.stock-promo');
    (stockPromo || titleBlock).after(cta);
    return true;
  }

  function placeStockPromo() {
    var titleBlock = document.querySelector('.page-hero, .hero, .hero-slider, .browse-header, .reader-header, .profile-header, .detail-hero');
    var existingPromo = document.querySelector('.promo-banner');
    if (/stockmobil\.html$/i.test(window.location.pathname)) return !!titleBlock;
    if (!titleBlock || document.querySelector('.stock-promo') || (existingPromo && getComputedStyle(existingPromo).display !== 'none')) return !!titleBlock;
    var promo = document.createElement('div');
    promo.className = 'stock-promo';
    promo.innerHTML = '<a href="stockmobil.html" aria-label="Lihat Stock Mobil Murah"><i class="fas fa-car stock-promo-icon"></i><div class="stock-promo-copy"><strong>Stock Mobil Murah</strong> mulai <span>2rb</span> untuk Car Parking Multiplayer</div><i class="fas fa-arrow-right stock-promo-arrow"></i></a>';
    titleBlock.after(promo);
    return true;
  }

  document.addEventListener('DOMContentLoaded', function() {
    placeStockPromo();
    if (placeJastipCta()) return;
    var observer = new MutationObserver(function() {
      placeStockPromo();
      if (placeJastipCta()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
