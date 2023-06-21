function handleKeyPress(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      searchCard();
    }
  }
    
function searchCard() {
    var cardName = document.getElementById('cardNameInput').value;
    var encodedCardName = encodeURIComponent(cardName);
    var apiUrl = 'https://api.magicthegathering.io/v1/cards?name=' + encodedCardName;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        var cards = data.cards;
        if (cards.length > 0) {
          var cardDetails = document.getElementById('cardDetails');
          cardDetails.innerHTML = '';
  
          cards.forEach(card => {
            var cardInfo = `
              <h2>${card.name}</h2>
              <img src="${card.imageUrl}" alt="${card.name}" />
              <p>Set: ${card.set}</p>
              <p>Type: ${card.type}</p>
              <p>Rarity: ${card.rarity}</p>
              <p>Mana Cost: ${card.manaCost}</p>
              <p>Price: <span id="cardPrice-${card.id}">Loading...</span></p>
            `;
  
            cardDetails.innerHTML += cardInfo;
  
            if (card.prices && card.prices.usd) {
              fetchCardPrice(card.id, card.prices.usd);
            }
          });
        } else {
          alert('Card not found!');
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  
  function fetchCardPrice(cardId, cardPrice) {
    // Replace this with your own logic to fetch the latest card price
    // You can use another API or a database to retrieve the price
    // For demonstration purposes, we'll simply display the provided price
    var cardPriceElement = document.getElementById('cardPrice-' + cardId);
    cardPriceElement.textContent = '$' + cardPrice;
  }
  