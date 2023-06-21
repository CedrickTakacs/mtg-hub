document.addEventListener('DOMContentLoaded', function() {
    var currentPage = location.pathname.split('/').slice(-1)[0];
    var navLinks = document.querySelectorAll('.navbar li a');
  
    navLinks.forEach(function(link) {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
  });
  