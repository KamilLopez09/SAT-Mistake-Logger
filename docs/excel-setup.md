# Excel / Google Sheets setup (5 minutes)

## Excel

1. Open Excel → **Data** → **From Text/CSV** → select `templates/sat-error-tracker.csv`.
2. Load into a new sheet named `Tracker`.
3. Import `templates/error-root-cause-list.csv` into a sheet named `Lists` (column A).
4. Select the `Error Root Cause` column in `Tracker` (header excluded, or whole column below header).
5. **Data** → **Data Validation** → Allow: **List** → Source: `=Lists!$A$2:$A$21` → check **Show error alert** / reject invalid entries.
6. Optional: Format `Date` as `YYYY-MM-DD`; wrap text on `Actionable Fix`.
7. For `Screenshot`: either paste images into the cell/comment, or store a relative path / cloud URL as text.

### Weekly review pivot

Insert → PivotTable on `Tracker`:

- Rows: `Content Domain`
- Columns: `Error Root Cause`
- Values: Count of `Question Number`

Drill the two highest-count cells next week.

## Google Sheets

1. **File** → **Import** → Upload `sat-error-tracker.csv` → create new spreadsheet.
2. Add a sheet `Lists` and paste the root-cause options (or import `error-root-cause-list.csv`).
3. Select `Error Root Cause` range → **Data** → **Data validation** → Criteria: **Dropdown (from a range)** → `Lists!A2:A21` → reject invalid input.
4. Use **Insert** → **Pivot table** the same way as Excel.

## Logging protocol (per miss)

1. Fill `Date`, `Test/Module`, `Question Number`, `Content Domain`.
2. Choose **one** `Error Root Cause` from the list.
3. Write an `Actionable Fix` you can execute in the next study block (not a wish).
4. Attach `Screenshot` evidence of the stem + your wrong choice.
