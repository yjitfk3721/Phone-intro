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
      threshold: 0.22,
    },
  );

  revealSections.forEach((section) => revealObserver.observe(section));
}
