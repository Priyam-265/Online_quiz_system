document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline();

  tl.fromTo("#diamond",
    { scale: 0, rotate: 45 },
    { 
      scale: 1.5, 
      rotate: 405,
      duration: 2, 
      ease: "power3.inOut"
    }
  )
  .to("#diamond", { 
    rotate: 720, 
    scale: 1, 
    duration: 1.2, 
    ease: "power4.out" 
  })
  .to("#diamond", { 
    scale: 32, 
    duration: 1.5, 
    ease: "expo.inOut" 
  })
  .to("#intro", { 
    opacity: 0, 
    duration: 1, 
    ease: "power2.inOut", 
    pointerEvents: "none",
    onComplete: () => {
      document.getElementById("intro").style.display = "none";
      document.getElementById("site-content").classList.remove("hidden");
    }
  }, "-=0.7")
  .to("main", { 
    opacity: 1, 
    duration: 1, 
    ease: "power2.inOut" 
  }, "-=0.5");
});
