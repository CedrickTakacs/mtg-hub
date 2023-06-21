document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    // Validate form data
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
      alert('Please fill in all fields');
      return;
    }
  
    // Prepare form data for submission
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
  
    // Send form data to server
    fetch('submit-form.php', {
      method: 'POST',
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        // Display success or error message based on the response from the server
        if (data === 'success') {
          displaySuccessMessage();
        } else {
          displayErrorMessage();
        }
      })
      .catch(error => {
        console.error('Error:', error);
        displayErrorMessage();
      });
  });
  
  function displaySuccessMessage() {
    const form = document.getElementById('contactForm');
    form.innerHTML = '<h2>Thank you for contacting us!</h2><p>We will get back to you soon.</p>';
  }
  
  function displayErrorMessage() {
    alert('An error occurred. Please try again later.');
  }
  
  