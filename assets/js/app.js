document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".nav-wrapper");
  const carousel = document.querySelectorAll(".carousel");
  const banner = document.querySelector(".hero-banner");
  const navHeight = nav.getBoundingClientRect().height;
  const bannerHeight = banner.getBoundingClientRect().height;
  const heightOffset = 20;

  const side_nav = document.querySelectorAll(".sidenav");
  const parallax = document.querySelectorAll(".parallax");
  const side_nav_instance = M.Sidenav.init(side_nav);
  const parallax_instance = M.Parallax.init(parallax);
  const carousel_instance = M.Carousel.init(carousel, {
    fullWidth: true,
    indicators: true,
  });

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
      end: "bottom top", // When the hero is completely out of view
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

  gsap.from(".reveal-bold", {
    opacity: 0,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".met-wrapper",
      start: "top",
      end: "center",
      scrub: 2,
    },
  });

  gsap.to(".proposal-wrapper", {
    clipPath: "inset(0 0% 0 0%)", // Fully reveals the content
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".proposal-wrapper",
      start: "top 90%", // Animation starts when the wrapper is 80% in view
      end: "top 10%", // Animation completes before the wrapper leaves the viewport
      scrub: 1, // Smoothly ties the animation to the scroll
    },
  });

  const bannerObserver = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (!entry.isIntersecting) {
        nav.style.display = "none";
      } else {
        nav.style.display = "block";
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: `-${bannerHeight - navHeight - heightOffset}px`,
    }
  );

  bannerObserver.observe(banner);
});
