(function markActiveNav() {
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
  if (!current) return;

  document.querySelectorAll('.nav a[data-nav]').forEach(a => {
    if (a.dataset.nav === current) a.classList.add('active');
  });
})();
