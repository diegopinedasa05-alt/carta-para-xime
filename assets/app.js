(() => {
  "use strict";
  const welcome = document.querySelector("#welcome");
  const openLetter = document.querySelector("#open-letter");
  const experience = document.querySelector("#experience");
  const audio = document.querySelector("#background-audio");
  const musicButton = document.querySelector("#music-button");
  const musicLabel = document.querySelector("#music-label");
  const letterCopy = document.querySelector("#letter-copy");
  const photoDialog = document.querySelector("#photo-dialog");
  const dialogImage = document.querySelector("#dialog-image");
  const photoCaption = document.querySelector("#photo-caption");
  const photoButtons = Array.from(document.querySelectorAll(".memory-card"));
  const config = window.LOVE_LETTER_CONFIG || {};
  const audioUrl = typeof config.audioUrl === "string" ? config.audioUrl.trim() : "";
  let activePhoto = 0;

  function updateMusicButton(isPlaying) { musicButton.setAttribute("aria-pressed", String(isPlaying)); musicButton.setAttribute("aria-label", isPlaying ? "Pausar música" : "Reproducir música"); musicLabel.textContent = isPlaying ? "Música" : "Silencio"; }
  function startMusic() { if (!audio.src) return; const result = audio.play(); if (result && typeof result.catch === "function") result.catch(() => updateMusicButton(false)); }
  function openExperience() { startMusic(); document.body.classList.add("experience-open"); experience.removeAttribute("aria-hidden"); welcome.setAttribute("aria-hidden", "true"); }
  function groupSentences(text) {
    const normalized = text.replace(/\s+/g, " ").trim();
    const sentences = normalized.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g) || [normalized];
    if (sentences.length <= 2 || sentences.some((sentence) => sentence.length > 900)) {
      const words = normalized.split(" ");
      const groups = [];
      for (let index = 0; index < words.length; index += 95) groups.push(words.slice(index, index + 95).join(" "));
      return groups;
    }
    const groups = [];
    for (let index = 0; index < sentences.length; index += 3) groups.push(sentences.slice(index, index + 3).join(" ").trim());
    return groups.filter(Boolean);
  }
  async function loadLetter() {
    try {
      const response = await fetch("./assets/letter.txt");
      if (!response.ok) throw new Error("Letter unavailable");
      const text = (await response.text()).trim();
      const [title, ...bodyLines] = text.split(/\r?\n\s*\r?\n/);
      const fragment = document.createDocumentFragment();
      const heading = document.createElement("h2"); heading.textContent = title.trim(); fragment.appendChild(heading);
      groupSentences(bodyLines.join(" ")).forEach((paragraph) => { const node = document.createElement("p"); node.textContent = paragraph; fragment.appendChild(node); });
      letterCopy.replaceChildren(fragment);
    } catch { letterCopy.innerHTML = "<p class=\"letter-copy__error\">La carta no pudo abrirse. Inténtalo de nuevo en unos momentos.</p>"; }
  }
  function renderPhoto(index) { activePhoto = (index + photoButtons.length) % photoButtons.length; const photo = photoButtons[activePhoto]; const image = photo.querySelector("img"); dialogImage.src = photo.dataset.src; dialogImage.alt = image.alt; photoCaption.textContent = photo.dataset.caption; }
  function openPhoto(index) { renderPhoto(index); if (typeof photoDialog.showModal === "function") photoDialog.showModal(); else photoDialog.setAttribute("open", ""); }
  if (audioUrl) { audio.src = audioUrl; audio.volume = .72; musicButton.hidden = false; }
  openLetter.addEventListener("click", openExperience, { once: true });
  musicButton.addEventListener("click", () => (audio.paused ? startMusic() : audio.pause()));
  audio.addEventListener("play", () => updateMusicButton(true)); audio.addEventListener("pause", () => updateMusicButton(false)); audio.addEventListener("error", () => { musicButton.hidden = true; });
  photoButtons.forEach((button, index) => button.addEventListener("click", () => openPhoto(index)));
  document.querySelector("#dialog-close").addEventListener("click", () => photoDialog.close());
  document.querySelector("#photo-prev").addEventListener("click", () => renderPhoto(activePhoto - 1));
  document.querySelector("#photo-next").addEventListener("click", () => renderPhoto(activePhoto + 1));
  photoDialog.addEventListener("click", (event) => { if (event.target === photoDialog) photoDialog.close(); });
  photoDialog.addEventListener("keydown", (event) => { if (event.key === "ArrowLeft") renderPhoto(activePhoto - 1); if (event.key === "ArrowRight") renderPhoto(activePhoto + 1); });
  loadLetter();
})();
