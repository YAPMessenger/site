# YAP — Website Infrastructure
**Domain, hosting, and deployment reference**

> ℹ️ This is the public technical reference for the site. **Internal hosting details** (registrar/host
> accounts, deployment history) are kept in the project's separate **internal hosting notes**, outside
> this repo.

---

## Domain & Hosting

| Field | Value |
|-------|-------|
| **Domain** | yap-messenger.com |
| **Registrar** | Namecheap |
| **Platform** | GitHub Pages |
| **Repository** | `YAPMessenger/site` (public), branch `main` |
| **Custom domain** | yap-messenger.com (repo Settings → Pages) |
| **HTTPS** | Enforced (GitHub Pages free SSL via Let's Encrypt) |

---

## DNS Configuration (Namecheap → GitHub Pages)

| Type | Host | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | `YAPMessenger.github.io` |

A `CNAME` file containing `yap-messenger.com` exists in the repository root.

---

## File Structure

```
/
├── index.html              — Teaser / landing page
├── privacy.html            — Privacy Policy
├── terms.html              — Terms of Service
├── faq.html                — Frequently Asked Questions
└── CNAME                   — Custom domain for GitHub Pages
```

## Live URLs
- Landing: https://yap-messenger.com
- Privacy: https://yap-messenger.com/privacy.html · Terms: …/terms.html · FAQ: …/faq.html

---

## Deployment
Push to `main`; GitHub Pages deploys automatically within a few minutes.
```
git add . && git commit -m "update" && git push
```

---

## Email

| Field | Value |
|-------|-------|
| **Contact address** | contact@yap-messenger.com |
| **Provider** | Microsoft 365 |
| **Auth** | SPF ✅ · DKIM ✅ (selector1/2 CNAMEs at Namecheap, M365 signing on — 2026-06-22) · DMARC ✅ (`p=quarantine`) |

This address is referenced in the Privacy Policy, Terms of Service, FAQ, App Store listing, and in-app
support. It must be active before store submission.

## Analytics

The site uses **Google Analytics 4** (property `G-8K5G3J4Y8X`, free). Reinstated 2026-06-23 as part of the
customization-first repositioning — richer marketing/audience data + future ad-campaign attribution, with
privacy treated as an honest floor rather than the headline (see the Decisions Log entry of 2026-06-23).
Trade-off accepted knowingly: GA4 sets cookies and sends data to Google, so it is NOT cookieless/AAT.

> ✅ **Analytics notice (2026-06-23):** GA4 runs **by default**; `/cookie-consent.js` shows a dismissible
> notice ("Got it" / "Opt out"). Opt out sets GA4's `ga-disable` flag + is remembered in `localStorage`.
> Softened from a hard opt-in gate so the teaser actually captures traffic (incl. competitor recon) — most
> visitors never click Accept. Lower EU-consent bar, accepted pre-launch; disclosed honestly in `privacy.html` §12.

**Convention — EVERY page must include the consent loader.** GA4 is no longer hard-wired into each page;
instead each page includes the shared **`/cookie-consent.js`**, which shows the consent banner and loads
GA4 **only after the visitor accepts** (Decline = no GA / no cookies; choice remembered). When you add a
new page, put this one line in `<head>`:

```html
<!-- Analytics: GA4, loaded only after cookie consent — see /cookie-consent.js -->
<script src="/cookie-consent.js" defer></script>
```

The GA4 property (`G-8K5G3J4Y8X`) lives in the Google account (under `contact@`). Disclosed to users in
`privacy.html` §12 ("This Website"). Loader currently on all 4 pages: `index`, `faq`, `privacy`, `terms`.

## ⚠️ Email senders — AUTHORIZE BEFORE ADDING

**DMARC is `p=quarantine`** — so **any source that sends mail *as* `@yap-messenger.com` must be
authorized in DNS first** (added to SPF, or given its own DKIM), or its mail lands in recipients'
**spam**. Before wiring up *any* new email-sending tool, add a row here and authorize it.

| Sender | Status | Notes |
|---|---|---|
| Microsoft 365 (`contact@`) | ✅ authorized | SPF includes `spf.protection.outlook.com` |
| **Website contact form** | ⬚ planned | realistic soon — authorize its sending service before go-live |
| **Account-deletion request flow** | ⬚ planned | **Apple App Store requires** a web-accessible account-deletion method; it will likely send confirmation email → authorize its sender before launch |
| Newsletter / CRM / helpdesk | ⬚ future | authorize before first send if ever added |

> The **account-deletion method** is also a hard **App Store submission requirement** (a feature, not
> just an email concern) — it belongs in the launch / store-compliance checklist too.

---

*Update this document if the hosting provider, domain registrar, or file structure changes.*
