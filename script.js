const ctaButtons = document.querySelectorAll("[data-scroll-target]");

ctaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const section = document.querySelector(`#${button.dataset.scrollTarget}`);

    section?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});
