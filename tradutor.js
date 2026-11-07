// tradutor.js - PRETANAIL OFICIAL
(function(){
  const css = `
  #google_translate_element{display:none !important;}
  .goog-te-banner-frame, .skiptranslate, iframe.goog-te-banner-frame{display:none !important;}
  body{top:0 !important;}
  
  .preta-translate{position:fixed; z-index:9998; left:25px; top:140px; font-family: inherit;}
  .preta-translate-btn{width:44px; height:44px; border-radius:50%; border:1px solid rgba(193,53,132,0.3); background:rgba(20,20,20,0.8); backdrop-filter:blur(10px); color:#C13584; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:18px; transition:0.3s;}
  .preta-translate-btn:hover{background:#C13584; color:#fff; transform:scale(1.05);}
  [data-theme="light"] .preta-translate-btn{background:#fff; box-shadow:0 4px 20px rgba(0,0,0,0.1);}

  .preta-translate-menu{position:absolute; left:0; top:52px; background:rgba(15,15,15,0.98); border:1px solid rgba(193,53,132,0.3); border-radius:16px; padding:8px; display:none; flex-direction:column; gap:5px; min-width:170px; box-shadow:0 15px 40px rgba(0,0,0,0.6); backdrop-filter:blur(15px);}
  .preta-translate-menu.show{display:flex;}
  [data-theme="light"] .preta-translate-menu{background:#fff; border-color:#eee; box-shadow:0 15px 40px rgba(0,0,0,0.15);}
  
  .preta-translate-menu button{background:transparent; border:0; border-radius:10px; padding:10px 14px; color:#fff; font-weight:600; font-size:13px; cursor:pointer; text-align:left; transition:0.2s; display:flex; gap:8px; align-items:center;}
  [data-theme="light"] .preta-translate-menu button{color:#222;}
  .preta-translate-menu button:hover{background:#C13584; color:#fff;}

  @media(max-width:768px){.preta-translate{left:16px; top:130px;}}
  `;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  const wrap = document.createElement('div'); wrap.className = 'preta-translate';
  wrap.innerHTML = `
    <button class="preta-translate-btn" id="pretaTranslateBtn"><i class="fas fa-globe"></i></button>
    <div class="preta-translate-menu" id="pretaTranslateMenu">
      <button data-lang="pt">🇧🇷 Português</button>
      <button data-lang="en">🇺🇸 English</button>
      <button data-lang="es">🇪🇸 Español</button>
      <button data-lang="fr">🇫🇷 Français</button>
      <button data-lang="it">🇮🇹 Italiano</button>
      <button data-lang="de">🇩🇪 Deutsch</button>
    </div>
  `;
  document.body.appendChild(wrap);
  const divGt = document.createElement('div'); divGt.id = 'google_translate_element'; document.body.appendChild(divGt);

  const btn = document.getElementById('pretaTranslateBtn');
  const menu = document.getElementById('pretaTranslateMenu');

  btn.onclick = () => menu.classList.toggle('show');
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
