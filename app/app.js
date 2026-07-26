const STORAGE_KEY = "sat-mistake-logger.v1";

const HEADERS = [
  "Date",
  "Test/Module",
  "Question Number",
  "Content Domain",
  "Error Root Cause",
  "Actionable Fix",
  "Screenshot",
];

const ERROR_ROOT_CAUSES = [
  "Fell for real-world logic trap",
  "Misread constraint",
  "Calculation error",
  "Scope shift",
  "Dropped negation (except/least/not)",
  "Chose partially correct answer",
  "Misapplied formula or theorem",
  "Sign or direction error",
  "Unit or scale misread",
  "Wrong referent or antecedent",
  "Anchored on first plausible choice",
  "Misread graph/table labels",
  "Overgeneralized from one detail",
  "Underused passage evidence",
  "Algebraic manipulation error",
  "Geometry diagram assumption error",
  "Transferred method from wrong problem type",
  "Confounded correlation with causation",
  "Ignored conditional (if/only if/unless)",
  "Premature abandon under time pressure",
];

const form = document.getElementById("entry-form");
const rowsEl = document.getElementById("rows");
const rowCountEl = document.getElementById("row-count");
const causeSelect = document.getElementById("errorRootCause");
const dateInput = document.getElementById("date");

function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function csvEscape(value) {
  const text = String(value ?? "");
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function toCsv(entries) {
  const lines = [HEADERS.join(",")];
  for (const entry of entries) {
    lines.push(
      [
        entry.date,
        entry.testModule,
        entry.questionNumber,
        entry.contentDomain,
        entry.errorRootCause,
        entry.actionableFix,
        entry.screenshot,
      ]
        .map(csvEscape)
        .join(",")
    );
  }
  return `${lines.join("\r\n")}\r\n`;
}

function render() {
  const entries = loadEntries();
  rowCountEl.textContent = `${entries.length} row${entries.length === 1 ? "" : "s"}`;

  if (entries.length === 0) {
    rowsEl.innerHTML = `<tr><td class="empty" colspan="8">No misses logged yet. Add one above.</td></tr>`;
    return;
  }

  rowsEl.innerHTML = entries
    .map(
      (entry, index) => `
      <tr>
        <td>${escapeHtml(entry.date)}</td>
        <td>${escapeHtml(entry.testModule)}</td>
        <td>${escapeHtml(entry.questionNumber)}</td>
        <td>${escapeHtml(entry.contentDomain)}</td>
        <td class="cause">${escapeHtml(entry.errorRootCause)}</td>
        <td class="fix">${escapeHtml(entry.actionableFix)}</td>
        <td>${escapeHtml(entry.screenshot || "")}</td>
        <td><button type="button" class="delete-btn" data-index="${index}" aria-label="Delete row">Delete</button></td>
      </tr>`
    )
    .join("");
}

function fillCauseOptions() {
  for (const cause of ERROR_ROOT_CAUSES) {
    const option = document.createElement("option");
    option.value = cause;
    option.textContent = cause;
    causeSelect.appendChild(option);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = loadEntries();
  entries.unshift({
    id: crypto.randomUUID(),
    date: dateInput.value,
    testModule: document.getElementById("testModule").value.trim(),
    questionNumber: document.getElementById("questionNumber").value.trim(),
    contentDomain: document.getElementById("contentDomain").value,
    errorRootCause: causeSelect.value,
    actionableFix: document.getElementById("actionableFix").value.trim(),
    screenshot: document.getElementById("screenshot").value.trim(),
  });
  saveEntries(entries);
  form.reset();
  dateInput.value = todayISO();
  render();
});

rowsEl.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-index]");
  if (!button) return;
  const index = Number(button.dataset.index);
  const entries = loadEntries();
  entries.splice(index, 1);
  saveEntries(entries);
  render();
});

document.getElementById("export-csv").addEventListener("click", () => {
  const csv = toCsv(loadEntries());
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  const stamp = todayISO();
  anchor.href = url;
  anchor.download = `sat-error-tracker-${stamp}.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
});

document.getElementById("clear-all").addEventListener("click", () => {
  if (!loadEntries().length) return;
  const ok = window.confirm("Clear all logged misses from this browser?");
  if (!ok) return;
  saveEntries([]);
  render();
});

fillCauseOptions();
dateInput.value = todayISO();
render();
