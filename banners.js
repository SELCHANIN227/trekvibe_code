(function(){
  if(window.__tvbInit) return;
  window.__tvbInit = true;

  var b1=null, b2=null, b3=null;
  var t1=null, t2=null, t3=null;
  var v1=false, v2=false, v3=false;

  function getBadge(){ return document.querySelector('.t706__carticon-counter'); }
  function getCartCount(){
    var b = getBadge();
    return b ? (parseInt(b.textContent) || 0) : 0;
  }

  function createBanners(){
    if(!document.getElementById('tvb')){
      var e1 = document.createElement('div');
      e1.id = 'tvb';
      e1.innerHTML =
        '<button id="tvb-x" aria-label="Закрыть">×</button>' +
        '<div class="tvb-title">Отличный<br>выбор!</div>' +
        '<div class="tvb-text">Добавьте ещё <strong>2 товара</strong> в корзину и получите <strong>бесплатную доставку</strong>.</div>' +
        '<button id="tvb-continue" class="tvb-btn">Продолжить покупки</button>';
      document.body.appendChild(e1);
    }
    if(!document.getElementById('tvb3')){
      var e3 = document.createElement('div');
      e3.id = 'tvb3';
      e3.innerHTML =
        '<button id="tvb3-x" aria-label="Закрыть">×</button>' +
        '<div class="tvb3-title">Почти<br>у цели!</div>' +
        '<div class="tvb3-text">Добавьте ещё <strong>1 товар</strong> и получите <strong>бесплатную доставку по России</strong>.</div>' +
        '<button id="tvb3-continue" class="tvb3-btn">Продолжить покупки</button>';
      document.body.appendChild(e3);
    }
    if(!document.getElementById('tvb2')){
      var e2 = document.createElement('div');
      e2.id = 'tvb2';
      e2.innerHTML =
        '<button id="tvb2-x" aria-label="Закрыть">×</button>' +
        '<div class="tvb2-title">Бесплатная<br>доставка<br>по России!</div>' +
        '<div class="tvb2-text">Вы добавили третий товар. Теперь ваша доставка <strong>бесплатная!</strong></div>' +
        '<button id="tvb2-continue" class="tvb2-btn">Продолжить покупки</button>';
      document.body.appendChild(e2);
    }
  }

  function show(el, cls, key, vFlag, timerRef){
    if(!el || vFlag.v) return;
    if(sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key,'1');
    vFlag.v = true;
    el.style.visibility = 'visible';
    setTimeout(function(){ if(el) el.classList.add(cls); }, 50);
    timerRef.t = setTimeout(function(){ hide(el, cls, vFlag, timerRef); }, 10000);
  }
  function hide(el, cls, vFlag, timerRef){
    if(!el) return;
    if(timerRef.t){ clearTimeout(timerRef.t); timerRef.t = null; }
    vFlag.v = false;
    el.classList.remove(cls);
    setTimeout(function(){ if(el) el.style.visibility = 'hidden'; }, 400);
  }

  var v1o={v:false}, v2o={v:false}, v3o={v:false};
  var t1o={t:null}, t2o={t:null}, t3o={t:null};

  function b1show(){ show(b1,'tvb-show','tvb_shown',v1o,t1o); }
  function b1hide(){ hide(b1,'tvb-show',v1o,t1o); }
  function b3show(){ show(b3,'tvb3-show','tvb3_shown',v3o,t3o); }
  function b3hide(){ hide(b3,'tvb3-show',v3o,t3o); }
  function b2show(){ show(b2,'tvb2-show','tvb2_shown',v2o,t2o); }
  function b2hide(){ hide(b2,'tvb2-show',v2o,t2o); }

  function bindButtons(){
    var map = [
      ['tvb-x', b1hide], ['tvb-continue', b1hide],
      ['tvb3-x', b3hide], ['tvb3-continue', b3hide],
      ['tvb2-x', b2hide], ['tvb2-continue', b2hide]
    ];
    map.forEach(function(p){
      var el = document.getElementById(p[0]);
      if(el) el.addEventListener('click', p[1]);
    });
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
      else if(n === 2) b3show();
      else if(n === 3) b2show();
    }, 50);
  });

  function watchBadge(badge){
    var obs = new MutationObserver(function(){
      if((parseInt(badge.textContent) || 0) === 0){
        sessionStorage.removeItem('tvb_shown');
        sessionStorage.removeItem('tvb2_shown');
        sessionStorage.removeItem('tvb3_shown');
        v1o.v=false; v2o.v=false; v3o.v=false;
      }
    });
    obs.observe(badge, {childList:true, subtree:true, characterData:true});
  }

  function init(){
    createBanners();
    b1 = document.getElementById('tvb');
    b3 = document.getElementById('tvb3');
    b2 = document.getElementById('tvb2');
    bindButtons();

    var badge = getBadge();
    if(badge){
      watchBadge(badge);
      if((parseInt(badge.textContent) || 0) === 0){
        sessionStorage.removeItem('tvb_shown');
        sessionStorage.removeItem('tvb2_shown');
        sessionStorage.removeItem('tvb3_shown');
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
