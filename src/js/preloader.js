(() => {
  const preloader = document.querySelector("[data-preloader]");
  if (!preloader) return;

  const imageSources = [
    "src/img/logo_large.png",
    "src/img/pfi/01.png",
    "src/img/pfi/02.png",
    "src/img/pfi/03.png",
    "src/img/pfi/04.png",
    "src/img/pfi/05.png",
    "src/img/pfi/06.png",
    "src/img/pfi/07.png",
    "src/img/pfi/original.png",
    "src/img/projects/bg_github.png",
    "src/img/projects/bg_labs.png",
    "src/img/projects/bg_spigotmc.png",
    "src/img/projects/featured_1.png",
    "src/img/projects/featured_2.png",
    "src/img/projects/grs/vl_01.png"
  ];

  const projectImages = Array.isArray(window.PROJECTS)
    ? window.PROJECTS.map((project) => project.image).filter(Boolean)
    : [];
  const pageImages = Array.from(document.images, (image) => image.currentSrc || image.src);
  const sources = [...new Set([...imageSources, ...projectImages, ...pageImages])];

  const waitForImage = (source) => new Promise((resolve) => {
    const image = new Image();
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    image.onload = finish;
    image.onerror = finish;
    image.src = source;
    if (image.complete) finish();
  });

  const waitForPage = new Promise((resolve) => {
    if (document.readyState === "complete") {
      resolve();
      return;
    }

    window.addEventListener("load", resolve, { once: true });
  });

  const minimumDisplayTime = new Promise((resolve) => window.setTimeout(resolve, 420));

  Promise.all([
    waitForPage,
    minimumDisplayTime,
    Promise.all(sources.map(waitForImage))
  ]).then(() => {
    preloader.classList.add("is-ready");
    document.body.classList.remove("is-loading");
    window.setTimeout(() => {
      preloader.hidden = true;
    }, 440);
  });
})();
