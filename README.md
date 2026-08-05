# SAT Mistake Logger

A tiny toolkit for logging Digital SAT misses by **mechanical and logical failure**, not vague “I didn’t know it” labels.

**Repo:** https://github.com/KamilLopez09/SAT-Mistake-Logger  
**Live app:** https://kamillopez09.github.io/SAT-Mistake-Logger/

## Quick start

**Option A — Live web logger (fastest capture)**  
Open https://kamillopez09.github.io/SAT-Mistake-Logger/ — log misses, then **Export CSV** into Excel. See [`docs/app-usage.md`](docs/app-usage.md).

**Option B — Excel (fastest analytics)**  
Import `templates/sat-error-tracker.csv` and set Data Validation from `templates/error-root-cause-list.csv`. See [`docs/excel-setup.md`](docs/excel-setup.md).

**Option C — Offline local file**  
Open [`app/index.html`](app/index.html) directly in a browser (same app as the live site).

## Why this shape

| Tool | Best for |
| --- | --- |
| HTML app | Quick logging after a module; locked dropdowns; offline |
| Excel / Sheets | Pivots, heatmaps, pasted screenshots, long-term review |

CSV is the shared schema. The app exports the same headers as the template.

## Build plan (small scale)

| Phase | Deliverable | Status |
| --- | --- | --- |
| 1 | Public repo + this plan | Done |
| 2 | Strict CSV template (`Date` → `Screenshot`) | Done |
| 3 | Locked dropdown list for `Error Root Cause` | Done |
| 4 | Excel/Google Sheets import + data-validation guide | Done |
| 5 | Local HTML logger (`app/`) with localStorage | Done |
| 6 | CSV export matching template schema | Done |
| 7 | GitHub Pages host for `app/` | Done |

### Workflow

1. After each practice module, log every miss (HTML app or spreadsheet).
2. Pick **Error Root Cause** from the validation list only.
3. Write a concrete **Actionable Fix**.
4. Attach a **Screenshot** path/URL (or paste the image in Excel).
5. Weekly: Pivot by `Content Domain` × `Error Root Cause` and drill the top two cells.

### Optional later upgrades

- Google Form → Sheets auto-append
- Notion database with the same columns

## Files

- `app/` — local HTML/JS/CSS logger
- `templates/sat-error-tracker.csv` — import-ready tracker
- `templates/error-root-cause-list.csv` — dropdown source list
- `templates/question-search-plan.csv` — per-chapter (both prep books) Question Bank search plan
- `templates/question-bank-checklist.csv` — per-question review checklist (RW reading + Math)
- `docs/error-root-cause-options.md` — cause definitions
- `docs/excel-setup.md` — Excel/Sheets setup
- `docs/app-usage.md` — browser app usage
- `docs/prep-strategy.md` — research-backed plan for the prep-book vs. question-bank disconnect
- `docs/rw-question-classification.md` — RW Chapter 5/6 question classification and phrasing templates
- `docs/math-preppros-to-questionbank-map.md` — PrepPros Math chapters → question-bank hard questions (750–800 focus)
- `docs/question-search-plan-usage.md` — how to use the per-chapter search-plan and checklist CSVs
