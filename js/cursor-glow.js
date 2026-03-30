(() => {
  const targets = Array.from(document.querySelectorAll("[data-cursor-glow]"));

  const setPos = (el, clientX, clientY) => {
    const r = el.getBoundingClientRect();
    const x = ((clientX - r.left) / r.width) * 100;
    const y = ((clientY - r.top) / r.height) * 100;
    el.style.setProperty("--glow-x", `${Math.max(0, Math.min(100, x))}%`);
    el.style.setProperty("--glow-y", `${Math.max(0, Math.min(100, y))}%`);
  };

  targets.forEach((el) => {
    // Exclude the front banner image area completely
    if (el.closest(".banner")) return;

    el.classList.add("glow-target", "glow-pop");

    el.addEventListener("pointermove", (e) => setPos(el, e.clientX, e.clientY));
    el.addEventListener("pointerenter", (e) => setPos(el, e.clientX, e.clientY));
  });

  // Also apply to image blocks automatically (except banner)
  Array.from(document.querySelectorAll(".media"))
    .filter((m) => !m.closest(".banner"))
    .forEach((m) => {
      m.classList.add("glow-target");
      m.addEventListener("pointermove", (e) => setPos(m, e.clientX, e.clientY));
      m.addEventListener("pointerenter", (e) => setPos(m, e.clientX, e.clientY));
    });
})();

