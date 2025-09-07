// import gsap from "https://cdn.skypack.dev/gsap";
// import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";
// import Lenis from "https://cdn.skypack.dev/@studio-freight/lenis";

// gsap.registerPlugin(ScrollTrigger);

// const config = {
//   gap: 0.08,
//   speed: 0.3,
//   arcRadius: 500,
// };

// const spotlightItems = [
//   { name: "Coding", img: "../second-page/coding_card.png" },
//   { name: "Design", img: "../second-page/coding_card.png" },
//   { name: "Logic", img: "../second-page/coding_card.png" },
//   { name: "Math", img: "../second-page/coding_card.png" },
// ];

// // Initialize Lenis for smooth scrolling
// const lenis = new Lenis();
// lenis.on("scroll", ScrollTrigger.update);
// gsap.ticker.add((time) => lenis.raf(time * 1000));
// gsap.ticker.lagSmoothing(0);

// // DOM Elements
// const titlesContainer = document.querySelector(".spotlight-titles");
// const imagesContainer = document.querySelector(".spotlight-images");
// const spotlightHeader = document.querySelector(".spotlight-header");
// const titlesContainerElement = document.querySelector(".spotlight-titles-container");
// const introTextElements = document.querySelectorAll(".spotlight-intro-text");
// const imageElements = [];

// // Create titles and images
// spotlightItems.forEach((item, index) => {
//   const titleElement = document.createElement("h1");
//   titleElement.textContent = item.name;
//   titleElement.style.opacity = index === 0 ? "1" : "0.25";
//   titlesContainer.appendChild(titleElement);

//   const imageWrapper = document.createElement("div");
//   imageWrapper.className = "spotlight-img";
//   const imgElement = document.createElement("img");
//   imgElement.src = item.img; // fixed typo
//   imageWrapper.appendChild(imgElement);
//   imagesContainer.appendChild(imageWrapper);
//   imageElements.push(imageWrapper);
// });

// let currentActiveIndex = 0;
// const titleElements = titlesContainer.querySelectorAll("h1");

// // Arc positions
// const containerWidth = window.innerWidth * 0.3;
// const containerHeight = window.innerHeight;
// const arcStartX = containerWidth - 220;
// const arcStartY = 200;
// const arcEndY = containerHeight + 200;
// const arcControlPointX = arcStartX + config.arcRadius;
// const arcControlPointY = containerHeight / 2;

// function getBezierPosition(t) {
//   const x =
//     (1 - t) * (1 - t) * arcStartX +
//     2 * (1 - t) * t * arcControlPointX +
//     t * t * arcStartX;

//   const y =
//     (1 - t) * (1 - t) * arcStartY +
//     2 * (1 - t) * t * arcControlPointY +
//     t * t * arcEndY;

//   return { x, y };
// }

// function getImgProgressState(index, overallProgress) {
//   const startTime = index * config.gap;
//   const endTime = startTime + config.speed;

//   if (overallProgress < startTime) return -1;
//   if (overallProgress > endTime) return 2;
//   return (overallProgress - startTime) / config.speed;
// }

// // Hide all images initially
// imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));

// // ScrollTrigger
// ScrollTrigger.create({
//   trigger: ".spotlight",
//   start: "top top",
//   end: `+=${window.innerHeight * 10}px`,
//   pin: true,
//   pinSpacing: true,
//   scrub: 1,
//   onUpdate: (self) => {
//     const progress = self.progress;

//     // Intro animation
//     if (progress <= 0.2) {
//       const animationProgress = progress / 0.2;
//       const moveDistance = window.innerWidth * 0.6;

//       gsap.set(introTextElements[0], { x: -animationProgress * moveDistance, opacity: 1 });
//       gsap.set(introTextElements[1], { x: animationProgress * moveDistance, opacity: 1 });

//       gsap.set(".spotlight-bg-img", { transform: `scale(${animationProgress})` });
//       gsap.set(".spotlight-bg-img img", { transform: `scale(${1.5 - animationProgress * 0.5})` });

//       imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));
//       spotlightHeader.style.opacity = "0";
//       gsap.set(titlesContainerElement, { "--before-opacity": "0", "--after-opacity": "0" });
//     }

//     // Transition to main spotlight
//     else if (progress > 0.2 && progress <= 0.25) {
//       gsap.set(".spotlight-bg-img", { transform: "scale(1)" });
//       gsap.set(".spotlight-bg-img img", { transform: "scale(1)" });
//       gsap.set(introTextElements[0], { opacity: 0 });
//       gsap.set(introTextElements[1], { opacity: 0 });
//       imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));
//       spotlightHeader.style.opacity = "1";
//       gsap.set(titlesContainerElement, { "--before-opacity": "1", "--after-opacity": "1" });
//     }

//     // Main spotlight scrolling
//     else if (progress > 0.25 && progress <= 0.95) {
//       const switchProgress = (progress - 0.25) / 0.7;
//       const viewportHeight = window.innerHeight;
//       const titlesContainerHeight = titlesContainer.scrollHeight;
//       const startPosition = viewportHeight;
//       const targetPosition = -titlesContainerHeight;
//       const totalDistance = startPosition - targetPosition;
//       const currentY = startPosition - switchProgress * totalDistance;

//       gsap.set(".spotlight-titles", { transform: `translateY(${currentY}px)` });

//       imageElements.forEach((img, index) => {
//         const imageProgress = getImgProgressState(index, switchProgress);
//         if (imageProgress < 0 || imageProgress > 1) gsap.set(img, { opacity: 0 });
//         else {
//           const pos = getBezierPosition(imageProgress);
//           gsap.set(img, { x: pos.x - 100, y: pos.y - 75, opacity: 1 });
//         }
//       });

//       const viewportMiddle = viewportHeight / 2;
//       let closestIndex = 0;
//       let closestDistance = Infinity;
//       titleElements.forEach((title, index) => {
//         const titleRect = title.getBoundingClientRect();
//         const titleCenter = titleRect.top + titleRect.height / 2;
//         const distanceFromCenter = Math.abs(titleCenter - viewportMiddle);
//         if (distanceFromCenter < closestDistance) {
//           closestDistance = distanceFromCenter;
//           closestIndex = index;
//         }
//       });

//       if (closestIndex !== currentActiveIndex) {
//         if (titleElements[currentActiveIndex]) titleElements[currentActiveIndex].style.opacity = "0.25";
//         titleElements[closestIndex].style.opacity = "1";
//         document.querySelector(".spotlight-bg-img img").src = spotlightItems[closestIndex].img;
//         currentActiveIndex = closestIndex;
//       }
//     }

//     // Outro
//     else if (progress > 0.95) {
//       spotlightHeader.style.opacity = "0";
//       gsap.set(titlesContainerElement, { "--before-opacity": "0", "--after-opacity": "0" });
//     }
//   },
// });
import gsap from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";
import Lenis from "https://cdn.skypack.dev/@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

// Config
const config = { gap: 0.08, speed: 0.3, arcRadius: 500 };

// Spotlight items
const spotlightItems = [
  { name: "Coding", img: "../second-page/coding_card.png" },
  { name: "Design", img: "../second-page/coding_card.png" },
  { name: "Logic", img: "../second-page/coding_card.png" },
  { name: "Math", img: "../second-page/coding_card.png" },
];

// Lenis Smooth Scroll
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// DOM Elements
const titlesContainer = document.querySelector(".spotlight-titles");
const imagesContainer = document.querySelector(".spotlight-images");
const spotlightHeader = document.querySelector(".spotlight-header");
const titlesContainerElement = document.querySelector(".spotlight-titles-container");
const introTextElements = document.querySelectorAll(".spotlight-intro-text");
const imageElements = [];

// Create titles and images
spotlightItems.forEach((item, index) => {
  // Titles
  const titleEl = document.createElement("h1");
  titleEl.textContent = item.name;
  titleEl.style.opacity = index === 0 ? "1" : "0.25";
  titlesContainer.appendChild(titleEl);

  // Images
  const imgWrapper = document.createElement("div");
  imgWrapper.className = "spotlight-img";
  const imgEl = document.createElement("img");
  imgEl.src = item.img;
  imgWrapper.appendChild(imgEl);
  imagesContainer.appendChild(imgWrapper);
  imageElements.push(imgWrapper);
});

let currentActiveIndex = 0;
const titleElements = titlesContainer.querySelectorAll("h1");

// Arc positions
const containerWidth = window.innerWidth * 0.3;
const containerHeight = window.innerHeight;
const arcStartX = containerWidth - 220;
const arcStartY = 200;
const arcEndY = containerHeight + 200;
const arcControlPointX = arcStartX + config.arcRadius;
const arcControlPointY = containerHeight / 2;

function getBezierPosition(t) {
  const x = (1 - t) * (1 - t) * arcStartX + 2 * (1 - t) * t * arcControlPointX + t * t * arcStartX;
  const y = (1 - t) * (1 - t) * arcStartY + 2 * (1 - t) * t * arcControlPointY + t * t * arcEndY;
  return { x, y };
}

function getImgProgressState(index, overallProgress) {
  const startTime = index * config.gap;
  const endTime = startTime + config.speed;
  if (overallProgress < startTime) return -1;
  if (overallProgress > endTime) return 2;
  return (overallProgress - startTime) / config.speed;
}

// Hide all images initially
imageElements.forEach(img => gsap.set(img, { opacity: 0 }));

// ScrollTrigger
ScrollTrigger.create({
  trigger: ".spotlight",
  start: "top top",
  end: `+=${window.innerHeight * 10}px`,
  pin: true,
  pinSpacing: true,
  scrub: 1,
  onUpdate: self => {
    const progress = self.progress;

    // Intro Animation
    if (progress <= 0.2) {
      const animationProgress = progress / 0.2;
      const moveDistance = window.innerWidth * 0.6;
      gsap.set(introTextElements[0], { x: -animationProgress * moveDistance, opacity: 1 });
      gsap.set(introTextElements[1], { x: animationProgress * moveDistance, opacity: 1 });
      gsap.set(".spotlight-bg-img", { transform: `scale(${animationProgress})` });
      gsap.set(".spotlight-bg-img img", { transform: `scale(${1.5 - animationProgress * 0.5})` });
      imageElements.forEach(img => gsap.set(img, { opacity: 0 }));
      spotlightHeader.style.opacity = "0";
    } 

    // Transition to main spotlight
    else if (progress > 0.2 && progress <= 0.25) {
      gsap.set(".spotlight-bg-img", { transform: "scale(1)" });
      gsap.set(".spotlight-bg-img img", { transform: "scale(1)" });
      introTextElements.forEach(el => gsap.set(el, { opacity: 0 }));
      spotlightHeader.style.opacity = "1";
      imageElements.forEach(img => gsap.set(img, { opacity: 0 }));
    }

    // Main spotlight scrolling
    else if (progress > 0.25 && progress <= 0.95) {
      const switchProgress = (progress - 0.25) / 0.7;
      const viewportHeight = window.innerHeight;
      const titlesContainerHeight = titlesContainer.scrollHeight;
      const startY = viewportHeight;
      const targetY = -titlesContainerHeight;
      const totalDistance = startY - targetY;
      const currentY = startY - switchProgress * totalDistance;
      gsap.set(".spotlight-titles", { transform: `translateY(${currentY}px)` });

      imageElements.forEach((img, index) => {
        const imageProgress = getImgProgressState(index, switchProgress);
        if (imageProgress < 0 || imageProgress > 1) gsap.set(img, { opacity: 0 });
        else {
          const pos = getBezierPosition(imageProgress);
          gsap.set(img, { x: pos.x - 100, y: pos.y - 75, opacity: 1 });
        }
      });

      // Update active title
      const viewportMiddle = viewportHeight / 2;
      let closestIndex = 0, closestDistance = Infinity;
      titleElements.forEach((title, index) => {
        const titleRect = title.getBoundingClientRect();
        const titleCenter = titleRect.top + titleRect.height / 2;
        const distance = Math.abs(titleCenter - viewportMiddle);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      if (closestIndex !== currentActiveIndex) {
        titleElements[currentActiveIndex].style.opacity = "0.25";
        titleElements[closestIndex].style.opacity = "1";
        document.querySelector(".spotlight-bg-img img").src = spotlightItems[closestIndex].img;
        currentActiveIndex = closestIndex;
      }
    }

    // Outro
    else if (progress > 0.95) {
      spotlightHeader.style.opacity = "0";
    }
  },
});
