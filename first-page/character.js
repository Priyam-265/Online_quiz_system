  import gsap from "https://cdn.skypack.dev/gsap";
  import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";
  gsap.registerPlugin(ScrollTrigger);

  gsap.from("#character", {
    scale: 0,
    opacity: 0,
    duration: 1.5,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: "#character",
      start: "top 80%",
      end: "top 40%",
      scrub: true
    }
  });
