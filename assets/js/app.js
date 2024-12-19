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
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "load,DOMContentLoaded",
  });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".hero-wrapper", // Pin the entire hero-wrapper
        start: "top top", // When the top of the hero-wrapper hits the top of the viewport
        end: "bottom top", // End pinning after scrolling 300px past the bottom
        scrub: true, // Smooth scrolling effect
        aniticiptePin: true,
        pin: true, // Pin the hero-banner during scroll
      },
    })
    .fromTo(
      ".hero-banner",
      { scale: 1, height: "100vh" }, // Initial state: full size
      {
        scale: 0,
        height: "auto",
        ease: "power2.out",
      } // Final state: shrunk to match the image
    );

  document.body.addEventListener("scroll", () => {
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
        back_to_top_btn.classList.add("active");
        rsvp_btn.classList.add("active");
      } else {
        nav.classList.remove("hidden");
        back_to_top_btn.classList.remove("active");
        rsvp_btn.classList.remove("active");
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
      if (entry.isIntersecting) {
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

  bannerObserver.observe(banner);
  dateImgObserver.observe(prop_wrapper);
  propObserver.observe(met_border);
});
