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


function filterProducts(category) {
  const products = document.querySelectorAll('.product-card');
  var noImg = document.querySelector('.noyhing-to-show');
  let visibleCount = 0;

  // Loop through the product cards
  products.forEach((product) => {
    // If 'all' is selected, show all products
    if (category === 'all') {
      product.style.display = 'block';
      visibleCount++; 
    } else {
      // Otherwise, only show products that match the selected category
      if (product.classList.contains(category)) {
        product.style.display = 'block';
        visibleCount++;
      
      } else {
        product.style.display = 'none';
        document.querySelector('.view-more-container').style.display = 'none';
      }
    }
  });

  const noProductsElement = document.querySelector('.no-products');
  if (visibleCount === 0) {
    noProductsElement.style.display = 'block';
  } else {
    noProductsElement.style.display = 'none';
  }

  // Update the dropdown button text to the selected category
  document.querySelector('.dropbtn').textContent = category.charAt(0).toUpperCase() + category.slice(1);
}


let productsToShow = 4;
const products = document.querySelectorAll('.product-card');

  function showMoreProducts() {
    const totalProducts = products.length;
    const currentlyVisibleProducts = document.querySelectorAll('.product-card.visible').length;
    const nextBatchEnd = currentlyVisibleProducts + productsToShow;

    for (let i = currentlyVisibleProducts; i < nextBatchEnd && i < totalProducts; i++) {
      products[i].classList.add('visible');
    }

    if (nextBatchEnd >= totalProducts) {
      document.querySelector('.view-more-container').style.display = 'none';
    }
  }



  function searchProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const products = document.querySelectorAll('.product-card');
    let visibleCount = 0;
  
    products.forEach(product => {
      const productName = product.querySelector('.product-details h3').innerText.toLowerCase();
      if (productName.includes(searchInput)) {
        product.classList.add('visible');
        product.style.display = 'block';
        visibleCount++;
      } else {
        product.classList.remove('visible');
        product.style.display = 'none';
      }
    });
  
    // Check if there are any visible products
    const noProductsElement = document.querySelector('.no-products');
    if (visibleCount === 0) {
      noProductsElement.style.display = 'block';
    } else {
      noProductsElement.style.display = 'none';
    }
  }