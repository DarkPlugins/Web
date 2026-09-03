(() => {
  const notification = document.querySelector("[data-copy-notification]");
  const message = notification?.querySelector("[data-copy-notification-message]");
  let hideTimer;
  let hideAnimationTimer;
  let audioContext;

  const showNotification = (text) => {
    if (!notification) return;

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
    const activeElement = document.activeElement;
    const selection = document.getSelection();
    const selectedRange = selection?.rangeCount ? selection.getRangeAt(0) : null;
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.append(textarea);
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    const copied = document.execCommand("copy");
    textarea.remove();

    if (activeElement instanceof HTMLElement) {
      activeElement.focus({ preventScroll: true });
    }
    if (selection && selectedRange) {
      selection.removeAllRanges();
      selection.addRange(selectedRange);
    }

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

  const copyText = async (text) => {
    if (!text) return false;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // Use the compatibility fallback below when the Clipboard API is unavailable or denied.
    }

    try {
      return fallbackCopy(text);
    } catch {
      return false;
    }
  };

  document.addEventListener("click", async (event) => {
    if (!(event.target instanceof Element)) return;

    const trigger = event.target.closest("[data-copy-text]");
    if (!trigger) return;

    event.preventDefault();
    if (!(await copyText(trigger.dataset.copyText))) return;

    playCopySound();
    const copiedMessage = document.documentElement.lang === "de"
      ? "In die Zwischenablage kopiert"
      : "Copied to clipboard";
    showNotification(copiedMessage);
  });
})();
