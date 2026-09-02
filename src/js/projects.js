const projectRoot = document.querySelector("[data-project-groups]");
const modal = document.querySelector("[data-project-modal]");
const modalClose = document.querySelector("[data-modal-close]");
const projectMap = new Map(window.PROJECTS.map((project) => [project.slug, project]));

const groups = window.PROJECTS.reduce((result, project) => {
  const group = result.get(project.theme) ?? [];
  group.push(project);
  result.set(project.theme, group);
  return result;
}, new Map());

groups.forEach((projects, theme) => {
  const section = document.createElement("section");
  section.className = "project-group";
  section.innerHTML = `<p class="section-label">Thema</p><h2>${theme}</h2><div class="project-list"></div>`;

  const list = section.querySelector(".project-list");
  projects.forEach((project) => {
    const link = document.createElement("a");
    link.className = "project-tile";
    link.href = `#${project.slug}`;
    link.innerHTML = `
      <img src="${project.image}" alt="Vorschau von ${project.title}">
      <span class="project-tile__index">${String(window.PROJECTS.indexOf(project) + 1).padStart(2, "0")}</span>
      <span class="project-tile__content">
        <strong>${project.title}</strong>
        <small>${project.skills.join(" · ")}</small>
        <span class="project-tile__cta">Erfahre mehr</span>
      </span>`;
    list.append(link);
  });

  projectRoot.append(section);
});

function openProject(project) {
  modal.querySelector("[data-modal-theme]").textContent = project.theme;
  modal.querySelector("[data-modal-title]").textContent = project.title;
  modal.querySelector("[data-modal-description]").textContent = project.description;
  modal.querySelector("[data-modal-details]").textContent = project.details;
  modal.querySelector("[data-modal-year]").textContent = project.year;
  modal.querySelector("[data-modal-skills]").innerHTML = project.skills.map((skill) => `<li>${skill}</li>`).join("");
  modal.querySelector("[data-modal-link]").href = project.href;
  modal.querySelector("[data-modal-image]").src = project.image;
  modal.querySelector("[data-modal-image]").alt = `Vorschau von ${project.title}`;
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
