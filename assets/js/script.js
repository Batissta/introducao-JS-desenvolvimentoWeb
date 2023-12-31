const pokemonList = document.getElementById("pokemonList")
const mostrarMaisButton = document.getElementById("mostrarMais")
const limit = 10;
let offset = 0;
const qtdMaxima = 150;

function mostrarMaisPokemons(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokeList = []) => {
            const result = pokeList.map((pokemon)=>`
                    <li class="pokemon ${pokemon.type}">
                        <span class="number">#${pokemon.number}</span>
                        <span class="name">${pokemon.name}</span>

                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>

                            <img src="${pokemon.photo}"
                                alt="${pokemon.name}">
                        </div>
                    </li>
            `).join("");
            pokemonList.innerHTML += result
        })
}

mostrarMaisPokemons(offset, limit)

mostrarMaisButton.addEventListener(`click`, () =>{
    offset += limit;
    const qtdRecordNextPage = offset + limit;
    if(qtdRecordNextPage >= qtdMaxima){
        const newLimit = qtdMaxima - offset;
        mostrarMaisPokemons(offset, newLimit);
        mostrarMaisButton.parentElement.removeChild(mostrarMaisButton)
    }else{
        mostrarMaisPokemons(offset, limit)
    }
})