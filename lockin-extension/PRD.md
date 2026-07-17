# LockIn — Chrome Extension PRD
## Overview
Build a Chrome extension for website activity management and focus control.
Users can:
- Add websites/domains
- Set daily usage limits
- Track active usage time
- Lock websites after limit is reached
- Temporarily extend time using controlled unlock methods
---
# Core Features
## 1. Website Tracking
- User can add website URLs/domains
- Track active tab usage time only
- Combine usage across multiple tabs of same website
Example:
- [youtube.com](http://youtube.com/)
- [instagram.com](http://instagram.com/)
- [reddit.com](http://reddit.com/)
---
## 2. Daily Time Limits
User can set:
- website name/domain
- daily usage limit in minutes
Example:
- YouTube → 30 mins/day
- Instagram → 20 mins/day
Reset usage daily at midnight based on local timezone.
---
## 3. Soft Lock Screen
When usage limit is reached:
- Block website access
- Show full-screen lock overlay
Lock screen should show:
- website name
- time used today
- unlock options
---
## 4. Quick Extension System
User gets:
“Add 10 More Minutes”
Rules:
- only available 2 times per day per website
- each click adds +10 mins
- after 2 uses, option disappears
---
## 5. PIN Unlock System
User can set a PIN in settings.
When website is locked:
- user can click “Unlock with PIN”
- ask for PIN
- after successful PIN:
  ask user how much extra time they want
Allowed range:
- minimum: 5 mins
- maximum: 15 mins
Use:
- slider
or
- preset buttons (5, 10, 15)
---
## 6. PIN Cooldown System
After PIN extension time ends:
- website locks again
- PIN unlock becomes unavailable for 1 hour
During cooldown:
- show countdown timer
- user cannot use PIN unlock
After cooldown:
- PIN unlock becomes available again
There is NO permanent hard lock for PIN unlocks.
---
## 7. Extension PIN Protection
- Lock extension popup/dashboard behind PIN authentication
- User must enter PIN to:
  - open dashboard
  - edit websites
  - change limits
  - reset PIN
  - disable tracking
---
# Required Screens
## 1. Onboarding
- welcome screen
- create PIN
- add websites
- set limits
---
## 2. Extension Popup
Show:
- today’s usage
- tracked websites
- remaining time
- quick controls
---
## 3. Dashboard
Show:
- daily usage stats
- add website
- edit website
- delete website
- reset PIN
---
## 4. Lock Screen Overlay
Show:
- blocked website
- usage limit reached
- Add 10 More Minutes button
- Unlock with PIN button
- cooldown timer if active
---
# Tech Requirements
## Frontend
- React
- TailwindCSS
- Framer Motion
---
# Browser Support
## Supported Browsers
- Google Chrome
- Brave
- Microsoft Edge
- Opera
- Other Chromium browsers
## Architecture
Build using:
- Chrome Extension Manifest V3
- Chromium extension APIs
Use a single shared codebase for all Chromium browsers.
---
## Chrome APIs
Use:
- chrome.tabs
- chrome.storage
- chrome.scripting
- chrome.notifications
- chrome.windows
- chrome.runtime
---
## Extension Version
- Manifest V3
---
# Important Logic
## Active Time Tracking
Count time only when:
- website tab is active
- browser window is focused
Pause tracking when:
- tab inactive
- browser minimized
- user switches tabs
---
## Website Blocking Logic
When website is locked:
- inject blocking overlay into webpage
- prevent interaction with website content
- overlay should persist on refresh/reopen
---
# Storage
Store locally:
- website limits
- usage time
- extension counts
- cooldown timers
- PIN hash
---
# UI Style (Make pixel perfect ui as Reference attached)
- modern minimal UI
- dark mode support
- clean productivity-focused design
- smooth animations
- responsive layouts