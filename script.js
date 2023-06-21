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
          var cardTable = document.getElementById('cardDetails');
          var tbody = cardTable.getElementsByTagName('tbody')[0];
          tbody.innerHTML = '';
  
          cards.forEach(card => {
            if (card.imageUrl) {
              var cardRow = createCardRow(card);
              tbody.appendChild(cardRow);
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
  

  function createCardRow(card) {
    if (!card.imageUrl) {
      return null; // Skip card if image is missing
    }
  
    var row = document.createElement('tr');
  
    var nameCell = document.createElement('td');
    nameCell.textContent = card.name;
    row.appendChild(nameCell);
  
    var imageCell = document.createElement('td');
    var image = document.createElement('img');
    image.src = card.imageUrl;
    image.alt = card.name;
    imageCell.appendChild(image);
    row.appendChild(imageCell);
  
    var setCell = document.createElement('td');
    setCell.textContent = card.set;
    row.appendChild(setCell);
  
    var typeCell = document.createElement('td');
    typeCell.textContent = card.type;
    row.appendChild(typeCell);
  
    var rarityCell = document.createElement('td');
    rarityCell.textContent = card.rarity;
    row.appendChild(rarityCell);
  
    var manaCostCell = document.createElement('td');
    manaCostCell.textContent = card.manaCost;
    row.appendChild(manaCostCell);
  
    var priceCell = document.createElement('td');
    if (card.prices && card.prices.usd) {
      priceCell.textContent = '$' + card.prices.usd;
    }
    row.appendChild(priceCell);
  
    // Add click event listener to row to open modal
    row.addEventListener('click', function() {
      openModal(card.name, card.imageUrl);
    });
  
    return row;
  }
  

  
  
  