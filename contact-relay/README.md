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
