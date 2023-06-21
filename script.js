function searchCard() {
    const cardName = document.getElementById('cardName').value;
    const apiUrl = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(cardName)}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.object === 'error') {
          displayErrorMessage(data.details || 'Card not found!');
        } else {
          displayMultipleCards(data.data);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        displayErrorMessage('An error occurred. Please try again later.');
      });
  }
  
  function displayMultipleCards(cards) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';
  
    cards.forEach(card => {
      const cardDetails = createCardDetailsElement(card);
      cardContainer.appendChild(cardDetails);
    });
  }
  
  function createCardDetailsElement(card) {
    const cardDetails = document.createElement('div');
    cardDetails.className = 'card-details';
  
    const variationHTML = createVariationsHTML(card);
  
    const price = card.prices.usd || 'N/A';
  
    cardDetails.innerHTML = `
      <h2>${card.name}</h2>
      <img src="${card.image_uris.normal}" alt="${card.name}">
      <p><strong>Type:</strong> ${card.type_line}</p>
      <p><strong>Rarity:</strong> ${card.rarity}</p>
      <p><strong>Set:</strong> ${card.set_name}</p>
      <p><strong>Artist:</strong> ${card.artist}</p>
      <p><strong>Price:</strong> $${price}</p>
      ${variationHTML}
    `;
  
    return cardDetails;
  }
  
  function createVariationsHTML(card) {
    let variationHTML = '';
  
    if (card.all_parts) {
      variationHTML += '<p><strong>Variations:</strong></p>';
      variationHTML += '<ul>';
  
      card.all_parts.forEach(variation => {
        variationHTML += `<li>${variation.name}</li>`;
      });
  
      variationHTML += '</ul>';
    }
  
    return variationHTML;
  }
  
  function displayErrorMessage(message) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = `<p class="error">${message}</p>`;
  }
  