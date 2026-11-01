const opening = document.querySelector(".opening");
const openLetterButton = document.querySelector("#open-letter");
const birthdayLetter = document.querySelector("#birthday-letter");
const memoriesSection = document.querySelector("#memories");
const finaleSection = document.querySelector("#finale");
const envelopeWrap = document.querySelector(".envelope-wrap");
const gameInstructions = document.querySelector("#game-instructions");
const gameFeedback = document.querySelector("#game-feedback");
const unlockCodeInput = document.querySelector("#unlock-code");
const photoGalleries = document.querySelectorAll(".photo-gallery");
const photoViewer = document.querySelector("#photo-viewer");
const photoViewerImage = document.querySelector("#photo-viewer-image");
const photoViewerCaption = document.querySelector("#photo-viewer-caption");
const photoViewerClose = document.querySelector(".photo-viewer-close");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let secretCodeInput = "";
let lastPointerPosition = null;
let gameUnlocked = false;

function moveEnvelopeAheadOfPointer(event) {
  if (gameUnlocked || opening.classList.contains("is-open") || event.pointerType === "touch") return;

  const openingBounds = opening.getBoundingClientRect();
  const envelopeBounds = openLetterButton.getBoundingClientRect();
  const pointerX = event.clientX - openingBounds.left;
  const pointerY = event.clientY - openingBounds.top;
  let directionX = 0.6;
  let directionY = -0.8;

  if (lastPointerPosition) {
    const deltaX = event.clientX - lastPointerPosition.x;
    const deltaY = event.clientY - lastPointerPosition.y;
    const distance = Math.hypot(deltaX, deltaY);

    if (distance > 0) {
      directionX = deltaX / distance;
      directionY = deltaY / distance;
    }
  }

  lastPointerPosition = { x: event.clientX, y: event.clientY };

  if (!openLetterButton.classList.contains("is-dodging")) {
    const buttonX = envelopeBounds.left - openingBounds.left;
    const buttonY = envelopeBounds.top - openingBounds.top;

    opening.append(openLetterButton);
    openLetterButton.classList.add("is-dodging");
    openLetterButton.style.left = `${buttonX}px`;
    openLetterButton.style.top = `${buttonY}px`;
    gameFeedback.textContent = "Quick! It's trying to get away.";
  }

  const buttonWidth = openLetterButton.offsetWidth;
  const buttonHeight = openLetterButton.offsetHeight;
  const aheadDistance = 115;
  const margin = 12;
  const maxX = Math.max(margin, opening.clientWidth - buttonWidth - margin);
  const maxY = Math.max(margin, opening.clientHeight - buttonHeight - margin);
  const targetX = Math.min(maxX, Math.max(margin, pointerX + directionX * aheadDistance - buttonWidth / 2));
  const targetY = Math.min(maxY, Math.max(margin, pointerY + directionY * aheadDistance - buttonHeight / 2));

  openLetterButton.style.left = `${targetX}px`;
  openLetterButton.style.top = `${targetY}px`;
}

opening.addEventListener("pointermove", moveEnvelopeAheadOfPointer);
opening.addEventListener("pointerleave", () => {
  lastPointerPosition = null;
});

function unlockGame() {
  if (gameUnlocked) return;

  gameUnlocked = true;
  opening.classList.add("is-unlocked");
  envelopeWrap.prepend(openLetterButton);
  openLetterButton.classList.remove("is-dodging");
  openLetterButton.classList.add("is-unlocked");
  openLetterButton.style.removeProperty("left");
  openLetterButton.style.removeProperty("top");
  unlockCodeInput.disabled = true;
  gameInstructions.textContent = "The letter has stopped running. It's all yours ♡";
  gameFeedback.textContent = "Secret code accepted!";
}

unlockCodeInput.addEventListener("input", () => {
  if (unlockCodeInput.value === "211") {
    unlockGame();
  } else if (unlockCodeInput.value.length === 3) {
    gameFeedback.textContent = "Not quite. Give it another try.";
  }
});

document.addEventListener("keydown", (event) => {
  if (gameUnlocked || opening.classList.contains("is-open") || event.target === unlockCodeInput || event.ctrlKey || event.metaKey || event.altKey) return;
  if (!/^\d$/.test(event.key)) {
    secretCodeInput = "";
    return;
  }

  secretCodeInput = `${secretCodeInput}${event.key}`.slice(-3);
  if (secretCodeInput !== "211") return;

  unlockGame();
});

openLetterButton.addEventListener("click", () => {
  if (!gameUnlocked || opening.classList.contains("is-open")) return;

  opening.classList.add("is-open");
  openLetterButton.setAttribute("aria-expanded", "true");
  birthdayLetter.setAttribute("aria-hidden", "false");
  memoriesSection.hidden = false;
  finaleSection.hidden = false;
  observeMemories();
  observeFinale();
});

photoGalleries.forEach((gallery) => {
  const frameButton = gallery.querySelector(".photo-frame");
  const photoStack = gallery.querySelector(".photo-stack");

  const revealPhotoStack = () => {
    gallery.classList.remove("is-collapsed");
    photoStack.inert = false;
    photoStack.setAttribute("aria-hidden", "false");
  };

  const hidePhotoStack = () => {
    photoStack.inert = true;
    photoStack.setAttribute("aria-hidden", "true");
  };

  gallery.querySelectorAll(".photo-card").forEach((photoCard) => {
    photoCard.addEventListener("click", () => {
      photoViewerImage.src = photoCard.dataset.photoSrc;
      photoViewerImage.alt = photoCard.dataset.photoAlt;
      photoViewerCaption.textContent = photoCard.dataset.photoAlt;
      photoViewer.showModal();
    });
  });

  gallery.addEventListener("pointerenter", () => {
    revealPhotoStack();
  });

  gallery.addEventListener("pointerleave", () => {
    if (gallery.classList.contains("is-expanded") || gallery.contains(document.activeElement)) return;
    hidePhotoStack();
  });

  gallery.addEventListener("focusin", () => {
    revealPhotoStack();
  });

  frameButton.addEventListener("click", () => {
    const expanded = gallery.classList.toggle("is-expanded");
    gallery.classList.toggle("is-collapsed", !expanded);
    frameButton.setAttribute("aria-expanded", String(expanded));
    if (expanded) {
      photoStack.inert = false;
      photoStack.setAttribute("aria-hidden", "false");
    } else {
      hidePhotoStack();
    }
  });

  frameButton.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !gallery.classList.contains("is-expanded")) return;

    gallery.classList.remove("is-expanded");
    gallery.classList.add("is-collapsed");
    frameButton.setAttribute("aria-expanded", "false");
    hidePhotoStack();
  });
});

photoViewerClose.addEventListener("click", () => {
  photoViewer.close();
});

photoViewer.addEventListener("click", (event) => {
  if (event.target === photoViewer) photoViewer.close();
});

photoViewer.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  event.preventDefault();
  photoViewer.close();
});

function typeMessage(element) {
  const message = element.dataset.message;

  if (!message) return;

  if (reducedMotion) {
    element.textContent = message;
    element.classList.add("is-done");
    return;
  }

  let index = 0;
  const step = () => {
    element.textContent = message.slice(0, index);
    index += 2;

    if (index <= message.length) {
      window.setTimeout(step, 28);
    } else {
      element.textContent = message;
      element.classList.add("is-done");
    }
  };

  step();
}

function observeMemories() {
  const memoryCards = document.querySelectorAll(".memory");

  if (!("IntersectionObserver" in window)) {
    memoryCards.forEach((card) => {
      card.classList.add("is-visible");
      typeMessage(card.querySelector(".typewriter"));
    });
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      typeMessage(entry.target.querySelector(".typewriter"));
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.35 });

  memoryCards.forEach((card) => observer.observe(card));
}

function observeFinale() {
  if (!("IntersectionObserver" in window)) {
    finaleSection.classList.add("is-visible");
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;

    finaleSection.classList.add("is-visible");
    currentObserver.disconnect();
  }, { threshold: 0.2 });

  observer.observe(finaleSection);
}
