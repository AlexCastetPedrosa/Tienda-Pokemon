const buttons = document.querySelectorAll('.flex button'); //array de botones
const sectionGrid = document.querySelector('#characters .grid'); //seccion donde pinto los Pokemons
const selectStatus = document.querySelector('#statusSelect');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function ShinyRoulete(){
    let random = getRandomInt(10);
    return random == 0 ? true : false;
}

async function printOneCharacter(pokemon, dom) {
    let shiny = ShinyRoulete();
    let dataPokemon = await getPokemonInfo(pokemon.url);
    const article = document.createElement('article');
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = shiny ? dataPokemon.sprites.front_shiny : dataPokemon.sprites.front_default;
    img.alt = dataPokemon.name
    const types = document.createElement('p')   
    const h3 = document.createElement('h3');
    h3.textContent = dataPokemon.name;

    const description = document.createElement('p');
    description.textContent = 'Descripcion'

    figure.appendChild(img)
    article.append(figure, h3, description);
    dom.appendChild(article)

}

function printAllCharacters(list, dom) {
    dom.innerHTML = "";
    list.forEach(pokemon => printOneCharacter(pokemon, dom))
    
}
function printOneType(type, dom){
    const option = document.createElement('option')
    option.textContent = type.name
    dom.appendChild(option);
}

function printAllTypes(types,dom){
    types.forEach(type => printOneType(type, dom))
}

async function init(url, urltypes) {
    const data = await getAllPokemons(url);
    const dataType = await getAllPokemons(urltypes);
    buttons[0].dataset.url = data.previous;
    buttons[1].dataset.url = data.next;
    printAllCharacters(data.results, sectionGrid);
    printAllTypes(dataType.results, selectStatus);
}
init(url, urltypes);