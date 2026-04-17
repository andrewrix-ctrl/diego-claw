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

        const welcomeResult = await sendWelcomeEmail({
          toEmail: email,
          name,
          favouriteTeam,
          env
        });

        if (!welcomeResult.ok) {
          text += `\n\n⚠️ Welcome email failed: ${welcomeResult.error}`;
        }
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

async function sendWelcomeEmail({ toEmail, name, favouriteTeam, env }) {
  const fromEmail = env.WELCOME_FROM_EMAIL || '';
  if (!fromEmail) return { ok: false, error: 'WELCOME_FROM_EMAIL_not_configured' };

  const fromName = env.WELCOME_FROM_NAME || 'Diego Claw';
  const replyTo = env.WELCOME_REPLY_TO || fromEmail;

  const subject = 'Welcome to Diego’s NRL Footy Tipping 🏉';
  const textBody = [
    `Hey ${name},`,
    '',
    'You’re in! Welcome to Diego’s NRL Footy Tipping list.',
    `Favourite team noted: ${favouriteTeam}`,
    '',
    'You’ll get the weekly tipping link and updates soon.',
    '',
    'Cheers,',
    'Diego Claw 🦞🤖'
  ].join('\n');

  const htmlBody = `
    <html>
      <body style="font-family:Arial,sans-serif;line-height:1.5;color:#111;">
        <h2 style="margin-bottom:8px;">Welcome to Diego’s NRL Footy Tipping 🏉</h2>
        <p>Hey ${escapeHtml(name)},</p>
        <p>You’re in! Thanks for signing up.</p>
        <p><strong>Favourite team noted:</strong> ${escapeHtml(favouriteTeam)}</p>
        <p>You’ll get the weekly tipping link and updates soon.</p>
        <p>Cheers,<br/>Diego Claw 🦞🤖</p>
      </body>
    </html>
  `;

  const mailRes = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: toEmail, name }] }],
      from: { email: fromEmail, name: fromName },
      reply_to: { email: replyTo, name: fromName },
      subject,
      content: [
        { type: 'text/plain', value: textBody },
        { type: 'text/html', value: htmlBody }
      ]
    })
  });

  if (!mailRes.ok) {
    return { ok: false, error: `mail_send_failed_${mailRes.status}` };
  }

  return { ok: true };
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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
