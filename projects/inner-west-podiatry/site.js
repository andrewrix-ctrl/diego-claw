(function () {

  function initConditionFinder() {
    const input = document.getElementById('conditionSearch');
    if (!input) return;

    const cards = Array.from(document.querySelectorAll('.condition-card'));
    const count = document.getElementById('conditionCount');

    const filter = () => {
      const q = input.value.trim().toLowerCase();
      let visible = 0;

      cards.forEach((card) => {
        const haystack = (card.textContent + ' ' + (card.dataset.tags || '')).toLowerCase();
        const show = !q || haystack.includes(q);
        card.classList.toggle('hidden', !show);
        if (show) visible += 1;
      });

      if (count) {
        count.textContent = q
          ? `${visible} result${visible === 1 ? '' : 's'} found`
          : `${cards.length} conditions shown`;
      }
    };

    input.addEventListener('input', filter);
    filter();
  }

  function initFaqSearch() {
    const input = document.getElementById('faqSearch');
    if (!input) return;

    const items = Array.from(document.querySelectorAll('.faq-item'));
    const count = document.getElementById('faqCount');

    const filter = () => {
      const q = input.value.trim().toLowerCase();
      let visible = 0;

      items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        const show = !q || text.includes(q);
        item.classList.toggle('hidden', !show);
        if (show) visible += 1;
      });

      if (count) {
        count.textContent = q
          ? `${visible} answer${visible === 1 ? '' : 's'} match`
          : `${items.length} FAQs available`;
      }
    };

    input.addEventListener('input', filter);
    filter();
  }

  async function initNewsFeed() {
    const list = document.getElementById('newsFeed');
    if (!list) return;

    try {
      const res = await fetch('news-data.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('news_fetch_failed');
      const data = await res.json();
      const articles = Array.isArray(data.articles) ? data.articles.slice(0, 3) : [];

      if (!articles.length) return;

      list.innerHTML = articles
        .map(
          (article) =>
            `<li><a href="${article.url || '#'}" target="_blank" rel="noopener">${article.title || 'Foot health update'}</a></li>`
        )
        .join('');
    } catch (_) {
      // Keep fallback HTML as-is.
    }
  }

  function initNewsletterSignup() {
    const form = document.getElementById('newsletter-signup-form');
    if (!form) return;

    const status = document.getElementById('newsletterStatus');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = (document.getElementById('newsletterName')?.value || '').trim();
      const email = (document.getElementById('newsletterEmail')?.value || '').trim();
      const topics = (document.getElementById('newsletterTopics')?.value || 'General foot care').trim();

      if (!name || !email) {
        if (status) status.textContent = 'Please add your name and email to subscribe.';
        return;
      }

      const subject = encodeURIComponent(`Newsletter signup: ${name}`);
      const body = encodeURIComponent([
        `Please add this subscriber to Beth's monthly tips newsletter.`,
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Preferred topic: ${topics}`,
        `Source: Inner West Podiatry website newsletter section`
      ].join('\n'));

      window.location.href = `mailto:admin@sydneyinnerwestpodiatry.com.au?subject=${subject}&body=${body}`;

      if (status) {
        status.textContent = 'Opening your email app now to confirm your signup request.';
      }

      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initConditionFinder();
    initFaqSearch();
    initNewsFeed();
    initNewsletterSignup();
  });
})();
