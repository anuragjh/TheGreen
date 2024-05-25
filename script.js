let currentQuoteIndex = 0;
const quotes = document.querySelectorAll(".quote"); //nodeList ache

document
  .getElementById("prevButton")
  .addEventListener("click", showPreviousQuote);
document.getElementById("nextButton").addEventListener("click", showNextQuote);

function showQuote(index) {
  quotes.forEach((quote, i) => {
    quote.classList.remove("active");
    if (i === index) {
      setTimeout(() => {
        quote.classList.add("active");
      }, 50); // Slight delay to ensure the animation is applied
    }
  });
}

function showPreviousQuote() {
  currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
  showQuote(currentQuoteIndex);
}

function showNextQuote() {
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  showQuote(currentQuoteIndex);
}

// Show the first quote initially
showQuote(currentQuoteIndex);

//video play section
document.getElementById("playButton").addEventListener("click", function () {
  const video = document.getElementById("guideVideo");
  const overlay = document.querySelector(".video-overlay");

  if (video.style.display === "none") {
    video.style.display = "block";
    video.play();
    overlay.style.display = "none";
  }
});