(() => {
  const btn = document.querySelector("[data-action='price']");
  const toast = document.querySelector("[data-toast]");

  if (!btn || !toast) return;

  let timer = null;

  btn.addEventListener("click", () => {
    toast.classList.add("show");
    window.clearTimeout(timer);
    timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
  });
})();

