(function() {
  'use strict';

  try {
    var hostname = window.location.hostname.replace(/^www\./, '');
    if (!hostname || hostname === 'newtab') return;
    if (document.getElementById('lockin-overlay')) return;

    console.log('[LockIn] Overlay mounted for', hostname);

    var today = new Date().toISOString().split('T')[0];
    var key = hostname + '_' + today;
    var selectedMinutes = 10;

    // ---- Design tokens matching onboarding/dashboard ----
    var tokens = {
      bgPrimary: '#ffffff',
      bgSecondary: '#f8f9fc',
      bgCard: '#ffffff',
      textPrimary: '#0f172a',
      textSecondary: '#64748b',
      textMuted: '#94a3b8',
      border: '#e2e8f0',
      accent: '#6366f1',
      accentHover: '#4f46e5',
      danger: '#ef4444',
      warning: '#f59e0b',
      shadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
      shadowMd: '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)'
    };

    // ---- Create overlay ----
    var backdrop = document.createElement('div');
    backdrop.id = 'lockin-overlay';
    backdrop.style.cssText = [
      'position:fixed',
      'top:0',
      'left:0',
      'width:100vw',
      'height:100vh',
      'z-index:2147483647',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'background:rgba(255,255,255,0.85)',
      'backdrop-filter:blur(8px)',
      '-webkit-backdrop-filter:blur(8px)',
      'font-family:\'DM Sans\',system-ui,-apple-system,sans-serif',
      '-webkit-font-smoothing:antialiased'
    ].join(';');

    backdrop.innerHTML = [
      '<style>',
      '@import url(\'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap\');',
      '#lockin-overlay * { box-sizing:border-box; margin:0; padding:0; }',
      '',
      '/* Card */',
      '#lockin-overlay .lk-card {',
      '  background:' + tokens.bgCard + ';',
      '  border:1px solid ' + tokens.border + ';',
      '  border-radius:20px;',
      '  padding:48px 40px 40px;',
      '  width:500px;',
      '  max-width:calc(100vw - 48px);',
      '  text-align:center;',
      '  box-shadow:' + tokens.shadowMd + ';',
      '  animation:lkFadeIn 0.2s ease-out;',
      '}',
      '#lockin-overlay .lk-card > * + * { margin-top:0; }',
      '',
      '@keyframes lkFadeIn {',
      '  from { opacity:0; transform:scale(0.98); }',
      '  to { opacity:1; transform:scale(1); }',
      '}',
      '',
      '/* Icon */',
      '#lockin-overlay .lk-icon-wrap {',
      '  width:56px;',
      '  height:56px;',
      '  border-radius:16px;',
      '  background:rgba(99,102,241,0.1);',
      '  border:1px solid rgba(99,102,241,0.2);',
      '  display:flex;',
      '  align-items:center;',
      '  justify-content:center;',
      '  margin:0 auto 20px;',
      '}',
      '',
      '/* Label */',
      '#lockin-overlay .lk-label {',
      '  font-size:11px;',
      '  font-weight:600;',
      '  letter-spacing:0.08em;',
      '  text-transform:uppercase;',
      '  color:' + tokens.accent + ';',
      '  margin-bottom:8px;',
      '}',
      '',
      '/* Title */',
      '#lockin-overlay .lk-title {',
      '  font-size:24px;',
      '  font-weight:700;',
      '  color:' + tokens.textPrimary + ';',
      '  margin-bottom:4px;',
      '  line-height:1.3;',
      '}',
      '',
      '/* Domain */',
      '#lockin-overlay .lk-domain {',
      '  font-size:14px;',
      '  color:' + tokens.textSecondary + ';',
      '  margin-bottom:20px;',
      '}',
      '',
      '/* Badge */',
      '#lockin-overlay .lk-badge {',
      '  display:inline-flex;',
      '  align-items:center;',
      '  gap:6px;',
      '  background:#fef2f2;',
      '  border:1px solid #fecaca;',
      '  color:' + tokens.danger + ';',
      '  font-size:13px;',
      '  font-weight:600;',
      '  padding:6px 14px;',
      '  border-radius:999px;',
      '  margin-bottom:28px;',
      '}',
      '',
      '/* Divider */',
      '#lockin-overlay .lk-divider {',
      '  height:1px;',
      '  background:' + tokens.border + ';',
      '  margin:24px 0;',
      '}',
      '',
      '/* Primary button */',
      '#lockin-overlay .lk-btn-primary {',
      '  width:100%;',
      '  padding:12px 20px;',
      '  border-radius:10px;',
      '  font-size:14px;',
      '  font-weight:600;',
      '  cursor:pointer;',
      '  border:none;',
      '  outline:none;',
      '  background:' + tokens.accent + ';',
      '  color:#fff;',
      '  display:inline-flex;',
      '  align-items:center;',
      '  justify-content:center;',
      '  gap:8px;',
      '  transition:all 0.15s;',
      '  font-family:\'DM Sans\',sans-serif;',
      '  line-height:1;',
      '}',
      '#lockin-overlay .lk-btn-primary:hover {',
      '  background:' + tokens.accentHover + ';',
      '}',
      '#lockin-overlay .lk-btn-primary:active {',
      '  transform:scale(0.97);',
      '}',
      '#lockin-overlay .lk-btn-primary:disabled {',
      '  opacity:0.5;',
      '  cursor:not-allowed;',
      '  transform:none;',
      '}',
      '',
      '/* Secondary button */',
      '#lockin-overlay .lk-btn-secondary {',
      '  width:100%;',
      '  padding:12px 20px;',
      '  border-radius:10px;',
      '  font-size:14px;',
      '  font-weight:600;',
      '  cursor:pointer;',
      '  border:1px solid ' + tokens.border + ';',
      '  outline:none;',
      '  background:transparent;',
      '  color:' + tokens.textPrimary + ';',
      '  display:inline-flex;',
      '  align-items:center;',
      '  justify-content:center;',
      '  gap:8px;',
      '  transition:all 0.15s;',
      '  font-family:\'DM Sans\',sans-serif;',
      '  line-height:1;',
      '}',
      '#lockin-overlay .lk-btn-secondary:hover {',
      '  background:' + tokens.bgSecondary + ';',
      '}',
      '#lockin-overlay .lk-btn-secondary:active {',
      '  transform:scale(0.97);',
      '}',
      '',
      '/* Extension count */',
      '#lockin-overlay .lk-extcount {',
      '  font-size:12px;',
      '  color:' + tokens.textMuted + ';',
      '  margin-top:10px;',
      '  font-weight:500;',
      '}',
      '',
      '/* Cooldown */',
      '#lockin-overlay .lk-cooldown {',
      '  background:#fffbeb;',
      '  border:1px solid #fde68a;',
      '  border-radius:10px;',
      '  padding:12px 16px;',
      '  color:#d97706;',
      '  font-size:13px;',
      '  font-weight:600;',
      '  display:flex;',
      '  align-items:center;',
      '  justify-content:center;',
      '  gap:8px;',
      '}',
      '',
      '/* PIN form */',
      '#lockin-overlay .lk-pinform {',
      '  margin-top:20px;',
      '  text-align:left;',
      '}',
      '#lockin-overlay .lk-steplabel {',
      '  font-size:11px;',
      '  font-weight:600;',
      '  text-transform:uppercase;',
      '  letter-spacing:0.08em;',
      '  color:' + tokens.textMuted + ';',
      '  margin-bottom:10px;',
      '}',
      '#lockin-overlay .lk-pininput {',
      '  width:100%;',
      '  background:' + tokens.bgSecondary + ';',
      '  border:1.5px solid ' + tokens.border + ';',
      '  border-radius:10px;',
      '  padding:12px 16px;',
      '  color:' + tokens.textPrimary + ';',
      '  font-size:22px;',
      '  letter-spacing:10px;',
      '  text-align:center;',
      '  font-family:monospace;',
      '  outline:none;',
      '  transition:border-color 0.15s;',
      '  margin-bottom:12px;',
      '}',
      '#lockin-overlay .lk-pininput:focus {',
      '  border-color:' + tokens.accent + ';',
      '}',
      '#lockin-overlay .lk-pinerror {',
      '  color:' + tokens.danger + ';',
      '  font-size:12px;',
      '  text-align:center;',
      '  margin-bottom:8px;',
      '  display:none;',
      '}',
      '',
      '/* Time presets */',
      '#lockin-overlay .lk-presets {',
      '  display:flex;',
      '  gap:8px;',
      '  margin-bottom:14px;',
      '}',
      '#lockin-overlay .lk-preset {',
      '  flex:1;',
      '  padding:10px;',
      '  background:' + tokens.bgSecondary + ';',
      '  border:1.5px solid ' + tokens.border + ';',
      '  border-radius:8px;',
      '  color:' + tokens.textSecondary + ';',
      '  font-size:13px;',
      '  font-weight:600;',
      '  cursor:pointer;',
      '  transition:all 0.15s;',
      '  font-family:\'DM Sans\',sans-serif;',
      '}',
      '#lockin-overlay .lk-preset:hover,',
      '#lockin-overlay .lk-preset.sel {',
      '  border-color:' + tokens.accent + ';',
      '  color:' + tokens.accent + ';',
      '  background:rgba(99,102,241,0.08);',
      '}',
      '',
      '/* Confirm button */',
      '#lockin-overlay .lk-confirm {',
      '  width:100%;',
      '  padding:12px;',
      '  background:' + tokens.accent + ';',
      '  border:none;',
      '  border-radius:10px;',
      '  color:white;',
      '  font-size:14px;',
      '  font-weight:600;',
      '  cursor:pointer;',
      '  font-family:\'DM Sans\',sans-serif;',
      '  transition:background 0.15s;',
      '}',
      '#lockin-overlay .lk-confirm:hover {',
      '  background:' + tokens.accentHover + ';',
      '}',
      '#lockin-overlay .lk-confirm:disabled {',
      '  opacity:0.5;',
      '  cursor:not-allowed;',
      '}',
      '</style>',
      '',
      '<div class="lk-card">',
      '  <div class="lk-icon-wrap">',
      '    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
      '      <rect x="3" y="11" width="18" height="11" rx="2"/>',
      '      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
      '    </svg>',
      '  </div>',
      '  <div class="lk-label">Daily Limit Reached</div>',
      '  <div class="lk-title" id="lk-sitename">' + hostname + '</div>',
      '  <div class="lk-domain" id="lk-domain">' + hostname + '</div>',
      '  <div class="lk-badge">',
      '    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
      '    <span id="lk-usagetext">Loading...</span>',
      '  </div>',
      '  <div id="lk-actions"></div>',
      '</div>'
    ].join('\n');

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.appendChild(backdrop);
    console.log('[LockIn] Overlay injected, fetching storage data...');

    // ---- Fetch storage data ----
    chrome.storage.local.get(['usage', 'extensions', 'cooldowns', 'pin_sessions', 'websites'], function(data) {
      if (chrome.runtime.lastError) {
        console.error('[LockIn] Storage error:', chrome.runtime.lastError);
        var usageText = backdrop.querySelector('#lk-usagetext');
        if (usageText) usageText.textContent = 'Usage data unavailable';
        return;
      }
      console.log('[LockIn] Storage loaded', data);
      var usage = data.usage || {};
      var extensions = data.extensions || {};
      var cooldowns = data.cooldowns || {};
      var pinSessions = data.pin_sessions || {};
      var websites = data.websites || [];

      var usedSec = usage[key] || 0;
      var usedMin = Math.floor(usedSec / 60);
      var extUsed = extensions[key] || 0;
      var extRemaining = Math.max(0, 2 - extUsed);
      var now = Date.now();
      var cooldownEnd = cooldowns[hostname];
      var isCooldown = !!(cooldownEnd && cooldownEnd > now);
      var pinSessionEnd = pinSessions[hostname];
      var isPinSession = !!(pinSessionEnd && pinSessionEnd > now);

      var site = websites.find(function(s) { return s.domain === hostname; });
      var siteName = (site && site.name) || hostname;
      var limitMin = site ? site.limitMinutes : 0;

      console.log('[LockIn] Website config loaded', { usedSec: usedSec, limitMin: limitMin, extRemaining: extRemaining, isCooldown: isCooldown });

      // Update site name
      var titleEl = backdrop.querySelector('#lk-sitename');
      if (titleEl) titleEl.textContent = siteName;

      // Update loading text
      var usageText = backdrop.querySelector('#lk-usagetext');
      if (usageText) {
        usageText.textContent = 'Used ' + usedMin + 'm today';
        console.log('[LockIn] Loading set to false, usage:', usedMin + 'm');
      }

      // Render actions
      var actionsEl = backdrop.querySelector('#lk-actions');
      if (!actionsEl) return;
      console.log('[LockIn] Rendering actions');

      var extDisabled = extRemaining <= 0;
      var actionsHTML = '';

      // Primary button: Add 10 More Minutes
      actionsHTML += [
        '<button class="lk-btn-primary" id="lk-ext-btn"' + (extDisabled ? ' disabled' : '') + '>',
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
        'Add 10 More Minutes',
        '</button>',
        '<div class="lk-extcount">' + extRemaining + ' of 2 extensions remaining</div>'
      ].join('\n');

      actionsHTML += '<div class="lk-divider"></div>';

      if (isCooldown) {
        // Cooldown state — disabled-looking badge
        actionsHTML += [
          '<div class="lk-cooldown">',
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
          'PIN available in <strong id="lk-cdtimer">&hellip;</strong>',
          '</div>'
        ].join('\n');
      } else {
        // Secondary button: Unlock with PIN
        actionsHTML += [
          '<button class="lk-btn-secondary" id="lk-pin-btn">',
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
          'Unlock with PIN',
          '</button>',
          '<div class="lk-pinform" id="lk-pinform" style="display:none">',
          '  <div class="lk-steplabel" id="lk-steplabel">Enter your PIN</div>',
          '  <div class="lk-pinerror" id="lk-pinerror">Incorrect PIN. Try again.</div>',
          '  <input type="password" class="lk-pininput" id="lk-pininput" maxlength="6" placeholder="\u0007\u0007\u0007\u0007\u0007\u0007" autocomplete="off" inputmode="numeric"/>',
          '  <div id="lk-timepicker" style="display:none">',
          '    <div class="lk-steplabel" style="margin-top:12px">How much extra time?</div>',
          '    <div class="lk-presets">',
          '      <button class="lk-preset" data-mins="5">5m</button>',
          '      <button class="lk-preset sel" data-mins="10">10m</button>',
          '      <button class="lk-preset" data-mins="15">15m</button>',
          '    </div>',
          '    <button class="lk-confirm" id="lk-confirm">Unlock &amp; Continue</button>',
          '  </div>',
          '</div>'
        ].join('\n');
      }

      actionsEl.innerHTML = actionsHTML;
      console.log('[LockIn] Actions rendered');

      // ---- Setup event handlers ----

      // Extend button
      var extBtn = backdrop.querySelector('#lk-ext-btn');
      if (extBtn && !extBtn.disabled) {
        extBtn.addEventListener('click', function() {
          extBtn.disabled = true;
          extBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> Adding time...';
          chrome.storage.local.get(['extensions', 'usage'], function(res) {
            var ext = res.extensions || {};
            var use = res.usage || {};
            ext[key] = (ext[key] || 0) + 1;
            use[key] = Math.max(0, (use[key] || 0) - 600);
            chrome.storage.local.set({ extensions: ext, usage: use }, function() {
              var rem = 2 - ext[key];
              var countEl = backdrop.querySelector('.lk-extcount');
              if (countEl) countEl.textContent = rem + ' of 2 extensions remaining';
              if (rem <= 0) extBtn.style.display = 'none';
              var overlay = document.getElementById('lockin-overlay');
              if (overlay) {
                overlay.remove();
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
              }
            });
          });
        });
      }

      // PIN button
      var pinBtn = backdrop.querySelector('#lk-pin-btn');
      var pinForm = backdrop.querySelector('#lk-pinform');
      if (pinBtn && pinForm) {
        pinBtn.addEventListener('click', function() {
          pinBtn.style.display = 'none';
          pinForm.style.display = 'block';
          var inp = backdrop.querySelector('#lk-pininput');
          if (inp) inp.focus();
        });
      }

      // PIN input
      var pinInput = backdrop.querySelector('#lk-pininput');
      if (pinInput) {
        pinInput.addEventListener('keydown', function(e) {
          if (e.key !== 'Enter') return;
          var val = pinInput.value;
          if (!val) return;
          chrome.storage.local.get('pin_hash', function(res) {
            var hash = res.pin_hash;
            if (!hash) return;
            var encoder = new TextEncoder();
            crypto.subtle.digest('SHA-256', encoder.encode(val + 'lockin_salt_v1')).then(function(buf) {
              var digest = Array.from(new Uint8Array(buf)).map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
              if (digest === hash) {
                pinInput.style.display = 'none';
                var errEl = backdrop.querySelector('#lk-pinerror');
                if (errEl) errEl.style.display = 'none';
                var stepLabel = backdrop.querySelector('#lk-steplabel');
                if (stepLabel) stepLabel.textContent = 'Choose extra time';
                var picker = backdrop.querySelector('#lk-timepicker');
                if (picker) picker.style.display = 'block';
              } else {
                var errEl = backdrop.querySelector('#lk-pinerror');
                if (errEl) errEl.style.display = 'block';
                pinInput.value = '';
                pinInput.style.borderColor = '#ef4444';
                setTimeout(function() {
                  pinInput.style.borderColor = '';
                  if (errEl) errEl.style.display = 'none';
                }, 2000);
              }
            });
          });
        });
      }

      // Preset buttons
      backdrop.querySelectorAll('.lk-preset').forEach(function(btn) {
        btn.addEventListener('click', function() {
          backdrop.querySelectorAll('.lk-preset').forEach(function(b) { b.classList.remove('sel'); });
          btn.classList.add('sel');
          selectedMinutes = parseInt(btn.dataset.mins);
        });
      });

      // Confirm button
      var confirmBtn = backdrop.querySelector('#lk-confirm');
      if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
          confirmBtn.textContent = 'Unlocking...';
          confirmBtn.disabled = true;
          chrome.storage.local.get(['pin_sessions', 'usage'], function(res) {
            var sessions = res.pin_sessions || {};
            var use = res.usage || {};
            sessions[hostname] = Date.now() + 60 * selectedMinutes * 1000;
            use[key] = Math.max(0, (use[key] || 0) - 60 * selectedMinutes);
            chrome.storage.local.set({ pin_sessions: sessions, usage: use }, function() {
              chrome.runtime.sendMessage({ type: 'SET_PIN_EXPIRE', domain: hostname, extraMinutes: selectedMinutes }).catch(function() {});
              var overlay = document.getElementById('lockin-overlay');
              if (overlay) {
                overlay.remove();
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
              }
            });
          });
        });
      }

      // Cooldown countdown
      if (isCooldown && cooldownEnd) {
        var cdTimer = backdrop.querySelector('#lk-cdtimer');
        if (cdTimer) {
          (function tick() {
            var remaining = cooldownEnd - Date.now();
            if (remaining <= 0) {
              cdTimer.textContent = 'now!';
            } else {
              var m = Math.floor(remaining / 60000);
              var s = Math.floor((remaining % 60000) / 1000);
              cdTimer.textContent = m + ':' + String(s).padStart(2, '0');
              setTimeout(tick, 1000);
            }
          })();
        }
      }
    });
  } catch (err) {
    console.error('[LockIn overlay] Error:', err);
  }
})();
