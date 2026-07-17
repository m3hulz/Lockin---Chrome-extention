# LockIn — Website Time Manager

A Chrome extension to track, limit, and block distracting websites. Built with React, TailwindCSS, and Manifest V3.

<img width="1917" height="978" alt="image" src="https://github.com/user-attachments/assets/96543ce5-e781-4e2e-82a3-deb941f0c55d" />
<img width="1917" height="977" alt="image" src="https://github.com/user-attachments/assets/78a4768e-bfa7-428f-928d-604cad85aaa4" />



---

## What it does

LockIn lets you set daily time limits on websites. When you hit your limit, the site gets blocked with a full-screen lock overlay. You can unlock temporarily using a quick extension (+10 mins, 2x per day) or with your PIN for a custom amount of time (5–15 mins), after which a 1-hour cooldown kicks in.

Everything is PIN-protected — the dashboard, settings, and the extension itself.

---

## Features

- **Time tracking** — tracks active tab time only (pauses when you switch tabs or minimize the browser)
- **Daily limits** — set per-site limits in minutes, resets at midnight
- **Lock screen** — full-screen overlay injected when limit is hit
- **Quick extensions** — add 10 more minutes, available 2x per day per site
- **PIN unlock** — unlock with PIN for 5–15 mins extra, then a 1-hour cooldown
- **PIN protection** — dashboard and settings locked behind a 6-digit PIN
- **Dark mode** — toggle in dashboard or sidebar
- **Onboarding** — guided setup flow on first install

---

## Supported browsers

Works on any Chromium-based browser:

- Google Chrome
- Brave
- Microsoft Edge
- Opera

---

## Tech stack

| Layer | Tech |
|---|---|
| UI | React 18 |
| Styling | TailwindCSS 3 |
| Build | Webpack 5 + Babel |
| Extension | Manifest V3 |
| Storage | chrome.storage.local |
| Background | chrome.alarms (MV3 compatible) |
| PIN security | SHA-256 via Web Crypto API |

---

## Project structure

```
lockin-extension/
├── src/
│   ├── background.js          # Service worker — time tracking, alarms
│   ├── content.js             # Injected into pages — lock overlay UI
│   ├── popup/                 # Extension popup (PIN gate + usage summary)
│   ├── dashboard/             # Full dashboard (sites, usage, settings)
│   ├── onboarding/            # First-time setup flow
│   ├── components/            # Shared components (PinInput, SiteIcon, UsageBar)
│   ├── utils/
│   │   └── storage.js         # All chrome.storage operations
│   └── styles/
│       └── global.css         # Tailwind + CSS variables
├── public/
│   ├── manifest.json
│   └── icons/
└── src/html/                  # HTML entry points
    ├── popup.html
    ├── dashboard.html
    └── onboarding.html
```

---

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Install and build

```bash
git clone https://github.com/mehulzawar1301/Lockin---Chrome-extention.git
cd Lockin---Chrome-extention/lockin-extension
npm install
npm run build
```

This generates the `dist/` folder.

### Load in Chrome

1. Open `chrome://extensions`
2. Enable **Developer mode** (top right toggle)
3. Click **Load unpacked**
4. Select the `dist/` folder

### Development (watch mode)

```bash
npm run dev
```

Rebuilds automatically on file changes. Reload the extension in `chrome://extensions` after each rebuild.

---

## How it works

### Time tracking

The background service worker uses `chrome.alarms` to fire every 10 seconds (MV3 compatible — `setInterval` doesn't survive service worker restarts). Each tick queries the live active tab via `chrome.tabs.query` and increments usage for that domain in `chrome.storage.local`.

### Blocking

The content script polls `GET_STATUS` every 10 seconds. When a site is over its limit, it renders a full-screen lock overlay directly in the page DOM. The overlay handles the PIN flow, extension buttons, and cooldown timer entirely in the page context.

### PIN security

PINs are hashed with SHA-256 (Web Crypto API) with a fixed salt before storing in `chrome.storage.local`. The raw PIN is never stored.

### Daily reset

A `chrome.alarms` alarm fires at midnight (local time) and clears that day's usage data.

---

## Available scripts

```bash
npm run build      # Production build
npm run build:dev  # Development build (unminified)
npm run dev        # Watch mode
```

---

## Roadmap

- [ ] Webapp companion (lock screen even if extension is disabled)
- [ ] Usage history charts (7-day view)
- [ ] Schedule-based blocking (block only during work hours)
- [ ] Chrome Web Store publish

---

## License

MIT
