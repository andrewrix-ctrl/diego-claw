export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    if (request.method !== 'POST') {
      return json({ ok: false, error: 'method_not_allowed' }, 405);
    }

    try {
      const allowedOrigin = env.ALLOWED_ORIGIN || '';
      const origin = request.headers.get('origin') || '';
      if (allowedOrigin && origin && origin !== allowedOrigin) {
        return json({ ok: false, error: 'forbidden_origin' }, 403);
      }

      const body = await request.json();
      const kind = String(body?.kind || 'contact').trim();

      const maxLen = 4000;
      const safe = (v) => String(v || '').trim().replace(/[<>]/g, '').slice(0, maxLen);

      let text = '';

      if (kind === 'footy_signup') {
        const name = safe(body?.name);
        const email = safe(body?.email);
        const favouriteTeam = safe(body?.favouriteTeam);
        const page = safe(body?.page);
        const time = safe(body?.time);

        if (!name || !email || !favouriteTeam) {
          return json({ ok: false, error: 'invalid_payload' }, 400);
        }

        text = [
          '🏉 New NRL tipping signup',
          '',
          `Name: ${name}`,
          `Email: ${email}`,
          `Favourite team: ${favouriteTeam}`,
          '',
          `Page: ${page}`,
          `Time: ${time}`,
          '',
          'Next step: sync to sheet via gog.'
        ].join('\n');
      } else {
        const name = safe(body?.name);
        const email = safe(body?.email);
        const message = safe(body?.message);
        const page = safe(body?.page);
        const time = safe(body?.time);

        if (!name || !email || !message) {
          return json({ ok: false, error: 'invalid_payload' }, 400);
        }

        text = [
          '📬 New website contact form message',
          '',
          `Name: ${name}`,
          `Email: ${email}`,
          'Message:',
          message,
          '',
          `Page: ${page}`,
          `Time: ${time}`
        ].join('\n');
      }

      const tgRes = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text
        })
      });

      if (!tgRes.ok) {
        const detail = await tgRes.text();
        return json({ ok: false, error: 'telegram_send_failed', status: tgRes.status, detail }, 502);
      }

      return json({ ok: true }, 200);
    } catch {
      return json({ ok: false, error: 'unexpected_error' }, 500);
    }
  }
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders()
    }
  });
}
