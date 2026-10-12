(function(){
  const t = localStorage.getItem('preta-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', t);
})();
function applyTheme(t){
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('preta-theme', t);
  const icon = document.getElementById('themeIcon');
  const meta = document.getElementById('meta-theme-color');
  const badge = document.getElementById('badgeVagas');
  if(icon) icon.className = t==='light' ? 'fas fa-moon' : 'fas fa-sun';
  if(meta) meta.content = t==='light' ? '#FFFAFC' : '#0a0a0a';
  if(badge){
    if(t==='light'){ badge.style.background='rgba(193,53,132,0.08)'; badge.style.color='#C13584'; }
    else { badge.style.background='rgba(0,0,0,0.3)'; badge.style.color='#ff7abf'; }
  }
}
document.addEventListener('DOMContentLoaded', ()=>{
  const saved = localStorage.getItem('preta-theme') || 'dark';
  applyTheme(saved);
  const btn = document.getElementById('themeBtn');
  if(btn){
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      const cur = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(cur==='dark'?'light':'dark');
    });
  }
});
