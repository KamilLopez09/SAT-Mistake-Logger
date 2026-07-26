# Error Root Cause — Data Validation List

Paste these values into a sheet named `Lists` (column A), then point Excel/Google Sheets **Data Validation** for `Error Root Cause` at that range. Use **exact match / list only** — no free-text causes.

## Dropdown options (one per line)

```
Fell for real-world logic trap
Misread constraint
Calculation error
Scope shift
Dropped negation (except/least/not)
Chose partially correct answer
Misapplied formula or theorem
Sign or direction error
Unit or scale misread
Wrong referent or antecedent
Anchored on first plausible choice
Misread graph/table labels
Overgeneralized from one detail
Underused passage evidence
Algebraic manipulation error
Geometry diagram assumption error
Transferred method from wrong problem type
Confounded correlation with causation
Ignored conditional (if/only if/unless)
Premature abandon under time pressure
```

## What each option isolates

| Option | Failure type |
| --- | --- |
| Fell for real-world logic trap | Chose what is true in life, not what the text/data supports |
| Misread constraint | Missed a bound, condition, or given that changes the solution set |
| Calculation error | Arithmetic / algebra execution failed after a correct setup |
| Scope shift | Answer is about a broader/narrower claim than the question asked |
| Dropped negation (except/least/not) | Missed a polarity flip in the stem |
| Chose partially correct answer | Correct for part of the problem; incomplete for the full ask |
| Misapplied formula or theorem | Used a valid tool on the wrong structure |
| Sign or direction error | Inequality, vector, percent change, or orientation flipped |
| Unit or scale misread | Axis, percent vs. decimal, or unit conversion mismatch |
| Wrong referent or antecedent | Pronoun / “this” / “which” attached to the wrong noun |
| Anchored on first plausible choice | Stopped evaluating once one choice “felt” right |
| Misread graph/table labels | Wrong series, axis, or legend mapping |
| Overgeneralized from one detail | One local fact treated as the global claim |
| Underused passage evidence | Guessed theme instead of citing the controlling sentence |
| Algebraic manipulation error | Valid equation; illegal or incomplete rearrange |
| Geometry diagram assumption error | Assumed congruence/parallel/right angle not given |
| Transferred method from wrong problem type | Applied a familiar strategy to an unmatched stem |
| Confounded correlation with causation | Causal story where only association is warranted |
| Ignored conditional (if/only if/unless) | Treated a conditional as categorical |
| Premature abandon under time pressure | Switched to guess before finishing a solvable setup |

## Rules for logging

1. Pick **one** root cause — the earliest decisive failure.
2. If two apply, choose the one that, if fixed, would have prevented the miss.
3. Do **not** add vague labels (“careless”, “hard”, “didn’t know”).
