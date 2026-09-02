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

const statusMarkup = (project) => {
  const statuses = project.statuses ?? [{ label: project.status, className: project.statusClass }];
  return statuses.map((status) => `<span class="project-status project-status--${status.className}"><span class="project-status__dot" aria-hidden="true"></span>${status.label}</span>`).join("");
};

const createProjectGroup = ([theme, projects]) => {
  const section = document.createElement("section");
  section.className = "project-group";
  section.innerHTML = `<div class="project-group__heading"><p class="section-label">Thema</p><h2>${theme}</h2></div><div class="project-list"></div>`;

  const list = section.querySelector(".project-list");
  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-tile";
    card.innerHTML = `
      <img src="src/img/pfi/original.png" alt="Platzhalterbild für ${project.title}">
      <div class="project-tile__badges">
        ${statusMarkup(project)}
        ${project.sourcePrivate ? '<span class="project-privacy">Sourcecode private</span>' : ""}
      </div>
      <div class="project-tile__content">
        <strong>${project.title}</strong>
        <small>${project.skills.join(" · ")}</small>
        <div class="project-tile__actions">
          <a class="project-tile__button" href="#${project.slug}">Projekt ansehen</a>
        </div>
      </div>`;
    list.append(card);
  });

  return section;
};

for (let index = 0; index < themeGroups.length; index += 2) {
  const slide = index === 0 ? firstSlide : document.createElement("section");
  const slideGroups = index === 0 ? projectRoot : document.createElement("div");

  if (index > 0) {
    slide.className = "project-slide";
    slide.setAttribute("aria-label", `Projekte ${Math.floor(index / 2) + 1}`);
    slideGroups.className = "project-slide__groups project-groups";
    slide.append(slideGroups);
    projectsIndex.append(slide);
  }

  slideGroups.append(...themeGroups.slice(index, index + 2).map(createProjectGroup));
}

function openProject(project) {
  const modalStatus = modal.querySelector("[data-modal-status]");
  const modalPrivate = modal.querySelector("[data-modal-private]");
  const modalLink = modal.querySelector("[data-modal-link]");
  const modalDownload = modal.querySelector("[data-modal-download]");
  const modalSpigot = modal.querySelector("[data-modal-spigot]");
  const modalSourceNote = modal.querySelector("[data-modal-source-note]");

  modal.querySelector("[data-modal-theme]").textContent = project.theme;
  modalStatus.innerHTML = statusMarkup(project);
  modalPrivate.hidden = !project.sourcePrivate;
  modal.querySelector("[data-modal-title]").textContent = project.title;
  modal.querySelector("[data-modal-description]").textContent = project.description;
  modal.querySelector("[data-modal-details]").textContent = project.details;
  modal.querySelector("[data-modal-year]").textContent = project.year;
  modal.querySelector("[data-modal-skills]").innerHTML = project.skills.map((skill) => `<li>${skill}</li>`).join("");
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
  modal.querySelector("[data-modal-image]").alt = `Platzhalterbild für ${project.title}`;
  modal.dataset.theme = project.theme;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modalClose.focus();
}

function closeProject() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  history.replaceState(null, "", "projects.html#start");
  document.querySelector("#start").scrollIntoView({ behavior: "smooth" });
}

function syncProjectFromHash() {
  const slug = location.hash.slice(1);
  const project = projectMap.get(slug);
  if (project) {
    openProject(project);
  } else if (!modal.hidden) {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }
}

modalClose.addEventListener("click", closeProject);
window.addEventListener("hashchange", syncProjectFromHash);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeProject();
});

syncProjectFromHash();
