const STORAGE_KEY = "sat-mistake-logger.v1";
const MAX_IMAGE_WIDTH = 1280;
const JPEG_QUALITY = 0.72;

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
const causeInput = document.getElementById("errorRootCause");
const causeSuggestions = document.getElementById("error-root-cause-suggestions");
const dateInput = document.getElementById("date");
const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("screenshot-file");
const dropEmpty = document.getElementById("drop-empty");
const dropPreview = document.getElementById("drop-preview");
const previewImage = document.getElementById("preview-image");
const previewName = document.getElementById("preview-name");
const clearScreenshotBtn = document.getElementById("clear-screenshot");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");

/** @type {{ name: string, dataUrl: string } | null} */
let pendingScreenshot = null;
/** Object URL used only for on-screen preview (revoked on replace/clear). */
let previewObjectUrl = null;

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
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    window.alert(
      "Could not save. Browser storage may be full — try a smaller screenshot or clear old rows."
    );
    throw new Error("storage_full");
  }
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

function screenshotCsvValue(entry) {
  if (entry.screenshotName) return entry.screenshotName;
  if (entry.screenshotData) return "[embedded image]";
  return entry.screenshot || "";
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
        screenshotCsvValue(entry),
      ]
        .map(csvEscape)
        .join(",")
    );
  }
  return `${lines.join("\r\n")}\r\n`;
}

function isImageFile(file) {
  if (!file) return false;
  if (file.type && file.type.startsWith("image/")) return true;
  return /\.(png|jpe?g|gif|webp|bmp|heic|heif)$/i.test(file.name || "");
}

function readFileAsDataUrl(fileOrBlob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Could not read image"));
    };
    reader.onerror = () => reject(new Error("Could not read image"));
    reader.readAsDataURL(fileOrBlob);
  });
}

function loadImageFromUrl(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not decode image"));
    img.src = url;
  });
}

function revokePreviewUrl() {
  if (previewObjectUrl) {
    URL.revokeObjectURL(previewObjectUrl);
    previewObjectUrl = null;
  }
}

async function compressImage(fileOrBlob, fileName) {
  const sourceUrl = URL.createObjectURL(fileOrBlob);
  try {
    const img = await loadImageFromUrl(sourceUrl);
    const naturalWidth = img.naturalWidth || img.width;
    const naturalHeight = img.naturalHeight || img.height;

    if (!naturalWidth || !naturalHeight) {
      const raw = await readFileAsDataUrl(fileOrBlob);
      const baseName = (fileName || "screenshot.png").replace(/\.[^.]+$/, "") || "screenshot";
      return { name: fileName || `${baseName}.png`, dataUrl: raw };
    }

    const scale = Math.min(1, MAX_IMAGE_WIDTH / naturalWidth);
    const width = Math.max(1, Math.round(naturalWidth * scale));
    const height = Math.max(1, Math.round(naturalHeight * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");
    ctx.drawImage(img, 0, 0, width, height);
    const dataUrl = canvas.toDataURL("image/jpeg", JPEG_QUALITY);
    if (!dataUrl.startsWith("data:image")) {
      throw new Error("Compression produced invalid image data");
    }
    const baseName = (fileName || "screenshot.png").replace(/\.[^.]+$/, "") || "screenshot";
    return { name: `${baseName}.jpg`, dataUrl };
  } finally {
    URL.revokeObjectURL(sourceUrl);
  }
}

function setPendingScreenshot(shot, previewUrl) {
  pendingScreenshot = shot;
  revokePreviewUrl();

  if (!shot || !shot.dataUrl || !shot.dataUrl.startsWith("data:image")) {
    pendingScreenshot = null;
    previewImage.removeAttribute("src");
    previewImage.hidden = true;
    previewName.textContent = "";
    dropPreview.hidden = true;
    dropPreview.classList.add("hidden");
    dropEmpty.hidden = false;
    dropEmpty.classList.remove("hidden");
    fileInput.value = "";
    return;
  }

  // Prefer a blob/object URL for display — avoids broken <img> when data URLs misbehave.
  if (previewUrl) {
    previewObjectUrl = previewUrl;
    previewImage.src = previewUrl;
  } else {
    previewImage.src = shot.dataUrl;
  }
  previewImage.hidden = false;
  previewName.textContent = shot.name || "screenshot.jpg";
  dropEmpty.hidden = true;
  dropEmpty.classList.add("hidden");
  dropPreview.hidden = false;
  dropPreview.classList.remove("hidden");
}

async function acceptImageFile(file) {
  if (!isImageFile(file)) {
    window.alert("Please drop, paste, or choose an image file.");
    return;
  }

  const displayUrl = URL.createObjectURL(file);
  try {
    // Show immediately so the drop zone never sits in a broken empty-src state.
    previewImage.src = displayUrl;
    previewImage.hidden = false;
    previewName.textContent = file.name || "screenshot";
    dropEmpty.hidden = true;
    dropEmpty.classList.add("hidden");
    dropPreview.hidden = false;
    dropPreview.classList.remove("hidden");

    const shot = await compressImage(file, file.name || `paste-${todayISO()}.png`);
    setPendingScreenshot(shot, displayUrl);
  } catch (error) {
    URL.revokeObjectURL(displayUrl);
    setPendingScreenshot(null);
    window.alert("Could not process that image. Try a PNG or JPG screenshot.");
    console.error(error);
  }
}

function openLightbox(dataUrl, caption) {
  lightboxImage.src = dataUrl;
  lightboxCaption.textContent = caption || "Screenshot";
  if (typeof lightbox.showModal === "function") {
    lightbox.showModal();
  }
}

function renderScreenshotCell(entry, index) {
  if (entry.screenshotData && String(entry.screenshotData).startsWith("data:image")) {
    const name = escapeHtml(entry.screenshotName || "Screenshot");
    return `
      <button type="button" class="thumb-btn" data-view-index="${index}" title="View full size">
        <img class="thumb" src="${entry.screenshotData}" alt="${name}" />
      </button>`;
  }
  if (entry.screenshot) {
    return `<span class="shot-note">${escapeHtml(entry.screenshot)}</span>`;
  }
  return `<span class="shot-note">—</span>`;
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
        <td>${renderScreenshotCell(entry, index)}</td>
        <td><button type="button" class="delete-btn" data-index="${index}" aria-label="Delete row">Delete</button></td>
      </tr>`
    )
    .join("");
}

function fillCauseOptions() {
  causeSuggestions.innerHTML = "";
  for (const cause of ERROR_ROOT_CAUSES) {
    const option = document.createElement("option");
    option.value = cause;
    causeSuggestions.appendChild(option);
  }
}

dropZone.addEventListener("click", (event) => {
  if (event.target.closest("#clear-screenshot")) return;
  fileInput.click();
});

dropZone.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    fileInput.click();
  }
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files && fileInput.files[0];
  if (file) acceptImageFile(file);
});

["dragenter", "dragover"].forEach((type) => {
  dropZone.addEventListener(type, (event) => {
    event.preventDefault();
    event.stopPropagation();
    dropZone.classList.add("dragover");
  });
});

dropZone.addEventListener("dragleave", (event) => {
  event.preventDefault();
  if (!dropZone.contains(event.relatedTarget)) {
    dropZone.classList.remove("dragover");
  }
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  event.stopPropagation();
  dropZone.classList.remove("dragover");
  const file = event.dataTransfer && event.dataTransfer.files[0];
  if (file) acceptImageFile(file);
});

clearScreenshotBtn.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  setPendingScreenshot(null);
});

document.addEventListener("paste", async (event) => {
  const items = event.clipboardData && event.clipboardData.items;
  if (!items) return;

  for (const item of items) {
    if (!item.type || !item.type.startsWith("image/")) continue;
    event.preventDefault();
    const blob = item.getAsFile();
    if (!blob) {
      window.alert("Clipboard image could not be read. Try saving the snip as a PNG and dropping it.");
      return;
    }
    const file =
      blob instanceof File
        ? blob
        : new File([blob], `paste-${todayISO()}.png`, { type: blob.type || "image/png" });
    await acceptImageFile(file);
    return;
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = loadEntries();
  entries.unshift({
    id: crypto.randomUUID(),
    date: dateInput.value,
    testModule: document.getElementById("testModule").value.trim(),
    questionNumber: document.getElementById("questionNumber").value.trim(),
    contentDomain: document.getElementById("contentDomain").value,
    errorRootCause: causeInput.value.trim(),
    actionableFix: document.getElementById("actionableFix").value.trim(),
    screenshotName: pendingScreenshot ? pendingScreenshot.name : "",
    screenshotData: pendingScreenshot ? pendingScreenshot.dataUrl : "",
    screenshot: "",
  });
  try {
    saveEntries(entries);
  } catch {
    return;
  }
  form.reset();
  dateInput.value = todayISO();
  setPendingScreenshot(null);
  render();
});

rowsEl.addEventListener("click", (event) => {
  const viewBtn = event.target.closest("button[data-view-index]");
  if (viewBtn) {
    const index = Number(viewBtn.dataset.viewIndex);
    const entry = loadEntries()[index];
    if (entry && entry.screenshotData) {
      openLightbox(entry.screenshotData, entry.screenshotName || "Screenshot");
    }
    return;
  }

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
setPendingScreenshot(null);
render();
