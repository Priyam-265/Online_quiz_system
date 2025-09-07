const splitWords = document.querySelectorAll("#color-transition span");

splitWords.forEach((word, i) => {
  gsap.fromTo(
    word,
    { 
      color: "#9ca3af", // light gray initially
      textShadow: "0px 0px 0px rgba(0,0,0,0)" // no glow
    },
    { 
      color: "#4b5563", // darker gray on animation
      textShadow: "0px 0px 0px rgba(0,0,0,0)", // still no glow
      duration: 0.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#color-transition",
        start: `top+=${i * 40} bottom-=100`,
        end: `top+=${(i + 1) * 40} bottom-=100`,
        scrub: true
      }
    }
  );
});

