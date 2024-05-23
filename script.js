    let currentQuoteIndex = 0;
    const quotes = document.querySelectorAll('.quote');//nodeList ache

    document.getElementById('prevButton').addEventListener('click', showPreviousQuote);
    document.getElementById('nextButton').addEventListener('click', showNextQuote);

    function showQuote(index) {
      quotes.forEach((quote, i) => {
        quote.classList.remove('active');
        if (i === index) {
          quote.classList.add('active');
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