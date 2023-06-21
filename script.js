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
  
  function convertUSDtoCAD(usdPrice) {
    // Replace 'YOUR_APP_ID' with your actual app ID or use a different currency conversion service
    const appId = '6eb31aae1bcc4226aff9be25733ec63f';
    const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${appId}`;
  
    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.rates && data.rates.CAD) {
          const cadRate = data.rates.CAD;
          const cadPrice = (usdPrice * cadRate).toFixed(2);
          return cadPrice;
        } else {
          throw new Error('Conversion rate not available.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        return 'N/A';
      });
  }
  
  function createCardDetailsElement(card) {
    const cardDetails = document.createElement('div');
    cardDetails.className = 'card-details';
  
    const variationHTML = createVariationsHTML(card);
  
    const normalPriceUSD = card.prices.usd || 'N/A';
    const foilPriceUSD = card.prices.usd_foil || 'N/A';
  
    // Convert USD prices to CAD
    convertUSDtoCAD(normalPriceUSD)
      .then(cadPrice => {
        const normalPriceCAD = cadPrice !== 'N/A' ? `$${cadPrice} CAD` : 'N/A';
  
        convertUSDtoCAD(foilPriceUSD)
          .then(cadFoilPrice => {
            const foilPriceCAD = cadFoilPrice !== 'N/A' ? `$${cadFoilPrice} CAD` : 'N/A';
  
            cardDetails.innerHTML = `
              <h2>${card.name}</h2>
              <img src="${card.image_uris.normal}" alt="${card.name}">
              <p><strong>Type:</strong> ${card.type_line}</p>
              <p><strong>Rarity:</strong> ${card.rarity}</p>
              <p><strong>Set:</strong> ${card.set_name}</p>
              <p><strong>Artist:</strong> ${card.artist}</p>
              <p><strong>Price:</strong> $${normalPriceUSD} USD / ${normalPriceCAD}</p>
              <p><strong>Price Foil:</strong> ${foilPriceUSD} USD / ${foilPriceCAD})</p>
              ${variationHTML}
            `;
          });
      });
  
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
  