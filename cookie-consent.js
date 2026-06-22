/* YAP analytics notice — GA4 runs by default; a dismissible notice lets visitors opt out.
   Softened from a hard opt-in gate (most visitors never click Accept, so the gate lost the data). */
(function () {
  var GA_ID = 'G-8K5G3J4Y8X';
  var KEY = 'yap-cookie-consent';
  var get = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  var set = function (v) { try { localStorage.setItem(KEY, v); } catch (e) {} };

  function loadGA() {
    if (window.__yapGA) return; window.__yapGA = true;
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID);
  }
  function disableGA() { window['ga-disable-' + GA_ID] = true; }

  var choice = get();
  // GA runs by default; only a prior opt-out suppresses it.
  if (choice === 'declined') { disableGA(); } else { loadGA(); }

  // The notice shows once, until dismissed ("ok") or opted out ("declined").
  if (choice === 'ok' || choice === 'declined') return;

  function dismiss(bar) { bar.style.opacity = '0'; setTimeout(function () { bar.remove(); }, 300); }

  function banner() {
    var css = '#yap-cc{position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;max-width:560px;margin:0 auto;'
      + 'background:rgba(10,10,10,0.96);border:1px solid rgba(255,217,61,0.22);border-radius:6px;padding:16px 18px;'
      + 'display:flex;flex-wrap:wrap;align-items:center;gap:12px;font-family:\'DM Mono\',\'Courier New\',monospace;'
      + 'box-shadow:0 8px 40px rgba(0,0,0,0.5);opacity:0;transition:opacity .35s ease;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}'
      + '#yap-cc p{flex:1 1 260px;margin:0;font-size:12px;line-height:1.6;color:#bbb}'
      + '#yap-cc a{color:#ffd93d;text-decoration:none}'
      + '#yap-cc .ga{display:flex;gap:8px;flex:0 0 auto}'
      + '#yap-cc button{font-family:inherit;font-size:11px;letter-spacing:.5px;padding:8px 16px;border-radius:3px;cursor:pointer;border:1px solid transparent;transition:all .25s ease}'
      + '#yap-cc .acc{background:#ffd93d;color:#050505;border-color:#ffd93d}'
      + '#yap-cc .acc:hover{box-shadow:0 0 20px rgba(255,217,61,0.3)}'
      + '#yap-cc .dec{background:transparent;color:#888;border-color:rgba(255,255,255,0.15)}'
      + '#yap-cc .dec:hover{color:#ccc;border-color:rgba(255,255,255,0.3)}';
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var bar = document.createElement('div'); bar.id = 'yap-cc';
    bar.innerHTML = '<p>We use analytics cookies to see which pages are useful — no ads, no selling data. '
      + '<a href="/privacy.html">Details</a>.</p>'
      + '<div class="ga"><button class="dec" type="button">Opt out</button>'
      + '<button class="acc" type="button">Got it</button></div>';
    document.body.appendChild(bar);
    requestAnimationFrame(function () { bar.style.opacity = '1'; });
    bar.querySelector('.acc').onclick = function () { set('ok'); dismiss(bar); };
    bar.querySelector('.dec').onclick = function () { set('declined'); disableGA(); dismiss(bar); };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', banner);
  else banner();
})();
