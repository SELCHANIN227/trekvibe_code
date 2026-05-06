(function(){
  if(window.__tvbInit) return;
  window.__tvbInit = true;

  var b1 = null, b2 = null;
  var b1timer = null, b2timer = null;
  var b1visible = false, b2visible = false;

  function getBadge(){ return document.querySelector('.t706__carticon-counter'); }
  function getCartCount(){
    var b = getBadge();
    return b ? (parseInt(b.textContent) || 0) : 0;
  }

  function createBanners(){
    if(!document.getElementById('tvb')){
      var _tvb = document.createElement('div');
      _tvb.id = 'tvb';
      _tvb.innerHTML =
        '<button id="tvb-x" aria-label="Закрыть">×</button>' +
        '<div class="tvb-title">Отличный<br>выбор!</div>' +
        '<div class="tvb-text">Добавьте ещё <strong>2 товара</strong> в корзину и получите <strong>скидку</strong>.</div>' +
        '<button id="tvb-continue" class="tvb-btn">Продолжить покупки</button>';
      document.body.appendChild(_tvb);
    }
    if(!document.getElementById('tvb2')){
      var _tvb2 = document.createElement('div');
      _tvb2.id = 'tvb2';
      _tvb2.innerHTML =
        '<button id="tvb2-x" aria-label="Закрыть">×</button>' +
        '<div class="tvb2-title">Ещё<br>немного!</div>' +
        '<div class="tvb2-text">Добавьте ещё <strong>1 товар</strong> и получите <strong>максимальную скидку</strong>.</div>' +
        '<button id="tvb2-continue" class="tvb2-btn">Продолжить покупки</button>';
      document.body.appendChild(_tvb2);
    }
  }

  function b1show(){
    if(!b1 || b1visible) return;
    if(sessionStorage.getItem('tvb_shown')) return;
    sessionStorage.setItem('tvb_shown','1');
    b1visible = true;
    b1.style.visibility = 'visible';
    setTimeout(function(){ if(b1) b1.classList.add('tvb-show'); }, 50);
    b1timer = setTimeout(b1hide, 10000);
  }
  function b1hide(){
    if(!b1) return;
    if(b1timer){ clearTimeout(b1timer); b1timer = null; }
    b1visible = false;
    b1.classList.remove('tvb-show');
    setTimeout(function(){ if(b1) b1.style.visibility = 'hidden'; }, 400);
  }

  function b2show(){
    if(!b2 || b2visible) return;
    if(sessionStorage.getItem('tvb2_shown')) return;
    sessionStorage.setItem('tvb2_shown','1');
    b2visible = true;
    b2.style.visibility = 'visible';
    setTimeout(function(){ if(b2) b2.classList.add('tvb2-show'); }, 50);
    b2timer = setTimeout(b2hide, 10000);
  }
  function b2hide(){
    if(!b2) return;
    if(b2timer){ clearTimeout(b2timer); b2timer = null; }
    b2visible = false;
    b2.classList.remove('tvb2-show');
    setTimeout(function(){ if(b2) b2.style.visibility = 'hidden'; }, 400);
  }

  function bindButtons(){
    var b1x = document.getElementById('tvb-x');
    var b1c = document.getElementById('tvb-continue');
    var b2x = document.getElementById('tvb2-x');
    var b2c = document.getElementById('tvb2-continue');
    if(b1x) b1x.addEventListener('click', b1hide);
    if(b1c) b1c.addEventListener('click', b1hide);
    if(b2x) b2x.addEventListener('click', b2hide);
    if(b2c) b2c.addEventListener('click', b2hide);
  }

  document.addEventListener('click', function(e){
    var t = e.target;
    var cls = typeof t.className === 'string' ? t.className : '';
    var p = t.parentNode;
    var pcls = (p && typeof p.className === 'string') ? p.className : '';
    var found =
      cls.indexOf('t-store__prod-popup__btn') !== -1 ||
      cls.indexOf('js-store-prod-popup-buy-btn-txt') !== -1 ||
      cls.indexOf('t-store__btn-buy') !== -1 ||
      cls.indexOf('t744__btn') !== -1 ||
      pcls.indexOf('t-store__prod-popup__btn') !== -1 ||
      pcls.indexOf('js-store-prod-popup-buy-btn-txt') !== -1 ||
      pcls.indexOf('t-store__btn-buy') !== -1 ||
      pcls.indexOf('t744__btn') !== -1 ||
      pcls.indexOf('t706__product-plus') !== -1;
    if(!found) return;

    setTimeout(function(){
      var n = getCartCount();
      if(n === 1) b1show();
      if(n === 2) b2show();
    }, 50);
  });

  function watchBadge(badge){
    var obs = new MutationObserver(function(){
      if((parseInt(badge.textContent) || 0) === 0){
        sessionStorage.removeItem('tvb_shown');
        sessionStorage.removeItem('tvb2_shown');
        b1visible = false;
        b2visible = false;
      }
    });
    obs.observe(badge, {childList:true, subtree:true, characterData:true});
  }

  function init(){
    createBanners();
    b1 = document.getElementById('tvb');
    b2 = document.getElementById('tvb2');
    bindButtons();

    var badge = getBadge();
    if(badge){
      watchBadge(badge);
      if((parseInt(badge.textContent) || 0) === 0){
        sessionStorage.removeItem('tvb_shown');
        sessionStorage.removeItem('tvb2_shown');
      }
    } else {
      var obs = new MutationObserver(function(){
        var bb = getBadge();
        if(bb){ obs.disconnect(); watchBadge(bb); }
      });
      obs.observe(document.body, {childList:true, subtree:true});
    }
  }

  if(document.body){
    setTimeout(init, 500);
  } else {
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(init, 500); });
  }
})();
