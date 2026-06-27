(function () {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return; // Only run on the 404 page

  let seconds = 30;

  const timer = setInterval(function () {
    seconds--;
    countdownEl.textContent = seconds;

    if (seconds <= 0) {
      clearInterval(timer);
      // Redirect to homepage. /
      window.location.href = '../index.html';
    }
  }, 1000);
})();