async function loadJSON(path, fallback = []) {
  try {
    const res = await fetch(path);
    if (!res.ok) return fallback;
    return await res.json();
  } catch {
    return fallback;
  }
}

function renderList(id, items, mapFn) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = mapFn(item);
    el.appendChild(li);
  });
}

(async function init() {
  const posts = await loadJSON('/diego-claw/data/blog.json');
  const changes = await loadJSON('/diego-claw/data/changelog.json');
  const events = await loadJSON('/diego-claw/data/events.json');

  renderList('latest-posts', posts.slice(0, 3), p => `<a href="${p.url}">${p.title}</a> <small>(${p.date})</small>`);
  renderList('recent-updates', changes.slice(0, 3), c => `<strong>${c.version}</strong> - ${c.note}`);
  renderList('upcoming-events', events.slice(0, 3), e => `<a href="${e.url}">${e.title}</a> <small>(${e.date})</small>`);
})();
