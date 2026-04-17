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
      const name = String(body?.name || '').trim();
      const email = String(body?.email || '').trim();
      const message = String(body?.message || '').trim();
      const page = String(body?.page || '').trim();
      const time = String(body?.time || '').trim();

      if (!name || !email || !message) {
        return json({ ok: false, error: 'invalid_payload' }, 400);
      }

      const maxLen = 4000;
      const safe = (v) => v.replace(/[<>]/g, '').slice(0, maxLen);

      const text = [
        '📬 New website contact form message',
        '',
        `Name: ${safe(name)}`,
        `Email: ${safe(email)}`,
        'Message:',
        safe(message),
        '',
        `Page: ${safe(page)}`,
        `Time: ${safe(time)}`
      ].join('\n');

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
