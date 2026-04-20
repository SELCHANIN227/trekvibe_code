(function(){
var leafletJs=document.createElement('script');
leafletJs.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
leafletJs.onload=init;
document.head.appendChild(leafletJs);

function init(){
var DT='c9aa817ed1d374c93a7983bf2bb583b694319c1c';
var SK='cst_checkout_data';
var QR_DISCOUNT=0.03;
var QR_PROMO='SALE5';
var FORM_ID='form1888069311';
var cc={n:'Россия',d:'+7',ml:10,ph:'(999) 999-99-99'};
var mp=null,ins=false,mi=false,reord=false,agreeChecked=false,_injecting=false,_origPrice=null;
var _focused=false;

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
+'<div class="cst-agree-wrap" id="agreeWrap"><div class="cst-agree-box" id="agreeBox"><svg class="cst-agree-check" viewBox="0 0 12 12"><polyline points="2 6 5 9 10 3"/></svg></div>'
+'<div class="cst-agree-text">Согласен с <a href="https://trekvibe.ru/privacy" target="_blank">политикой обработки персональных данных</a> и <a href="https://trekvibe.ru/oferta" target="_blank">публичной офертой</a></div></div>'
+'<div class="cst-agree-err" id="agreeErr">Необходимо согласие с политикой и офертой</div>'
+'<div class="cst-val-err" id="cstValErr">Заполните обязательную информацию</div>'
+'</div>';

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

function applyPromo(){
  var pa=document.querySelector('.pay-opt.active');
  if(pa&&pa.getAttribute('data-p')==='qr'){setPromo(QR_PROMO);}
}

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

function updDiscount(){
  var pa=document.querySelector('.pay-opt.active');
  var info=document.getElementById('discountInfo');
  if(!info)return;
  var totalEl=document.querySelector('.t706__cartwin-totalamount')||document.querySelector('.t706__cartpage-totals-price')||document.querySelector('[class*="cartwin-total"]');
  if(!totalEl)return;
  function parseSum(str){return parseInt((str||'').replace(/\s/g,'').replace(/[^\d]/g,''))||0;}
  if(_origPrice===null){
    var raw=totalEl.getAttribute('data-orig')||totalEl.textContent;
    var cur=parseSum(raw);
    if(cur>0){_origPrice=cur;}else return;
  }
  if(pa&&pa.getAttribute('data-p')==='qr'){
    var disc=Math.round(_origPrice*QR_DISCOUNT);
    var fin=_origPrice-disc;
    info.textContent='Скидка: '+disc.toLocaleString('ru-RU')+' р.';
    info.classList.add('visible');
    totalEl.textContent=fin.toLocaleString('ru-RU')+' р.';
  }else{
    info.classList.remove('visible');
    totalEl.textContent=_origPrice.toLocaleString('ru-RU')+' р.';
  }
}

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
  data.ci=countries.indexOf(cc);
  var da=document.querySelector('.dlv-opt.active');data.dl=da?da.getAttribute('data-d'):'';
  data.tk=(document.getElementById('selTK')||{}).value||'';
  var sa=document.querySelector('.dlv-sub-o.active');data.ts=sa?sa.getAttribute('data-ts'):'pvz';
  data.pv=(document.getElementById('i_pvz')||{}).value||'';
  data.tc=(document.getElementById('i_tkc')||{}).value||'';
  data.st=(document.getElementById('i_str')||{}).value||'';
  data.ho=(document.getElementById('i_hou')||{}).value||'';
  data.ap=(document.getElementById('i_apt')||{}).value||'';
  data.fl=(document.getElementById('i_fl')||{}).value||'';
  data.dm=(document.getElementById('i_dom')||{}).value||'';
  data.cm=(document.getElementById('i_cmt')||{}).value||'';
  var pa=document.querySelector('.pay-opt.active');data.py=pa?pa.getAttribute('data-p'):'';
  data.ag=agreeChecked;
  try{localStorage.setItem(SK,JSON.stringify(data));}catch(e){}
}

function restoreState(){
  var raw;
  try{raw=localStorage.getItem(SK);}catch(e){return;}
  if(!raw)return;
  var d;
  try{d=JSON.parse(raw);}catch(e){return;}
  var nm=document.getElementById('r_name');if(nm&&d.nm)nm.value=d.nm;
  var em=document.getElementById('r_email');if(em&&d.em)em.value=d.em;
  if(typeof d.ci==='number'&&d.ci>=0&&d.ci<countries.length)selCo(countries[d.ci]);
  var ph=document.getElementById('r_phone');if(ph&&d.ph)ph.value=d.ph;
  if(d.dl){var de=document.querySelector('.dlv-opt[data-d="'+d.dl+'"]');if(de)selDlv(de);}
  if(d.tk){var sl=document.getElementById('selTK');if(sl){sl.value=d.tk;sl.dispatchEvent(new Event('change'));}}
  if(d.ts){var se=document.querySelector('.dlv-sub-o[data-ts="'+d.ts+'"]');if(se)se.click();}
  var flds={i_pvz:'pv',i_tkc:'tc',i_str:'st',i_hou:'ho',i_apt:'ap',i_fl:'fl',i_dom:'dm',i_cmt:'cm'};
  Object.keys(flds).forEach(function(id){
    var el=document.getElementById(id);
    if(el&&d[flds[id]])el.value=d[flds[id]];
  });
  if(d.py){
    var pe=document.querySelector('.pay-opt[data-p="'+d.py+'"]');
    if(pe&&!pe.classList.contains('pay-disabled')){
      document.querySelectorAll('.pay-opt').forEach(function(x){x.classList.remove('active');});
      pe.classList.add('active');
      updDiscount();
    }
  }
  if(d.ag){
    agreeChecked=true;
    var ab=document.getElementById('agreeBox');
    if(ab)ab.classList.add('checked');
  }
}

function bindSave(){
  ['r_name','r_email','r_phone','i_pvz','i_tkc','i_str','i_hou','i_apt','i_fl','i_dom','i_cmt'].forEach(function(id){
    var el=document.getElementById(id);
    if(el)el.addEventListener('input',saveState);
  });
  var sl=document.getElementById('selTK');
  if(sl)sl.addEventListener('change',saveState);
  document.querySelectorAll('.dlv-opt,.dlv-sub-o,.pay-opt').forEach(function(o){
    o.addEventListener('click',saveState);
  });
}

function getDD(){
  var ac=document.querySelector('.dlv-opt.active');
  if(!ac)return null;
  var ty=ac.getAttribute('data-d');
  var pa=document.querySelector('.pay-opt.active');
  var pt='',disc=false,discAmt=0,origSum=0,finalSum=0;
  if(pa){
    var pv=pa.getAttribute('data-p');
    if(pv==='card'){pt='Картой';}
    else if(pv==='qr'){pt='QR-код';disc=true;origSum=_origPrice||0;discAmt=Math.round(origSum*QR_DISCOUNT);finalSum=origSum-discAmt;}
    else if(pv==='cash'){pt='Наличными';}
  }
  var nmEl=document.getElementById('r_name');
  var emEl=document.getElementById('r_email');
  var phEl=document.getElementById('r_phone');
  if(!nmEl||!emEl||!phEl)return null;
  var nm=nmEl.value.trim();
  var em=emEl.value.trim();
  var ph=cc.d+phEl.value.replace(/\D/g,'');
  if(ty==='tk'){
    var sl=document.getElementById('selTK');
    var sa=document.querySelector('.dlv-sub-o.active');
    var st=sa?sa.getAttribute('data-ts'):'pvz';
    var ad='';
    if(st==='pvz'){var pvzEl=document.getElementById('i_pvz');ad=pvzEl?pvzEl.value:'';}
    else{var tkcEl=document.getElementById('i_tkc');ad=tkcEl?tkcEl.value:'';}
    var cn='';
    if(sl&&sl.selectedIndex>=0&&sl.options[sl.selectedIndex])cn=sl.options[sl.selectedIndex].text;
    return{ty:ty,m:'ТК',cn:cn,sm:st==='pvz'?'ПВЗ':'Курьер ТК',a:ad,p:pt,disc:disc,discAmt:discAmt,finalSum:finalSum,origSum:origSum,nm:nm,em:em,ph:ph};
  }
  if(ty==='pickup'){
    return{ty:ty,m:'Самовывоз',cn:'',sm:'',a:'Санкт-Петербург, Полярников 9',p:pt,disc:disc,discAmt:discAmt,finalSum:finalSum,origSum:origSum,nm:nm,em:em,ph:ph};
  }
  if(ty==='courier'){
    var strEl=document.getElementById('i_str');
    var houEl=document.getElementById('i_hou');
    var aptEl=document.getElementById('i_apt');
    var flEl=document.getElementById('i_fl');
    var domEl=document.getElementById('i_dom');
    var cmtEl=document.getElementById('i_cmt');
    var str=strEl?strEl.value:'';
    var hou=houEl?houEl.value:'';
    var apt=aptEl?aptEl.value:'';
    var fl=flEl?flEl.value:'';
    var dom=domEl?domEl.value:'';
    var cmt=cmtEl?cmtEl.value:'';
    var addr='СПб, '+str+', д.'+hou;
    if(apt)addr+=', кв.'+apt;
    if(fl)addr+=', эт.'+fl;
    if(dom)addr+=', домофон: '+dom;
    if(cmt)addr+='. Комментарий: '+cmt;
    return{ty:ty,m:'Курьер СПб',cn:'',sm:'',a:addr,p:pt,disc:disc,discAmt:discAmt,finalSum:finalSum,origSum:origSum,nm:nm,em:em,ph:ph};
  }
  return null;
}

function fillTildaForm(d){
  var form=document.getElementById(FORM_ID);
  if(!form)return false;
  var fName=form.querySelector('input[name="name"]');if(fName)fName.value=d.nm;
  var fEmail=form.querySelector('input[name="email"]');if(fEmail)fEmail.value=d.em;
  var fPhone=form.querySelector('input[name="phone"]');if(fPhone)fPhone.value=d.ph;
  var dlvText=d.m;
  if(d.cn)dlvText+=' - '+d.cn;
  if(d.sm)dlvText+=' ('+d.sm+')';
  var fDlv=form.querySelector('input[name="delivery"]');if(fDlv)fDlv.value=dlvText;
  var fAddr=form.querySelector('input[name="address"]');if(fAddr)fAddr.value=d.a||'';
  var fComm=form.querySelector('input[name="comment"]');
  if(fComm){var commText='Оплата: '+d.p;if(d.disc)commText+=' | Скидка: '+d.discAmt+' руб. | Итого: '+d.finalSum+' руб.';fComm.value=commText;}
  var payText='Оплата: '+d.p;
  if(d.disc)payText+=' | Скидка: '+d.discAmt+' руб. | Итого: '+d.finalSum+' руб.';
  var fSpec=form.querySelector('[name="form-spec-comments"]');
  if(fSpec)fSpec.value=d.nm+' | '+d.ph+' | '+d.em+' | '+dlvText+(d.a?' | '+d.a:'')+' | '+payText;
  return true;
}

function unlockScroll(){
  document.body.style.overflow='';
  document.body.style.overflowY='';
  document.body.style.paddingRight='';
  document.body.style.height='';
  document.body.style.minHeight='';
  document.body.style.touchAction='';
  document.documentElement.style.overflow='';
  document.documentElement.style.overflowY='';
  document.documentElement.style.paddingRight='';
  document.body.classList.remove('t-body_popupopened');
  document.body.classList.remove('t706__body_cartwinshowed');
  var allrecords=document.getElementById('allrecords');
  if(allrecords)allrecords.classList.remove('t-records__overflow-hidden');
}

function showSuccess(){
  _origPrice=null;ins=false;reord=false;
  var cartWin=document.querySelector('.t706__cartwin');
  if(cartWin){cartWin.style.display='none';cartWin.style.pointerEvents='none';}
  var overlay=document.querySelector('.t706__overlay');
  if(overlay){overlay.style.display='none';overlay.style.pointerEvents='none';}
  unlockScroll();
  [50,100,200,400,600,1000].forEach(function(t){setTimeout(unlockScroll,t);});
  try{localStorage.removeItem(SK);}catch(e){}
  setTimeout(function(){
    var old=document.getElementById('cstSuccessOverlay');if(old)old.remove();
    var ov=document.createElement('div');
    ov.className='cst-overlay visible';
    ov.id='cstSuccessOverlay';
    ov.style.cssText='position:fixed!important;top:0!important;left:0!important;width:100%!important;height:100%!important;z-index:999999!important;display:flex!important;align-items:center!important;justify-content:center!important;background:rgba(0,0,0,.7)!important;pointer-events:all!important;';
    ov.innerHTML='<div class="cst-popup" style="pointer-events:all!important;position:relative!important;z-index:1000000!important;">'
      +'<div class="cst-popup-icon"><div class="cst-popup-badge">'
      +'<svg class="cst-popup-check" viewBox="0 0 24 24"><polyline points="4 12 10 18 20 6"/></svg>'
      +'</div></div>'
      +'<h3>Заказ оформлен!</h3>'
      +'<p>Скоро свяжемся с вами для подтверждения заказа и согласования даты доставки</p>'
      +'<button class="cst-popup-btn" id="cstSuccessBtn" style="pointer-events:all!important;cursor:pointer!important;">Хорошо</button>'
      +'</div>';
    document.body.appendChild(ov);
    function closeSuccess(){ov.remove();location.reload();}
    document.getElementById('cstSuccessBtn').addEventListener('click',closeSuccess);
    ov.addEventListener('click',function(e){if(e.target===ov)closeSuccess();});
  },400);
}

function updPay(){
  var ac=document.querySelector('.dlv-opt.active');
  var ty=ac?ac.getAttribute('data-d'):'';
  var payCard=document.querySelector('.pay-opt[data-p="card"]');
  var payQR=document.getElementById('payQR');
  var payCash=document.getElementById('payCash');
  if(!payCard||!payQR||!payCash)return;
  [payCard,payQR,payCash].forEach(function(o){o.classList.remove('pay-disabled');});
  if(ty!=='pickup'){payCash.classList.add('pay-disabled');payCash.classList.remove('active');}
  updDiscount();
}

function selDlv(el){
  document.querySelectorAll('.dlv-opt').forEach(function(o){o.classList.remove('active');o.style.borderColor='';});
  el.classList.add('active');
  document.querySelectorAll('.dlv-cnt').forEach(function(c){c.classList.remove('visible');});
  var ty=el.getAttribute('data-d');
  if(ty==='tk')document.getElementById('cnt-tk').classList.add('visible');
  if(ty==='pickup'){
    document.getElementById('cnt-pickup').classList.add('visible');
    if(!mi){setTimeout(initMap,300);mi=true;}
    else{
      setTimeout(function(){if(mp){mp.invalidateSize();mp.setView([59.93,30.38],9);}},100);
      setTimeout(function(){if(mp)mp.invalidateSize();},400);
    }
  }
  if(ty==='courier')document.getElementById('cnt-cour').classList.add('visible');
  updPay();
}

function bindAll(){
  document.querySelectorAll('.dlv-opt').forEach(function(o){o.addEventListener('click',function(){selDlv(this);});});
  var s=document.getElementById('selTK');
  if(s)s.addEventListener('change',function(){
    var sb=document.getElementById('tk-sub');
    if(sb&&this.value)sb.classList.add('visible');
  });
  document.querySelectorAll('.dlv-sub-o').forEach(function(o){
    o.addEventListener('click',function(){
      document.querySelectorAll('.dlv-sub-o').forEach(function(x){x.classList.remove('active');});
      this.classList.add('active');
      var t=this.getAttribute('data-ts');
      var pvz=document.getElementById('tk-pvz');
      var tca=document.getElementById('tk-ca');
      if(pvz)pvz.classList.toggle('visible',t==='pvz');
      if(tca)tca.classList.toggle('visible',t==='tkc');
    });
  });
  document.querySelectorAll('.pay-opt').forEach(function(o){
    o.addEventListener('click',function(){
      if(this.classList.contains('pay-disabled'))return;
      document.querySelectorAll('.pay-opt').forEach(function(x){x.classList.remove('active');});
      this.classList.add('active');
      updDiscount();
    });
  });
  initDD('i_pvz','dd-pvz');
  initDD('i_tkc','dd-tkc');
  updPay();
}

function initDD(iid,sid){
  var inp=document.getElementById(iid);
  var box=document.getElementById(sid);
  if(!inp||!box)return;
  var tm;
  inp.addEventListener('input',function(){
    var q=this.value.trim();
    clearTimeout(tm);
    if(q.length<3){box.classList.remove('visible');box.innerHTML='';return;}
    tm=setTimeout(function(){
      fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json','Authorization':'Token '+DT},
        body:JSON.stringify({query:q,count:7,locations:[{country:'Россия'}]})
      }).then(function(r){return r.json();}).then(function(data){
        box.innerHTML='';
        if(data.suggestions&&data.suggestions.length>0){
          data.suggestions.forEach(function(s){
            var div=document.createElement('div');
            div.className='dd-item';
            div.textContent=s.value;
            div.addEventListener('click',function(){inp.value=s.value;box.classList.remove('visible');box.innerHTML='';});
            box.appendChild(div);
          });
          box.classList.add('visible');
        }else{box.classList.remove('visible');}
      }).catch(function(){box.classList.remove('visible');});
    },300);
  });
  document.addEventListener('click',function(e){
    if(!inp.contains(e.target)&&!box.contains(e.target))box.classList.remove('visible');
  });
}

function initMap(){
  var c=[59.93,30.38],z=9;
  mp=L.map('dlv-map',{center:c,zoom:z,zoomControl:true,scrollWheelZoom:true,attributionControl:false});
  L.tileLayer('https://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1&ts=online_sd',{maxZoom:18}).addTo(mp);
  var ic=L.divIcon({
    html:'<div style="width:16px;height:16px;background:#FF6B35;border-radius:50%;border:3px solid #fff;box-shadow:0 0 20px rgba(255,107,53,0.7)"></div>',
    iconSize:[22,22],iconAnchor:[11,11],className:''
  });
  var mk=L.marker([59.878830,30.436296],{icon:ic}).addTo(mp)
    .bindPopup('<div style="background:#1a1a1a;color:#FF6B35;padding:12px 16px;border-radius:8px;font-size:14px;border:1px solid rgba(255,107,53,0.3)"><b>Санкт-Петербург, Полярников 9</b></div>',{className:'dark-popup',closeButton:false});
  mk.on('click',function(){mp.flyTo([59.878830,30.436296],17,{duration:1.5});});
  mp.on('popupclose',function(){mp.flyTo(c,z,{duration:1.5});});
  var fc=0,fi=setInterval(function(){
    if(mp){mp.invalidateSize();mp.setView(c,z);}
    fc++;if(fc>10)clearInterval(fi);
  },200);
}

function hideTildaSubmit(){
  var form=document.getElementById(FORM_ID);
  if(!form)return;
  var btn=form.querySelector('button.t-submit,button[type="submit"]');
  if(btn){
    btn.style.cssText='position:absolute!important;opacity:0!important;pointer-events:none!important;height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:none!important;';
  }
}

function tryIns(){
  if(_focused)return;
  var hasR=document.getElementById('rBlock');
  var hasD=document.getElementById('dBlock');
  var hasP=document.getElementById('pBlock');
  if(ins&&hasR&&hasD&&hasP)return;
  if(!hasR||!hasD||!hasP){
    _origPrice=null;
    ins=false;
    reord=false;
  }
  if(hasR&&hasD&&hasP){ins=true;if(!reord)reorder();return;}
  if(hasR)hasR.remove();
  if(hasD)hasD.remove();
  if(hasP)hasP.remove();
  var ct=document.querySelector('.t706__cartwin-content');
  if(!ct)return;
  var w1=document.createElement('div');w1.innerHTML=rH;
  var w2=document.createElement('div');w2.innerHTML=dH;
  var w3=document.createElement('div');w3.innerHTML=pH;
  var tot=null;
  var children=Array.prototype.slice.call(ct.children);
  for(var i=0;i<children.length;i++){
    var el=children[i];
    var cn=el.className||'';
    if(cn.indexOf('total')!==-1||cn.indexOf('Total')!==-1){tot=el;break;}
    if(el.textContent&&el.textContent.indexOf('Итоговая сумма')!==-1){tot=el;break;}
  }
  if(tot){
    ct.insertBefore(w3.firstElementChild,tot);
    ct.insertBefore(w2.firstElementChild,document.getElementById('pBlock'));
    ct.insertBefore(w1.firstElementChild,document.getElementById('dBlock'));
  }else{
    ct.appendChild(w1.firstElementChild);
    ct.appendChild(w2.firstElementChild);
    ct.appendChild(w3.firstElementChild);
  }
  ins=true;
  bindAll();
  initPhone();
  clearErr();
  bindSave();
  initAgree();
  hideTildaSubmit();
  setTimeout(function(){
    var attempts=0;
    var waitTot=setInterval(function(){
      var tot=document.querySelector('.t706__cartwin-totalamount-wrap');
      attempts++;
      if(tot||attempts>20){
        clearInterval(waitTot);
        reorder();
        restoreState();
      }
    },100);
  },150);
}

function reorder(){
  var r=document.getElementById('rBlock');
  var d=document.getElementById('dBlock');
  var p=document.getElementById('pBlock');
  if(!r||!d||!p)return;
  var pr=r.parentNode;
  if(!pr)return;
  var sub=null;
  var tot=document.querySelector('.t706__cartwin-totalamount-wrap');
  var children=Array.prototype.slice.call(pr.children);
  for(var i=0;i<children.length;i++){
    var el=children[i];
    if(el===r||el===d||el===p)continue;
    var btn=el.querySelector('button.t-submit,button[type="submit"]');
    if(btn){sub=el;continue;}
  }
  pr.appendChild(r);
  pr.appendChild(d);
  pr.appendChild(p);
  var disc=document.getElementById('discountInfo');
  if(disc)pr.appendChild(disc);
  if(tot){
    pr.appendChild(tot);
    tot.style.setProperty('display','block','important');
    tot.style.setProperty('opacity','1','important');
    tot.style.setProperty('height','auto','important');
    tot.style.setProperty('overflow','visible','important');
    tot.style.setProperty('position','static','important');
  }
  var existBtn=document.getElementById('cstSubmitBtn');
  if(!existBtn){
    var btnWrap=document.createElement('div');
    btnWrap.innerHTML='<button class="cst-submit-btn" id="cstSubmitBtn">Оформить заказ</button>';
    var newBtn=btnWrap.firstElementChild;
    newBtn.addEventListener('click',function(){inject();});
    pr.appendChild(newBtn);
  }else{
    pr.appendChild(existBtn);
  }
  if(sub){
    sub.style.cssText='position:absolute!important;opacity:0!important;pointer-events:none!important;height:0!important;overflow:hidden!important;';
  }
  var of=document.querySelector('.t706__orderform');
  if(of){
    of.style.setProperty('opacity','1','important');
    of.style.setProperty('height','auto','important');
    of.style.setProperty('overflow','visible','important');
    of.style.setProperty('position','static','important');
    of.style.setProperty('pointer-events','auto','important');
  }
  reord=true;
  hideTildaSubmit();
}

function inject(){
  if(!validate())return false;
  var d=getDD();
  if(!d)return false;
  var ok=fillTildaForm(d);
  if(!ok){console.warn('Форма не найдена');return false;}
  _injecting=true;
  setTimeout(function(){
    var form=document.getElementById(FORM_ID);
    if(!form){_injecting=false;return;}
    var btn=form.querySelector('button.t-submit,button[type="submit"]');
    if(!btn){_injecting=false;return;}
    btn.style.cssText='';
    if(d.disc)applyPromo();
    setTimeout(function(){
      btn.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
    },d.disc?1500:0);
    setTimeout(function(){
      hideTildaSubmit();
      _injecting=false;
    },3000);
  },150);
  return 'handled';
}

document.addEventListener('click',function(e){
  if(_injecting)return;
  var b=e.target.closest('button.t-submit,button[type="submit"]');
  if(!b)return;
  if(b.id==='cstSubmitBtn')return;
  var cartWin=document.querySelector('.t706__cartwin');
  if(!cartWin||!cartWin.contains(b))return;
  var form=document.getElementById(FORM_ID);
  if(!form||!form.contains(b))return;
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
},true);

document.addEventListener('tildaform:aftersend',function(e){
  if(e.detail&&(e.detail.formId===FORM_ID||e.detail.id===FORM_ID)){
    showSuccess();
  }
});

var successOb=new MutationObserver(function(mu){
  mu.forEach(function(m){
    m.addedNodes.forEach(function(node){
      if(node.nodeType===1){
        var cn=node.className||'';
        if(cn.indexOf('t-form__success')!==-1||cn.indexOf('js-send-success')!==-1){
          node.style.display='none';
          showSuccess();
        }
        var inner=node.querySelector&&node.querySelector('.t-form__success,.js-send-success');
        if(inner){inner.style.display='none';showSuccess();}
      }
    });
    if(m.target&&m.target.nodeType===1){
      var cn2=m.target.className||'';
      if((cn2.indexOf('t-form__success')!==-1||cn2.indexOf('js-send-success')!==-1)&&
         m.target.style.display!=='none'){
        m.target.style.display='none';
        showSuccess();
      }
    }
  });
});

document.addEventListener('click',function(e){
  if(e.target.closest('.t706__cartwin-close,.t706__overlay')){
    setTimeout(function(){
      document.body.style.overflow='';
      document.body.style.paddingRight='';
      document.documentElement.style.overflow='';
      document.documentElement.style.paddingRight='';
      document.body.classList.remove('t-body_popupopened');
    },100);
  }
});

var ob=new MutationObserver(function(mu){
  if(_focused)return;
  var need=false;
  for(var i=0;i<mu.length;i++){if(mu[i].addedNodes.length>0){need=true;break;}}
  if(!need)return;
  if(!document.getElementById('rBlock')||!document.getElementById('dBlock')||!document.getElementById('pBlock')){
    ins=false;mi=false;reord=false;
  }
  tryIns();
});

var scrollOb=new MutationObserver(function(){
  var ov=document.getElementById('cstSuccessOverlay');
  if(!ov)return;
  if(document.body.style.overflow==='hidden')document.body.style.overflow='';
  if(document.body.style.overflowY==='hidden')document.body.style.overflowY='';
  if(document.documentElement.style.overflow==='hidden')document.documentElement.style.overflow='';
  if(document.documentElement.style.overflowY==='hidden')document.documentElement.style.overflowY='';
  if(document.body.classList.contains('t-body_popupopened'))document.body.classList.remove('t-body_popupopened');
});

function startObservers(){
  if(!document.body)return;
  ob.observe(document.body,{childList:true,subtree:true});
  if(!successOb._started){
    successOb.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style']});
    successOb._started=true;
  }
  scrollOb.observe(document.body,{attributes:true,attributeFilter:['style','class']});
  scrollOb.observe(document.documentElement,{attributes:true,attributeFilter:['style','class']});
}

window.addEventListener('resize',function(){
  if(_focused)return;
  var r=document.getElementById('rBlock');
  var d=document.getElementById('dBlock');
  var p=document.getElementById('pBlock');
  if(!r||!d||!p)return;
  reord=false;
  reorder();
});

if(document.body){startObservers();}
else{document.addEventListener('DOMContentLoaded',startObservers);}

tryIns();
var ci=setInterval(function(){
  if(_focused)return;
  if(!document.getElementById('rBlock')||!document.getElementById('dBlock')||!document.getElementById('pBlock')){
    ins=false;reord=false;
  }
  tryIns();
},800);
setTimeout(function(){
  clearInterval(ci);
  setInterval(function(){
    if(_focused)return;
    if(!document.getElementById('rBlock')||!document.getElementById('dBlock')||!document.getElementById('pBlock')){
      ins=false;mi=false;reord=false;
    }
    tryIns();
  },2000);
},30000);

}
})();
