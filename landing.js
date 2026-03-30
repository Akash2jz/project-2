(() => {
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasLibs = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
  if (!hasLibs) return;

  gsap.registerPlugin(ScrollTrigger);

  if (typeof Lenis !== "undefined" && !prefersReduced) {
    const lenis = new Lenis({ smoothWheel: true, duration: 1.1 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Hero text + image entry
  gsap.from("[data-hero-title]", { y: 50, opacity: 0, duration: 1.1, ease: "power3.out" });
  gsap.from("[data-hero-sub]", { y: 28, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });
  gsap.from(".actions .btn", { y: 20, opacity: 0, stagger: 0.1, duration: 0.8, delay: 0.35, ease: "power2.out" });

  // Layered parallax
  gsap.to("[data-parallax-bg]", {
    yPercent: -18,
    ease: "none",
    scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: true },
  });

  gsap.to("[data-parallax-fg]", {
    yPercent: -38,
    ease: "none",
    scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: true },
  });

  // Hero bike slight parallax motion
  gsap.to("[data-bike-image]", {
    y: -40,
    scale: 1.04,
    ease: "none",
    scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
  });

  // Pinned cinematic section
  const pinTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".pin-wrap",
      start: "top top",
      end: "+=180%",
      scrub: true,
      pin: "[data-pin-panel]",
    },
  });

  pinTl
    .from("[data-pin-title]", { y: 80, opacity: 0, duration: 1 })
    .from("[data-pin-text]", { y: 60, opacity: 0, duration: 1 }, "<0.2")
    .from("[data-pin-visual]", { scale: 0.88, opacity: 0, rotate: -3, duration: 1.2 }, "<0.1")
    .to("[data-pin-visual]", { y: -24, scale: 1.06, duration: 1.1 }, ">")
    .to("[data-pin-title], [data-pin-text]", { y: -20, opacity: 0.25, duration: 0.8 }, "<");

  // Reveal cards
  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.from(el, {
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 86%" },
    });
  });
})();

