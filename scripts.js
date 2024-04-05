/**
 * Fetches list of Marvel characters.
 */
async function fetchMarvelCharacters() {
  const publicKey = 'c160808f6cf8f57217704713bca2d3ef'; // Replace with your Marvel API public key
  const timestamp = Date.now().toString();
  const privateKey = '388b6be38d60db77c8d41e807ef48bf211311483'; // Replace with your Marvel API private key
  const hash = md5(timestamp + privateKey + publicKey);
  const url = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error('Error fetching Marvel characters:', error);
    return [];
  }
}

/**
 * Create one card from character data.
 */
function createCharacterCard(character) {
  return `
    <li class="card">
      <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
      <div class="card-content">
        <h3>${character.name}</h3>
        <p>${character.description || 'No description available'}</p>
      </div>
    </li>
  `;
}

/**
 * Create multiple cards from array of character data.
 */
function createCharacterCards(characters) {
  return characters.map(createCharacterCard).join('');
}

/**
 * Render Marvel characters based on search input.
 */
async function renderMarvelCharacters() {
  const searchBar = document.getElementById('searchbar');
  const searchQuery = searchBar.value.toLowerCase();
  const characterResults = document.getElementById('character-results');

  const characters = await fetchMarvelCharacters();

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchQuery)
  );

  characterResults.innerHTML = createCharacterCards(filteredCharacters);
}

// Attach event listener to search bar for dynamic search
const searchbar = document.getElementById("searchbar");
searchbar.addEventListener("keyup", renderMarvelCharacters);

// Initial rendering of characters
renderMarvelCharacters();