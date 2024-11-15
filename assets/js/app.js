document.addEventListener("DOMContentLoaded", function () {
  const elems = document.querySelectorAll(".parallax");
  M.Parallax.init(elems);
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".hero-banner", {
    scale: 0, // Shrinks the banner
    y: "100vh", // Moves the banner to the bottom of the viewport
    scrollTrigger: {
      trigger: ".container", // Start effect when .content comes into view
      start: "top top", // At the top of the .content
      end: "bottom top", // End effect at the bottom of the .content
      scrub: true, // Smooth animation linked to scroll
    },
  });
});
