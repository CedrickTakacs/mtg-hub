function fetchAllExtensions() {
  const apiUrl = 'https://api.scryfall.com/sets';

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.object === 'list') {
        return data.data;
      } else {
        throw new Error('Failed to fetch extensions');
      }
    });
}

function populateExtensionSelect(extensions) {
  const selectElement = document.createElement('select');
  selectElement.addEventListener('change', function(event) {
    const selectedExtension = event.target.value;
    displayCardsByExtension(selectedExtension);
  });

  const defaultOption = document.createElement('option');
  defaultOption.textContent = 'Select an extension';
  defaultOption.disabled = true;
  defaultOption.selected = true;
  selectElement.appendChild(defaultOption);

  extensions.forEach(extension => {
    const option = document.createElement('option');
    option.value = extension.code;
    option.textContent = `${extension.name} (${extension.code})`;
    selectElement.appendChild(option);
  });

  const extensionSelect = document.getElementById('extensionSelect');
  extensionSelect.appendChild(selectElement);
}

function fetchCardsByExtension(extension) {
  const apiUrl = `https://api.scryfall.com/cards/search?q=set%3A${extension}`;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.object === 'list') {
        return data.data;
      } else {
        throw new Error('Failed to fetch cards by extension');
      }
    });
}

function createCardElement(card) {
  const cardElement = document.createElement('div');
  cardElement.className = 'card';

  const cardImage = document.createElement('img');
  cardImage.src = card.image_uris.normal;
  cardImage.alt = card.name;

  const cardName = document.createElement('h2');
  cardName.textContent = card.name;

  cardElement.appendChild(cardImage);
  cardElement.appendChild(cardName);

  return cardElement;
}

function displayCardsByExtension(extension) {
  const cardList = document.getElementById('cardList');
  cardList.innerHTML = '';

  fetchCardsByExtension(extension)
    .then(cards => {
      cards.forEach(card => {
        const cardElement = createCardElement(card);
        cardList.appendChild(cardElement);
      });
    })
    .catch(error => {
      console.error('Error:', error);
      cardList.innerHTML = '<p>Error fetching cards. Please try again later.</p>';
    });
}

fetchAllExtensions()
  .then(extensions => {
    populateExtensionSelect(extensions);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  function initializeSelect2() {
    const selectElement = document.querySelector('#extensionSelect select');
    $(selectElement).select2();
  }
  
  // Add event listeners to apply and remove zoom class
const cardList = document.getElementById('cardList');

cardList.addEventListener('mouseover', function(event) {
  const targetCard = event.target.closest('.card');
  if (targetCard) {
    targetCard.classList.add('zoomed');
  }
});

cardList.addEventListener('mouseout', function(event) {
  const targetCard = event.target.closest('.card');
  if (targetCard) {
    targetCard.classList.remove('zoomed');
  }
});
