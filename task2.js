const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const items = Array.from(document.querySelectorAll("[data-parallax]"));

let latestScroll = 0;
let frameRequested = false;

function applyParallax() {
  frameRequested = false;

  if (motionQuery.matches) {
    for (const item of items) {
      item.style.removeProperty("--parallax-shift");
      item.style.removeProperty("--parallax-rotate");
    }
    return;
  }

  for (const item of items) {
    const speed = Number(item.dataset.speed || 0);
    const rotate = Number(item.dataset.rotate || 0);
    item.style.setProperty("--parallax-shift", `${latestScroll * speed}px`);
    item.style.setProperty("--parallax-rotate", `${latestScroll * rotate}deg`);
  }
}

function onScroll() {
  latestScroll = window.scrollY || window.pageYOffset;

  if (!frameRequested) {
    frameRequested = true;
    window.requestAnimationFrame(applyParallax);
  }
}

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);

if (typeof motionQuery.addEventListener === "function") {
  motionQuery.addEventListener("change", onScroll);
} else if (typeof motionQuery.addListener === "function") {
  motionQuery.addListener(onScroll);
}
