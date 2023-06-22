const apiKey = 'f8763e35-362f-4384-9ca5-c89f567dc909';


// Function to fetch Pokémon cards from the API
async function searchPokemonCards(name) {
  const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${name}`, {
    headers: {
      'X-Api-Key': apiKey
    }
  });
  const data = await response.json();
  return data.data;
}

// Function to display the cards on the webpage
function showCards(cards) {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  cards.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.className = "card";

    const imgElement = document.createElement("img");
    imgElement.src = card.images.small;

    cardElement.appendChild(imgElement);
    cardContainer.appendChild(cardElement);
  });
}

// Event listener for the search input
document.getElementById("searchInput").addEventListener("input", async event => {
  const searchTerm = event.target.value.trim();

  if (searchTerm.length >= 3) {
    const cards = await searchPokemonCards(searchTerm);
    showCards(cards);
  }
});

// Event listener for the search button click
document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("searchButton");
  if (!searchButton) return; // Exit function if button not found

  searchButton.addEventListener("click", async () => {
    const searchTerm = document.getElementById("searchInput").value.trim();
    console.log("searchInput: ",searchTerm);

    if (searchTerm.length >= 3) {
        console.log("2=",searchTerm);
      const sets = await searchPokemonSets(searchTerm);
      
      console.log(sets);
      showSets(sets);
    }
  });
});

// Function to display the loading animation
function showLoading() {
    const loadingContainer = document.getElementById("loadingContainer");
    loadingContainer.style.display = "flex";
  }
  
  // Function to hide the loading animation
  function hideLoading() {
    const loadingContainer = document.getElementById("loadingContainer");
    loadingContainer.style.display = "none";
  }
  
  // Event listener for the search input
  document.getElementById("searchInput").addEventListener("input", async event => {
    const searchTerm = event.target.value.trim();
  
    if (searchTerm.length >= 3) {
      showLoading(); // Display the loading animation
  
      try {
        const cards = await searchPokemonCards(searchTerm);
        showCards(cards);
      } catch (error) {
        console.error(error);
      } finally {
        hideLoading(); // Hide the loading animation
      }
    } else {
      const cardContainer = document.getElementById("cardContainer");
      cardContainer.innerHTML = ""; // Clear the card container if the search term is empty
    }
  });

// ... Existing JavaScript code ...

// Function to display the cards on the webpage
function showCards(cards) {
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";
  
    cards.forEach(card => {
      const cardElement = document.createElement("div");
      cardElement.className = "card";
  
      const imgElement = document.createElement("img");
      imgElement.src = card.images.small;
  
      const detailsElement = document.createElement("div");
      detailsElement.className = "card-details";
      detailsElement.innerHTML = `
        <h3>${card.name}</h3>
        <p>Type: ${card.types ? card.types.join(", ") : "N/A"}</p>
        <p>Rarity: ${card.rarity}</p>
        <p>Set: ${card.set.name}</p>
      `;
  
      const buyLinkElement = document.createElement("a");
      buyLinkElement.textContent = "Buy Card";
      if (card.tcgplayer && card.tcgplayer.url) {
        buyLinkElement.href = card.tcgplayer.url;
        buyLinkElement.target = "_blank";
      } else {
        buyLinkElement.classList.add("disabled");
        buyLinkElement.setAttribute("disabled", "disabled");
      }
  
      cardElement.appendChild(imgElement);
      cardElement.appendChild(detailsElement);
      cardElement.appendChild(buyLinkElement);
      cardContainer.appendChild(cardElement);
    });
  
    const totalResults = cards.length;
    const resultCountElement = document.getElementById("resultCount");
    resultCountElement.textContent = `Total Results: ${totalResults}`;
  }
  
  // ... Rest of the code ...
  
  

  
  