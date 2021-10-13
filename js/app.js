window.onload = function() {
    init();
}
let pokemons = [];

const init = async () => {
    try {
        pokemons = await getAllPokemons();
        addEvents();
        console.log('pokemon in init', pokemons);
    }
    catch(error) {
        console.error('Pokemon not found!!');
    }
}

const getAllPokemons = async ()  => {
    try {
        const allPokemons = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=150');
        const allPokemonsJson = await allPokemons.json();
        console.log(allPokemonsJson.results);
        const listPokemonsInApi = allPokemonsJson.results.map((pokemon, index) => {
            return {
                name: pokemon.name,
                id: index + 1,
                img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png'
            }
        })
        return listPokemonsInApi
    }
    catch(error) {
        console.error(error)
    }
}

const addEvents = () => {
    const $$button = document.querySelector('#searchButton');
    $$button.addEventListener('click', inputInfoSearch)
}
const inputInfoSearch = () => {
    const $$input = document.querySelector('#searchInput');
    findPokemon($$input.value)

}
const findPokemon = (item) => {
    // console.log(item)
    const pokemonsFound = pokemons.filter((pokemon) => {
        if(pokemon.name == item) {
            return pokemon.name;
        }
     });
}