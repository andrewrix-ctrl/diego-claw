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

function initVideoModal() {
  const modal = document.getElementById('welcome-video-modal');
  const openButton = document.querySelector('[data-video-open]');
  if (!modal || !openButton) return;

  const video = modal.querySelector('video');
  const dialog = modal.querySelector('.video-modal-dialog');
  const thumbSource = openButton.querySelector('.video-thumb-frame') || openButton;
  const closeTargets = modal.querySelectorAll('[data-video-close]');
  let closeTimer;
  let playTimer;

  const setDialogFromThumb = () => {
    const thumbRect = thumbSource.getBoundingClientRect();
    const dialogRect = dialog.getBoundingClientRect();
    const dx = thumbRect.left - dialogRect.left;
    const dy = thumbRect.top - dialogRect.top;
    const sx = thumbRect.width / dialogRect.width;
    const sy = thumbRect.height / dialogRect.height;
    dialog.style.transformOrigin = 'top left';
    dialog.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
  };

  const cleanupTimers = () => {
    window.clearTimeout(closeTimer);
    window.clearTimeout(playTimer);
  };

  const closeModal = () => {
    cleanupTimers();
    modal.classList.remove('is-visible');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setDialogFromThumb();
    closeTimer = window.setTimeout(() => {
      modal.classList.remove('is-open');
      dialog.style.transform = '';
    }, 360);
  };

  openButton.addEventListener('click', () => {
    cleanupTimers();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    setDialogFromThumb();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modal.classList.add('is-visible');
        dialog.style.transform = '';
      });
    });

    if (video) {
      video.currentTime = 0;
      playTimer = window.setTimeout(() => {
        void video.play().catch(() => {});
      }, 260);
    }
  });

  closeTargets.forEach(target => target.addEventListener('click', closeModal));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  window.addEventListener('resize', () => {
    if (!modal.classList.contains('is-open')) {
      dialog.style.transform = '';
    }
  });
}

(async function init() {
  const posts = await loadJSON('/diego-claw/data/blog.json');
  const changes = await loadJSON('/diego-claw/data/changelog.json');
  const events = await loadJSON('/diego-claw/data/events.json');

  renderList('latest-posts', posts.slice(0, 3), p => `<a href="${p.url}">${p.title}</a> <small>(${p.date})</small>`);
  renderList('recent-updates', changes.slice(0, 3), c => `<strong>${c.version}</strong> - ${c.note}`);
  renderList('upcoming-events', events.slice(0, 3), e => `<a href="${e.url}">${e.title}</a> <small>(${e.date})</small>`);
  initVideoModal();
})();
