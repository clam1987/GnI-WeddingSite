document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".nav-main");
  const nav_item = document.querySelectorAll("nav a[data-target]");
  const mobile_nav_item = document.querySelectorAll(
    "#mobile-demo a[data-target]"
  );
  const carousel = document.querySelectorAll(".carousel");
  const banner = document.querySelector(".hero-banner");
  const navHeight = nav.getBoundingClientRect().height;
  const bannerHeight = banner.getBoundingClientRect().height;
  const heightOffset = 20;
  const toggle_height = window.outerHeight;
  const back_to_top_btn = document.querySelector(".m-backtotop");
  const rsvp_btn = document.querySelector(".m-rsvp");

  const side_nav = document.querySelectorAll(".sidenav");
  const parallax = document.querySelectorAll(".parallax");
  const side_nav_instance = M.Sidenav.init(side_nav);
  const parallax_instance = M.Parallax.init(parallax);
  const carousel_instance = M.Carousel.init(carousel, {
    fullWidth: true,
    indicators: true,
  });

  // GSAP Hero Banner Animation
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  let hasScrolled = false; // Flag to track if user has scrolled
  const body = document.body;

  function disableScroll() {
    console.log("disabled func", hasScrolled);
    body.style.overflow = "hidden";
  }

  function enableScroll() {
    console.log("enabled func", hasScrolled);
    body.style.overflowX = "hidden";
    body.style.overflowY = "scroll";
  }

  // Timeline for the animations
  const timeline = gsap.timeline({
    paused: true,
    onStart: disableScroll, // Disable scrolling when animation starts
    onComplete: enableScroll, // Re-enable scrolling when animation completes
    onReverseComplete: enableScroll, // Re-enable scrolling after reverse animation
  });

  // Hero Banner Fade-Out
  timeline.to(".hero-banner", {
    scale: 0,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
  });

  // Snap to Content Section
  timeline.to(
    document.body,
    {
      scrollTo: { y: ".top_border", autoKill: false }, // Scroll to content section
      duration: 2,
      ease: "power2.inOut",
    },
    "<"
  );

  ScrollTrigger.create({
    trigger: ".top_border",
    start: "top-=5 top", // Trigger when the content section is fully in view
    onEnter: () => {
      if (!timeline.isActive()) {
        console.log("entering");
        timeline.play(); // Play animation to snap to content and hide hero banner
      }
    },
    onEnterBack: () => {
      if (!timeline.isActive()) {
        console.log("enter back");
        timeline.reverse(); // Reverse animation to show hero banner again
      }
    },
    onLeaveBack: () => {
      if (!timeline.isActive()) {
        console.log("leaving back");
        timeline.reverse(); // Ensure hero banner reappears when scrolling up
      }
    },
    onLeave: () => {
      if (!timeline.isActive()) {
        console.log("leaving");
        timeline.play(); // Ensure content snaps into view when scrolling down
      }
    },
  });

  // gsap.to(".hero-banner", {
  //   scale: 0.5, // Shrinks to 80% of original size
  //   yPercent: 50, // Moves it upward for parallax
  //   opacity: 0,
  //   ease: "power1.out",
  //   scrollTrigger: {
  //     trigger: ".hero-banner",
  //     start: "top top", // When the hero is at the top of the viewport
  //     end: "bottom top", // When the hero is completely out of view
  //     scrub: 2, // Smooth scrubbing effect
  //   },
  // });

  // gsap.to(".hero-text", {
  //   opacity: 0, // Fades out the text
  //   y: 50, // Moves the text up slightly
  //   ease: "power1.out",
  //   scrollTrigger: {
  //     trigger: ".hero-banner",
  //     start: "top top",
  //     end: "bottom top",
  //     scrub: 2,
  //   },
  // });

  // gsap.from(".top_border", {
  //   opacity: 0, // Start invisible
  //   scale: 0.8, // Start smaller
  //   ease: "power1.out",
  //   scrollTrigger: {
  //     trigger: ".hero-banner",
  //     start: "center", // Starts when the hero banner is out of view
  //     scrub: 2, // Smooth transition
  //   },
  // });

  // gsap.from(".page-start", {
  //   opacity: 0, // Start invisible
  //   scale: 0.8, // Start smaller
  //   ease: "power1.out",
  //   scrollTrigger: {
  //     trigger: ".hero-banner",
  //     start: "center", // Starts when the hero banner is out of view
  //     scrub: 2, // Smooth transition
  //   },
  // });

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

  document.body.addEventListener("scroll", () => {
    if (!hasScrolled) {
      hasScrolled = true;
      timeline.play(); // Start the animation
    }

    if (document.body.scrollTop > toggle_height) {
      back_to_top_btn.classList.add("active");
      rsvp_btn.classList.add("active");
    } else {
      back_to_top_btn.classList.remove("active");
      rsvp_btn.classList.remove("active");
    }
  });

  nav_item.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(item.dataset.target);

      gsap.to(document.body, {
        scrollTo: { y: target, offsetY: 50 }, // Adjust offsetY for fixed headers if needed
        duration: 1, // Duration of the scroll
        ease: "power2.inOut", // Smooth scrolling effect
        onStart: () => {
          // Optional: Highlight the target section (animation, background, etc.)
          gsap.fromTo(
            target,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        },
      });
    });
  });

  mobile_nav_item.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(item.dataset.target);

      gsap.to(document.body, {
        scrollTo: { y: target, offsetY: 50 }, // Adjust offsetY for fixed headers if needed
        duration: 1, // Duration of the scroll
        ease: "power2.inOut", // Smooth scrolling effect
        onStart: () => {
          // Optional: Highlight the target section (animation, background, etc.)
          gsap.fromTo(
            target,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        },
      });
    });
  });

  back_to_top_btn.addEventListener("click", () => {
    gsap.to(document.body, {
      scrollTo: { y: 1, autoKill: true },
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(".hero-banner", {
          scale: 1,
          yPercent: 0,
          opacity: 1,
        });
        gsap.set(".hero-text", {
          scale: 1,
          yPercent: 0,
          opacity: 1,
        });

        ScrollTrigger.refresh();
      },
    });
  });

  const bannerObserver = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (!entry.isIntersecting) {
        // nav.classList.add("hidden");
      } else {
        // nav.classList.remove("hidden");
      }
    },
    {
      root: null,
      threshold: 0,
      // rootMargin: `-${bannerHeight - navHeight - heightOffset}px`,
    }
  );

  bannerObserver.observe(banner);
});
