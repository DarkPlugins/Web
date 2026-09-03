const modal = document.querySelector("[data-project-modal]");
const modalCloseButton = document.querySelector("[data-modal-close]");
const projects = Array.isArray(globalThis.PROJECTS) ? globalThis.PROJECTS : [];
const projectMap = new Map(projects.map((project) => [project.slug, project]));
const isGerman = document.documentElement.lang === "de";
const assetPrefix = isGerman ? "../" : "";
const locale = isGerman ? "de" : "en";
const localeText = {
  en: {
    imageAlt: "Preview image for {title}",
    theme: {
      "Web & Extensions": "Web & Extensions",
      "Minecraft Plugins": "Minecraft Plugins",
      "Prototypes & Hardware": "Prototypes & Hardware",
      "Tools & Analysis": "Tools & Analysis"
    },
    status: {
      finished: "Finished",
      active: "Active Development",
      notReleased: "Not released yet",
      prototype: "Prototype"
    }
  },
  de: {
    imageAlt: "Vorschaubild für {title}",
    theme: {
      "Web & Extensions": "Web & Erweiterungen",
      "Minecraft Plugins": "Minecraft-Plugins",
      "Prototypes & Hardware": "Prototypen & Hardware",
      "Tools & Analysis": "Tools & Analyse"
    },
    status: {
      finished: "Fertiggestellt",
      active: "Aktive Entwicklung",
      notReleased: "Noch nicht veröffentlicht",
      prototype: "Prototyp"
    }
  }
}[locale];
let activeProject = null;
let previousFocus = null;

const modalElements = modal ? {
  theme: modal.querySelector("[data-modal-theme]"),
  status: modal.querySelector("[data-modal-status]"),
  private: modal.querySelector("[data-modal-private]"),
  title: modal.querySelector("[data-modal-title]"),
  description: modal.querySelector("[data-modal-description]"),
  details: modal.querySelector("[data-modal-details]"),
  year: modal.querySelector("[data-modal-year]"),
  skills: modal.querySelector("[data-modal-skills]"),
  link: modal.querySelector("[data-modal-link]"),
  download: modal.querySelector("[data-modal-download]"),
  spigot: modal.querySelector("[data-modal-spigot]"),
  sourceNote: modal.querySelector("[data-modal-source-note]"),
  image: modal.querySelector("[data-modal-image]")
} : null;

const projectText = (project, field) => {
  if (locale === "de") return project[`${field}De`] ?? project[field];
  return project[field];
};

const projectSkills = (project) => locale === "de"
  ? project.skillsDe ?? project.skills
  : project.skills;

const translatedTheme = (theme) => localeText.theme[theme] ?? theme;

const statusMarkup = (project) => {
  const statuses = project.statuses ?? [{ key: project.status, className: project.statusClass }];
  return statuses
    .map((status) => {
      const label = localeText.status[status.key] ?? status.label ?? status.key ?? status.className;
      return `
        <span class="project-status project-status--${status.className}">
          <span class="project-status__dot" aria-hidden="true"></span>
          ${label}
        </span>`;
    })
    .join("");
};

const assetPath = (path) => `${assetPrefix}${path}`;

function openProject(project) {
  if (!modal || !modalElements) return;

  if (modal.hidden) {
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  }

  activeProject = project;
  modalElements.theme.textContent = translatedTheme(project.theme);
  modalElements.status.innerHTML = statusMarkup(project);
  modalElements.private.hidden = !project.sourcePrivate;
  modalElements.title.textContent = project.title;
  modalElements.description.textContent = projectText(project, "description");
  modalElements.details.textContent = projectText(project, "details");
  modalElements.year.textContent = project.year;
  modalElements.skills.innerHTML = projectSkills(project).map((skill) => `<li>${skill}</li>`).join("");
  modalElements.link.hidden = !project.href;
  if (project.href) modalElements.link.href = project.href;
  modalElements.download.hidden = !project.download;
  if (project.download) {
    modalElements.download.href = project.download;
    modalElements.download.download = `${project.slug}.zip`;
  }
  modalElements.spigot.hidden = !project.spigotHref;
  if (project.spigotHref) modalElements.spigot.href = project.spigotHref;
  modalElements.sourceNote.hidden = project.sourceAvailable !== false;
  modalElements.image.src = assetPath(project.image);
  modalElements.image.alt = localeText.imageAlt.replace("{title}", project.title);
  modal.dataset.theme = project.theme;
  modal.hidden = false;
  document.documentElement.classList.add("modal-open");
  document.body.classList.add("modal-open");
  modalCloseButton?.focus({ preventScroll: true });
}

function closeProject() {
  if (!modal || modal.hidden) return;

  modal.hidden = true;
  document.documentElement.classList.remove("modal-open");
  document.body.classList.remove("modal-open");
  activeProject = null;
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#home`);
  document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" });
  previousFocus?.focus({ preventScroll: true });
  previousFocus = null;
}

function syncProjectFromHash() {
  let slug = window.location.hash.slice(1);
  try {
    slug = decodeURIComponent(slug);
  } catch {
    slug = "";
  }

  const project = projectMap.get(slug);
  if (project) {
    openProject(project);
  } else if (modal && !modal.hidden) {
    modal.hidden = true;
    document.documentElement.classList.remove("modal-open");
    document.body.classList.remove("modal-open");
    activeProject = null;
    previousFocus?.focus({ preventScroll: true });
    previousFocus = null;
  }
}

modalCloseButton?.addEventListener("click", closeProject);
window.addEventListener("hashchange", syncProjectFromHash);
document.addEventListener("keydown", (event) => {
  if (!modal || modal.hidden) return;

  if (event.key === "Escape") {
    closeProject();
    return;
  }

  if (event.key !== "Tab") return;

  const focusableElements = Array.from(modal.querySelectorAll(
    "button:not([hidden]), a[href]:not([hidden]), [tabindex]:not([tabindex=\"-1\"]):not([hidden])"
  ));
  if (!focusableElements.length) return;

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstFocusable) {
    event.preventDefault();
    lastFocusable.focus();
  } else if (!event.shiftKey && document.activeElement === lastFocusable) {
    event.preventDefault();
    firstFocusable.focus();
  }
});

syncProjectFromHash();
