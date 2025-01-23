const buttons = document.querySelectorAll('.flex button'); //array de botones
const sectionGrid = document.querySelector('#characters .grid'); //seccion donde pinto los Pokemons
const selectStatus = document.querySelector('#statusSelect');//select de tipos 

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function ShinyRoulete(){
    let random = getRandomInt(10);
    return random == 0 ? true : false;
}
//añado a los botones el listener
function goToPage(event) {
    // aqui necesito saber la pagina de api a la que voy a conectar
    init(event.target.dataset.url, urltypes)
}

buttons.forEach(button => button.addEventListener('click', goToPage))

async function obtenerStatus(event) {
    console.log(event.target.value)
    const DataType = await getApiInfo(event.target.value);
    printAllCharactersForType(DataType.pokemon, sectionGrid);


    //tendremos que llamar a api para obtener el listado con ese status, y posteriormente pintar
}
selectStatus.addEventListener('change', obtenerStatus);

function printAllCharactersForType(list, dom) {
    dom.innerHTML = "";
    list.forEach(pokemon => printOneCharacter(pokemon.pokemon, dom))
    
}




async function printOneCharacter(pokemon, dom) {
    let shiny = ShinyRoulete();
    let dataPokemon = await getApiInfo(pokemon.url);
    const article = document.createElement('article');
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = shiny ? dataPokemon.sprites.front_shiny : dataPokemon.sprites.front_default;
    img.alt = dataPokemon.name
    const types = document.createElement('div') 
    const figureType = document.createElement('figure');
    for (let type of dataPokemon.types) {
        
        const imgType = document.createElement('img');
        let dataType = await getApiInfo(type.type.url)
        imgType.src = dataType.sprites['generation-vi']['x-y'].name_icon;
        imgType.alt = dataType.name;
    figureType.appendChild(imgType);
    
    }   
    types.appendChild(figureType);    
    const h3 = document.createElement('h3');
    h3.textContent = dataPokemon.name;

    const description = document.createElement('p');
    description.textContent = 'Descripcion'

    figure.appendChild(img)
    article.append(figure, h3, description, types);
    dom.appendChild(article)

}

function printAllCharacters(list, dom) {
    dom.innerHTML = "";
    list.forEach(pokemon => printOneCharacter(pokemon, dom))
    
}
function printOneType(type, dom){
    const option = document.createElement('option')
    option.textContent = type.name;
    option.value = type.url;
    dom.appendChild(option);
}

function printAllTypes(types,dom){
    types.forEach(type => printOneType(type, dom))
}

async function init(url, urltypes) {
    const data = await getApiInfo(url);
    const dataType = await getApiInfo(urltypes);
    buttons[0].dataset.url = data.previous;
    buttons[1].dataset.url = data.next;
    printAllCharacters(data.results, sectionGrid);
    printAllTypes(dataType.results, selectStatus);
}
init(url, urltypes);