document.documentElement.classList.add('js');

document.querySelectorAll('[data-park-explorer]').forEach(explorer => {
  const pins = [...explorer.querySelectorAll('[data-park-place]')];
  const panels = [...explorer.querySelectorAll('.park-place')];
  const picker = explorer.querySelector('select');
  const announcement = explorer.querySelector('[data-park-announcement]');
  function selectPlace(id, announce = true) {
    const selected = pins.find(pin => pin.dataset.parkPlace === id);
    if (!selected) return;
    pins.forEach(pin => pin.setAttribute('aria-pressed', String(pin === selected)));
    panels.forEach(panel => { panel.hidden = panel.id !== `park-place-${id}`; });
    explorer.querySelectorAll('[data-map-leader]').forEach(line => line.classList.toggle('is-selected', line.dataset.mapLeader === id));
    picker.value = id;
    if (announce) {
      const panel = document.getElementById(`park-place-${id}`);
      announcement.textContent = `${panel.querySelector('h2').textContent}. ${panel.querySelector('p:not(.park-place-era)').textContent}`;
    }
  }
  pins.forEach((pin, index) => {
    pin.disabled = false;
    pin.addEventListener('click', () => selectPlace(pin.dataset.parkPlace));
    pin.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % pins.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + pins.length) % pins.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = pins.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        pins[next].focus({ preventScroll: true });
        selectPlace(pins[next].dataset.parkPlace);
      }
    });
  });
  picker.disabled = false;
  picker.addEventListener('change', () => selectPlace(picker.value));
  selectPlace(pins[0].dataset.parkPlace, false);
});

document.querySelectorAll('[data-tabs]').forEach(group => {
  const tabs = [...group.querySelectorAll('[role="tab"]')];
  function activate(tab, focus = false) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    if (focus) tab.focus();
  }
  activate(tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0]);
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); activate(tabs[next], true); }
    });
  });
});

document.querySelectorAll('[data-copy-address]').forEach(button => {
  button.addEventListener('click', async () => {
    const feedback = button.parentElement.querySelector('.copy-feedback');
    try {
      await navigator.clipboard.writeText(button.dataset.copyAddress);
      feedback.textContent = 'Address copied. See you in the garden.';
    } catch {
      feedback.textContent = `Copy this address: ${button.dataset.copyAddress}`;
    }
  });
});

document.querySelectorAll('[data-back-top]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    document.querySelector('.brand')?.focus({ preventScroll: true });
  });
});
