
// tradutor.js - V2 INTELIGENTE - Se adapta ao botão tema em qualquer lugar
(function(){
  const css = `
  .translate-btn{position:fixed;z-index:9999;width:42px;height:42px;border-radius:50%;border:1px solid rgba(193,53,132,0.4);background:rgba(255,255,255,0.06);backdrop-filter:blur(10px);color:#C13584;cursor:pointer;display:flex;align-items:center;justify-content:center;left:25px;top:75px;}
  [data-theme="light"] .translate-btn{background:#fff;box-shadow:0 4px 15px rgba(0,0,0,.06)}
  .translate-menu{position:fixed;z-index:9999;background:rgba(10,10,10,0.95);border:1px solid rgba(193,53,132,0.4);border-radius:15px;padding:8px;display:none;flex-direction:column;gap:6px;backdrop-filter:blur(15px);box-shadow:0 10px 30px rgba(0,0,0,0.5);max-height:320px;overflow-y:auto;left:25px;top:125px;}
  [data-theme="light"] .translate-menu{background:#fff}
  .translate-menu button{background:rgba(255,255,255,0.06);border:1px solid rgba(193,53,132,0.2);border-radius:10px;padding:10px 16px;color:var(--text,#fff);font-weight:700;font-size:13px;cursor:pointer;text-align:left;transition:.2s}
  .translate-menu button:hover{background:#C13584;color:#fff;border-color:#C13584}
  .translate-menu.show{display:flex}
  .goog-te-banner-frame.skiptranslate, .goog-te-banner-frame, #goog-gt-tt, .goog-te-balloon-frame, .goog-tooltip, body > .skiptranslate, iframe.goog-te-banner-frame{display:none !important; visibility:hidden !important; height:0 !important; width:0 !important; opacity:0 !important; pointer-events:none !important; position:absolute !important; z-index:-9999 !important;}
  body{top:0px !important; position:static !important;}
  .goog-text-highlight{background:transparent !important; box-shadow:none !important;}
  .goog-logo-link,.goog-te-gadget span{display:none!important}
  .goog-te-gadget{font-size:0!important; color:transparent!important;}
  #google_translate_element{display:none !important;}
  @media(max-width:768px){.translate-btn{left:16px}.translate-menu{left:16px;max-height:280px}}
  `;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  const divGt = document.createElement('div'); divGt.id = 'google_translate_element'; divGt.style.display='none'; document.body.appendChild(divGt);
  const btn = document.createElement('button'); btn.className='translate-btn'; btn.id='btnTraduzir'; btn.innerHTML='<i class="fas fa-globe"></i>'; document.body.appendChild(btn);
  const menu = document.createElement('div'); menu.className='translate-menu'; menu.id='translateMenu';
  menu.innerHTML = `<button data-lang="pt">🇧🇷 Português</button><button data-lang="en">🇺🇸 English</button><button data-lang="es">🇪🇸 Español</button><button data-lang="fr">🇫🇷 Français</button><button data-lang="it">🇮🇹 Italiano</button><button data-lang="de">🇩🇪 Deutsch</button><button data-lang="ja">🇯🇵 日本語</button><button data-lang="ar">🇸🇦 العربية</button>`;
  document.body.appendChild(menu);

  function posicionar(){
    const tema = document.getElementById('themeBtn') || document.querySelector('.theme-btn');
    if(tema){
      const rect = tema.getBoundingClientRect();
      const left = rect.left + window.scrollX;
      const topTema = rect.top + window.scrollY;
      btn.style.left = left + 'px';
      btn.style.top = (topTema + 50) + 'px';
      menu.style.left = left + 'px';
      menu.style.top = (topTema + 100) + 'px';
    }
  }
  // Posiciona agora, quando carregar, e quando mudar tamanho da tela
  window.addEventListener('load', posicionar);
  window.addEventListener('resize', posicionar);
  setTimeout(posicionar, 500);
  setTimeout(posicionar, 1500);

  btn.addEventListener('click',()=>{posicionar(); menu.classList.toggle('show')});
  document.addEventListener('click',(e)=>{if(!btn.contains(e.target)&&!menu.contains(e.target)){menu.classList.remove('show')}});

  window.googleTranslateElementInit = function(){
    new google.translate.TranslateElement({pageLanguage:'pt', includedLanguages:'pt,en,es,fr,it,de,ja,ar', autoDisplay:false}, 'google_translate_element');
    const saved = localStorage.getItem('preta-lang');
    if(saved && saved!=='pt'){ setTimeout(()=>{ trocarIdioma(saved); }, 800); }
  };
  window.trocarIdioma = function(lang){
    const select = document.querySelector('select.goog-te-combo');
    if(lang==='pt'){
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain='+location.hostname;
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.'+location.hostname;
      localStorage.setItem('preta-lang','pt');
      location.reload(); return;
    }
    if(select){
      select.value = lang; select.dispatchEvent(new Event('change'));
      localStorage.setItem('preta-lang', lang);
      const cookieVal = '/pt/'+lang;
      document.cookie = 'googtrans='+cookieVal+'; path=/;';
      document.cookie = 'googtrans='+cookieVal+'; path=/; domain=.'+location.hostname;
      menu.classList.remove('show');
    } else { alert('Tradutor carregando... clique de novo em 1 segundo'); }
  };
  menu.querySelectorAll('button').forEach(b=>{ b.addEventListener('click',()=>{ trocarIdioma(b.dataset.lang); }); });
  const s = document.createElement('script');
  s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  document.body.appendChild(s);
})();
