# Diego Claw Contact Relay (Cloudflare Worker)

This relay keeps your Telegram bot token private while allowing the public Contact form to send messages.

## 1) Prerequisites
- Cloudflare account
- Wrangler CLI (`npm i -g wrangler`)
- Telegram bot token + chat id

## 2) Set secrets
From this `contact-relay` folder:

```bash
wrangler secret put TELEGRAM_BOT_TOKEN
wrangler secret put TELEGRAM_CHAT_ID
```

## 3) Deploy
```bash
wrangler deploy
```

Copy the deployed URL (for example `https://diego-claw-contact-relay.<subdomain>.workers.dev`).

## 4) Wire the site form
Open `/diego-claw/contact/index.html` and set:

```js
const TELEGRAM_WEBHOOK_URL = "https://YOUR-WORKER-URL.workers.dev";
```

Then commit + push.

## Notes
- CORS is enabled for POST requests.
- `ALLOWED_ORIGIN` defaults to `https://andrewrix-ctrl.github.io` in `wrangler.toml`.
- This worker strips `<` and `>` and truncates fields to reduce abuse.

## Payload types
- Contact form (default):
  ```json
  { "name": "...", "email": "...", "message": "...", "page": "...", "time": "..." }
  ```
- NRL signup form:
  ```json
  { "kind": "footy_signup", "name": "...", "email": "...", "favouriteTeam": "...", "page": "...", "time": "..." }
  ```

## Welcome email for NRL signups
The worker can send an automatic welcome email (via MailChannels) when `kind=footy_signup` is received.

Configure these vars in `wrangler.toml` or via Wrangler secrets/vars:

- `WELCOME_FROM_NAME` (default `Diego Claw`)
- `WELCOME_FROM_EMAIL` (**required**)
- `WELCOME_REPLY_TO` (optional)

If `WELCOME_FROM_EMAIL` is blank, signup still works and Telegram alert is sent, but welcome email is skipped/fails.

## Apps Script webhook for sheet sync
Set `APPS_SCRIPT_WEBHOOK_URL` to a deployed Google Apps Script Web App URL.
The relay will POST signup data to it:

```json
{
  "source": "diego-claw-footy-signup",
  "timestamp": "2026-04-17T12:00:00.000Z",
  "name": "...",
  "email": "...",
  "favouriteTeam": "...",
  "page": "https://..."
}
```

Suggested Apps Script `doPost` handler:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.openById('1NkZ8KMEDGVGTigZjsGGzlwfDFHPRQpOhWJ6XZNV6uZ8').getSheetByName('Sheet1');
  const data = JSON.parse(e.postData.contents || '{}');
  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.name || '',
    data.email || '',
    data.favouriteTeam || '',
    data.page || ''
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
```
