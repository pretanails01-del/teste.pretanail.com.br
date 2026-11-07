// VERSÃO DE TESTE - vai aparecer 100%
(function(){
  const div = document.createElement('div');
  div.innerHTML = '<div id="google_translate_element"></div>';
  document.body.appendChild(div);

  window.googleTranslateElementInit = function(){
    new google.translate.TranslateElement({pageLanguage:'pt'}, 'google_translate_element');
  }
  const s = document.createElement('script');
  s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  document.body.appendChild(s);
})();
