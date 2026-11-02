/* SET · legal pages: contents list built from the headings, active section, gentle reveals. No third-party code. */
(function(){
  const article = document.querySelector('article');
  const list = document.getElementById('tocList');
  const heads = Array.from(article.querySelectorAll('h2'));

  heads.forEach((h, i) => {
    h.id = h.id || 'abschnitt-' + (i + 1);
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + h.id;
    const n = document.createElement('span'); n.textContent = String(i + 1).padStart(2, '0');
    const t = document.createElement('em'); t.style.fontStyle = 'normal';
    t.textContent = h.textContent.replace(/^\d+\.\s*/, '');
    a.append(n, t); li.appendChild(a); list.appendChild(li);
  });
  const links = Array.from(list.querySelectorAll('a'));

  if('IntersectionObserver' in window){
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(!e.isIntersecting) return;
        const i = heads.indexOf(e.target);
        links.forEach((l, k) => l.classList.toggle('on', k === i));
      });
    }, {rootMargin:'0px 0px -70% 0px'});
    heads.forEach(h => io.observe(h));

    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      const blocks = Array.from(article.children);
      blocks.forEach(b => b.classList.add('reveal'));
      const rio = new IntersectionObserver(entries => entries.forEach(e => {
        if(e.isIntersecting){ e.target.classList.add('in'); rio.unobserve(e.target); }
      }), {rootMargin:'0px 0px -8% 0px'});
      blocks.forEach(b => rio.observe(b));
    }
  }
  if(links[0]) links[0].classList.add('on');

  const nav = document.querySelector('.nav');
  const onScroll = () => nav.classList.toggle('solid', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();
