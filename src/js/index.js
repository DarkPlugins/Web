if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";

const isHomePage = !document.body.classList.contains("projects-page");
const navigationEntry = performance.getEntriesByType("navigation")[0];
const isReload = navigationEntry?.type === "reload" || performance.navigation?.type === 1;

const getHashId = () => {
  const hash = window.location.hash.slice(1);
  if (!hash) return "";

  try {
    return decodeURIComponent(hash);
  } catch {
    return "";
  }
};

const scrollToHash = (behavior = "auto") => {
  const id = getHashId();
  if (!id) return;

  const target = document.getElementById(id);
  if (!target) return;

  target.scrollIntoView({ behavior, block: "start", inline: "nearest" });
};

const resetHomePosition = () => {
  if (!isHomePage || !isReload) return;

  if (window.location.hash && window.location.hash !== "#home") {
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#home`);
  }
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
};

resetHomePosition();

window.addEventListener("hashchange", () => scrollToHash("auto"));
window.addEventListener("load", () => {
  if (isReload) {
    resetHomePosition();
    return;
  }

  window.setTimeout(() => scrollToHash("auto"), 0);
}, { once: true });

const projectList = document.querySelector("[data-project-nav-list]");
const projectToggle = document.querySelector("[data-project-nav-toggle]");
const menu = document.querySelector(".menu");
const menuSummary = menu?.querySelector("summary");
const languageSelect = document.querySelector("[data-language-select]");
const currentLanguage = document.documentElement.lang === "de" ? "de" : "en";
const languageCookieName = "de.darkplugins.cookie.language";

const titleShine = document.querySelector("[data-title-shine]");

if (titleShine) {
  const titleText = titleShine.textContent;
  const titleLetters = Array.from(titleText).map((character) => {
    const letter = document.createElement("span");
    letter.className = "page-title__letter";
    letter.textContent = character === " " ? "\u00a0" : character;
    return letter;
  });

  titleShine.replaceChildren(...titleLetters);

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const letterDelay = 240;
    const shineDuration = 620;
    const repeatInterval = 10000;

    const runTitleShine = () => {
      titleLetters.forEach((letter, index) => {
        window.setTimeout(() => {
          letter.classList.add("is-shining");
          window.setTimeout(() => letter.classList.remove("is-shining"), shineDuration);
        }, index * letterDelay);
      });

      window.setTimeout(runTitleShine, repeatInterval);
    };

    window.setTimeout(runTitleShine, 1200);
  }
}

const typingText = document.querySelector("[data-typing-text]");

if (typingText && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const text = typingText.textContent;
  const typingSpeed = 70;
  const deletingSpeed = 32;
  const holdDuration = 5000;
  const restartPause = 450;

  const runTypingCycle = () => {
    let characterIndex = 0;
    typingText.textContent = "";

    const typeNextCharacter = () => {
      if (characterIndex < text.length) {
        characterIndex += 1;
        typingText.textContent = text.slice(0, characterIndex);
        window.setTimeout(typeNextCharacter, typingSpeed);
        return;
      }

      window.setTimeout(deleteNextCharacter, holdDuration);
    };

    const deleteNextCharacter = () => {
      if (characterIndex > 0) {
        characterIndex -= 1;
        typingText.textContent = text.slice(0, characterIndex);
        window.setTimeout(deleteNextCharacter, deletingSpeed);
        return;
      }

      window.setTimeout(runTypingCycle, restartPause);
    };

    typeNextCharacter();
  };

  runTypingCycle();
}

if (projectList && projectToggle && Array.isArray(window.PROJECTS)) {
  window.PROJECTS.forEach((project) => {
    const link = document.createElement("a");
    link.href = `projects.html#${project.slug}`;
    link.textContent = project.title;
    projectList.append(link);
  });

  projectToggle.addEventListener("click", () => {
    const isOpen = projectToggle.getAttribute("aria-expanded") === "true";
    projectToggle.setAttribute("aria-expanded", String(!isOpen));
    projectList.hidden = isOpen;
  });
}

if (languageSelect) {
  languageSelect.value = currentLanguage;
  languageSelect.addEventListener("change", (event) => {
    const nextLanguage = event.target.value === "de" ? "de" : "en";
    const pageName = window.location.pathname.endsWith("/")
      ? "index.html"
      : window.location.pathname.split("/").pop() || "index.html";
    const targetPage = nextLanguage === "de" ? `de/${pageName}` : `../${pageName}`;
    const targetUrl = new URL(
      `${targetPage}${window.location.search}${window.location.hash}`,
      window.location.href
    );

    document.cookie = `${languageCookieName}=${nextLanguage}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.assign(targetUrl.href);
  });
}

document.querySelectorAll(".menu nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (link.closest("[data-project-nav-list]")) return;
    link.closest("details")?.removeAttribute("open");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !menu?.open) return;

  menu.removeAttribute("open");
  menuSummary?.focus({ preventScroll: true });
});
