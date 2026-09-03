(() => {
  const preloader = document.querySelector("[data-preloader]");
  if (!preloader) return;

  const criticalSources = [
    "src/img/logo.webp",
    "src/img/logo128.webp",
    "src/img/pfi/01.webp",
    "src/img/pfi/02.webp",
    "src/img/pfi/03.webp",
    "src/img/pfi/04.webp",
    "src/img/pfi/05.webp",
    "src/img/pfi/06.webp",
    "src/img/pfi/07.webp"
  ];
  const pageSources = Array.from(document.images)
    .filter((image) => image.loading !== "lazy")
    .map((image) => image.currentSrc || image.src)
    .filter(Boolean);
  const sources = [...new Set([...criticalSources, ...pageSources])];

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
