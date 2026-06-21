(function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const roomItems  = document.querySelectorAll('.room-item');
  const noMsg      = document.getElementById('noRoomsMsg');

  if (!filterBtns.length) return; // Safety check

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {

      
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const selected = this.getAttribute('data-filter');
      let visibleCount = 0;

      
      roomItems.forEach(function (item) {
        const category = item.getAttribute('data-category');

        if (selected === 'all' || category === selected) {
          item.classList.remove('hidden');
          visibleCount++;
        } else {
          item.classList.add('hidden');
        }
      });

      
      if (noMsg) {
        noMsg.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  });

  
  const params = new URLSearchParams(window.location.search);
  const typeParam = params.get('type');

  if (typeParam && typeParam !== 'any') {
    
    const matchBtn = document.querySelector(`.filter-btn[data-filter="${typeParam}"]`);
    if (matchBtn) matchBtn.click();
  }

  
  if (params.get('checkIn') && params.get('checkOut')) {
    const banner = document.createElement('div');
    banner.className = 'alert alert-info text-center mb-0 py-2';
    banner.style.borderRadius = '0';
    banner.innerHTML =
      `Showing availability for <strong>${params.get('guests') || '2'} guest(s)</strong> ` +
      `from <strong>${params.get('checkIn')}</strong> ` +
      `to <strong>${params.get('checkOut')}</strong>. ` +
      `<a href="rooms.html" class="alert-link">Clear search</a>`;
    
    const main = document.querySelector('#roomGrid');
    if (main) main.insertAdjacentElement('beforebegin', banner);
  }
})();