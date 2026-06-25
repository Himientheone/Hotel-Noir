//search function
(function () {
  const searchInput  = document.getElementById('blogSearch');
  const blogItems    = document.querySelectorAll('.blog-item');
  const noMsg        = document.getElementById('noBlogMsg');
  const countDisplay = document.getElementById('searchResultsCount');

  if (!searchInput) return;

  searchInput.addEventListener('input', function () {
    // lowercase and trim white space
    const query = this.value.trim().toLowerCase();
    let visibleCount = 0;

    blogItems.forEach(function (item) {
      // Get searchable text from the article's title and excerpt
      const title   = item.querySelector('.blog-title')   ? item.querySelector('.blog-title').textContent.toLowerCase()   : '';
      const excerpt = item.querySelector('.blog-excerpt')  ? item.querySelector('.blog-excerpt').textContent.toLowerCase()  : '';
      const tag     = item.querySelector('.blog-tag')      ? item.querySelector('.blog-tag').textContent.toLowerCase()      : '';

      // Show card when it matches any of the searchable fields
      const matches = title.includes(query) || excerpt.includes(query) || tag.includes(query);

      if (matches || query === '') {
        item.classList.remove('hidden');
        visibleCount++;
      } else {
        item.classList.add('hidden');
      }
    });

    // Update the result counter text
    if (query === '') {
      countDisplay.textContent = '';
    } else {
      countDisplay.textContent = `${visibleCount} article${visibleCount !== 1 ? 's' : ''} found`;
    }

    // Show "no results" message
    if (noMsg) {
      noMsg.style.display = visibleCount === 0 && query !== '' ? 'block' : 'none';
    }
  });
})();