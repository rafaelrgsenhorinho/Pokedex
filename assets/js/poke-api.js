const pokeApi = {}

function convertPokeApiDetailPokemon(pokeDetail) {
    const pokemon = new Pokemon()

    //Detalhes dos pokemons
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.gif = pokeDetail.sprites.versions['generation-v']['black-white'].animated.front_default

    //Atributos dos pokemons
    
    pokemon.experience = pokeDetail.base_experience
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    pokemon.hp = pokeDetail.stats[0].base_stat
    pokemon.attack = pokeDetail.stats[1].base_stat
    pokemon.defense = pokeDetail.stats[2].base_stat
    pokemon.specialAttack = pokeDetail.stats[3].base_stat
    pokemon.specialDefense = pokeDetail.stats[4].base_stat
    pokemon.speed = pokeDetail.stats[5].base_stat


    return pokemon
}

pokeApi.getPokemonDeatil = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDeatil))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)

}