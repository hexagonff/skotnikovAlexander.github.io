document.querySelectorAll('.ac-list__btn').forEach(function(tabsBtn){
  tabsBtn.addEventListener('click', function(e){
  const path = e.currentTarget.dataset.path;
  document.querySelectorAll('.ac-list__btn').forEach(function(btn){
  btn.classList.remove('ac-list__btn-active')});
  e.currentTarget.classList.add('ac-list__btn-active');
  document.querySelectorAll('.tabs-item').forEach(function(tabsBtn){
      tabsBtn.classList.remove('display')});
      document.querySelector(`[data-target="${path}"]`).classList.add('display');
      });
      });
