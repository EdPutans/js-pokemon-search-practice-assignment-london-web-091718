let localPokemonData
let filteredPokemons
const pokeList = document.querySelector('#pokemon-container')
const search = document.querySelector('#pokemon-search-input')
let searchQuery

search.addEventListener('keyup', event => {
  searchQuery = search.value
  console.log(searchQuery)
  filteredPokemons=localPokemonData.filter(pokemon =>{
    return pokemon.name.includes(searchQuery)
  })
  console.log(filteredPokemons)
  pokeList.innerHTML=""
  addPokemonsToPage(filteredPokemons)
}
)

const addPokemonToPage = pokeObject => {
  const pokeItem = document.createElement('div')
  pokeItem.innerHTML=`
  <div class="pokemon-container">
  <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
    <h1 class="center-text">${pokeObject.name}</h1>
    <div style="width:239px;margin:auto">
      <div style="width:96px;margin:auto">
        <img data-id="6" data-action="flip" class="toggle-sprite" src="${pokeObject.sprites.front}">
      </div>
    </div>
  </div>
  </div>
  `

  
  pokeItem.addEventListener('mouseenter', event=> {
    const imgEl = pokeItem.querySelector('.toggle-sprite')
    imgEl.src = 
      pokeObject.sprites.back 
  })

  pokeItem.addEventListener('mouseleave', event => {
    const imgEl = pokeItem.querySelector('.toggle-sprite')
    imgEl.src=pokeObject.sprites.front
  })
      
// if imgEl.src === pokeObj.sprites.front{
//     imgEl.src = back
// } else { front}
  pokeList.appendChild(pokeItem)

}

addPokemonsToPage = pokemons => 
  pokemons.forEach(pokemon => addPokemonToPage(pokemon))
// POKEMON.forEach(pokemon => addPokemonToPage(pokemon))

const getPokemons = () =>
  fetch('http://localhost:3000/pokemon')
    .then(resp => resp.json())

getPokemons()
  .then(pokemons => {
    localPokemonData = pokemons
    addPokemonsToPage(pokemons)
  })
