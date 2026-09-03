const projectGroupsRoot = document.querySelector("[data-project-groups]");
const projectsPage = document.querySelector(".projects-index");
const overviewSlide = projectGroupsRoot?.closest(".project-slide");
const modal = document.querySelector("[data-project-modal]");
const modalCloseButton = document.querySelector("[data-modal-close]");
const projects = Array.isArray(globalThis.PROJECTS) ? globalThis.PROJECTS : [];
const projectMap = new Map(projects.map((project) => [project.slug, project]));

const projectsByTheme = projects.reduce((result, project) => {
  const group = result.get(project.theme) ?? [];
  group.push(project);
  result.set(project.theme, group);
  return result;
}, new Map());

const themeGroupEntries = Array.from(projectsByTheme.entries());
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

const translate = (key, fallback, variables) => window.translations?.t(key, fallback, variables) ?? fallback;
const projectText = (project, field) => window.translations?.projectText(project, field) ?? project[field];
const projectSkills = (project) => window.translations?.projectSkills(project) ?? project.skills;
const translatedTheme = (theme) => window.translations?.themeText(theme) ?? theme;

const statusMarkup = (project) => {
  const statuses = project.statuses ?? [{ key: project.status, className: project.statusClass }];
  return statuses
    .map((status) => {
      const fallback = status.label ?? status.key ?? status.className;
      const label = window.translations?.statusText(status.key, fallback) ?? fallback;
      return `
        <span class="project-status project-status--${status.className}">
          <span class="project-status__dot" aria-hidden="true"></span>
          ${label}
        </span>`;
    })
    .join("");
};

const createProjectGroup = ([theme, projects]) => {
  const section = document.createElement("section");
  section.className = "project-group";
  section.innerHTML = `
    <div class="project-group__heading">
      <p class="section-label">${translate("archive.theme", "Theme")}</p>
      <h2>${translatedTheme(theme)}</h2>
    </div>
    <div class="project-list"></div>`;

  const list = section.querySelector(".project-list");
  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-tile";
    card.innerHTML = `
      <a class="project-tile__image-link" href="#${project.slug}" aria-haspopup="dialog" aria-label="${translate("archive.viewProject", "View project")}: ${project.title}">
        <img src="${project.image}" alt="${translate("archive.projectImageAlt", "Preview image for {title}", { title: project.title })}" loading="lazy" decoding="async">
      </a>
      <div class="project-tile__badges">
        ${statusMarkup(project)}
        ${project.sourcePrivate ? `<span class="project-privacy">${translate("archive.privateSource", "Source code private")}</span>` : ""}
      </div>
      <div class="project-tile__content">
        <strong>${project.title}</strong>
        <small>${projectSkills(project).join(" · ")}</small>
        <div class="project-tile__actions">
          <a class="project-tile__button" href="#${project.slug}" aria-haspopup="dialog">${translate("archive.viewProject", "View project")}</a>
        </div>
      </div>`;
    list.append(card);
  });

  return section;
};

const renderProjectGroups = () => {
  if (!projectGroupsRoot || !projectsPage || !overviewSlide) return;

  projectGroupsRoot.replaceChildren();
  projectsPage.querySelectorAll(".project-slide:not(.project-slide--overview)").forEach((slide) => slide.remove());

  for (let index = 0; index < themeGroupEntries.length; index += 2) {
    const slide = index === 0 ? overviewSlide : document.createElement("section");
    const slideGroups = index === 0 ? projectGroupsRoot : document.createElement("div");

    if (index > 0) {
      slide.className = "project-slide";
      slide.setAttribute(
        "aria-label",
        translate("archive.slideAria", "Projects {number}", { number: Math.floor(index / 2) + 1 })
      );
      slideGroups.className = "project-slide__groups project-groups";
      slide.append(slideGroups);
      projectsPage.append(slide);
    }

    slideGroups.append(...themeGroupEntries.slice(index, index + 2).map(createProjectGroup));
  }
};

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
  modalElements.image.src = project.image;
  modalElements.image.alt = translate("archive.projectImageAlt", "Preview image for {title}", { title: project.title });
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

if (projectGroupsRoot && projectsPage && overviewSlide && modal) {
  renderProjectGroups();
}

modalCloseButton?.addEventListener("click", closeProject);
window.addEventListener("hashchange", syncProjectFromHash);
window.addEventListener("languagechange", () => {
  renderProjectGroups();
  if (modal && !modal.hidden && activeProject) openProject(activeProject);
});
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
