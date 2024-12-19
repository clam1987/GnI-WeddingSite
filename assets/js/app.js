document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".nav-main");
  const nav_item = document.querySelectorAll("nav a[data-target]");
  const mobile_nav_item = document.querySelectorAll(
    "#mobile-demo a[data-target]"
  );
  const carousel = document.querySelectorAll(".carousel");
  const banner = document.querySelector(".hero-banner");
  const prop_wrapper = document.querySelector(".proposal-wrapper");
  const met_border = document.querySelector(".met-border");
  const reveal_bold = document.querySelector(".reveal-bold");
  const top_border = document.querySelector(".top_border");
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
  ScrollTrigger.config({ ignoreMobileResize: true });

  let hasScrolled = false; // Flag to track if user has scrolled
  let reverseScrolled = false;
  const body = document.body;

  function disableScroll() {
    body.style.overflow = "hidden";
  }

  function enableScroll() {
    body.style.overflowX = "hidden";
    body.style.overflowY = "scroll";
    hasScrolled = false;
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
    duration: 2,
    ease: "power2.out",
  });

  // Snap to Content Section
  timeline.to(
    document.body,
    {
      scrollTo: { y: ".top_border", autoKill: false }, // Scroll to content section
      duration: 1.25,
      ease: "power2.inOut",
    },
    "<"
  );

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
        nav.classList.add("hidden");
      } else {
        nav.classList.remove("hidden");
      }
    },
    {
      root: null,
      threshold: 0,
      // rootMargin: `-${bannerHeight - navHeight - heightOffset}px`,
    }
  );

  const dateImgObserver = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (!entry.isIntersecting) {
        reveal_bold.classList.add("vis-none");
      } else {
        reveal_bold.classList.remove("vis-none");
        gsap.fromTo(
          ".reveal-bold",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            ease: "power1.out",
            duration: 2,
          }
        );
      }
    },
    {
      threshold: 0,
    }
  );

  const propObserver = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (!entry.isIntersecting) {
        console.log("not intersecting");
      } else {
        console.log("intersecting");
        gsap.fromTo(
          ".proposal-wrapper",
          {
            clipPath: "inset(0 50% 0 50%)", // Fully reveals the content
          },
          {
            clipPath: "inset(0 0% 0 0%)", // Fully reveals the content
            ease: "power2.out",
            duration: 2,
          }
        );
      }
    },
    { threshold: 0.2 }
  );

  const borderObserver = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && reverseScrolled) {
        reverseScrolled = false;
        timeline.reverse();
      } else {
        reverseScrolled = true;
      }
    },
    {
      threshold: 0,
    }
  );

  bannerObserver.observe(banner);
  dateImgObserver.observe(prop_wrapper);
  propObserver.observe(met_border);
  borderObserver.observe(top_border);
});
