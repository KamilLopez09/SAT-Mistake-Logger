# Question Search Plan — usage

Two Excel/Sheets-importable CSVs that tell you, for **every chapter of both prep books**, exactly what to
pull from the College Board Question Bank. Built from your provided PDFs (`Copy of RW questions.pdf`,
`Copy of Math Qs.pdf`) and the prep-book structures (Meltzer Reading Ch 5–11; PrepPros Math Ch 1–36).

## Files

- **`templates/question-search-plan.csv`** — one row per chapter (7 RW + 36 Math). Your "what do I search
  for" recipe: the Question Bank filter, the difficulty to target, how many matched questions exist in your
  PDFs, the Hard Question IDs, and the phrasing/notes for that chapter.
- **`templates/question-bank-checklist.csv`** — one row per matched question (199 total: 79 RW reading +
  120 Math). A working checklist with blank `Done?` / `Result` columns to track review, and a
  `Maps to Chapter(s)` column so each question points back to its prep-book chapter(s).

## How to use in the Question Bank (Bluebook / satsuitequestionbank.collegeboard.org)

1. Open a chapter row in `question-search-plan.csv`.
2. Set the Question Bank filters to the value in **Question Bank Filter** (Section > Domain > Skill).
3. Set difficulty:
   - **Math (PrepPros):** Level 4 → **Hard**, Level 3 → **Medium** (you're aiming 750–800, so lead with Hard).
   - **RW (Meltzer):** all difficulties; prioritize Hard/Medium.
4. Use the **Hard Question IDs** column to confirm/locate the specific questions in your PDF, or just work
   the filtered set live.
5. Log misses in the checklist (`Done?`, `Result`) — or in the main Mistake Logger keyed to the same Skill.

## Notes baked into the sheets

- **RW Command of Evidence** is one Bank skill but two Meltzer chapters: **Ch 9 = textual**
  (support/weaken/illustrate) and **Ch 10 = quantitative** (uses data from a table/graph). Same filter,
  different questions — the checklist tags each one.
- **RW cross-tags:** some `Central Ideas and Details`-tagged questions are inference-phrased
  (p14, p15, p22, p37) and are better practice for **Ch 6**. Noted in the Ch 5/6 rows.
- **Math strategy chapters** (1 Backsolving, 2 Substitution, 4 Desmos, 30 Word Problems) have no single
  skill — practice them *while* doing the content questions.
- **Gaps in these exports** (supplement from the live Question Bank): Math Ch 8 *Linear inequalities* and
  Ch 26 *Scatterplots* have **no Hard** questions here; *Evaluating statistical claims* (part of Ch 22) is
  absent. RW rows cover only Reading Ch 5–11 (grammar/Expression-of-Ideas questions belong to Meltzer's
  separate Writing material).

See also `docs/math-preppros-to-questionbank-map.md` (full math chapter map + reverse index) and
`docs/rw-question-classification.md` (RW phrasing templates and tiers).
