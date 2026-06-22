# YAP — Repository Conventions

**Canonical spec for how the YAP repos are organized. An identical copy lives in each conforming repo —
this is the single "where does X go?" reference.** New repos and new work conform to it (or document a
deliberate exemption, like `prototype`).

## The four repos (1:1 with the `YAPMessenger` GitHub org)
| Repo | Role | Visibility | Follows this convention? |
|---|---|---|---|
| **prototype** | frozen Vite/JSX blueprint (`Yap-v31.jsx`) | private | **Exempt** — keeps its bespoke `Working Documents/ → Build Documents/` (+ `Other Documents/`) migration-pass workflow. Frozen at conversion; don't restructure. |
| **content-hub** | living design-asset CMS (the hub) | private | Yes |
| **app** | universal Expo/RN app (built at conversion) | private | Yes — this convention is its template from day one |
| **site** | public marketing site (GitHub Pages) | public | Yes (lightweight — small/static) |

## Where things live (the parallel — same in every conforming repo)
| Thing | Location |
|---|---|
| Orientation | **`README.md`** at root — purpose + layout map + pointer to this doc |
| Engineering docs (architecture, plans, audits) | **`docs/engineering/`** |
| Process docs (setup, onboarding, playbooks) | **`docs/process/`** |
| Tiny repos | a **flat `docs/`** is fine — don't create empty subfolders just for symmetry |
| Scripts / tooling | **`scripts/`** at root — *unless* scripts are path-dependent, in which case they stay put and are **named in the README** (e.g. content-hub's hub tooling lives in `_hub/` + `_catalog-parts/`) |
| This doc | **`docs/CONVENTIONS.md`** (identical copy per repo) |

## Governance (applies everywhere)
- **Commit identity** — private code repos commit as **`Tommy <tommy@yap-messenger.com>`** (real per-author history for a future team); the public **`site`** commits as **`YAP Messenger <contact@yap-messenger.com>`** (brand-fronted). *Principle: public-facing → brand; code → real authorship.* Set the repo's local `user.email` before its first commit.
- **Binary asset payloads stay OUT of git** — images/media live in storage/CDN per the manifest's `cdn://` model (content-hub); repos hold code + metadata only.
- **No file-sync client may back up `Development\Repositories\`** — syncing a live `.git` corrupts repos.
- **Backups / scratch / secrets never live in a repo** — backups go to `…\YAP APP LTD\Other\Backups\`; secrets to a password manager.

## Keeping it respected
This is the reference for any "where does this go?" decision. When a repo is created or meaningfully
touched, bring it into line (or document a deliberate exemption). Keep the per-repo copies in sync.
