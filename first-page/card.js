console.clear();

gsap.registerPlugin(ScrollTrigger);

function initializeCards() {
  
  const siteContent = document.getElementById('site-content');
  const mainContent = document.querySelector('.main');
  
  if (siteContent && siteContent.classList.contains('hidden')) {
    console.log("Site content is hidden, waiting...");
    setTimeout(initializeCards, 300);
    return;
  }
  
  if (mainContent && getComputedStyle(mainContent).opacity === '0') {
    console.log("Main content not visible, waiting...");
    setTimeout(initializeCards, 300);
    return;
  }

  const cardsWrappers = gsap.utils.toArray(".card-wrapper");
  const cards = gsap.utils.toArray(".card");
  
  console.log("Cards found:", cards.length);
  console.log("Wrappers found:", cardsWrappers.length);
  
  if (cards.length === 0 || cardsWrappers.length === 0) {
    console.warn("Cards or wrappers not found, retrying in 300ms...");
    setTimeout(initializeCards, 300);
    return;
  }

  // Verify cards have dimensions
  const firstCard = cards[0];
  const cardRect = firstCard.getBoundingClientRect();
  if (cardRect.height === 0 || cardRect.width === 0) {
    console.log("Cards not rendered yet, waiting...");
    setTimeout(initializeCards, 300);
    return;
  }

  console.log("Initializing card animations...");

  cardsWrappers.forEach((wrapper, i) => {
    const card = cards[i];
    let scale = 1,
      rotation = 0;
    if (i !== cards.length - 1) {
      scale = 0.9 + 0.025 * i;
      rotation = -10;
    }
    gsap.to(card, {
      scale: scale,
      rotationX: rotation,
      transformOrigin: "top center",
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top " + (60 + 10 * i),
        end: "bottom 550",
        endTrigger: ".wrapper",
        scrub: true,
        pin: wrapper,
        pinSpacing: false,
        id: i + 1,
        onRefresh: () => {
          console.log(`Card ${i + 1} ScrollTrigger refreshed`);
        }
      }
    });
  });
}

// Wait for DOM to be ready (simplified approach)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      ScrollTrigger.refresh();
      initializeCards();
    }, 100);
  });
} else {
  // DOM is already loaded
  setTimeout(() => {
    ScrollTrigger.refresh();
    initializeCards();
  }, 100);
}

// Refresh on window load
window.addEventListener('load', () => {
  if (!cardsInitialized) {
    setTimeout(() => {
      ScrollTrigger.refresh();
      initializeCards();
    }, 100);
  }
});

// Refresh on resize
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});