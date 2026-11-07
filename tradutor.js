// tradutor.js - PRETANAIL FIX - Não quebra tema
(function(){
  const css = `
  #google_translate_element{display:none !important;}
  .goog-te-banner-frame, .skiptranslate, iframe.goog-te-banner-frame{display:none !important;}
  body{top:0 !important;}
  
  .preta-translate-wrap{display:flex; flex-direction:column; align-items:center; gap:4px; margin-top:8px;}
  .preta-translate-btn{width:32px; height:32px; border-radius:50%; border:1px solid rgba(193,53,132,0.25); background:rgba(255,255,255,0.05); color:#C13584; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:14px; transition:0.2s;}
  .preta-translate-btn:hover{background:#C13584; color:#fff;}
  .preta-translate-label{font-size:9px; font-weight:700; letter-spacing:0.5px; color:#C13584; text-transform:uppercase; opacity:0.8;}
  [data-theme="light"] .preta-translate-btn{background:#fff; box-shadow:0 2px 10px rgba(0,0,0,0.06);}
  [data-theme="light"] .preta-translate-label{color:#888;}

  .preta-translate-menu{position:absolute; left:50%; transform:translateX(-50%); top:55px; background:#111; border:1px solid rgba(193,53,132,0.3); border-radius:14px; padding:6px; display:none; flex-direction:column; gap:4px; min-width:150px; box-shadow:0 10px 30px rgba(0,0,0,0.5); z-index:9999;}
  .preta-translate-menu.show{display:flex;}
  [data-theme="light"] .preta-translate-menu{background:#fff; border-color:#eee;}
  .preta-translate-menu button{background:transparent; border:0; border-radius:8px; padding:8px 12px; color:#fff; font-weight:600; font-size:12px; cursor:pointer; text-align:left;}
  [data-theme="light"] .preta-translate-menu button{color:#222;}
  .preta-translate-menu button:hover{background:#C13584; color:#fff;}
  `;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  const themeBtn = document.getElementById('themeBtn') || document.querySelector('.theme-btn') || document.querySelector('[id*="theme"]');

  const wrap = document.createElement('div');
  wrap.className = 'preta-translate-wrap';
  wrap.style.position = 'relative';
  wrap.innerHTML = `
    <button class="preta-translate-btn" id="pretaTranslateBtn"><i class="fas fa-globe"></i></button>
    <span class="preta-translate-label">traduzir</span>
    <div class="preta-translate-menu" id="pretaTranslateMenu">
      <button data-lang="pt">🇧🇷 Português</button>
      <button data-lang="en">🇺🇸 English</button>
      <button data-lang="es">🇪🇸 Español</button>
      <button data-lang="fr">🇫🇷 Français</button>
    </div>
  `;

  if(themeBtn && themeBtn.parentNode){
    // Cola junto do botão do sol/lua, não por cima
    themeBtn.parentNode.insertBefore(wrap, themeBtn.nextSibling);
  } else {
    // Se não achar tema, vai pro canto mas sem fixed que quebra
    wrap.style.position = 'fixed';
    wrap.style.left = '20px';
    wrap.style.top = '20px';
    document.body.appendChild(wrap);
  }

  const divGt = document.createElement('div'); divGt.id = 'google_translate_element'; document.body.appendChild(divGt);
  const btn = document.getElementById('pretaTranslateBtn');
  const menu = document.getElementById('pretaTranslateMenu');

  btn.onclick = (e) => { e.stopPropagation(); menu.classList.toggle('show'); };
  document.addEventListener('click', (e) => { if(!wrap.contains(e.target)) menu.classList.remove('show'); });

  window.googleTranslateElementInit = function(){
    new google.translate.TranslateElement({pageLanguage:'pt', includedLanguages:'pt,en,es,fr,it,de', autoDisplay:false}, 'google_translate_element');
  };
  window.trocarIdioma = function(lang){
    const select = document.querySelector('select.goog-te-combo');
    if(lang === 'pt'){
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain='+location.hostname;
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.'+location.hostname;
      location.reload(); return;
    }
    if(select){
      select.value = lang; select.dispatchEvent(new Event('change'));
      menu.classList.remove('show');
      const val = '/pt/'+lang;
      document.cookie = 'googtrans='+val+'; path=/;';
      document.cookie = 'googtrans='+val+'; path=/; domain=.'+location.hostname;
    }
  };
  menu.querySelectorAll('button').forEach(b => b.addEventListener('click', () => trocarIdioma(b.dataset.lang)));

  const s = document.createElement('script');
  s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  document.body.appendChild(s);
})();
