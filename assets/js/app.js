document.addEventListener("DOMContentLoaded", function () {
  const side_nav = document.querySelectorAll('.sidenav');
  const parallax = document.querySelectorAll(".parallax");
  const side_nav_instance = M.Sidenav.init(side_nav);
  const parallax_instance = M.Parallax.init(parallax);

   // GSAP Hero Banner Animation
   gsap.registerPlugin(ScrollTrigger);

   gsap.to(".hero-banner", {
     scrollTrigger: {
       trigger: ".hero-banner", // The element that triggers the animation
       start: "top top", // Start the animation when the top of the trigger is at the top of the viewport
       end: "bottom top", // End the animation when the bottom of the trigger hits the top of the viewport
       scrub: true, // Smooth scrubbing effect
     },
     scale: 0.5, // Shrink to 50% of original size
     y: "-50%", // Move upwards towards the center
     ease: "power2.out",
   });
});