if ("scrollRestoration" in history) history.scrollRestoration = "manual";

const scrollToHash = (behavior = "auto") => {
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!id) return;

  const target = document.getElementById(id);
  if (!target) return;

  target.scrollIntoView({ behavior, block: "start", inline: "nearest" });
};

window.addEventListener("hashchange", () => scrollToHash("smooth"));
window.addEventListener("load", () => {
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
