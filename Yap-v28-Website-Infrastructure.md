# YAP — Website Infrastructure
**Domain, hosting, and deployment reference**
**March 28, 2026**

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
| **Repository** | github.com/USBillTrackerX/yap-messenger.com (public) |
| **Branch** | main |
| **Custom domain** | yap-messenger.com (configured in repo Settings → Pages) |
| **HTTPS** | Enforced (GitHub Pages provides free SSL via Let's Encrypt) |

---

## DNS Configuration (Namecheap → GitHub Pages)

GitHub Pages requires the following DNS records set in Namecheap:

| Type | Host | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | USBillTrackerX.github.io |

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

## Source Files (Local Copies)

These files are maintained alongside the YAP document suite:

| File | Description |
|------|-------------|
| Yap-Teaser-Website.html | Landing page source (= index.html) |
| privacy.html | Privacy Policy page |
| terms.html | Terms of Service page |
| faq.html | FAQ page |

When the Privacy Policy or Terms of Service markdown docs are updated, the corresponding HTML pages should be updated to match and redeployed.

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

This address is referenced in the Privacy Policy, Terms of Service, FAQ, App Store listing, and in-app support. It must be active before store submission.

---

*Update this document if the hosting provider, domain registrar, or file structure changes.*
