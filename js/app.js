window.onload = function () {
    init();
}
let pokemons = [];

const init = async () => {
    try {
        pokemons = await getAllPokemons();
        console.log('pokemon in init', pokemons);
        printPokemons();
        addEvents();
        goToInputBox();
        resetButton();
        resetResult();
    }
    catch (error) {
        console.error('Pokemon not found!!');
    }
}


const getAllPokemons = async () => {
    try {
        const allPokemons = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=150');
        const allPokemonsJson = await allPokemons.json();
        // console.log(allPokemonsJson.results);
        const listPokemonsInApi = allPokemonsJson.results.map((pokemon, index) => {
            return {
                name: pokemon.name,
                id: index + 1,
                /* img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png` */
                img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`
            }
        })
        return listPokemonsInApi
    }
    catch (error) {
        console.error(error)
    }
}
const printPokemons = (characters) => {
    var $$spinnerLoad = document.getElementById('container-spinner');
    $$spinnerLoad.style.visibility = 'hidden';
    $$spinnerLoad.style.display = 'none';
    pokemons.forEach((pokemon, index) => {
        const $$liPokemon = document.createElement('li');
        $$liPokemon.className = "pokemon";
        const img = document.createElement('img');
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`
        img.alt = pokemon.name;
        $$liPokemon.appendChild(img);

        const $$nameP = document.createElement('p');
        $$nameP.href = 'https://pokemon.com';
        $$nameP.textContent = `${pokemon.name}`;
        $$liPokemon.appendChild($$nameP);

        const a = document.createElement('a');
        a.href = 'https://pokemon.com';
        a.textContent = `${index + 1}`;
        a.target = "_blank";
        $$liPokemon.appendChild(a);

        document.querySelector('#characters').appendChild($$liPokemon);
    });
}


const addEvents = () => {
    const $$input = document.querySelector('#searchInput')
    $$input.addEventListener('input', inputInfoSearch)
}
const inputInfoSearch = () => {
    const $$input = document.querySelector('#searchInput');

    paintFilterPokemons(findPokemon($$input.value))
}
const findPokemon = (item) => {
    const pokemonsFound = pokemons.filter((pokemon) => {

        if (pokemon.name.toLowerCase().includes(item.toLowerCase())) {
            return pokemon;
        }
    })
    return pokemonsFound;
}

const paintFilterPokemons = (arrayPokemons) => {
    const $$ul = document.querySelector('#listPokemons');

    const isEmpty = str => !str.trim().length;
    document.getElementById("searchInput").addEventListener("input", function () {
    
        if (isEmpty(this.value)) {
            console.log("NAME is invalid (Empty)");
            const $$parag = document.querySelector('#favourite');
            $$parag.style = "display:block";
            $$ul.innerHTML = '';
        } else {
            console.log(`NAME value is: ${this.value}`);
        }
    });
    // PARA QUE NO VUELVA A SALIR EL MISMO RESULTADO REPETIDO
    $$ul.innerHTML = '';

    arrayPokemons.map((pokemon) => {
        const $$li = document.createElement('li');
        const $$parag = document.querySelector('#favourite');

        $$li.innerHTML = `
            <div class="card">
                <h3 class="card__title" id=${pokemon.id}>${pokemon.name}</h3>
                <p class="card__id">${pokemon.id}</p>
                <img src="${pokemon.img}" class="card__img">
            </div>
        `
        // $$li.classList.toggle('active');
        $$ul.appendChild($$li);
        $$parag.style = "display:none";
        // console.log(pokemon.img);
    })
}
const goToInputBox = () => {
    document.getElementById('favourite').onclick = function () {
        document.getElementById('searchInput').focus();
    };
}

const resetButton = () => {
    const $$button = document.querySelector('#searchButton');
    $$button.addEventListener('click', resetResult);
}
const resetResult = () => {
    const $$listPokemons = document.querySelector('#listPokemons');
    $$listPokemons.innerHTML = '';

    const $$parag = document.querySelector('#favourite');
    $$parag.style = "display:block";

    const $$input = document.querySelector('#searchInput');
    $$input.value = null;
};

