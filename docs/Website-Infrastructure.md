# YAP — Website Infrastructure
**Domain, hosting, and deployment reference**
**March 28, 2026** · *(infra doc; lives with the `site` repo it documents)*

---

## Domain

| Field | Value |
|-------|-------|
| **Domain** | yap-messenger.com |
| **Registrar** | Namecheap |
| **Registered** | March 2026 |

---

## Hosting

| Field | Value |
|-------|-------|
| **Platform** | GitHub Pages |
| **Repository** | github.com/USBillTrackerX/yap-messenger.com (public) — ⚠️ **migrating to `YAPMessenger/site`, see below** |
| **Branch** | main |
| **Custom domain** | yap-messenger.com (configured in repo Settings → Pages) |
| **HTTPS** | Enforced (GitHub Pages provides free SSL via Let's Encrypt) |

---

## Migration: personal account → YAP org (⚠️ PENDING)

The site currently deploys from the **personal** `USBillTrackerX/yap-messenger.com` repo. It must move to
the company org: **`YAPMessenger/site`** (already created, empty). Steps:

1. Push this `site` repo's contents to `YAPMessenger/site` (`main`).
2. Add a `CNAME` file containing `yap-messenger.com` at the repo root.
3. In **`YAPMessenger` org settings → Pages**, **verify the domain** `yap-messenger.com` (GitHub blocks the
   same custom domain on two Pages sites and requires verification to prevent takeover).
4. Enable Pages on `YAPMessenger/site` (Settings → Pages → `main`); set custom domain `yap-messenger.com`.
5. At Namecheap, update the **`CNAME` `www`** record `USBillTrackerX.github.io` → `YAPMessenger.github.io`.
   The four `A` records (185.199.108–111.153) stay the same — they're GitHub Pages' IPs, account-independent.
6. **Remove the custom domain from the old `USBillTrackerX` repo** so the org repo can claim it (GitHub won't
   let both; do this around the switch — expect a brief HTTPS re-provision).
7. Confirm HTTPS re-issues and every page loads on the org-hosted site.

---

## DNS Configuration (Namecheap → GitHub Pages)

GitHub Pages requires the following DNS records set in Namecheap:

| Type | Host | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | USBillTrackerX.github.io → **`YAPMessenger.github.io` after migration** |

A `CNAME` file containing `yap-messenger.com` should exist in the repository root.

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

---

## Live URLs

| Page | URL |
|------|-----|
| Landing page | https://yap-messenger.com |
| Privacy Policy | https://yap-messenger.com/privacy.html |
| Terms of Service | https://yap-messenger.com/terms.html |
| FAQ | https://yap-messenger.com/faq.html |

---

## Deployment

Push to the configured branch. GitHub Pages deploys automatically within a few minutes.

```
git add .
git commit -m "update"
git push
```

---

## Email

| Field | Value |
|-------|-------|
| **Contact address** | contact@yap-messenger.com |
| **Setup** | *(FILL IN — e.g., Namecheap email forwarding, or external provider)* |

This address is referenced in the Privacy Policy, Terms of Service, FAQ, App Store listing, and in-app
support. It must be active before store submission.

---

*Update this document if the hosting provider, domain registrar, or file structure changes.*
