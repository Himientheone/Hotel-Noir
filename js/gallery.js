(function () {
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const selected = this.getAttribute('data-filter');

      galleryItems.forEach(function (item) {
        if (selected === 'all' || item.getAttribute('data-category') === selected) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
})();

//bootstrap modal for gallery
(function () {
  const modalEl     = document.getElementById('galleryModal');
  const modalImgEl  = document.getElementById('modalImageArea');
  const captionEl   = document.getElementById('modalCaption');

  if (!modalEl) return;

  // Create a Bootstrap Modal instance we can control in JS
  const bsModal = new bootstrap.Modal(modalEl);

  // Listen for clicks on any gallery thumbnail
  document.querySelectorAll('.gallery-thumb').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      // The parent .gallery-item holds the caption
      const parentItem = this.closest('.gallery-item');
      const caption    = parentItem ? parentItem.getAttribute('data-caption') : '';

      // Copy the thumbnail's background gradient so that expanded view matches it
     
      const computedBg = window.getComputedStyle(this).background;
      modalImgEl.style.background = computedBg;

      // Set the caption text
      captionEl.textContent = caption;

      // Open the modal
      bsModal.show();
    });
  });
})();