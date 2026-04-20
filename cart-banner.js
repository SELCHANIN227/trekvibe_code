(function() {

  function getCartTotalQuantity() {
    var total = 0;
    document.querySelectorAll('.t706__product-quantity').forEach(function(el) {
      total += parseInt(el.textContent) || 0;
    });
    if (total > 0) return total;
    document.querySelectorAll('.t706__product-quantity input').forEach(function(el) {
      total += parseInt(el.value) || 0;
    });
    if (total > 0) return total;
    return document.querySelectorAll('.t706__product').length;
  }

  function updateCartBanner() {
    var banner = document.getElementById('cart-mini-banner');
    if (!banner) return;
    var qty = getCartTotalQuantity();
    if (qty >= 2) {
      banner.classList.remove('state-orange');
      banner.classList.add('state-green');
      banner.innerHTML = '<span>Доставка вашего заказа будет <strong>бесплатная!</strong></span>';
    } else {
      banner.classList.remove('state-green');
      banner.classList.add('state-orange');
      banner.innerHTML = '<span>Добавьте ещё один товар для <strong>бесплатной</strong> доставки!</span>';
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
    var amountBlock = document.querySelector('.t706__cartwin-amount');
    if (amountBlock) {
      amountBlock.parentNode.insertBefore(banner, amountBlock);
    } else {
      productsContainer.parentNode.insertBefore(banner, productsContainer.nextSibling);
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
