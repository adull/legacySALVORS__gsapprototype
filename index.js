window.onload = function() {
    console.log({ gsap})
    console.log({ ScrollTrigger })
    gsap.registerPlugin(ScrollTrigger);

// Create the GSAP timeline
const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "+=1000",
    scrub: true,
    pin: true, // Pin the scene in place
    anticipatePin: 1,
    onLeave: () => fadeToContent(), // When animation finishes, fade to content
    onEnterBack: () => resetContent(), // When scrolling back up, reset the content fade
  }
});

// Move the boat towards the island while bouncing up and down
timeline.to(".boat", {
    x: "50vw", // Move the boat to the right
    keyframes: [
      { y: "-1vw", rotation: "4deg", duration: 0.5 }, // First upward wiggle
      { y: "2vw", rotation: "-8deg",duration: 0.5 },  // Downward wiggle
      { y: "-2vw", rotation: "8deg", duration: 0.5 }, // Another upward wiggle
      { y: "0.7vw", rotation: "-2deg",duration: 0.5 },  // Final downward wiggle
    ],
    duration: 3.3, // Total duration for the wiggle + movement
    ease: "power1.inOut",
  });

// Make the pineapple fall and bounce off the boat
timeline.to(".pineapple", {
  y: "25vw", // Drop it down from the tree
  ease: "bounce.out",
  duration: 1.5,
}, "-=1"); // Start the pineapple falling just before the boat reaches it

// Sink the boat after the pineapple falls
timeline.to(".boat", {
  y: "47vh", // Sink the boat after the pineapple falls
  rotation: 40, // Tilt it for dramatic effect
  duration: 1.8,
  ease: "power1.in",
});

timeline.to(".bg", {
    opacity: 0,
})

// Optional: Scroll content below after the animation finishes
timeline.to(".content", {
  opacity: 1,
});
}

function fadeToContent() {
    gsap.to(".bg", { opacity: 0, duration: 1 }); // Fade out the animation scene
    gsap.to(".god", { opacity: 1, duration: 1 }); // Fade in the content
    gsap.to(".bg", {display: `none`})
    gsap.to(".god", { pointerEvents: `all` }); // Fade in the content

  }
  
  // Function to reset content when scrolling back up
  function resetContent() {
    gsap.to(".bg", {display: `flex`})
    gsap.to(".bg", { opacity: 1, duration: 1 }); // Fade the animation back in
    gsap.to(".god", { pointerEvents: `none` }); // Fade in the content
    gsap.to(".god", { opacity: 0, duration: 1 }); // Fade out the content
  }