const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const loadLessButton = document.getElementById('loadLessButton')

const maxRecords= 151
const limit = 10
let offset = 0;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) =>  `
    <div class="attributes">
            <li class="pokemon ${pokemon.type}">
            
              <span class="number">#${pokemon.number}</span>
              <span class="name">${pokemon.name}</span>
    
              <div class="detail">
                <ol class="types">
                  ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
    
                <img src="${pokemon.gif}"
                    alt="${pokemon.name}">
    
              </div>
            
            </li>
            <ul class="dp-menu">
              <li>Experience Base: <a>${pokemon.experience}</a></li>
              <li>Height: <a>${pokemon.height}</a></li>
              <li>Weight: <a>${pokemon.weight}</a></li>
              <li>HP:<a> ${pokemon.hp}</a></li>
              <li>Attack: <a>${pokemon.attack}</a></li>
              <li>Defense: <a>${pokemon.defense}</a></li>
              <li>Special Attack: <a>${pokemon.specialAttack}</a></li>
              <li>Special Defense: <a>${pokemon.specialDefense}</a></li>
              <li>Speed: <a>${pokemon.speed}</a></li>           
            </ul>
      </div>
      `
    ).join('')

    pokemonList.innerHTML = newHtml
    
    if (offset > 0) {
      loadLessButton.style.display = 'block';
    } else {
      loadLessButton.style.display = 'none';
    }
    
  })
}

loadPokemonItens(offset, limit)


loadMoreButton.addEventListener('click', () => {
  offset += limit

  const qtdRecordNextPage = offset + limit

  if (qtdRecordNextPage >= maxRecords) {
    const newlimit = maxRecords - offset
    loadPokemonItens(offset, newlimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit)
  } 
})

loadLessButton.addEventListener('click', () => {
  offset -= limit

  const qtdRecordNextPage = offset - limit

  if (qtdRecordNextPage >= maxRecords) {
    const newlimit = maxRecords - offset
    loadPokemonItens(offset, newlimit)
 
  } else {
    loadPokemonItens(offset, limit)
  }
})