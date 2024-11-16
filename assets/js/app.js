document.addEventListener("DOMContentLoaded", function () {
  // const parallax = document.querySelectorAll(".parallax");
  const side_nav = document.querySelectorAll('.sidenav');
  const side_nav_instance = M.Sidenav.init(side_nav);
  // M.Parallax.init(parallax);
  // gsap.registerPlugin(ScrollTrigger);

  // // Select the target destination
  // const hero = document.querySelector(".hero");
  // const heroRect = hero.getBoundingClientRect();

  // // console.log(heroRect);

  // // Calculate scale and offsets
  // const targetScale = heroRect.width / window.innerWidth; // Shrink proportionally
  // const targetX = heroRect.left - (window.innerWidth / 2 - heroRect.width / 2); // Center horizontally
  // const targetY = heroRect.top - (window.innerHeight / 2 - heroRect.height / 2); // Center vertically

  // // Animate the hero banner
  // gsap.to(".hero-banner", {
  //   scale: targetScale, // Shrinks the image
  //   x: targetX,         // Moves horizontally
  //   y: targetY,         // Moves vertically
  //   scrollTrigger: {
  //     trigger: ".container", // Animation starts when `.container` scrolls into view
  //     start: "top top",      // Starts when `.container` reaches top of the viewport
  //     end: "bottom top",     // Ends when `.container` bottom reaches the top
  //     scrub: true,           // Smooth animation tied to scroll
  //   },
  // });
});