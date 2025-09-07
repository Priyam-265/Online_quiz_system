window.addEventListener("DOMContentLoaded",function(){
    this.window.addEventListener("load",function(){
      gsap.delayedCall(5,()=>{
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
    gsap.from("#head1",{
      opacity:0,
      y:50,
      duration:1,
      ease:"power3.out",
      stagger:0.3,
      delay:1
    });
    gsap.from("#head2",{
      opacity:0,
      y:50,
      duration:1,
      ease:"power3.out",
      stagger:0.3,
      delay:1.1
    }); 
    gsap.from("#head3",{
      opacity:0,
      y:50,
      duration:1,
      ease:"power3.out",
      stagger:0.3,
      delay:1.2
    });
     gsap.from("#brainModel", {
      opacity: 0,
      scale: 0.5,
      duration: 2,
      ease: "elastic.out(1, 0.5)",
      delay: 0.5
    }); 
    }
    )
})
})