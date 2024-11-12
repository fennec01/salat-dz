export function backgroundManager() {
    
  document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("carouselExampleIndicators");
    const body = document.body;

    // Function to update the body background and save the active slide index
    function updateBodyClass(index) {
      body.classList.remove("bg1", "bg2", "bg3");
      body.classList.add(`bg${index + 1}`);
      localStorage.setItem("bgIndex", index);
    }

    // Load saved slide index and set the active slide and background on page load
    const savedSlideIndex = parseInt(localStorage.getItem("bgIndex"), 10);
    if (!isNaN(savedSlideIndex)) {
      // Get all carousel items and indicators
      const carouselItems = carousel.querySelectorAll(".carousel-item");
      const indicators = carousel.querySelectorAll(".carousel-indicators button");

      // Set the saved slide as active
      carouselItems.forEach((item, index) => {
        item.classList.toggle("active", index === savedSlideIndex);
      });
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === savedSlideIndex);
      });

      // Set the background to match the saved slide
      updateBodyClass(savedSlideIndex);
    } else {
      // If no index is saved, default to the first slide and background
      updateBodyClass(0);
    }

    // Listen for slide change events to update the background and save the index
    carousel.addEventListener("slid.bs.carousel", function (event) {
      updateBodyClass(event.to); // `event.to` gives the index of the active slide
    });
  });
}