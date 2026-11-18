// Runs in the document head; delegated handlers also work before the header exists.
export const navigationScript = `(() => {
  const root = document.documentElement;
  if (root.classList.contains('nav-ready')) return;

  function closeMenu(restoreFocus = false) {
    const menu = document.querySelector('.menu-toggle');
    const nav = document.getElementById('primary-nav');
    menu?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('is-open');
    if (restoreFocus) menu?.focus();
  }

  document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const toggle = event.target.closest('.menu-toggle');
    if (toggle) {
      const nav = document.getElementById(toggle.getAttribute('aria-controls'));
      if (!nav) return;
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      return;
    }
    if (event.target.closest('#primary-nav a') || !event.target.closest('.site-header')) closeMenu();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.querySelector('.menu-toggle')?.getAttribute('aria-expanded') === 'true') {
      closeMenu(true);
    }
  });

  const desktop = matchMedia('(min-width: 1101px)');
  const closeOnDesktop = event => { if (event.matches) closeMenu(); };
  if (desktop.addEventListener) desktop.addEventListener('change', closeOnDesktop);
  else desktop.addListener(closeOnDesktop);

  root.classList.add('nav-ready');
})();`;
