document.addEventListener("DOMContentLoaded", () => {
  initDynamicYear();
  initSmoothScrolling();
  initImageLightbox();
  initScrollRevealAnimations();
  initBackToTopButton();
  initActiveNavigation();
  initTableEnhancements();
});

function initDynamicYear() {
  const spans = document.querySelectorAll("footer span");
  const currentYear = String(new Date().getFullYear());
  spans.forEach((span) => {
    if (/^20\d{2}$/.test(span.textContent.trim())) span.textContent = currentYear;
  });
}

function initSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.pageYOffset - 80,
        behavior: "smooth",
      });
    });
  });
}

function initImageLightbox() {
  const images = document.querySelectorAll(".media img, .bike-row img, .model-grid img");
  if (!images.length) return;

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML =
    '<button type="button" class="modal-close" aria-label="Close modal">&times;</button>' +
    '<img class="modal-content" alt="Enlarged bike image" />';
  document.body.appendChild(modal);

  const modalImg = modal.querySelector(".modal-content");
  const closeBtn = modal.querySelector(".modal-close");

  images.forEach((img) => {
    if (img.closest(".banner")) return;
    img.style.cursor = "zoom-in";
    img.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("active");
      modalImg.src = img.currentSrc || img.src;
      modalImg.alt = img.alt || "Bike image";
      document.body.style.overflow = "hidden";
    });
  });

  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    modalImg.removeAttribute("src");
  };

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
  });
}

function initScrollRevealAnimations() {
  const items = document.querySelectorAll(".card, figure, .banner, table");
  if (!items.length) return;

  items.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => observer.observe(el));
}

function initBackToTopButton() {
  if (document.querySelector(".back-to-top")) return;

  const btn = document.createElement("button");
  btn.className = "back-to-top";
  btn.type = "button";
  btn.setAttribute("aria-label", "Back to top");
  btn.textContent = "↑";
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.pageYOffset > 300);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initActiveNavigation() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

function initTableEnhancements() {
  const tables = document.querySelectorAll("table");
  tables.forEach((table) => {
    table.querySelectorAll("tbody tr").forEach((row) => {
      const link = row.querySelector("a");
      if (!link) return;
      row.style.cursor = "pointer";
      row.addEventListener("click", (e) => {
        if (e.target.tagName !== "A") link.click();
      });
    });
  });
}

