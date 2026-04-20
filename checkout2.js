(function(){
var leafletJs=document.createElement('script');
leafletJs.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
leafletJs.onload=init;
document.head.appendChild(leafletJs);

function init(){
var DT='c9aa817ed1d374c93a7983bf2bb583b694319c1c';
var SK='cst_checkout_data';
var PROMO_DISCOUNTS={'OZON':5,'LS78':5,'WB':5};
var QR_EXTRA_PERCENT=3;
var FORM_ID='form1888069311';
var cc={n:'Россия',d:'+7',ml:10,ph:'(999) 999-99-99'};
var mp=null,ins=false,mi=false,reord=false,agreeChecked=false,_injecting=false;
var _focused=false;
var userPromoInput='';
var promoApplied=false;
var _pollingStarted=false;
var _watchersStarted=false;

var _cartBase=0;
var _lastDisplayed=0;
var _writing=false;

document.addEventListener('focusin',function(e){
  if(e.target&&(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')){
    _focused=true;
  }
});
document.addEventListener('focusout',function(e){
  if(e.target&&(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')){
    setTimeout(function(){_focused=false;},500);
  }
});

var countries=[
{n:'Россия',d:'+7',ml:10,ph:'(999) 999-99-99'},
{n:'Украина',d:'+380',ml:9,ph:'(99) 999-99-99'},
{n:'Беларусь',d:'+375',ml:9,ph:'(99) 999-99-99'},
{n:'Казахстан',d:'+7',ml:10,ph:'(999) 999-99-99'},
{n:'Узбекистан',d:'+998',ml:9,ph:'(99) 999-99-99'},
{n:'Кыргызстан',d:'+996',ml:9,ph:'(999) 999-999'},
{n:'Таджикистан',d:'+992',ml:9,ph:'(99) 999-99-99'},
{n:'Армения',d:'+374',ml:8,ph:'(99) 999-999'},
{n:'Грузия',d:'+995',ml:9,ph:'(999) 999-999'},
{n:'Азербайджан',d:'+994',ml:9,ph:'(99) 999-99-99'},
{n:'Молдова',d:'+373',ml:8,ph:'(99) 999-999'},
{n:'Германия',d:'+49',ml:10,ph:'(999) 999-9999'},
{n:'Франция',d:'+33',ml:9,ph:'(9) 99-99-99-99'},
{n:'Италия',d:'+39',ml:10,ph:'(99) 9999-9999'},
{n:'Испания',d:'+34',ml:9,ph:'(999) 999-999'},
{n:'США',d:'+1',ml:10,ph:'(999) 999-9999'},
{n:'Великобритания',d:'+44',ml:10,ph:'(9999) 999-999'},
{n:'Турция',d:'+90',ml:10,ph:'(999) 999-99-99'},
{n:'Израиль',d:'+972',ml:9,ph:'(99) 999-9999'},
{n:'ОАЭ',d:'+971',ml:9,ph:'(99) 999-9999'}
];

var rH='<div class="cst-block receiver-block" id="rBlock">'
+'<div class="cst-title">Данные получателя<span class="cst-req"> *</span></div>'
+'<div class="cst-fields">'
+'<div class="cst-field"><input type="text" placeholder="Фамилия и имя" id="r_name" autocomplete="name"/><div class="cst-err-msg">Заполните имя</div></div>'
+'<div class="cst-field"><input type="email" placeholder="Email" id="r_email" autocomplete="email"/><div class="cst-err-msg">Введите корректный email</div></div>'
+'<div class="cst-field" id="phoneField">'
+'<div class="cst-phone-wrap" id="phoneWrap">'
+'<div class="cst-phone-btn" id="phoneBtn"><span class="pc" id="phoneCode">+7</span><span class="pa">&#9662;</span></div>'
+'<input type="tel" class="cst-phone-input" placeholder="(999) 999-99-99" id="r_phone" autocomplete="tel"/>'
+'</div>'
+'<div class="cst-err-msg">Введите номер телефона</div>'
+'<div class="cst-country-list" id="countryList">'
+'<input type="text" class="cst-country-search" placeholder="Поиск страны..." id="countrySearch"/>'
+'<div id="countryItems"></div>'
+'</div>'
+'</div>'
+'</div></div>';

var dH='<div class="cst-block delivery-block" id="dBlock">'
+'<div class="cst-title">Способ доставки<span class="cst-req"> *</span></div>'
+'<div class="dlv-opt" data-d="tk"><div class="dlv-radio"><div class="dlv-dot"></div></div><div class="dlv-label">Доставка транспортной компанией<span>по всей территории РФ</span></div></div>'
+'<div class="dlv-cnt" id="cnt-tk">'
+'<div class="dlv-sel-w"><select class="dlv-sel" id="selTK"><option value="" disabled selected>Выберите транспортную компанию</option><option value="cdek">CDEK</option><option value="baikal">Байкал-Сервис</option><option value="pek">ПЭК</option><option value="kit">КИТ</option><option value="boxberry">Boxberry</option></select></div>'
+'<div class="dlv-sub" id="tk-sub">'
+'<div class="dlv-sub-opts">'
+'<div class="dlv-sub-o active" data-ts="pvz"><div class="dlv-sub-r"><div class="dlv-sub-d"></div></div><div class="dlv-sub-l">Доставка в ПВЗ</div></div>'
+'<div class="dlv-sub-o" data-ts="tkc"><div class="dlv-sub-r"><div class="dlv-sub-d"></div></div><div class="dlv-sub-l">Доставка курьером</div></div>'
+'</div>'
+'<div class="dlv-tk-addr visible" id="tk-pvz"><div class="dd-wrap"><input type="text" placeholder="Адрес или номер ПВЗ" id="i_pvz" autocomplete="off"/><div class="dd-list" id="dd-pvz"></div></div></div>'
+'<div class="dlv-tk-addr" id="tk-ca"><div class="dd-wrap"><input type="text" placeholder="Адрес доставки" id="i_tkc" autocomplete="off"/><div class="dd-list" id="dd-tkc"></div></div></div>'
+'<div class="dlv-hint">Оплата доставки согласно тарифу ТК во время получения заказа</div>'
+'</div></div>'
+'<div class="dlv-opt" data-d="courier"><div class="dlv-radio"><div class="dlv-dot"></div></div><div class="dlv-label">Доставка курьером<span>только Санкт-Петербург</span></div></div>'
+'<div class="dlv-cnt" id="cnt-cour">'
+'<div class="dlv-fields">'
+'<div class="dlv-f dlv-f-full"><input type="text" placeholder="Улица *" id="i_str" autocomplete="off"/></div>'
+'<div class="dlv-f"><input type="text" placeholder="Дом *" id="i_hou"/></div>'
+'<div class="dlv-f"><input type="text" placeholder="Квартира" id="i_apt"/></div>'
+'<div class="dlv-f"><input type="text" placeholder="Этаж" id="i_fl"/></div>'
+'<div class="dlv-f"><input type="text" placeholder="Домофон" id="i_dom"/></div>'
+'<div class="dlv-f dlv-f-full"><textarea placeholder="Комментарий для курьера" id="i_cmt" rows="2"></textarea></div>'
+'</div>'
+'<div class="dlv-hint dlv-hint-o">Позвоним или напишем в мессенджере для согласования даты и времени доставки</div>'
+'</div>'
+'<div class="dlv-opt" data-d="pickup"><div class="dlv-radio"><div class="dlv-dot"></div></div><div class="dlv-label">Самовывоз со склада<span>только Санкт-Петербург</span></div></div>'
+'<div class="dlv-cnt" id="cnt-pickup"><div id="dlv-map"></div><div class="dlv-hint"><b style="color:#FF6B35">Санкт-Петербург, ул. Полярников, д. 9</b></div><div class="dlv-hint dlv-hint-o">Позвоним или напишем в мессенджере для согласования даты и времени вашего визита</div></div>'
+'</div>';

var pH='<div class="cst-block payment-block" id="pBlock">'
+'<div class="cst-title">Способ оплаты<span class="cst-req"> *</span></div>'
+'<div class="pay-opt" data-p="card"><div class="pay-radio"><div class="pay-dot"></div></div><div class="pay-label">Банковской картой<span>доступно для всех способов доставки</span></div></div>'
+'<div class="pay-opt" data-p="qr" id="payQR"><div class="pay-radio"><div class="pay-dot"></div></div><div class="pay-label">QR-кодом<span>доступно для всех способов доставки</span></div><div class="pay-discount-badge">Скидка 3%</div></div>'
+'<div class="pay-opt" data-p="cash" id="payCash" style="min-height:62px;"><div class="pay-radio"><div class="pay-dot"></div></div><div class="pay-label" style="display:flex;align-items:center;">Наличными при получении</div></div>'
+'<div class="cst-discount-info" id="discountInfo"></div>'
+'<div class="promo-wrap">'
+'<label class="promo-label">Промокод</label>'
+'<div class="promo-row" id="promoInputRow">'
+'<input type="text" id="promoInput" placeholder="Введите промокод" maxlength="20" autocomplete="off"/>'
+'<button type="button" class="promo-apply-btn" id="promoApplyBtn">Применить</button>'
+'</div>'
+'<div id="promoMsg" class="promo-msg"></div>'
+'</div>'
+'<div class="cst-agree-wrap" id="agreeWrap"><div class="cst-agree-box" id="agreeBox"><svg class="cst-agree-check" viewBox="0 0 12 12"><polyline points="2 6 5 9 10 3"/></svg></div>'
+'<div class="cst-agree-text">Согласен с <a href="https://trekvibe.ru/privacy" target="_blank">политикой обработки персональных данных</a> и <a href="https://trekvibe.ru/oferta" target="_blank">публичной офертой</a></div></div>'
+'<div class="cst-agree-err" id="agreeErr">Необходимо согласие с политикой и офертой</div>'
+'<div class="cst-val-err" id="cstValErr">Заполните обязательную информацию</div>'
+'</div>';

/* ===== УТИЛИТЫ ===== */
function parseSum(str){return parseInt((str||'').replace(/\s/g,'').replace(/[^\d]/g,''))||0;}
function fmtSum(n){return n.toLocaleString('ru-RU')+' р.';}

/* ===== ЧТЕНИЕ СУММЫ ИЗ ГРАФЫ "Сумма:" ===== */
function readProdAmount(){
  var el=document.querySelector('.t706__cartwin-prodamount-price');
  if(el){
    return parseSum(el.textContent);
  }
  return 0;
}

function calcCartBase(){
  /* 1. Приоритет: строка "Сумма:" (prodamount) — её мы НЕ перезаписываем */
  var el=document.querySelector('.t706__cartwin-prodamount-price');
  if(el){
    var s=parseSum(el.textContent);
    if(s>0)return s;
  }

  /* 2. Fallback: считаем по отдельным товарам */
  var sum=0;
  var items=document.querySelectorAll('.t706__cartwin-product, .t706__cartpage-product');
  if(items.length>0){
    items.forEach(function(item){
      var priceEl=item.querySelector('.t706__cartwin-product-amount, .t706__cartpage-product-amount, [class*="product-amount"]');
      if(priceEl){
        sum+=parseSum(priceEl.textContent);
      }
    });
    if(sum>0)return sum;
  }

  /* 3. Последний fallback: totalamount, НО только если мы туда ещё не писали */
  if(_cartBase>0)return _cartBase;   // <-- уже знаем базу, не читаем перезаписанное

  var el2=document.querySelector('.t706__cartwin-totalamount');
  if(!el2)el2=document.querySelector('.t706__cartpage-totals-price');
  if(el2){
    return parseSum(el2.textContent);
  }

  return 0;
}

function calcFinal(base){
  var pa=document.querySelector('.pay-opt.active');
  var isQR=pa&&pa.getAttribute('data-p')==='qr';
  var code=(userPromoInput||'').toUpperCase().trim();
  var promoPercent=(promoApplied&&PROMO_DISCOUNTS[code])?PROMO_DISCOUNTS[code]:0;
  var qrPercent=isQR?QR_EXTRA_PERCENT:0;
  var totalPercent=promoPercent+qrPercent;
  var discount=Math.round(base*totalPercent/100);
  return{
    base:base,
    promoPercent:promoPercent,
    qrPercent:qrPercent,
    totalPercent:totalPercent,
    discount:discount,
    qrDisc:Math.round(base*qrPercent/100),
    promoDisc:Math.round(base*promoPercent/100),
    total:base-discount,
    isQR:isQR,
    promoCode:promoApplied?code:''
  };
}

function updDisplay(){
  var base=_cartBase;
  if(!base||base<=0)return;

  var calc=calcFinal(base);

  var info=document.getElementById('discountInfo');
  if(info){
    if(calc.discount>0){
      var parts=[];
      if(calc.promoPercent>0)parts.push('промокод '+calc.promoCode+' '+calc.promoPercent+'%');
      if(calc.qrPercent>0)parts.push('QR '+calc.qrPercent+'%');
      info.innerHTML='Скидка ('+parts.join(' + ')+'): −'+fmtSum(calc.discount);
      info.classList.add('visible');
    }else{
      info.textContent='';
      info.classList.remove('visible');
    }
  }

  if(calc.total===_lastDisplayed)return;

  var totalEl=document.querySelector('.t706__cartwin-totalamount');
  if(!totalEl)totalEl=document.querySelector('.t706__cartpage-totals-price');
  if(totalEl){
    _writing=true;
    totalEl.textContent=fmtSum(calc.total);
    _lastDisplayed=calc.total;
    _writing=false;
  }
}

function startMainTicker(){
  if(_pollingStarted)return;
  _pollingStarted=true;

  setInterval(function(){
    var newBase=calcCartBase();
    if(newBase>0&&newBase!==_cartBase){
      _cartBase=newBase;
      _lastDisplayed=0;
    }
    if(_cartBase>0){
      updDisplay();
    }
  },200);
}

function watchCartDOM(){
  if(_watchersStarted)return;
  _watchersStarted=true;

  var target=document.querySelector('.t706__cartwin-content, .t706__cartpage-content');
  if(!target)target=document.querySelector('.t706__cartwin');
  if(!target)return;

  var cartOb=new MutationObserver(function(){
    if(_writing)return;
    setTimeout(function(){
      var newBase=calcCartBase();
      if(newBase>0&&newBase!==_cartBase){
        _cartBase=newBase;
        _lastDisplayed=0;
        updDisplay();
      }
    },50);
  });

  cartOb.observe(target,{childList:true,subtree:true,characterData:true});
}

function watchQuantityBtns(){
  document.addEventListener('click',function(e){
    var btn=e.target.closest('.t706__product-quantity__btn,.t706__cartwin-product-del,[class*="quantity"],[class*="product-del"],[class*="cart-del"]');
    if(!btn)return;
    [100,200,350,500,800,1200].forEach(function(d){
      setTimeout(function(){
        var newBase=calcCartBase();
        if(newBase>0){
          _cartBase=newBase;
          _lastDisplayed=0;
          updDisplay();
        }
      },d);
    });
  });
}

/* ===== ПРОМОКОД ===== */
function cancelPromo(){
  userPromoInput='';
  promoApplied=false;
  var inp=document.getElementById('promoInput');
  var btn=document.getElementById('promoApplyBtn');
  var msg=document.getElementById('promoMsg');
  var row=document.getElementById('promoInputRow');
  if(inp){inp.value='';inp.disabled=false;inp.classList.remove('promo-err','promo-ok');}
  if(btn){btn.textContent='Применить';btn.classList.remove('promo-cancel-btn');}
  if(msg){msg.textContent='';msg.className='promo-msg';}
  if(row){row.style.display='flex';row.style.visibility='visible';}
  _lastDisplayed=0;
  updDisplay();
  saveState();
}

function initPromoField(){
  var btn=document.getElementById('promoApplyBtn');
  var inp=document.getElementById('promoInput');
  var row=document.getElementById('promoInputRow');
  if(!btn||!inp)return;

  /* Гарантируем что поле всегда видно */
  if(row){row.style.display='flex';row.style.visibility='visible';}
  inp.style.display='';
  inp.style.visibility='visible';

  btn.addEventListener('click',function(e){
    e.preventDefault();

    if(promoApplied){
      cancelPromo();
      return;
    }

    var code=inp.value.trim().toUpperCase();
    var msg=document.getElementById('promoMsg');
    inp.classList.remove('promo-err','promo-ok');
    if(msg){msg.textContent='';msg.className='promo-msg';}

    if(!code){
      inp.classList.add('promo-err');
      if(msg){msg.textContent='Введите промокод';msg.className='promo-msg error';}
      return;
    }

    if(PROMO_DISCOUNTS.hasOwnProperty(code)){
      userPromoInput=code;
      promoApplied=true;
      inp.disabled=true;
      inp.classList.add('promo-ok');
      btn.textContent='Отменить';
      btn.classList.add('promo-cancel-btn');
      if(msg){msg.textContent='✓ Промокод '+code+' принят (-'+PROMO_DISCOUNTS[code]+'%)';msg.className='promo-msg success';}
      _lastDisplayed=0;
      updDisplay();
      saveState();
    }else{
      /* НЕ скрываем поле, только красная подсветка */
      userPromoInput='';
      promoApplied=false;
      inp.classList.add('promo-err');
      inp.disabled=false;
      btn.textContent='Применить';
      btn.classList.remove('promo-cancel-btn');
      if(msg){msg.textContent='Промокод не найден';msg.className='promo-msg error';}
      if(row){row.style.display='flex';row.style.visibility='visible';}
      _lastDisplayed=0;
      updDisplay();
    }
  });

  inp.addEventListener('input',function(){
    this.classList.remove('promo-err','promo-ok');
    var msg=document.getElementById('promoMsg');
    if(msg&&msg.classList.contains('error')){msg.textContent='';msg.className='promo-msg';}
  });

  inp.addEventListener('keydown',function(e){
    if(e.key==='Enter'){e.preventDefault();btn.click();}
  });
}

/* ===== ТЕЛЕФОН И СТРАНЫ ===== */
function renderCountries(f){
  var box=document.getElementById('countryItems');
  if(!box)return;
  box.innerHTML='';
  var q=(f||'').toLowerCase();
  countries.forEach(function(c){
    if(q&&c.n.toLowerCase().indexOf(q)===-1&&c.d.indexOf(q)===-1)return;
    var div=document.createElement('div');
    div.className='cst-country-item';
    div.innerHTML='<span class="cn">'+c.n+'</span><span class="cc">'+c.d+'</span>';
    div.addEventListener('click',function(){selCo(c);});
    box.appendChild(div);
  });
}

function selCo(c){
  cc=c;
  var pc=document.getElementById('phoneCode');
  if(pc)pc.textContent=c.d;
  var inp=document.getElementById('r_phone');
  if(inp){inp.value='';inp.placeholder=c.ph;inp.focus();}
  var cl=document.getElementById('countryList');
  if(cl)cl.classList.remove('visible');
}

function fmtPh(d,p){
  var r='',di=0;
  for(var i=0;i<p.length&&di<d.length;i++){
    if(p[i]==='9'){r+=d[di];di++;}
    else{r+=p[i];if(d[di]===p[i])di++;}
  }
  return r;
}

function initPhone(){
  var btn=document.getElementById('phoneBtn');
  var list=document.getElementById('countryList');
  var sr=document.getElementById('countrySearch');
  if(!btn||!list)return;
  btn.addEventListener('click',function(e){
    e.stopPropagation();
    var isVisible=list.classList.contains('visible');
    list.classList.toggle('visible');
    if(!isVisible){renderCountries('');if(sr){sr.value='';sr.focus();}}
  });
  if(sr){sr.addEventListener('input',function(){renderCountries(this.value);});}
  document.addEventListener('click',function(e){
    if(!list.contains(e.target)&&!btn.contains(e.target))list.classList.remove('visible');
  });
  renderCountries('');
  var inp=document.getElementById('r_phone');
  if(!inp)return;
  inp.addEventListener('input',function(){
        var raw=this.value.replace(/\D/g,'').substring(0,cc.ml);
    this.value=fmtPh(raw,cc.ph);
  });
  inp.addEventListener('keydown',function(e){
    if(e.key==='Backspace'&&this.value.length===1)this.value='';
  });
  inp.addEventListener('focus',function(){
    if(!this.value)this.placeholder=cc.ph;
  });
}

/* ===== СОГЛАСИЕ ===== */
function initAgree(){
  var wrap=document.getElementById('agreeWrap');
  var box=document.getElementById('agreeBox');
  if(!wrap||!box)return;
  wrap.addEventListener('click',function(e){
    if(e.target.tagName==='A')return;
    agreeChecked=!agreeChecked;
    box.classList.toggle('checked',agreeChecked);
    if(agreeChecked){
      box.classList.remove('cst-err');
      var err=document.getElementById('agreeErr');
      if(err)err.classList.remove('visible');
    }
    saveState();
  });
}

/* ===== ВАЛИДАЦИЯ ===== */
function validate(){
  var ok=true;
  var valErr=document.getElementById('cstValErr');
  if(valErr)valErr.classList.remove('visible');
  var nm=document.getElementById('r_name');
  var em=document.getElementById('r_email');
  var ph=document.getElementById('r_phone');
  var pw=document.getElementById('phoneWrap');
  if(!nm||!em||!ph||!pw)return false;
  if(!nm.value.trim()){nm.classList.add('cst-err');ok=false;}else nm.classList.remove('cst-err');
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value.trim())){em.classList.add('cst-err');ok=false;}else em.classList.remove('cst-err');
  if(ph.value.replace(/\D/g,'').length<cc.ml){pw.classList.add('cst-err');ok=false;}else pw.classList.remove('cst-err');
  var ac=document.querySelector('.dlv-opt.active');
  if(!ac){
    ok=false;
    document.querySelectorAll('.dlv-opt').forEach(function(o){
      o.classList.add('cst-err');
      setTimeout(function(){o.classList.remove('cst-err');},3000);
    });
  }else{
    var ty=ac.getAttribute('data-d');
    if(ty==='tk'){
      var sl=document.getElementById('selTK');
      if(!sl||!sl.value){
        ok=false;
        if(sl){sl.classList.add('cst-err');setTimeout(function(){sl.classList.remove('cst-err');},3000);}
      }else{
        var sa=document.querySelector('.dlv-sub-o.active');
        var st=sa?sa.getAttribute('data-ts'):'pvz';
        if(st==='pvz'){var pvzEl=document.getElementById('i_pvz');if(!pvzEl||!pvzEl.value.trim()){ok=false;if(pvzEl)pvzEl.classList.add('cst-err');}}
        else{var tkcEl=document.getElementById('i_tkc');if(!tkcEl||!tkcEl.value.trim()){ok=false;if(tkcEl)tkcEl.classList.add('cst-err');}}
      }
    }
    if(ty==='courier'){
      var strEl=document.getElementById('i_str');
      var houEl=document.getElementById('i_hou');
      if(!strEl||!strEl.value.trim()){ok=false;if(strEl)strEl.classList.add('cst-err');}
      if(!houEl||!houEl.value.trim()){ok=false;if(houEl)houEl.classList.add('cst-err');}
    }
  }
  if(!document.querySelector('.pay-opt.active')){
    ok=false;
    document.querySelectorAll('.pay-opt:not(.pay-disabled)').forEach(function(o){
      o.classList.add('cst-err');
      setTimeout(function(){o.classList.remove('cst-err');},3000);
    });
  }
  if(!agreeChecked){
    ok=false;
    var abox=document.getElementById('agreeBox');
    var aerr=document.getElementById('agreeErr');
    if(abox)abox.classList.add('cst-err');
    if(aerr)aerr.classList.add('visible');
  }
  if(!ok&&valErr){
    valErr.classList.add('visible');
    setTimeout(function(){
      var fe=document.querySelector('#r_name.cst-err,#r_email.cst-err,#phoneWrap.cst-err,.dlv-opt.cst-err,.dlv-sel.cst-err,#i_pvz.cst-err,#i_tkc.cst-err,#i_str.cst-err,#i_hou.cst-err,.pay-opt.cst-err,#agreeBox.cst-err');
      if(fe){
        var cartWin=document.querySelector('.t706__cartwin');
        if(cartWin){
          var cartRect=cartWin.getBoundingClientRect();
          var feRect=fe.getBoundingClientRect();
          var scrollTo=cartWin.scrollTop+(feRect.top-cartRect.top)-(cartRect.height/2)+(feRect.height/2);
          cartWin.scrollTo({top:scrollTo,behavior:'smooth'});
        }
      }
    },50);
  }
  return ok;
}

function clearErr(){
  var valErr=document.getElementById('cstValErr');
  function hideValErr(){if(valErr)valErr.classList.remove('visible');}
  ['r_name','r_email'].forEach(function(id){
    var el=document.getElementById(id);
    if(el)el.addEventListener('input',function(){this.classList.remove('cst-err');hideValErr();});
  });
  var ph=document.getElementById('r_phone');
  var pw=document.getElementById('phoneWrap');
  if(ph&&pw)ph.addEventListener('input',function(){pw.classList.remove('cst-err');hideValErr();});
  ['i_str','i_hou','i_pvz','i_tkc'].forEach(function(id){
    var el=document.getElementById(id);
    if(el)el.addEventListener('input',function(){this.classList.remove('cst-err');hideValErr();});
  });
}

function saveState(){
  var data={};
  data.nm=(document.getElementById('r_name')||{}).value||'';
  data.em=(document.getElementById('r_email')||{}).value||'';
  data.ph=(document.getElementById('r_phone')||{}).value||'';
  data.cc=cc.d;
  data.ag=agreeChecked;
  var ad=document.querySelector('.dlv-opt.active');
  if(ad)data.dlv=ad.getAttribute('data-d');
  var ap=document.querySelector('.pay-opt.active');
  if(ap)data.pay=ap.getAttribute('data-p');
  var tk=document.getElementById('selTK');
  if(tk)data.tk=tk.value;
  var so=document.querySelector('.dlv-sub-o.active');
  if(so)data.ts=so.getAttribute('data-ts');
  data.pvz=(document.getElementById('i_pvz')||{}).value||'';
  data.tkc=(document.getElementById('i_tkc')||{}).value||'';
  data.str=(document.getElementById('i_str')||{}).value||'';
  data.hou=(document.getElementById('i_hou')||{}).value||'';
  data.apt=(document.getElementById('i_apt')||{}).value||'';
  data.fl=(document.getElementById('i_fl')||{}).value||'';
  data.dom=(document.getElementById('i_dom')||{}).value||'';
  data.cmt=(document.getElementById('i_cmt')||{}).value||'';
  data.promo=userPromoInput;
  data.promoApplied=promoApplied;
  try{sessionStorage.setItem(SK,JSON.stringify(data));}catch(e){}
}

function loadState(){
  try{
    var d=JSON.parse(sessionStorage.getItem(SK));
    if(!d)return;
    var nm=document.getElementById('r_name');if(nm&&d.nm)nm.value=d.nm;
    var em=document.getElementById('r_email');if(em&&d.em)em.value=d.em;
    if(d.cc){
      for(var i=0;i<countries.length;i++){
        if(countries[i].d===d.cc){selCo(countries[i]);break;}
      }
    }
    var ph=document.getElementById('r_phone');if(ph&&d.ph)ph.value=d.ph;
    if(d.dlv){
      var dopt=document.querySelector('.dlv-opt[data-d="'+d.dlv+'"]');
      if(dopt)dopt.click();
    }
    if(d.tk){var tkEl=document.getElementById('selTK');if(tkEl){tkEl.value=d.tk;tkEl.dispatchEvent(new Event('change'));}}
    if(d.ts){
      var tsEl=document.querySelector('.dlv-sub-o[data-ts="'+d.ts+'"]');
      if(tsEl)tsEl.click();
    }
    var pvz=document.getElementById('i_pvz');if(pvz&&d.pvz)pvz.value=d.pvz;
    var tkc=document.getElementById('i_tkc');if(tkc&&d.tkc)tkc.value=d.tkc;
    var str=document.getElementById('i_str');if(str&&d.str)str.value=d.str;
    var hou=document.getElementById('i_hou');if(hou&&d.hou)hou.value=d.hou;
    var apt=document.getElementById('i_apt');if(apt&&d.apt)apt.value=d.apt;
    var fl=document.getElementById('i_fl');if(fl&&d.fl)fl.value=d.fl;
    var dom=document.getElementById('i_dom');if(dom&&d.dom)dom.value=d.dom;
    var cmt=document.getElementById('i_cmt');if(cmt&&d.cmt)cmt.value=d.cmt;
    if(d.pay){
      var popt=document.querySelector('.pay-opt[data-p="'+d.pay+'"]');
      if(popt)popt.click();
    }
    if(d.ag){
      agreeChecked=true;
      var abox=document.getElementById('agreeBox');
      if(abox)abox.classList.add('checked');
    }
    if(d.promo){
      userPromoInput=d.promo;
      var pi=document.getElementById('promoInput');
      if(pi)pi.value=d.promo;
      if(d.promoApplied){
        promoApplied=true;
        if(pi){pi.disabled=true;pi.classList.add('promo-ok');}
        var pbtn=document.getElementById('promoApplyBtn');
        if(pbtn){pbtn.textContent='Отменить';pbtn.classList.add('promo-cancel-btn');}
        var pmsg=document.getElementById('promoMsg');
        if(pmsg){pmsg.textContent='✓ Промокод '+d.promo+' принят (-'+PROMO_DISCOUNTS[d.promo]+'%)';pmsg.className='promo-msg success';}
      }
    }
  }catch(e){}
}

/* ===== ПРОМОКОД для Тильды ===== */
function setPromo(code){
  var cart=document.querySelector('.t706__cartwin');
  if(!cart)return;
  var inp=cart.querySelector('.t-inputpromocode');
  if(!inp)return;
  var nativeSetter=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;
  nativeSetter.call(inp,code);
  inp.dispatchEvent(new Event('input',{bubbles:true}));
  inp.dispatchEvent(new Event('change',{bubbles:true}));
  var activateBtn=cart.querySelector('.t-inputpromocode__btn');
  if(activateBtn){
    setTimeout(function(){
      activateBtn.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
    },100);
  }
}

function resolvePromoCode(){
  var pa=document.querySelector('.pay-opt.active');
  var isQR=pa&&pa.getAttribute('data-p')==='qr';
  var code=userPromoInput.toUpperCase().trim();
  var isValid=PROMO_DISCOUNTS.hasOwnProperty(code);
  if(isValid&&isQR) return code+'QR';
  if(isValid&&!isQR) return code;
  if(!isValid&&isQR) return 'SALE5';
  return '';
}

function applyPromo(){
  var code=resolvePromoCode();
  if(code){setPromo(code);}
}

/* ===== DADATA ===== */
function dadataQ(q,type,cb){
  var urls={'address':'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'};
  var xhr=new XMLHttpRequest();
  xhr.open('POST',urls[type||'address']);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.setRequestHeader('Authorization','Token '+DT);
  xhr.onload=function(){
    try{var r=JSON.parse(xhr.responseText);cb(r.suggestions||[]);}catch(e){cb([]);}
  };
  xhr.onerror=function(){cb([]);};
  xhr.send(JSON.stringify({query:q,count:5}));
}

function initDD(inpId,ddId){
  var inp=document.getElementById(inpId);
  var dd=document.getElementById(ddId);
  if(!inp||!dd)return;
  var timer=null;
  inp.addEventListener('input',function(){
    clearTimeout(timer);
    var q=inp.value.trim();
    if(q.length<3){dd.innerHTML='';dd.classList.remove('visible');return;}
    timer=setTimeout(function(){
      dadataQ(q,'address',function(items){
        dd.innerHTML='';
        if(!items.length){dd.classList.remove('visible');return;}
        items.forEach(function(s){
          var div=document.createElement('div');
          div.className='dd-item';
          div.textContent=s.value;
          div.addEventListener('click',function(){
            inp.value=s.value;
            dd.innerHTML='';
            dd.classList.remove('visible');
            inp.classList.remove('cst-err');
            saveState();
          });
          dd.appendChild(div);
        });
        dd.classList.add('visible');
      });
    },300);
  });
  document.addEventListener('click',function(e){
    if(!dd.contains(e.target)&&e.target!==inp){dd.innerHTML='';dd.classList.remove('visible');}
  });
}

/* ===== КАРТА ===== */
function initMap(){
  if(mi)return;
  var mc=document.getElementById('dlv-map');
  if(!mc||!mc.offsetParent)return;
  mi=true;
  setTimeout(function(){
    mp=L.map('dlv-map',{center:[59.858,30.38],zoom:15,scrollWheelZoom:false});
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OSM'}).addTo(mp);
    L.marker([59.858,30.38]).addTo(mp).bindPopup('ул. Полярников, д. 9').openPopup();
    mp.invalidateSize();
  },200);
}

/* ===== ДОСТАВКА / ОПЛАТА ===== */
function initDlv(){
  document.querySelectorAll('.dlv-opt').forEach(function(opt){
    opt.addEventListener('click',function(){
      if(opt.classList.contains('active')){return;}
      document.querySelectorAll('.dlv-opt').forEach(function(o){o.classList.remove('active');});
      document.querySelectorAll('.dlv-cnt').forEach(function(c){c.classList.remove('visible');});
      opt.classList.add('active');
      opt.classList.remove('cst-err');
      var ty=opt.getAttribute('data-d');
      var cnt=document.getElementById('cnt-'+(ty==='courier'?'cour':ty));
      if(cnt)cnt.classList.add('visible');
      if(ty==='pickup')initMap();
      updPayAvail();
      saveState();
    });
  });
  document.querySelectorAll('.dlv-sub-o').forEach(function(so){
    so.addEventListener('click',function(){
      document.querySelectorAll('.dlv-sub-o').forEach(function(s){s.classList.remove('active');});
      so.classList.add('active');
      var ts=so.getAttribute('data-ts');
      document.querySelectorAll('.dlv-tk-addr').forEach(function(a){a.classList.remove('visible');});
      if(ts==='pvz')document.getElementById('tk-pvz').classList.add('visible');
      else document.getElementById('tk-ca').classList.add('visible');
      saveState();
    });
  });
  var sel=document.getElementById('selTK');
  if(sel){
    sel.addEventListener('change',function(){
      var sub=document.getElementById('tk-sub');
      if(sub)sub.classList.add('visible');
      sel.classList.remove('cst-err');
      saveState();
    });
  }
}

function updPayAvail(){
  var ad=document.querySelector('.dlv-opt.active');
  var ty=ad?ad.getAttribute('data-d'):'';
  var cash=document.getElementById('payCash');
  if(!cash)return;
  if(ty==='tk'){
    cash.classList.add('pay-disabled');
    if(cash.classList.contains('active')){
      cash.classList.remove('active');
      cash.querySelector('.pay-dot').classList.remove('active');
      var cardOpt=document.querySelector('.pay-opt[data-p="card"]');
      if(cardOpt){cardOpt.classList.add('active');cardOpt.querySelector('.pay-dot').classList.add('active');}
      _lastDisplayed=0;
      updDisplay();
    }
  }else{
    cash.classList.remove('pay-disabled');
  }
}

function initPay(){
  document.querySelectorAll('.pay-opt').forEach(function(opt){
    opt.addEventListener('click',function(){
      if(opt.classList.contains('pay-disabled'))return;
      document.querySelectorAll('.pay-opt').forEach(function(o){
        o.classList.remove('active');
        var dt=o.querySelector('.pay-dot');if(dt)dt.classList.remove('active');
      });
      opt.classList.add('active');
      opt.classList.remove('cst-err');
      var dt=opt.querySelector('.pay-dot');if(dt)dt.classList.add('active');

      _cartBase=calcCartBase();
      _lastDisplayed=0;
      updDisplay();
      saveState();
    });
  });
}

/* ===== ИНЖЕКТ ===== */
function inject(){
  if(ins||_injecting)return;
  var cartWin=document.querySelector('.t706__cartwin');
  if(!cartWin)return;
  var formWrap=cartWin.querySelector('.t706__cartwin-form-wrapper');
  if(!formWrap)return;
  var tildaForm=formWrap.querySelector('.t-form');
  if(!tildaForm)return;

  _injecting=true;

  /* Скрываем стандартную форму */
  tildaForm.style.display='none';

  /* Проверяем не инжектили ли уже */
  if(formWrap.querySelector('#rBlock')){
    ins=true;
    _injecting=false;
    return;
  }

  /* Добавляем наши блоки */
  var wrapper=document.createElement('div');
  wrapper.id='cstCheckout';
  wrapper.innerHTML=rH+dH+pH;
  formWrap.insertBefore(wrapper,tildaForm);

  /* Ищем кнопку отправки */
  var origBtn=tildaForm.querySelector('.t-submit');
  if(origBtn){
    origBtn.style.display='none';
  }

  var submitBtn=document.createElement('button');
  submitBtn.type='button';
  submitBtn.className='cst-submit-btn';
  submitBtn.textContent='Оформить заказ';
  wrapper.appendChild(submitBtn);

  submitBtn.addEventListener('click',function(){
    if(!validate())return;

    /* Собираем данные */
    var nm=document.getElementById('r_name').value.trim();
    var em=document.getElementById('r_email').value.trim();
    var ph=cc.d+document.getElementById('r_phone').value.replace(/\D/g,'');

    /* Способ доставки */
    var dlvOpt=document.querySelector('.dlv-opt.active');
    var dlvType=dlvOpt?dlvOpt.getAttribute('data-d'):'';
    var dlvStr='';
    if(dlvType==='tk'){
      var tkSel=document.getElementById('selTK');
      var tkName=tkSel?tkSel.options[tkSel.selectedIndex].text:'';
      var subOpt=document.querySelector('.dlv-sub-o.active');
      var subType=subOpt?subOpt.getAttribute('data-ts'):'pvz';
      if(subType==='pvz'){
        dlvStr='ТК '+tkName+', ПВЗ: '+(document.getElementById('i_pvz').value||'');
      }else{
        dlvStr='ТК '+tkName+', Курьер: '+(document.getElementById('i_tkc').value||'');
      }
    }else if(dlvType==='courier'){
      dlvStr='Курьер СПб: '+[
        document.getElementById('i_str').value,
        'д.'+document.getElementById('i_hou').value,
        document.getElementById('i_apt').value?'кв.'+document.getElementById('i_apt').value:'',
        document.getElementById('i_fl').value?'эт.'+document.getElementById('i_fl').value:'',
        document.getElementById('i_dom').value?'домофон '+document.getElementById('i_dom').value:''
      ].filter(Boolean).join(', ');
      var cmt=document.getElementById('i_cmt').value;
      if(cmt)dlvStr+=' | '+cmt;
    }else if(dlvType==='pickup'){
      dlvStr='Самовывоз: ул. Полярников, д. 9';
    }

    /* Оплата */
    var payOpt=document.querySelector('.pay-opt.active');
    var payType=payOpt?payOpt.getAttribute('data-p'):'';
    var payStr='';
    if(payType==='card')payStr='Банковская карта';
    if(payType==='qr')payStr='QR-код (скидка '+QR_EXTRA_PERCENT+'%)';
    if(payType==='cash')payStr='Наличные при получении';

    /* Промокод */
    var promoCode=resolvePromoCode();

    /* Итоговая сумма */
    var calc=calcFinal(_cartBase);

    /* Заполняем скрытые поля тильды */
    var fillField=function(name,val){
      var inp=tildaForm.querySelector('[name="'+name+'"]');
      if(inp){
        var nativeSetter=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;
        nativeSetter.call(inp,val);
        inp.dispatchEvent(new Event('input',{bubbles:true}));
        inp.dispatchEvent(new Event('change',{bubbles:true}));
      }
    };

    fillField('Name',nm);
    fillField('Email',em);
    fillField('Phone',ph);

    /* Комментарий с полной инфой */
    var comment='Доставка: '+dlvStr+'\nОплата: '+payStr;
    if(calc.promoCode)comment+='\nПромокод: '+calc.promoCode+' (-'+calc.promoPercent+'%)';
    if(calc.qrDisc>0)comment+='\nСкидка QR: -'+fmtSum(calc.qrDisc);
    if(calc.promoDisc>0)comment+='\nСкидка промо: -'+fmtSum(calc.promoDisc);
    comment+='\nСумма товаров: '+fmtSum(calc.base);
    comment+='\nСкидка: -'+fmtSum(calc.discount);
    comment+='\nИтого: '+fmtSum(calc.total);

    var tArea=tildaForm.querySelector('textarea[name="Input"]');
    if(!tArea)tArea=tildaForm.querySelector('textarea');
    if(tArea){
      tArea.value=comment;
      tArea.dispatchEvent(new Event('input',{bubbles:true}));
    }

    /* Применяем промокод в тильду */
    if(promoCode){
      applyPromo();
    }

    /* Отправляем форму */
    setTimeout(function(){
      if(origBtn){
        origBtn.click();
      }else{
        var ev=document.createEvent('Event');
        ev.initEvent('submit',true,true);
        tildaForm.dispatchEvent(ev);
      }
    },promoCode?500:100);
  });

  /* Инициализация всех компонентов */
  initPhone();
  initDlv();
  initPay();
  initAgree();
  initPromoField();
  initDD('i_pvz','dd-pvz');
  initDD('i_tkc','dd-tkc');
  initDD('i_str','dd-str');
  clearErr();

  /* Автосохранение */
  var allInputs=wrapper.querySelectorAll('input,textarea,select');
  allInputs.forEach(function(inp){
    inp.addEventListener('input',saveState);
    inp.addEventListener('change',saveState);
  });

  loadState();

  /* Читаем начальную сумму */
  _cartBase=calcCartBase();
  updDisplay();

  startMainTicker();
  watchCartDOM();
  watchQuantityBtns();

  ins=true;
  _injecting=false;
}

/* ===== НАБЛЮДАТЕЛИ ===== */
function waitForCart(){
  var ob=new MutationObserver(function(){
    var cartWin=document.querySelector('.t706__cartwin');
    if(cartWin){
      var isVisible=cartWin.offsetParent!==null||cartWin.style.display!=='none';
      if(isVisible){
        setTimeout(inject,300);
      }
    }
  });
  ob.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['style','class']});

  /* Также проверяем по клику на корзину */
  document.addEventListener('click',function(e){
    var btn=e.target.closest('.t706__carticon-wrapper,a[href*="cart"],.t706__carticon,.js-cart-btn,[data-tooltip-hook="#cart"],.t-store__cart-btn');
    if(btn){
      setTimeout(inject,500);
      setTimeout(inject,1000);
      setTimeout(inject,2000);
    }
  });
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',waitForCart);
}else{
  waitForCart();
}

}
})();
