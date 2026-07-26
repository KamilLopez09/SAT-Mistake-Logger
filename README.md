# SAT Mistake Logger

A tiny, Excel-first toolkit for logging Digital SAT misses by **mechanical and logical failure**, not vague “I didn’t know it” labels.

**Repo:** https://github.com/KamilLopez09/SAT-Mistake-Logger

## Why Excel (not a custom app)

For this scale, a spreadsheet wins:

- Zero install / deploy
- Screenshots paste or link into a cell
- Pivot tables + filters for domain × root-cause heatmaps
- Same file works offline during practice sessions

If you later outgrow it, the CSV schema is the source of truth for any app.

## Build plan (small scale)

| Phase | Deliverable | Status |
| --- | --- | --- |
| 1 | Public repo + this plan | Done |
| 2 | Strict CSV template (`Date` → `Screenshot`) | Next |
| 3 | Locked dropdown list for `Error Root Cause` | Pending |
| 4 | Excel/Google Sheets import + data-validation guide | Pending |

### How you’ll use it (target workflow)

1. After each practice module, log every miss on one row.
2. Pick **Error Root Cause** from the validation list only (no free-text causes).
3. Write a concrete **Actionable Fix** (drill, rule, or re-do protocol).
4. Attach a **Screenshot** (file path, OneDrive/Google Drive link, or pasted image in Excel).
5. Weekly: Pivot by `Content Domain` × `Error Root Cause` and drill the top two cells.

### Optional later upgrades (out of scope for v1)

- Google Form → Sheets auto-append
- Simple local HTML form that downloads CSV
- Notion database with the same columns

## Files

- `templates/sat-error-tracker.csv` — import-ready tracker
- `docs/error-root-cause-options.md` — dropdown options (copy into Data Validation)
- `docs/excel-setup.md` — paste/import steps for Excel and Google Sheets
