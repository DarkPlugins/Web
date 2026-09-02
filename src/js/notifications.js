(() => {
  const notification = document.querySelector("[data-copy-notification]");
  const message = notification?.querySelector("[data-copy-notification-message]");
  let hideTimer;
  let hideAnimationTimer;
  let audioContext;

  if (!notification) return;

  const showNotification = (text) => {
    if (message) message.textContent = text;
    window.clearTimeout(hideTimer);
    window.clearTimeout(hideAnimationTimer);
    notification.hidden = false;
    requestAnimationFrame(() => notification.classList.add("is-visible"));
    hideTimer = window.setTimeout(() => {
      notification.classList.remove("is-visible");
      hideAnimationTimer = window.setTimeout(() => {
        notification.hidden = true;
      }, 240);
    }, 2800);
  };

  const fallbackCopy = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  };

  const playCopySound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      audioContext ??= new AudioContext();
      if (audioContext.state === "suspended") void audioContext.resume();
      const start = audioContext.currentTime;
      const notes = [659.25, 880];

      notes.forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const noteStart = start + index * .08;

        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0, noteStart);
        gain.gain.linearRampToValueAtTime(.045, noteStart + .015);
        gain.gain.exponentialRampToValueAtTime(.001, noteStart + .18);
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        oscillator.start(noteStart);
        oscillator.stop(noteStart + .2);
      });
    } catch {
      audioContext = null;
    }
  };

  document.querySelectorAll("[data-copy-text]").forEach((trigger) => {
    trigger.addEventListener("click", async (event) => {
      event.preventDefault();
      const text = trigger.dataset.copyText;
      let copied = false;

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          copied = true;
        } else {
          copied = fallbackCopy(text);
        }
      } catch {
        copied = fallbackCopy(text);
      }

      if (copied) {
        playCopySound();
        showNotification(window.translations?.t("notification.copied", "Copied to clipboard") ?? "Copied to clipboard");
      }
    });
  });
})();
