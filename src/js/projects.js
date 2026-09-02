const projectRoot = document.querySelector("[data-project-groups]");
const projectsIndex = document.querySelector(".projects-index");
const firstSlide = projectRoot?.closest(".project-slide");
const modal = document.querySelector("[data-project-modal]");
const modalClose = document.querySelector("[data-modal-close]");
const projectMap = new Map(window.PROJECTS.map((project) => [project.slug, project]));

const groups = window.PROJECTS.reduce((result, project) => {
  const group = result.get(project.theme) ?? [];
  group.push(project);
  result.set(project.theme, group);
  return result;
}, new Map());

const themeGroups = Array.from(groups.entries());
let activeProject = null;

const translate = (key, fallback, variables) => window.i18n?.t(key, fallback, variables) ?? fallback;
const projectText = (project, field) => window.i18n?.projectText(project, field) ?? project[field];
const projectSkills = (project) => window.i18n?.projectSkills(project) ?? project.skills;
const translatedTheme = (theme) => window.i18n?.themeText(theme) ?? theme;

const statusMarkup = (project) => {
  const statuses = project.statuses ?? [{ key: project.status, className: project.statusClass }];
  return statuses.map((status) => {
    const fallback = status.label ?? status.key ?? status.className;
    const label = window.i18n?.statusText(status.key, fallback) ?? fallback;
    return `<span class="project-status project-status--${status.className}"><span class="project-status__dot" aria-hidden="true"></span>${label}</span>`;
  }).join("");
};

const createProjectGroup = ([theme, projects]) => {
  const section = document.createElement("section");
  section.className = "project-group";
  section.innerHTML = `<div class="project-group__heading"><p class="section-label">${translate("archive.theme", "Theme")}</p><h2>${translatedTheme(theme)}</h2></div><div class="project-list"></div>`;

  const list = section.querySelector(".project-list");
  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-tile";
    card.innerHTML = `
      <img src="src/img/pfi/original.png" alt="${translate("archive.projectImageAlt", "Placeholder image for {title}", { title: project.title })}">
      <div class="project-tile__badges">
        ${statusMarkup(project)}
        ${project.sourcePrivate ? `<span class="project-privacy">${translate("archive.privateSource", "Source code private")}</span>` : ""}
      </div>
      <div class="project-tile__content">
        <strong>${project.title}</strong>
        <small>${projectSkills(project).join(" · ")}</small>
        <div class="project-tile__actions">
          <a class="project-tile__button" href="#${project.slug}">${translate("archive.viewProject", "View project")}</a>
        </div>
      </div>`;
    list.append(card);
  });

  return section;
};

const renderProjectGroups = () => {
  projectRoot.replaceChildren();
  projectsIndex.querySelectorAll(".project-slide:not(.project-slide--overview)").forEach((slide) => slide.remove());

  for (let index = 0; index < themeGroups.length; index += 2) {
    const slide = index === 0 ? firstSlide : document.createElement("section");
    const slideGroups = index === 0 ? projectRoot : document.createElement("div");

    if (index > 0) {
      slide.className = "project-slide";
      slide.setAttribute("aria-label", translate("archive.slideAria", "Projects {number}", { number: Math.floor(index / 2) + 1 }));
      slideGroups.className = "project-slide__groups project-groups";
      slide.append(slideGroups);
      projectsIndex.append(slide);
    }

    slideGroups.append(...themeGroups.slice(index, index + 2).map(createProjectGroup));
  }
};

function openProject(project) {
  const modalStatus = modal.querySelector("[data-modal-status]");
  const modalPrivate = modal.querySelector("[data-modal-private]");
  const modalLink = modal.querySelector("[data-modal-link]");
  const modalDownload = modal.querySelector("[data-modal-download]");
  const modalSpigot = modal.querySelector("[data-modal-spigot]");
  const modalSourceNote = modal.querySelector("[data-modal-source-note]");

  activeProject = project;
  modal.querySelector("[data-modal-theme]").textContent = translatedTheme(project.theme);
  modalStatus.innerHTML = statusMarkup(project);
  modalPrivate.hidden = !project.sourcePrivate;
  modal.querySelector("[data-modal-title]").textContent = project.title;
  modal.querySelector("[data-modal-description]").textContent = projectText(project, "description");
  modal.querySelector("[data-modal-details]").textContent = projectText(project, "details");
  modal.querySelector("[data-modal-year]").textContent = project.year;
  modal.querySelector("[data-modal-skills]").innerHTML = projectSkills(project).map((skill) => `<li>${skill}</li>`).join("");
  modalLink.hidden = !project.href;
  if (project.href) modalLink.href = project.href;
  modalDownload.hidden = !project.download;
  if (project.download) {
    modalDownload.href = project.download;
    modalDownload.download = `${project.slug}.zip`;
  }
  modalSpigot.hidden = !project.spigotHref;
  if (project.spigotHref) modalSpigot.href = project.spigotHref;
  modalSourceNote.hidden = project.sourceAvailable !== false;
  modal.querySelector("[data-modal-image]").src = "src/img/pfi/original.png";
  modal.querySelector("[data-modal-image]").alt = translate("archive.projectImageAlt", "Placeholder image for {title}", { title: project.title });
  modal.dataset.theme = project.theme;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modalClose.focus();
}

function closeProject() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  activeProject = null;
  history.replaceState(null, "", "projects.html#home");
  document.querySelector("#home").scrollIntoView({ behavior: "smooth" });
}

function syncProjectFromHash() {
  const slug = location.hash.slice(1);
  const project = projectMap.get(slug);
  if (project) {
    openProject(project);
  } else if (!modal.hidden) {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    activeProject = null;
  }
}

renderProjectGroups();
modalClose.addEventListener("click", closeProject);
window.addEventListener("hashchange", syncProjectFromHash);
window.addEventListener("languagechange", () => {
  renderProjectGroups();
  if (!modal.hidden && activeProject) openProject(activeProject);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeProject();
});

syncProjectFromHash();
