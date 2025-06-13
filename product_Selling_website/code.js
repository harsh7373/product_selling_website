document.addEventListener("DOMContentLoaded", () => {
  const bottle = document.getElementById('product1_img');
  const contentArea = document.getElementById('content_area');

  let hasAnimatedToMiddle = false;
  let snapEnabled = false;
  let passedSnapPoint = false;
  let hasAnimatedToCard = false;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight / 2;

    // 1. Animate to middle-left
    if (!hasAnimatedToMiddle && scrollY > 0) {
      const progress = Math.min(scrollY / maxScroll, 1);
      const translateY = progress * 100;
      const translateX = -progress * 150;
      const rotate = progress * 30;

      bottle.style.transform = `translate(${translateX}%, ${translateY}vh) rotate(${rotate}deg)`;

      if (progress === 1) {
        hasAnimatedToMiddle = true;

        // Enable scroll snap to pause at content_area
        document.documentElement.classList.add('snap-scroll');
        snapEnabled = true;
      }
    }

    // 2. Remove snap after scroll and trigger final animation
    const contentAreaTop = contentArea.getBoundingClientRect().top;
    if (snapEnabled && contentAreaTop < -50 && !passedSnapPoint) {
      document.documentElement.classList.remove('snap-scroll');
      passedSnapPoint = true;

      // Small delay to wait for snap release and then allow scroll
      setTimeout(() => {
        window.addEventListener('scroll', animateToCardFinalPosition);
      }, 100);
    }
  });

  function animateToCardFinalPosition() {
    if (hasAnimatedToCard) return;

    const thirdScroll = window.scrollY;

    // You can change this threshold if needed
    if (thirdScroll > window.innerHeight * 1.2) {
      hasAnimatedToCard = true;

      // Final animation - example: move deeper into card1
      bottle.style.transition = 'transform 1s ease-in-out';
      bottle.style.transform = 'translate(-247%, 189vh) rotate(0deg)';
      console.log("✅ Final bottle animation into card complete");

      // Remove listener to prevent retrigger
      window.removeEventListener('scroll', animateToCardFinalPosition);
    }
  }
});















 


