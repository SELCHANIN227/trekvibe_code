(function() {

  /* Проверяет, является ли продукт автопалаткой по названию */
  function isTent(productEl) {
    var titleEl = productEl.querySelector('.t706__product-title, .t706__product-title a');
    if (!titleEl) return false;
    var title = (titleEl.textContent || '').trim().toLowerCase();
    return title.indexOf('автопалатка') === 0;
  }

  /* Считаем количество товаров БЕЗ автопалаток */
  function getCartTotalQuantity() {
    var total = 0;
    var products = document.querySelectorAll('.t706__product');

    products.forEach(function(product) {
      if (isTent(product)) return; /* автопалатки не считаем */

      var qty = 0;
      var qEl = product.querySelector('.t706__product-quantity');
      if (qEl) {
        var inp = qEl.querySelector('input');
        if (inp) {
          qty = parseInt(inp.value) || 0;
        } else {
          qty = parseInt(qEl.textContent) || 0;
        }
      }
      if (!qty) qty = 1;
      total += qty;
    });

    return total;
  }

  /* Есть ли в корзине хоть одна автопалатка */
  function hasTent() {
    var products = document.querySelectorAll('.t706__product');
    for (var i = 0; i < products.length; i++) {
      if (isTent(products[i])) return true;
    }
    return false;
  }

  function updateCartBanner() {
    var banner = document.getElementById('cart-mini-banner');
    if (!banner) return;

    var qty = getCartTotalQuantity();

    if (qty >= 3) {
      banner.classList.remove('state-orange');
      banner.classList.add('state-green');
      banner.innerHTML = '<span>Доставка вашего заказа будет <strong>бесплатная!</strong></span>';
    } else {
      banner.classList.remove('state-green');
      banner.classList.add('state-orange');
      var left = 3 - qty;
      var word = left === 1 ? 'товар' : 'товара';
      if (qty === 0) {
        banner.innerHTML = '<span>Добавьте <strong>3</strong> товара для <strong>бесплатной</strong> доставки!</span>';
      } else {
        banner.innerHTML = '<span>Добавьте ещё <strong>' + left + '</strong> ' + word + ' для <strong>бесплатной</strong> доставки!</span>';
      }
    }

    /* Сноска про автопалатки */
    var note = document.getElementById('cart-tent-note');
    if (note) {
      if (hasTent()) {
        note.classList.add('visible');
      } else {
        note.classList.remove('visible');
      }
    }
  }

  function injectCartBanner() {
    if (document.getElementById('cart-mini-banner')) {
      updateCartBanner();
      return;
    }
    var productsContainer = document.querySelector('.t706__cartwin-products');
    if (!productsContainer) return;

    var banner = document.createElement('div');
    banner.id = 'cart-mini-banner';

    var note = document.createElement('div');
    note.id = 'cart-tent-note';
    note.textContent = '* Автопалатки не участвуют в акции бесплатной доставки. Стоимость доставки автопалатки будет рассчитана после оформления заявки.';

    var amountBlock = document.querySelector('.t706__cartwin-amount');
    if (amountBlock) {
      amountBlock.parentNode.insertBefore(banner, amountBlock);
      amountBlock.parentNode.insertBefore(note, amountBlock);
    } else {
      productsContainer.parentNode.insertBefore(banner, productsContainer.nextSibling);
      productsContainer.parentNode.insertBefore(note, banner.nextSibling);
    }
    updateCartBanner();
  }

  var cartObserver = new MutationObserver(function(mutations) {
    var shouldCheck = false;
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType !== 1) return;
        if (
          (node.classList && (
            node.classList.contains('t706__cartwin') ||
            node.classList.contains('t706__product')
          )) ||
          (node.querySelector && node.querySelector('.t706__cartwin-products'))
        ) {
          shouldCheck = true;
        }
      });
      mutation.removedNodes.forEach(function(node) {
        if (node.nodeType !== 1) return;
        if (node.classList && node.classList.contains('t706__product')) {
          shouldCheck = true;
        }
      });
      if (mutation.type === 'characterData' || mutation.type === 'childList') {
        if (mutation.target.closest && mutation.target.closest('.t706__product')) {
          shouldCheck = true;
        }
      }
    });
    if (shouldCheck) {
      setTimeout(injectCartBanner, 200);
    }
  });

  cartObserver.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });

  document.addEventListener('click', function(e) {
    if (
      e.target.closest('.t706__product-plus') ||
      e.target.closest('.t706__product-minus') ||
      e.target.closest('.t706__product-del') ||
      e.target.closest('.t706__carticon')
    ) {
      setTimeout(updateCartBanner, 200);
      setTimeout(updateCartBanner, 500);
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.t706__cartwin-products')) {
      injectCartBanner();
    }
  });

})();
