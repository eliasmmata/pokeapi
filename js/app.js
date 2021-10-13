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
        // console.log(allPokemonsJson.results);
        const listPokemonsInApi = allPokemonsJson.results.map((pokemon, index) => {
            return {
                name: pokemon.name,
                id: index + 1,
                /* img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png` */
                img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg`
            }
        })
        return listPokemonsInApi
    }
    catch(error) {
        console.error(error)
    }
}

const addEvents = () => {
    /* const $$button = document.querySelector('#searchButton');
    $$button.addEventListener('click', inputInfoSearch); */
    // diferente
    const $$input = document.querySelector('#searchInput')
    $$input.addEventListener('input', inputInfoSearch)
}
const inputInfoSearch = () => {
    const $$input = document.querySelector('#searchInput');
    
    paintFilterPokemons(findPokemon($$input.value))
}
const findPokemon = (item) => {
    // console.log(item)
    const pokemonsFound = pokemons.filter((pokemon) => {

        if(pokemon.name.toLowerCase().includes(item.toLowerCase())) {
            return pokemon;
        }
    })
    // return pokemonsFound;
    return pokemonsFound;
}

const paintFilterPokemons = (arrayPokemons) => {
    const $$ul = document.querySelector('#listPokemons');
    $$ul.innerHTML = '';

    arrayPokemons.map((pokemon) => {
        const  $$li = document.createElement('li');
        $$li.innerHTML = `
            <div class="card">
                <h3 class="card__title" id=${pokemon.id}>${pokemon.name}</h3>
                <p class="card__id">${pokemon.id}</p>
                <img src="${pokemon.img}" class="card__img">
            </div>
        `
        $$ul.appendChild($$li)
        console.log(pokemon.img)
    })
}
