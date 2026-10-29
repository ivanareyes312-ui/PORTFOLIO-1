// Portfolio scripts: dark/light mode, copy email, image viewer
(function(){
  var root=document.documentElement, btn=document.getElementById('theme'), copy=document.getElementById('copy');
  var mq=window.matchMedia('(prefers-color-scheme: dark)');
  try{var saved=localStorage.getItem('theme'); if(saved) root.setAttribute('data-theme',saved);}catch(e){}
  function isDark(){var t=root.getAttribute('data-theme'); return t==='dark';}
  function label(){btn.textContent=isDark()?'Light mode':'Dark mode'; btn.setAttribute('aria-pressed',String(isDark()));}
  btn.addEventListener('click',function(){
    var next=isDark()?'light':'dark';
    root.setAttribute('data-theme',next);
    try{localStorage.setItem('theme',next);}catch(e){}
    label();
  });
  label();
  function flash(msg){copy.textContent=msg; setTimeout(function(){copy.textContent='Copy email';},1800);}
  copy.addEventListener('click',function(){
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(document.getElementById('mail').textContent).then(function(){flash('Copied!');},function(){flash('Copy failed');});
    } else { flash('Copy failed'); }
  });
})();

(function(){
  var dlg=document.getElementById('zoom'), big=dlg.querySelector('img');
  document.addEventListener('click',function(e){
    var b=e.target.closest('.zoom'); if(!b) return;
    var im=b.querySelector('img'); big.src=im.src; big.alt=im.alt;
    if(dlg.showModal) dlg.showModal();
  });
  document.getElementById('zoomclose').addEventListener('click',function(){dlg.close();});
  dlg.addEventListener('click',function(e){ if(e.target===dlg) dlg.close(); });
})();

// Back to top button: always visible, fades at the top of the page, scrolls smoothly when clicked
(function(){
  var btn=document.getElementById('totop');
  if(!btn) return;
  function check(){ btn.classList.toggle('faded', window.scrollY < 200); }
  window.addEventListener('scroll',check,{passive:true});
  btn.addEventListener('click',function(e){
    e.preventDefault();
    var calm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({top:0,behavior:calm?'auto':'smooth'});
  });
  check();
})();