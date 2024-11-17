document.addEventListener("DOMContentLoaded", function () {
  const side_nav = document.querySelectorAll(".sidenav");
  const parallax = document.querySelectorAll(".parallax");
  const side_nav_instance = M.Sidenav.init(side_nav);
  const parallax_instance = M.Parallax.init(parallax);

  // GSAP Hero Banner Animation
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".hero-banner", {
    scale: 0.5, // Shrinks to 80% of original size
    yPercent: 50, // Moves it upward for parallax
    opacity: 0,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".hero-banner",
      start: "top top", // When the hero is at the top of the viewport
      end: "center top", // When the hero is completely out of view
      scrub: 2, // Smooth scrubbing effect
    },
  });

  gsap.to(".hero-text", {
    opacity: 0, // Fades out the text
    y: 50, // Moves the text up slightly
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".hero-banner",
      start: "top top",
      end: "bottom top",
      scrub: 2,
    },
  });

  gsap.from(".top_border", {
    opacity: 0, // Start invisible
    scale: 0.8, // Start smaller
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".hero-banner",
      start: "center", // Starts when the hero banner is out of view
      scrub: 2, // Smooth transition
    },
  });

  gsap.from(".page-start", {
    opacity: 0, // Start invisible
    scale: 0.8, // Start smaller
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".hero-banner",
      start: "center", // Starts when the hero banner is out of view
      scrub: 2, // Smooth transition
    },
  });
});
