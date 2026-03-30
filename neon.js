(() => {
  const isInsideBanner = (img) => Boolean(img.closest(".banner"));

  const imgs = Array.from(document.querySelectorAll(".media img"))
    .filter((img) => !isInsideBanner(img));

  imgs.forEach((img) => {
    img.classList.add("neon-photo");

    img.addEventListener("mouseenter", () => img.classList.add("neon-on"));
    img.addEventListener("mouseleave", () => img.classList.remove("neon-on"));

    img.addEventListener("click", (e) => {
      // allow opening link; just toggle quickly
      img.classList.toggle("neon-on");
      if (img.classList.contains("neon-on")) {
        window.setTimeout(() => img.classList.remove("neon-on"), 1200);
      }
    });
  });
})();

