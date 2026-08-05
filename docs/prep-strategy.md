# Prep Strategy — Handling the "Prep-Book vs. Question-Bank" Disconnect

**Problem this document solves.** Working through Erica Meltzer's Reading chapters and then pulling
"matching" questions from the College Board Question Bank surfaced a disconnect: the prep book teaches
each skill with *classic* stems (e.g. *"It can be reasonably inferred…," "would most likely agree,"
"an unstated assumption…"*), while the digital bank often expresses the **same skill** through a
different surface form (e.g. *"Which choice most logically completes the text?"*). Worse, the bank's own
skill **tags don't line up 1-to-1** with Meltzer's chapters — we found "would most likely agree"
questions tagged `Central Ideas and Details` even though the reasoning is pure inference.

This document is the research-backed answer to: *stop chasing a 1-to-1 mapping; here's what to do instead.*

---

## General consensus (from the research)

Sources: College Board's official Reading & Writing overview and practice guidance, plus independent
tutoring analyses (links at the bottom). The points below are where they agree.

1. **The test is built around a small, stable set of skills — not around question wording.**
   The Reading & Writing section has four domains; the one in play here, **Information and Ideas**, has
   exactly three skills: *Central Ideas and Details*, *Command of Evidence* (textual + quantitative), and
   *Inferences*. College Board deliberately **varies the wording** of stems within a skill. So the surface
   phrasing is noise; the skill is the signal.

2. **One skill has many stems, and stems can be shared across skills.** College Board's own Question Bank
   shows different stems for the same underlying task. A "logical conclusion" can appear as
   *"most logically completes the text"* **or** *"can be reasonably inferred"* **or**
   *"would most likely agree."* Chasing a clean chapter→stem→tag mapping is therefore a dead end **by design.**

3. **The winning method is skill/reasoning-based and is identical regardless of stem wording:**
   - **Read the question first** and name the *task* (retrieve a stated fact? draw a supported conclusion?
     pick evidence? describe a function?).
   - **Find the "proof text"** — the exact sentence(s) that justify the answer.
   - **Pre-answer in your own words** *before* looking at the choices.
   - **Idea-match, don't keyword-match.** The correct choice paraphrases your prediction; trap answers reuse
     the passage's vocabulary but distort its logic.
   - **Eliminate on principle:** wrong answers are typically *too broad, too narrow, outside the text,
     absolute/extreme,* or *directionally right but overstated.* The correct answer is defensible word-by-word.

4. **Meltzer's role vs. the bank's role are different and complementary.**
   - Use **Meltzer** to *learn the reasoning and rules* for each skill (this is what her chapters are for).
   - Use the **official Question Bank + Bluebook** to *practice on real questions with real (varied) wording.*
   Do **not** expect her chapter boundaries to equal the bank's tags. Use only 2023+ digital-format material.

5. **Review beats volume.** Every source stresses spending *more time analyzing misses than doing new
   questions*, logging *why* each miss happened (misread stem, weak content, fell for a specific trap), and
   re-drilling that exact skill. This is exactly what this repo's Mistake Logger is for.

**Bottom line:** Organize prep around the **~stable official skills**, treat each Meltzer chapter as a
*skill-teaching module* (which may map to part of a skill, a whole skill, or span two), and practice a
**single universal method** that is immune to stem wording.

---

## The plan

### Phase 0 — Reframe (do this once)
- Stop mapping *chapter → stem → tag* 1-to-1. Adopt a **skill-first** model: the official skill is the unit
  of study; chapters and stems are just different doorways into it.
- Anchor everything to the **official skill list** (Information and Ideas: Central Ideas & Details, Command of
  Evidence [textual + quantitative], Inferences; then Craft & Structure, Expression of Ideas, Standard English
  Conventions).

### Phase 1 — Build a skill crosswalk (many-to-many, not 1-to-1)
- Maintain one table: **Official skill  ↔  Meltzer chapter(s)  ↔  known stem variants.** A first version is
  in [`rw-question-classification.md`](rw-question-classification.md) and the chapter map below.
- Add stem variants as you meet them (e.g. under *Inferences*: "most logically completes the text,"
  "reasonably inferred," "would most likely agree," "reasonable to infer," "unstated assumption").
- Accept **cross-tag membership**: a question can teach an inference skill even if the bank tags it
  `Central Ideas and Details`. Sort by the *reasoning it requires*, not the label.

| Meltzer Reading chapter | Official skill (Domain) |
| --- | --- |
| 5 — Literal Comprehension | Central Ideas and Details – *details* (Information & Ideas) |
| 6 — Reasonable Inferences | Inferences (Information & Ideas) |
| 7 — Reading for Function | Text Structure and Purpose (Craft & Structure) |
| 8 — Text Completions | Words in Context (Craft & Structure) |
| 9 — Supporting & Undermining | Command of Evidence – textual (Information & Ideas) |
| 10 — Graphs & Charts | Command of Evidence – quantitative (Information & Ideas) |
| 11 — Paired Passages | Cross-Text Connections (Craft & Structure) |

### Phase 2 — Diagnose
- Take one **full-length Bluebook** practice test (real interface, real adaptivity).
- In **My Practice → Score Details**, read performance **by Knowledge & Skill domain** and difficulty.
  Rank skills weakest→strongest. That ranking — not the chapter order — drives what you study next.

### Phase 3 — Skill-by-skill mastery loop (repeat per weak skill)
1. **Learn:** read the matching Meltzer chapter for the reasoning/rules.
2. **Drill real questions:** in the **Student Question Bank**, filter by *Reading & Writing → domain → skill →
   difficulty*. Export **without** answers first (no spoilers), answer them, then export **with** explanations.
3. **Apply the universal method** on every question (question-first → proof text → pre-answer → idea-match →
   eliminate). Ignore whether the stem "looks like" the chapter's phrasing.
4. **Log every miss** in the Mistake Logger with the *Error Root Cause* + a concrete *Actionable Fix*
   (see this repo's `templates/` and `docs/error-root-cause-options.md`).

### Phase 4 — Mix, time, and review by pattern
- Once individual skills feel solid, do **mixed, timed** sets so you practice *identifying the task* under
  time pressure (the real test never tells you the skill).
- **Weekly:** pivot your log by **Content Domain × Error Root Cause** and drill the top 1–2 cells. Spend more
  time here than on new questions.

### Phase 5 — Re-measure
- Every ~2–3 study cycles, take another full Bluebook test. Confirm the weak-skill ranking is shifting.
  Re-prioritize Phase 3 from the new data.

---

## How this plugs into the Mistake Logger

The disconnect is best neutralized at the **logging** layer: log by **skill + root cause**, never by stem
wording. Suggested practice when filling the tracker:

- **Content Domain / Skill** column → use the *official* skill (Phase 1 crosswalk), even if the prep chapter
  or the bank tag says something else.
- **Error Root Cause** → mechanical/logical failure (misread stem, keyword-match trap, overstated inference,
  out-of-scope, etc.), per `docs/error-root-cause-options.md`.
- **Actionable Fix** → the reasoning step you skipped (e.g. "find proof text before reading choices").

This keeps the analytics stable no matter how the College Board phrases a question.

---

## Sources

- College Board — *The Reading and Writing Section* (domains & skills): https://satsuite.collegeboard.org/sat/whats-on-the-test/reading-writing
- College Board — *Build Your Study Plan* (diagnose → Question Bank filters → export without spoilers): https://satsuite.collegeboard.org/practice/build-your-study-plan
- College Board — *My Practice 101* (per-skill score details, tailored practice): https://satsuite.collegeboard.org/practice/my-practice-101
- College Board — *How to Use Bluebook Practice Tests* (review misses, patterns): https://satsuite.collegeboard.org/practice/bluebook
- MySatCoach — *Information and Ideas* (same skill, varied stems): https://www.mysatcoach.com/guide/digital-sat-information-and-ideas
- MySatCoach — *Hardest Reading Questions* (defensible-word-by-word answers; content vs. function stems): https://www.mysatcoach.com/guide/digital-sat-hardest-reading-questions
- The Test Advantage — *Best Digital SAT Reading Strategy* (question-first → proof text → summarize → match): https://thetestadvantage.com/blog/the-best-digital-sat-reading-strategy-your-tutors-guide
- The Test Advantage — *Why Keyword Matching Fails* (idea-matching over keyword-matching): https://thetestadvantage.com/blog/sat-prep-comparison-why-generic-strategies-fail-on-hard-module-dec-2025
- Victory Prep — *Reading Strategies / miss-analysis routine*: https://www.victorypreptutors.com/blog/sat-reading-strategies.html
- Refresh Kid & KD Global — using Meltzer (skills) alongside official Bluebook/Question Bank; 2023+ only: https://refreshkid.com/blog/best-sat-prep-books-resources , https://kdglobaledu.com/best-sat-prep-books-2026-complete-guide-for-beginners/
