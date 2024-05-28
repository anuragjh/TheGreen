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
      }, 50); 
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

function search() {
  var searchTerm = document.getElementById('search').value;
  var url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=1&prop=extracts|pageimages&exintro&explaintext&pithumbsize=200&gsrsearch=" + searchTerm;

  $.getJSON(url, function(data) {
    var pages = data.query.pages;
    var html = '';
    for (var page in pages) {
      html += '<div class="recipe-card">';
      html += '<a href="https://en.wikipedia.org/?curid=' + pages[page].pageid + '" target="_blank">';
      if (pages[page].thumbnail) {
        html += '<img src="' + pages[page].thumbnail.source + '" alt="' + pages[page].title + '">';
      } else {
        html += '<img src="https://via.placeholder.com/300" alt="' + pages[page].title + '">';
      }
      html += '<div class="recipe-category">BY THE GREEN</div>';
      html += '<div class="recipe-title">' + pages[page].title + '</div>';
      html += '<p>' + pages[page].extract + '</p>';
      html += '</a>';
      html += '</div>';
    }
  
    document.querySelector('.recipes-grid').innerHTML = html;
  });
}