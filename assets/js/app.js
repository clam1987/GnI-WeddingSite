window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".nav-main");
  const nav_item = document.querySelectorAll("nav a[data-target]");
  const mobile_nav_item = document.querySelectorAll(
    "#mobile-demo a[data-target]"
  );
  const carousel = document.querySelectorAll(".carousel");
  const banner = document.querySelector(".hero-wrapper");
  const prop_wrapper = document.querySelector(".proposal-wrapper");
  const met_border = document.querySelector(".met-border");
  const reveal_bold = document.querySelector(".reveal-bold");
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

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "load,DOMContentLoaded",
  });

  ScrollTrigger.refresh();

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".hero-wrapper",
        start: "top top",
        end: "bottom top",
        scrub: true,
        aniticiptePin: true,
        pin: true,
      },
    })
    .fromTo(
      ".hero-banner",
      { scale: 1, height: "100vh" },
      {
        scale: 0,
        height: "auto",
        ease: "power2.out",
      }
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
      console.log(target);
      const scrollPosition = ScrollTrigger.getScrollFunc(window)();

      gsap.to(window, {
        scrollTo: {
          y: scrollPosition + target.getBoundingClientRect().top - 50, // Offset for fixed navbar
          autoKill: true,
        },
        duration: 1,
        ease: "power2.inOut",
        onStart: () => {
          // Optional: Add entry animation for target
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

      const scrollPosition = ScrollTrigger.getScrollFunc(window)();

      gsap.to(window, {
        scrollTo: {
          y: scrollPosition + target.getBoundingClientRect().top - 50, // Offset for fixed navbar
          autoKill: true,
        },
        duration: 1,
        ease: "power2.inOut",
        onStart: () => {
          // Optional: Add entry animation for target
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
        console.log("not intersecting");
        nav.classList.add("hidden");
        back_to_top_btn.classList.add("active");
        rsvp_btn.classList.add("active");
      } else {
        console.log("intersecting");
        nav.classList.remove("hidden");
        back_to_top_btn.classList.remove("active");
        rsvp_btn.classList.remove("active");
      }
    },
    {
      threshold: 0,
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
            clipPath: "inset(0 50% 0 50%)",
          },
          {
            clipPath: "inset(0 0% 0 0%)",
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
