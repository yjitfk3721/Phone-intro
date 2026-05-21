const device = document.querySelector(".device");
const heroStage = document.querySelector(".hero-stage");
const ctaButtons = document.querySelectorAll("[data-scroll-target]");
const revealSections = document.querySelectorAll(".reveal");
const isCaptureMode = new URLSearchParams(window.location.search).get("capture") === "1";

if (isCaptureMode) {
  document.body.classList.add("capture-mode");
}

ctaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const section = document.querySelector(`#${button.dataset.scrollTarget}`);

    section?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateHeroProgress() {
  // Track the document scroll position, not an inner container, for iPhone full-page capture.
  const maxHeroScroll = heroStage.offsetHeight - window.innerHeight;
  const rawProgress = maxHeroScroll > 0 ? window.scrollY / maxHeroScroll : 0;
  const progress = clamp(rawProgress, 0, 1);
  const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

  document.documentElement.style.setProperty("--hero-progress", progress.toFixed(3));
  document.documentElement.style.setProperty("--hero-scale", (1 - 0.052 * eased).toFixed(3));
  document.documentElement.style.setProperty("--hero-translate", `${(-72 * eased).toFixed(1)}px`);
  document.documentElement.style.setProperty("--hero-brightness", (1 + 0.065 * eased).toFixed(3));
  document.documentElement.style.setProperty("--hero-fade-opacity", (0.046 * eased).toFixed(3));
  document.documentElement.style.setProperty("--title-cover-opacity", eased.toFixed(3));
  document.documentElement.style.setProperty("--cue-opacity", (0.72 * (1 - progress)).toFixed(3));
}

if (isCaptureMode) {
  revealSections.forEach((section) => section.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      root: null,
      threshold: 0.28,
    },
  );

  revealSections.forEach((section) => revealObserver.observe(section));
  window.addEventListener("scroll", updateHeroProgress, { passive: true });
  window.addEventListener("resize", updateHeroProgress);
  updateHeroProgress();
}
