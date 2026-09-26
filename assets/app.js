(() => {
  "use strict";

  const opening = document.querySelector("#opening");
  const openButton = document.querySelector("#open-experience");
  const experience = document.querySelector("#experience");
  const audio = document.querySelector("#background-audio");
  const musicButton = document.querySelector("#music-button");
  const musicLabel = document.querySelector("#music-label");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const config = window.LOVE_LETTER_CONFIG || {};
  const audioUrl = typeof config.audioUrl === "string" ? config.audioUrl.trim() : "";

  function setMusicButton(isPlaying) {
    musicButton.setAttribute("aria-pressed", String(isPlaying));
    musicButton.setAttribute("aria-label", isPlaying ? "Pausar música" : "Reproducir música");
    musicLabel.textContent = isPlaying ? "Música" : "Silencio";
  }

  function prepareAudio() {
    if (!audioUrl) return false;
    audio.src = audioUrl;
    audio.volume = 0.72;
    musicButton.hidden = false;
    setMusicButton(false);
    return true;
  }

  function playAudioFromGesture() {
    if (!audio.src) return;
    const playAttempt = audio.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => setMusicButton(false));
    }
  }

  function openExperience() {
    // This runs directly from the tap/click so Safari on iPhone can start audio.
    playAudioFromGesture();
    document.body.classList.add("experience-open");
    experience.removeAttribute("aria-hidden");
    opening.setAttribute("aria-hidden", "true");
    window.setTimeout(() => experience.querySelector("#inicio").focus?.(), 100);
    createPetals();
  }

  function createPetals() {
    if (reducedMotion) return;
    const field = document.querySelector(".petal-field");
    if (!field || field.childElementCount) return;
    const petals = document.createDocumentFragment();
    for (let index = 0; index < 12; index += 1) {
      const petal = document.createElement("span");
      petal.className = "petal";
      petal.style.left = `${(index * 17 + 7) % 100}%`;
      petal.style.top = `${-20 - index * 9}px`;
      petal.style.setProperty("--duration", `${14 + (index % 5) * 3}s`);
      petal.style.setProperty("--drift", `${-85 + (index % 6) * 34}px`);
      petal.style.animationDelay = `${-index * 2.1}s`;
      petals.appendChild(petal);
    }
    field.appendChild(petals);
  }

  prepareAudio();

  openButton.addEventListener("click", openExperience, { once: true });

  musicButton.addEventListener("click", () => {
    if (audio.paused) {
      playAudioFromGesture();
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => setMusicButton(true));
  audio.addEventListener("pause", () => setMusicButton(false));
  audio.addEventListener("error", () => {
    musicButton.hidden = true;
  });

  const revealElements = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -20px" },
    );
    revealElements.forEach((element) => observer.observe(element));
  }
})();
