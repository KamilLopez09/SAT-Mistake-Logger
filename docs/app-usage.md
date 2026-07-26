# Local HTML app usage

## Open

**Live:** https://kamillopez09.github.io/SAT-Mistake-Logger/

**Offline:** open `app/index.html` in Chrome, Edge, or Firefox (double-click or drag into a browser tab).

No install, server, or account required. Entries save in that browser’s `localStorage` (per origin — live site and local file are separate stores).

## Log a miss

1. Fill Date, Test/Module, Question Number.
2. Choose Content Domain and Error Root Cause from the dropdowns (root cause is locked to the validation list).
3. Write an Actionable Fix you can run in the next study block.
4. Optional: Screenshot path or cloud URL.
5. Click **Add miss**.

## Export to Excel

1. Click **Export CSV**.
2. Import the downloaded file into Excel/Google Sheets (same columns as `templates/sat-error-tracker.csv`).
3. Apply Data Validation from `templates/error-root-cause-list.csv` if you keep editing in the sheet.

## Notes

- Data stays on this device/browser only until you export.
- **Clear all** wipes local entries after confirmation.
- Delete removes a single row.
