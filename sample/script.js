import gsap from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const spotlightItems = [
  { name: "Silent arc", img: "../second-page/coding_card.png" },
  { name: "Mystic horizon", img: "../second-page/gk_card.png" },
  { name: "Dream cascade", img: "../second-page/history_card.png" },
  { name: "Twilight bloom", img: "../second-page/gk_card2.png" },
];

const titlesContainer = document.querySelector(".spotlight-titles");
const imagesContainer = document.querySelector(".spotlight-images");

let titleEls = [];
let imgEls = [];

// Build elements
spotlightItems.forEach((item) => {
  const t = document.createElement("h1");
  t.textContent = item.name;
  t.className =
    "text-6xl font-semibold opacity-30 text-gray-400 dark:text-gray-400";
  titlesContainer.appendChild(t);
  titleEls.push(t);

  const wrap = document.createElement("div");
  wrap.className = "absolute inset-0 flex items-center justify-center";
  const img = document.createElement("img");
  img.src = item.img;
  img.alt = item.name;
  img.className = "w-[28rem] h-auto object-contain";
  wrap.appendChild(img);
  imagesContainer.appendChild(wrap);
  imgEls.push(wrap);
});

// Initial states
gsap.set(imgEls, { opacity: 0, scale: 0.6 });
gsap.set(titleEls, { opacity: 0.3, y: 40 });

// Total scroll distance
const total = spotlightItems.length;
const scrollDuration = window.innerHeight * total;

// Pin section while scrolling
gsap.timeline({
  scrollTrigger: {
    trigger: ".spotlight",
    start: "top top",
    end: `+=${scrollDuration}`,
    scrub: true,
    pin: true,
  },
});

// Animate each pair (telescopic effect)
spotlightItems.forEach((_, i) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".spotlight",
      start: `${(i / total) * 100}% top`,
      end: `${((i + 1) / total) * 100}% top`,
      scrub: true,
    },
  });

  // Image telescope zoom (in → out)
  tl.to(imgEls[i], {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    ease: "power2.out",
  })
    .to(
      imgEls[i],
      {
        opacity: 0,
        scale: 1.5,
        duration: 0.5,
        ease: "power2.in",
      },
      ">0.3"
    );

  // Titles sync
  tl.to(
    titleEls[i],
    {
      opacity: 1,
      y: 0,
      color: "#ffffff", // active = bright white
      duration: 0.4,
      ease: "power2.out",
    },
    "<"
  ).to(
    titleEls[i],
    {
      opacity: 0.3,
      y: -40,
      color: "#9ca3af", // inactive = gray
      duration: 0.4,
      ease: "power2.in",
    },
    ">0.6"
  );
});
