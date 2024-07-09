/* override listener */
document.body.style.userSelect = null;
['selectstart', 'contextmenu', 'copy', 'dragstart'].forEach(v => {
  document.body.addEventListener(v, e => {
    e.stopPropagation();
  }, { capture: true });
});
/* remove ad */
document.querySelectorAll('div:has(> ins), ins, .banner').forEach(v => {
  v.setAttribute('style', 'max-height:0;overflow:hidden;padding:0;transition:initial');
});
/* append input*/
function css(s) {
  const style = document.createElement('style');
  style.textContent = s;
  document.head.append(style);
}
css('#overLayer{max-height:calc(100vh - 10px)}.social-btn-list,.social-btn-list_mini{display:none}.ext-input{display:none;position:fixed;right:0;bottom:5px;box-shadow:0px 0px 5px 1px #e9e9e9;outline:none;width:100px;color:#101010}');
const input = document.createElement('input');
input.classList.add('ext-input');
input.setAttribute('type', 'text');
input.setAttribute('maxlength', '6');
document.body.addEventListener('keydown', e => {
  e.stopPropagation();
  if(e.ctrlKey && e.key == 's') {
    input.style.display = 'block';
    input.focus();
    e.preventDefault();
  }
  if(document.activeElement == input) {
    if(e.key == 'Escape') {
      input.value = '';
      input.style.display = null;
    }
    if(e.key != 'Enter') return;
    const url = input.value.replace(/^(\d\d?)([ha])?(\d\d?)?$/, (_, n, k, m) => {
      const y = k ? ('0' + n).slice(-2) + '_' + (k == 'a' ? 'aki' : 'haru') : location.pathname.match(/^\/kakomon\/(\d\d?_(?:haru|aki))\//)?.[1];
      if(!y) return input.value;
      const d = (m || !k) ? `/q${k ? m : n}.html` : '';
      return '/kakomon/' + y + d;
    });
    if(input.value != url) location.href = url;
    else input.value = '';
  }
}, { capture: true });
document.body.append(input);
/* append css */
if(document.querySelector('.qno')) {
  css('.img_margin:has(>#btmNav){height:44px;display:flex;align-items:center}#configform,.img_margin:has(>#btmNav){position:sticky;bottom:0;background-color:white;z-index:3;padding:5px 10px;max-height:75vh;overflow-y:auto;transition:.2s box-shadow}#btmNav{width:100%}#configform>.bottomBtns,#btmNav{margin:0}.sticky-{box-shadow:0px 0px 5px 1px #e9e9e9}#toTop{z-index:3}#btmNav:not(:has(#toprev)):before,#btmNav:not(:has(#tonext)):after{content:"ああああ(あ0)";font-size:14px;padding:0px 26px;color:transparent}');
  const conf = document.querySelector('#configform, .img_margin:has(> #btmNav)');
  const scroll = () => {
    conf.classList.toggle('sticky-', Math.round(conf.getBoundingClientRect().bottom) == document.body.clientHeight);
  };
  document.addEventListener('scroll', scroll);
  scroll();
}
