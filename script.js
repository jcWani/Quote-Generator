let apiQuotes = [];
let quote = {};
const errorMessage = "Failed to load a quote. Please try clicking the button again!";

const quoteTextContainer = document.querySelector(".quote-text-container");
const btnNewQuote = document.querySelector(".btn--new-quote");
const btnTwitter = document.querySelector(".btn--twitter");

// GET JSON
const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error(`Failed to load quote (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

// Render error message
const renderError = function (erorrMessage = errorMessage) {
  const markup = `
        <div class="error">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span class="error-message">
            ${errorMessage}
          </span>
        </div>
  `;

  quoteTextContainer.innerHTML = "";
  quoteTextContainer.insertAdjacentHTML(`afterbegin`, markup);
};

// Generate random quote
const newQuote = function (quotes) {
  const randQuote = Math.trunc(Math.random() * quotes.length) + 1;
  return quotes[randQuote];
};

// Render quote
const renderQuote = function (quote) {
  const markup = `
  <!-- QUOTE -->
  <div class="quote-text ${quote.text.length > 120 ? "long-quote" : ""} twitter-quote">
    <i class="fas fa-quote-left"></i>
    <span id="quote"
      >${quote.text}
    </span>
  </div>
  <!-- AUTHOR -->
  <div class="quote-author">
    <span id="author">-${quote.author}</span>
  </div>
`;

  quoteTextContainer.innerHTML = "";
  quoteTextContainer.insertAdjacentHTML(`afterbegin`, markup);
};

const renderLoader = function () {
  const markup = `
  <span class="loader"></span>
  `;

  quoteTextContainer.innerHTML = "";
  quoteTextContainer.insertAdjacentHTML(`afterbegin`, markup);
};

// Fetch quote from API
const loadQuote = async function () {
  const API_URL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    // Render spinner
    renderLoader();

    // Fetch data
    const apiQuotes = await getJSON(API_URL);
    const generateQuote = newQuote(apiQuotes);

    quote = {
      text: generateQuote.text,
      author: generateQuote.author,
    };

    //
    renderQuote(generateQuote);
  } catch (err) {
    renderError();
  }
};

// Tweet quote
const tweetQuote = function () {
  if (!quote.text && !quote.author) return;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author}`;
  console.log(quote.text);
  console.log(quote.author);
  window.open(twitterUrl, "_blank");
};

// Event Listeners
btnNewQuote.addEventListener("click", loadQuote);
btnTwitter.addEventListener("click", tweetQuote);
