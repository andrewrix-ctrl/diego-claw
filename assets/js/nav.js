(function setupNav() {
  const path = window.location.pathname.replace(/\/$/, '');

  const map = [
    { key: 'home', match: /^\/diego-claw$/ },
    { key: 'about', match: /\/diego-claw\/about(\/|$)/ },
    { key: 'blog', match: /\/diego-claw\/blog(\/|$)/ },
    { key: 'whats-new', match: /\/diego-claw\/whats-new(\/|$)/ },
    { key: 'calendar', match: /\/diego-claw\/calendar(\/|$)/ },
    { key: 'projects', match: /\/diego-claw\/projects(\/|$)/ },
    { key: 'contact', match: /\/diego-claw\/contact(\/|$)/ }
  ];

  const current = map.find(item => item.match.test(path))?.key;
  if (current) {
    document.querySelectorAll('.nav a[data-nav]').forEach(a => {
      if (a.dataset.nav === current) a.classList.add('active');
    });
  }

  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!nav || !toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? '✕' : '☰';
  });

  const submenuParents = menu.querySelectorAll('.has-submenu > a[data-nav]');
  submenuParents.forEach(link => {
    link.addEventListener('click', e => {
      if (window.matchMedia('(max-width: 900px)').matches) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });
})();
