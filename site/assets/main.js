(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof gsap !== 'undefined';
  if (!hasGsap) document.documentElement.classList.add('no-js');
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  /* smooth scroll */
  let lenis;
  if (!reduce && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* nav */
  const nav = document.querySelector('[data-nav]');
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-solid', y > 40);
    const drawerOpen = document.querySelector('[data-drawer].is-open');
    nav.classList.toggle('is-hidden', !drawerOpen && y > lastY && y > 400);
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const burger = document.querySelector('[data-burger]');
  const drawer = document.querySelector('[data-drawer]');
  burger?.addEventListener('click', () => {
    const open = !drawer.classList.contains('is-open');
    drawer.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
    nav.classList.add('is-solid');
    open ? lenis?.stop() : lenis?.start();
  });

  /* mega menu image swap */
  const megaImg = document.querySelector('[data-mega-img]');
  document.querySelectorAll('.mega__link').forEach(a => a.addEventListener('mouseenter', () => { megaImg.src = a.dataset.img; }));

  /* hero slideshow */
  const slides = [...document.querySelectorAll('.hero__slide')];
  if (slides.length) {
    const dots = [...document.querySelectorAll('[data-slide]')];
    const cap = document.querySelector('[data-hero-cap]');
    let i = 0, timer;
    const go = n => {
      slides[i].classList.remove('is-on');
      dots.forEach((d, k) => { d.classList.remove('is-on'); d.classList.toggle('is-done', k < n); });
      i = n;
      slides[i].classList.add('is-on');
      void dots[i].offsetWidth; dots[i].classList.add('is-on');
      cap.textContent = slides[i].querySelector('figcaption').textContent;
      clearTimeout(timer); timer = setTimeout(() => go((i + 1) % slides.length), 6000);
    };
    dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
    timer = setTimeout(() => go(1), 6000);
  }

  /* forms (front-end demo) */
  document.querySelectorAll('[data-form]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    f.querySelector('.form__ok').hidden = false;
    f.querySelector('button[type=submit]').disabled = true;
  }));

  /* tabs */
  document.querySelectorAll('[data-tabs]').forEach(t => {
    const btns = [...t.querySelectorAll('[data-tab]')];
    const panels = [...t.querySelectorAll('[data-panel]')];
    const sel = k => {
      btns.forEach((b, j) => b.setAttribute('aria-selected', j === k));
      panels.forEach((p, j) => p.hidden = j !== k);
      ScrollTrigger?.refresh();
    };
    btns.forEach((b, k) => b.addEventListener('click', () => sel(k)));
    const hashIdx = btns.findIndex(b => '#' + b.id === location.hash);
    if (hashIdx > -1) sel(hashIdx);
  });

  /* lightbox */
  const lb = document.querySelector('[data-lb]');
  if (lb) {
    const img = lb.querySelector('img');
    document.querySelectorAll('[data-lightbox]').forEach(b => b.addEventListener('click', () => { img.src = b.dataset.lightbox; lb.hidden = false; }));
    lb.addEventListener('click', e => { if (e.target !== img) lb.hidden = true; });
    addEventListener('keydown', e => { if (e.key === 'Escape') lb.hidden = true; });
  }

  /* services hover image follows cursor */
  const sv = document.querySelector('[data-services]');
  const fl = document.querySelector('[data-float]');
  if (sv && fl && matchMedia('(hover:hover)').matches) {
    const im = fl.querySelector('img');
    const xTo = hasGsap ? gsap.quickTo(fl, 'x', { duration: .6, ease: 'power3' }) : null;
    const yTo = hasGsap ? gsap.quickTo(fl, 'y', { duration: .6, ease: 'power3' }) : null;
    sv.querySelectorAll('.srow').forEach(r => {
      r.addEventListener('mouseenter', () => { im.src = r.dataset.img; fl.classList.add('is-on'); });
      r.addEventListener('mouseleave', () => fl.classList.remove('is-on'));
    });
    sv.addEventListener('mousemove', e => {
      const b = sv.getBoundingClientRect();
      const x = e.clientX - b.left - fl.offsetWidth * .5 + 80;
      const y = e.clientY - b.top - fl.offsetHeight * .5;
      xTo ? (xTo(x), yTo(y)) : (fl.style.transform = `translate(${x}px,${y}px)`);
    });
  }

  if (!hasGsap || reduce) {
    document.querySelectorAll('[data-reveal]').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
    document.querySelectorAll('[data-count]').forEach(el => el.textContent = el.dataset.count);
    document.querySelector('[data-loader]')?.remove();
    return;
  }

  /* word mask split for headings */
  document.querySelectorAll('[data-split]').forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(w => `<span class="split-line" style="display:inline-block"><span style="display:inline-block">${w}</span></span>`).join(' ');
    const inner = el.querySelectorAll('.split-line>span');
    gsap.set(inner, { yPercent: 110 });
    ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter: () => gsap.to(inner, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: .045 }),
    });
  });

  /* scroll-filled paragraph */
  document.querySelectorAll('[data-words]').forEach(el => {
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) frag.append(part);
            else { const s = document.createElement('span'); s.className = 'w'; s.textContent = part; frag.append(s); }
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName === 'B') walk(n);
        else if (n.nodeType === 1) n.classList.add('w');
      });
    };
    walk(el);
    gsap.to(el.querySelectorAll('.w'), {
      opacity: 1, stagger: .1, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
    });
  });

  /* generic reveal */
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%', once: true,
    onEnter: els => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: .08 }),
  });

  /* parallax */
  document.querySelectorAll('[data-parallax]').forEach(img => {
    gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.closest('section,a') || img, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  document.querySelectorAll('[data-inner-parallax]').forEach(img => {
    gsap.fromTo(img, { yPercent: -12 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* counters */
  document.querySelectorAll('[data-count]').forEach(el => {
    const o = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 85%', once: true,
      onEnter: () => gsap.to(o, { v: +el.dataset.count, duration: 2, ease: 'power3.out', onUpdate: () => el.textContent = Math.round(o.v), onComplete: () => el.textContent = el.dataset.count }),
    });
  });

  /* cable lines draw */
  document.querySelectorAll('.stats__cables path').forEach((p, k) => {
    const len = p.getTotalLength();
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(p, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: p.closest('.stats'), start: 'top 80%', end: 'bottom 60%', scrub: 1 + k * .3 } });
  });

  /* process steps */
  const steps = [...document.querySelectorAll('[data-step]')];
  const stepImgs = [...document.querySelectorAll('[data-step-img]')];
  steps.forEach((s, k) => ScrollTrigger.create({
    trigger: s, start: 'top 60%', end: 'bottom 60%',
    onToggle: self => {
      if (!self.isActive) return;
      steps.forEach(x => x.classList.toggle('is-on', x === s));
      stepImgs.forEach((im, j) => im.classList.toggle('is-on', j === k));
    },
  }));
  if (steps[0]) steps[0].classList.add('is-on');

  /* horizontal projects */
  const hs = document.querySelector('[data-hscroll]');
  if (hs) {
    const track = hs.querySelector('[data-track]');
    const mm = gsap.matchMedia();
    mm.add('(min-width: 901px)', () => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - innerWidth), ease: 'none',
        scrollTrigger: { trigger: hs, start: 'top top', end: () => '+=' + (track.scrollWidth - innerWidth), pin: true, scrub: 1, invalidateOnRefresh: true },
      });
    });
  }

  /* hero intro + loader */
  const heroTitle = document.querySelector('[data-hero-title]');
  if (heroTitle) {
    const spans = heroTitle.querySelectorAll('span');
    heroTitle.querySelectorAll('span').forEach(s => { s.outerHTML = `<span class="split-line" style="display:inline-block"><span style="display:inline-block">${s.innerHTML}</span></span>`; });
    const inner = heroTitle.querySelectorAll('.split-line>span');
    const side = document.querySelector('.hero__side');
    const bar = document.querySelector('.hero__bar');
    gsap.set(inner, { yPercent: 110 });
    gsap.set([side, bar], { opacity: 0, y: 30 });
    const tl = gsap.timeline();
    const loader = document.querySelector('[data-loader]');
    let seen = false;
    try { seen = sessionStorage.getItem('mx-loader') === '1'; sessionStorage.setItem('mx-loader', '1'); } catch (e) {}
    if (loader && !seen) {
      tl.to('.loader__line', { scaleX: 1, duration: .7, ease: 'expo.inOut' })
        .to(loader.querySelector('img'), { opacity: 1, duration: .4 }, '-=.2')
        .to('.loader__line', { scaleX: 0, transformOrigin: 'right', duration: .5, ease: 'expo.in' }, '+=.25')
        .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: .8, ease: 'expo.inOut' }, '-=.15')
        .set(loader, { display: 'none' });
    } else loader?.remove();
    tl.to(inner, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: .08 }, seen ? 0 : '-=.45')
      .to([side, bar], { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: .1 }, '-=.9');
  }

  addEventListener('load', () => ScrollTrigger.refresh());
})();
