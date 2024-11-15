document.addEventListener("DOMContentLoaded", function () {
  const elems = document.querySelectorAll(".parallax");
  M.Parallax.init(elems);
  gsap.registerPlugin(ScrollTrigger);

  // Get the dimensions of the `.hero` section to align the animation
  const hero = document.querySelector(".hero");
  const heroRect = hero.getBoundingClientRect();

  gsap.to(".hero-banner", {
    scale: heroRect.width / window.innerWidth, // Scale to match the width of `.hero`
    x: heroRect.left - (window.innerWidth / 2 - heroRect.width / 2), // Align horizontally
    y: heroRect.top - (window.innerHeight / 2 - heroRect.height / 2), // Align vertically
    scrollTrigger: {
      trigger: ".container", // Start effect when `.container` is scrolled into view
      start: "top top", // When the top of `.container` reaches the top of the viewport
      end: "bottom bottom", // When the bottom of `.container` reaches the bottom of the viewport
      scrub: true, // Smooth animation linked to scroll
    },
  });
});
