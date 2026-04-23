const CALENDAR_YEAR = 2026;
const DAY_HEADERS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const MONTHS = [
  { slug: 'april', name: 'April', index: 3 },
  { slug: 'may', name: 'May', index: 4 },
  { slug: 'june', name: 'June', index: 5 },
  { slug: 'july', name: 'July', index: 6 },
  { slug: 'august', name: 'August', index: 7 },
  { slug: 'september', name: 'September', index: 8 },
  { slug: 'october', name: 'October', index: 9 },
  { slug: 'november', name: 'November', index: 10 },
  { slug: 'december', name: 'December', index: 11 }
];

const DEFAULT_EVENTS = {
  april: {
    16: { text: 'Rooftop Drinks with Esteban 🍸', type: 'event' },
    19: { text: 'Bears and Stonewall 🐻🏳️‍🌈', type: 'event' },
    20: { text: 'Away: Wellington, NZ 🥝', type: 'away' },
    21: { text: 'Away: Wellington, NZ 🥝', type: 'away' },
    22: { text: 'Away: Wellington, NZ 🥝', type: 'away' },
    23: { text: 'Away: Wellington, NZ 🥝', type: 'away' },
    24: { text: 'Away: Wellington, NZ 🥝', type: 'away' },
    28: { text: 'Away: Canberra 🏛️', type: 'away' },
    29: { text: 'Away: Canberra 🏛️', type: 'away' },
    30: { text: 'Away: Canberra 🏛️', type: 'away' }
  },
  may: {
    29: { text: 'Sydney social night ✨', type: 'event' }
  },
  september: {
    28: { text: 'Away block starts', type: 'away' },
    29: { text: 'Away block', type: 'away' },
    30: { text: 'Away block', type: 'away' }
  },
  october: {
    1: { text: 'Away block', type: 'away' },
    2: { text: 'Away block', type: 'away' },
    3: { text: 'Away block', type: 'away' },
    4: { text: 'Away block', type: 'away' },
    5: { text: 'Away block', type: 'away' },
    6: { text: 'Away block', type: 'away' },
    7: { text: 'Away block', type: 'away' },
    8: { text: 'Away block', type: 'away' },
    9: { text: 'Away block', type: 'away' },
    10: { text: 'Away block', type: 'away' },
    11: { text: 'Away block', type: 'away' },
    12: { text: 'Away block', type: 'away' },
    13: { text: 'Away block', type: 'away' },
    14: { text: 'Away block', type: 'away' },
    15: { text: 'Away block', type: 'away' },
    16: { text: 'Away block', type: 'away' },
    17: { text: 'Away block', type: 'away' }
  }
};

let eventsPromise;
function loadEvents() {
  if (!eventsPromise) {
    eventsPromise = fetch('/diego-claw/data/calendar-events-2026.json')
      .then(res => (res.ok ? res.json() : DEFAULT_EVENTS))
      .catch(() => DEFAULT_EVENTS);
  }
  return eventsPromise;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeEvent(event) {
  if (!event) return null;
  const text = event.text || event.event || '';
  const normalized = {
    type: event.type || 'event',
    text,
    event: event.event || text,
    with: event.with || 'Not specified'
  };
  return normalized;
}

let hoverCardEl;
function getHoverCard() {
  if (hoverCardEl) return hoverCardEl;
  hoverCardEl = document.createElement('aside');
  hoverCardEl.className = 'calendar-hover-card';
  hoverCardEl.setAttribute('aria-hidden', 'true');
  document.body.appendChild(hoverCardEl);
  return hoverCardEl;
}

function showHoverCard(payload, x, y) {
  const card = getHoverCard();
  card.innerHTML = `
    <p><strong>Date:</strong> ${escapeHtml(payload.date)}</p>
    <p><strong>Event:</strong> ${escapeHtml(payload.event)}</p>
    <p><strong>Who With:</strong> ${escapeHtml(payload.with)}</p>
  `;
  card.style.display = 'block';
  card.style.left = `${x + 14}px`;
  card.style.top = `${y + 14}px`;
  card.setAttribute('aria-hidden', 'false');
}

function hideHoverCard() {
  if (!hoverCardEl) return;
  hoverCardEl.style.display = 'none';
  hoverCardEl.setAttribute('aria-hidden', 'true');
}

function attachHoverCardHandlers(root) {
  root.querySelectorAll('[data-hover-date]').forEach((node) => {
    const payload = {
      date: node.getAttribute('data-hover-date') || 'Unknown',
      event: node.getAttribute('data-hover-event') || 'Not specified',
      with: node.getAttribute('data-hover-with') || 'Not specified'
    };

    node.addEventListener('mouseenter', (evt) => showHoverCard(payload, evt.clientX, evt.clientY));
    node.addEventListener('mousemove', (evt) => showHoverCard(payload, evt.clientX, evt.clientY));
    node.addEventListener('mouseleave', hideHoverCard);
    node.addEventListener('blur', hideHoverCard);
    node.addEventListener('focus', () => {
      const rect = node.getBoundingClientRect();
      showHoverCard(payload, rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
  });
}

function getMonthMeta(slug) {
  return MONTHS.find(m => m.slug === slug);
}

function monthStartOffsetMonday(year, monthIndex) {
  const day = new Date(year, monthIndex, 1).getDay();
  return (day + 6) % 7;
}

function monthDays(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function createHeaders(className) {
  return DAY_HEADERS.map(d => `<div class="${className}">${d}</div>`).join('');
}

async function renderYearGrid(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const events = await loadEvents();

  container.innerHTML = MONTHS.map(month => {
    const startOffset = monthStartOffsetMonday(CALENDAR_YEAR, month.index);
    const totalDays = monthDays(CALENDAR_YEAR, month.index);
    const monthEvents = events[month.slug] || {};

    const blanksStart = Array.from({ length: startOffset }, () => '<div class="yearly-day-cell"></div>').join('');
    const days = Array.from({ length: totalDays }, (_, i) => {
      const day = i + 1;
      const event = normalizeEvent(monthEvents[day]);
      const cls = event ? (event.type === 'away' ? 'yearly-day-cell away-yearly has-hover-card' : 'yearly-day-cell event-active has-hover-card') : 'yearly-day-cell';
      if (!event) return `<div class="${cls}">${day}</div>`;
      return `<div class="${cls}" tabindex="0" data-hover-date="${month.name} ${day}, ${CALENDAR_YEAR}" data-hover-event="${escapeHtml(event.event)}" data-hover-with="${escapeHtml(event.with)}">${day}</div>`;
    }).join('');
    const totalCells = startOffset + totalDays;
    const endCells = (7 - (totalCells % 7)) % 7;
    const blanksEnd = Array.from({ length: endCells }, () => '<div class="yearly-day-cell"></div>').join('');

    return `
      <article class="yearly-month-container">
        <h2 class="yearly-month-title"><a href="/diego-claw/calendar/months/${month.slug}.html">${month.name}</a></h2>
        <div class="yearly-month-grid">
          ${createHeaders('yearly-day-header')}
          ${blanksStart}${days}${blanksEnd}
        </div>
      </article>
    `;
  }).join('');

  attachHoverCardHandlers(container);
}

async function renderMonth(slug, gridId, prevId, nextId) {
  const meta = getMonthMeta(slug);
  const grid = document.getElementById(gridId);
  if (!meta || !grid) return;

  const events = await loadEvents();

  const startOffset = monthStartOffsetMonday(CALENDAR_YEAR, meta.index);
  const totalDays = monthDays(CALENDAR_YEAR, meta.index);
  const monthEvents = events[slug] || {};
  const now = new Date();

  const blanksStart = Array.from({ length: startOffset }, () => '<div class="day-cell"></div>').join('');
  const days = Array.from({ length: totalDays }, (_, i) => {
    const day = i + 1;
    const event = normalizeEvent(monthEvents[day]);
    const isToday = now.getFullYear() === CALENDAR_YEAR && now.getMonth() === meta.index && now.getDate() === day;
    const dayClasses = ['day-cell'];
    if (event) dayClasses.push('has-hover-card');
    if (event?.type === 'away') dayClasses.push('away-event');
    if (isToday) dayClasses.push('today');
    const eventHtml = event ? `<div class="event ${event.type === 'away' ? 'away-event' : ''}">${escapeHtml(event.event)}</div>` : '';
    const hoverAttrs = event
      ? ` tabindex="0" data-hover-date="${meta.name} ${day}, ${CALENDAR_YEAR}" data-hover-event="${escapeHtml(event.event)}" data-hover-with="${escapeHtml(event.with)}"`
      : '';
    return `<div class="${dayClasses.join(' ')}"${hoverAttrs}><div class="day-number">${day}</div>${eventHtml}</div>`;
  }).join('');

  const totalCells = startOffset + totalDays;
  const endCells = (7 - (totalCells % 7)) % 7;
  const blanksEnd = Array.from({ length: endCells }, () => '<div class="day-cell"></div>').join('');

  grid.innerHTML = `${createHeaders('day-header')}${blanksStart}${days}${blanksEnd}`;
  attachHoverCardHandlers(grid);

  const idx = MONTHS.findIndex(m => m.slug === slug);
  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);

  if (prev) {
    if (idx > 0) {
      prev.href = `/diego-claw/calendar/months/${MONTHS[idx - 1].slug}.html`;
      prev.textContent = `← ${MONTHS[idx - 1].name}`;
      prev.classList.remove('disabled');
    } else {
      prev.classList.add('disabled');
      prev.removeAttribute('href');
      prev.textContent = '←';
    }
  }

  if (next) {
    if (idx < MONTHS.length - 1) {
      next.href = `/diego-claw/calendar/months/${MONTHS[idx + 1].slug}.html`;
      next.textContent = `${MONTHS[idx + 1].name} →`;
      next.classList.remove('disabled');
    } else {
      next.classList.add('disabled');
      next.removeAttribute('href');
      next.textContent = '→';
    }
  }
}

window.diegoCalendar = { renderYearGrid, renderMonth };
