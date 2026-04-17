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
      const event = monthEvents[day];
      const cls = event ? (event.type === 'away' ? 'yearly-day-cell away-yearly' : 'yearly-day-cell event-active') : 'yearly-day-cell';
      return `<div class="${cls}">${day}</div>`;
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
    const event = monthEvents[day];
    const isToday = now.getFullYear() === CALENDAR_YEAR && now.getMonth() === meta.index && now.getDate() === day;
    const dayClasses = ['day-cell'];
    if (event?.type === 'away') dayClasses.push('away-event');
    if (isToday) dayClasses.push('today');
    const eventHtml = event ? `<div class="event ${event.type === 'away' ? 'away-event' : ''}">${event.text}</div>` : '';
    return `<div class="${dayClasses.join(' ')}"><div class="day-number">${day}</div>${eventHtml}</div>`;
  }).join('');

  const totalCells = startOffset + totalDays;
  const endCells = (7 - (totalCells % 7)) % 7;
  const blanksEnd = Array.from({ length: endCells }, () => '<div class="day-cell"></div>').join('');

  grid.innerHTML = `${createHeaders('day-header')}${blanksStart}${days}${blanksEnd}`;

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
