 // Initial Setup
const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const results = document.querySelector('.articles');

// Event Listener for the form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = input.value.trim();

  if (query === '') {
    alert('Please enter a search term');
    return;
  }

  fetchPages(query);
});

// Fetch Pages from Wikipedia API
async function fetchPages(searchValue) {
  results.innerHTML = '<p>Loading...</p>';
  
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=${searchValue}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.query.search.length === 0) {
      results.innerHTML = '<p>No articles found. Please try a different search term.</p>';
    } else {
      renderResults(data.query.search);
    }

  } catch (error) {
    results.innerHTML = '<p>An error occurred. Please try again later.</p>';
  }
}

// Render Results
function renderResults(pages) {
  const articles = pages.map((page) => {
    const { title, snippet, pageid } = page;
    const pageUrl = `https://en.wikipedia.org/?curid=${pageid}`;

    return `
      <a href="${pageUrl}" target="_blank">
        <h4>${title}</h4>
        <p>${snippet}...</p>
      </a>
    `;
  }).join('');

  results.innerHTML = articles;
}
