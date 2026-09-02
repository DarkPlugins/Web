if ("scrollRestoration" in history) history.scrollRestoration = "manual";

const isHomePage = !document.body.classList.contains("projects-page");
const navigationEntry = performance.getEntriesByType("navigation")[0];
const isReload = navigationEntry?.type === "reload" || performance.navigation?.type === 1;

const scrollToHash = (behavior = "auto") => {
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!id) return;

  const target = document.getElementById(id);
  if (!target) return;

  target.scrollIntoView({ behavior, block: "start", inline: "nearest" });
};

const resetHomePosition = () => {
  if (!isHomePage || !isReload) return;

  if (window.location.hash && window.location.hash !== "#home") {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}#home`);
  }
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
};

resetHomePosition();

window.addEventListener("hashchange", () => scrollToHash("smooth"));
window.addEventListener("load", () => {
  if (isReload) {
    resetHomePosition();
    return;
  }

  window.setTimeout(() => scrollToHash("auto"), 0);
}, { once: true });

const projectList = document.querySelector("[data-project-nav-list]");
const projectToggle = document.querySelector("[data-project-nav-toggle]");

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

document.querySelectorAll(".menu nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (link.closest("[data-project-nav-list]")) return;
    link.closest("details")?.removeAttribute("open");
  });
});
