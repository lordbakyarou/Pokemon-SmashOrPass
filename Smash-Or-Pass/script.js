// script.js

let pokemonData = [];
let currentIndex = 0;
let smashScore = 0;
let passScore = 0;

let currentPokemonIndex = 0;

// Fetch Pokémon data from PokeAPI
async function fetchPokemonData() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
    const data = await response.json();
    pokemonData = data.results;
    displayPokemon(); // Call displayPokemon() once after fetching the Pokémon data
  } catch (error) {
    console.log("Error fetching Pokémon data:", error);
  }
}

// Function to display the current Pokémon card
function displayPokemon() {
  const currentPokemon = pokemonData[currentPokemonIndex];
  if (currentPokemon) {
    const pokemonCard = document.querySelector("#pokemonCard .card");
    const pokemonNameElement = document.querySelector("#pokemonName");
    const pokemonImageElement = document.querySelector("#pokemonImage");
    const pokemonIndexElement = document.querySelector("#pokemonIndex");
    const totalPokemons = pokemonData.length;

    // Retrieve the Pokémon name
    const pokemonName = currentPokemon.name;

    // Retrieve the front default sprite URL
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      currentPokemonIndex + 1
    }.png`;

    // Update the Pokémon name
    pokemonNameElement.textContent = pokemonName;

    // Update the Pokémon image
    pokemonImageElement.src = spriteUrl;

    // Update the Pokémon index and total count
    pokemonIndexElement.textContent = `#${
      currentPokemonIndex + 1
    } of ${totalPokemons}`;
  } else {
    console.log("No current Pokémon found.");
  }
}

// Fetch Pokémon details from PokeAPI based on URL
async function fetchPokemonDetails(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching Pokémon details:", error);
  }
}

// Function to handle the "Smash" button click
function smash() {
  smashScore++;
  document.querySelector("#smashScoreValue").textContent = smashScore;

  currentPokemonIndex++;
  if (currentPokemonIndex >= pokemonData.length) {
    currentPokemonIndex = 0;
  }
  displayPokemon();
}

// Function to handle the "Pass" button click
function pass() {
  passScore++;
  document.querySelector("#passScoreValue").textContent = passScore;

  currentPokemonIndex++;
  if (currentPokemonIndex >= pokemonData.length) {
    currentPokemonIndex = 0;
  }
  displayPokemon();
}

// Add event listeners to the buttons
document.querySelector("#smashButton").addEventListener("click", smash);
document.querySelector("#passButton").addEventListener("click", pass);

// Call the fetchPokemonData() function initially to fetch Pokémon data and start the game
fetchPokemonData();
