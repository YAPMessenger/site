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
| Orientation | **`README.md`** at root — purpose + layout map + **a one-line index of `docs/`** + pointer to this doc |
| Engineering docs (architecture, plans, audits) | **`docs/engineering/`** |
| Process docs (setup, onboarding, playbooks) | **`docs/process/`** |
| Tiny repos | a **flat `docs/`** is fine — don't create empty subfolders just for symmetry |
| **Standalone / loose scripts** | **`scripts/`** at root |
| **Coupled scripts** (tied to specific data/UI) | stay **co-located** with what they operate on, and are **named in the README** (e.g. content-hub's hub engine lives in `_hub/` + `_catalog-parts/`) |
| Why-decisions + history | **`docs/DECISIONS.md`** (sibling to prototype's `Yap-v31-Decisions-Log.md`) |
| Current state / next-session orientation | **`docs/HANDOFF.md`** — *only where active multi-session dev warrants it* (content-hub; app at conversion); stable repos (site) skip it |
| This doc | **`docs/CONVENTIONS.md`** (identical copy per repo) |

## Deciding whether something is a new repo (or a folder, or an account)

**A new repo must earn its existence.** Default to a folder in an existing repo; promote to a repo only when justified.

- **The "deserves its own repo?" test** — a new repo is justified when it has **at least one** of: an independent deploy/release cadence · a different consumer depending on its output via a versioned interface · a different toolchain/runtime · heavy/independent churn that would pollute another repo's history · a different access/security boundary · a freeze/lifecycle divergence. **If none apply, it's a folder inside an existing repo, not a new repo.** (The four repos each pass; ops/business material fails all of them.)
- **Slotting anything new — ask one question: "is it code we maintain?"**
  - **Yes →** a repo (only if it passes the test above; otherwise a folder in an existing repo).
  - **No, it's a hosted service →** it's an **account, not a repo**; its local artifacts (exports, config, runbooks) live under the `YAP APP LTD` business folders, not in git.
  - **Just records/docs →** a business folder, cloud-backed.
  - *Worked calls:* analytics/telemetry is usually an account (build a repo only for a **custom dashboard**); finance is **never** a repo; a backend either earns its own repo or rides in `app` (decide at backend time).
- **Group, don't proliferate.** Business/ops material is low-churn, single-author, no deploy — it fails every part of the test. Keep it grouped (folders, or at most one `ops`-style repo), **never a repo-per-area.**
- **Build-vs-buy for any user-facing service is decided on the privacy axis.** Routing user PII through third-party SaaS (support/ticketing/complaints) is a real brand tension for a privacy-first product → prefer a **thin self-built intake** over a bought platform. Where it lands then follows the call: self-built = code (rides in `backend`/`app`); SaaS = account (business folder).

## "Monorepo" — what it does and doesn't mean here

The word does two jobs; only one applies to YAP.

- **Repo *count*** (everything in one git repo) — **not** what we do. The project shape is **separate repos**, because lifecycles diverge and the coupling is **loose** (a producer→consumer data hand-off, not shared code), so a monorepo's atomic-cross-cut advantage buys nothing.
- **Internal *structure*** (one repo split into packages, e.g. `packages/ui` + `apps/web` + `apps/native`) — the **only** place "monorepo" applies, and only **inside `app`**, only if a separate web shell is adopted. **Start simple; add an app-internal monorepo only when the code-sharing payoff clearly exceeds the tooling cost.**

## Naming (GitHub org + repos)

- **Repos: lowercase kebab-case, NO `yap` prefix.** The `YAPMessenger` org already namespaces, so re-prefixing stutters (`YAPMessenger/yap-prototype`); capitals/underscores are a case-sensitivity hazard. ✅ `content-hub` · ❌ `YAP_prototype`, `Prototype`, `yap-app`.
- **Owner login is a brand-fronted role account** (`YAPAdmin` on `contact@`), not a personal one — ownership already lives at the org / legal-entity level (YAP APP LTD). Keep it single-person; keep the login name distinct from the org name so the two can't be confused.

## The local layering model (concept, not literal paths)

Local files split into layers with **different** backup/versioning/security needs, and **the git repos are a subset, not the whole picture**:

| Layer | Versioned by | Backed up by |
|---|---|---|
| **Code** (what we build) | **git** → `YAPMessenger` org | git remotes |
| **Business / ops** (records, accounts, legal, finance) | file versions | cloud sync / external |
| **Secrets** (API keys, 2FA codes) | — | password manager |
| **Scratch / backups** | — | local + external drive |

The `Development\Repositories\` layer aligns 1:1 with the GitHub org (folder name == repo name); the surrounding business folders are a local superset the org never sees.

## Inter-repo contract: the Hub → App hand-off

`content-hub` and `app` are loosely coupled by **one artifact**: the Hub emits a **verified "ready-set" bundle** (only assets passing its ship-gate: `renderNative ✓` + `included ✓` + `paramColorable ✓`). That bundle is simultaneously **the cross-repo hand-off, the app-inclusion unit, and the OTA unit (EAS Update)** — one artifact, three jobs. The verified gate is the wall between the Hub's daily churn and the App's release history. Transport may mature (pinned tag → versioned package) with no architecture change. OTA swaps only JS/assets; native changes force a store build — govern with runtime versions.

## Governance (applies everywhere)
- **Commit identity** — private code repos commit as **`Tommy <tommy@yap-messenger.com>`** (real per-author history for a future team); the public **`site`** commits as **`YAP Messenger <contact@yap-messenger.com>`** (brand-fronted). *Principle: public-facing → brand; code → real authorship.* Set the repo's local `user.email` before its first commit.
- **Binary asset payloads stay OUT of git** — images/media live in storage/CDN per the manifest's `cdn://` model (content-hub); repos hold code + metadata only.
- **No file-sync client may back up `Development\Repositories\`** — syncing a live `.git` corrupts repos.
- **Backups / scratch / secrets never live in a repo** — backups go to `…\YAP APP LTD\Other\Backups\`; secrets to a password manager.

## Keeping it respected
This is the reference for any "where does this go?" decision. When a repo is created or meaningfully
touched, bring it into line (or document a deliberate exemption). Keep the per-repo copies in sync.
