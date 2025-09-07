window.addEventListener("DOMContentLoaded",function(){
    this.window.addEventListener("load",function(){
      gsap.delayedCall(0,()=>{
      gsap.from(".site-logo", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out"
    });
    gsap.from(".menu-item", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2,
      delay: 0.3
    });
    gsap.from(".items",{
      opacity:0,
      y:50,
      duration:1,
      ease:"power3.out",
      stagger:0.3,
      delay:1
    }); 
    }
    )
})
})