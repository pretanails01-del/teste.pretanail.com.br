// tradutor.js - ISOLADO - Não mexe no tema
(function(){
  // Não deixa o Google criar barra no topo
  const css = document.createElement('style');
  css.textContent = "#google_translate_element{display:none!important} .goog-te-banner-frame{display:none!important} body{top:0!important}";
  document.head.appendChild(css);

  const g = document.createElement('div');
  g.id = 'google_translate_element';
  document.body.appendChild(g);

  window.googleTranslateElementInit = function(){
    new google.translate.TranslateElement({pageLanguage:'pt'}, 'google_translate_element');
  };
  
  const s = document.createElement('script');
  s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  document.body.appendChild(s);
})();
