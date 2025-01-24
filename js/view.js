const buttons = document.querySelectorAll('.flex button'); //array de botones
const sectionGrid = document.querySelector('#characters .grid'); //seccion donde pinto los Pokemons
const selectStatus = document.querySelector('#statusSelect');//select de tipos 
const button = document.querySelector('header button');
        button.addEventListener('click', cargarCarrito);
        const carrito = document.querySelector('.carrito');
//funcion que enseña el carrito o PC en este caso
        function cargarCarrito(event) {
            carrito.classList.toggle('dentro');
        }
//funcion Random
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
//Funcion para sabes si es shiny
function ShinyRoulete(){
    let random = getRandomInt(10);
    return random == 0 ? true : false;
}
//añado a los botones el listener
function goToPage(event) {
    init(event.target.dataset.url, urltypes)  
}

buttons.forEach(button => button.addEventListener('click', goToPage))
//Funcion para obtener el value del select
async function obtenerStatus(event) {
    const DataType = await getApiInfo(event.target.value);
    printAllCharactersForType(DataType.pokemon, sectionGrid);


    //tendremos que llamar a api para obtener el listado con ese status, y posteriormente pintar
}
selectStatus.addEventListener('change', obtenerStatus);
//funcion para printear los pokemon del mismo tipo, la array es distinta a la url normal
function printAllCharactersForType(list, dom) {
    dom.innerHTML = "";
    list.forEach(pokemon => printOneCharacter(pokemon.pokemon, dom))
    
}



//funcion que pinta un Pokemon
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
    h3.textContent = dataPokemon.name.toUpperCase();
    const ButtonCaptura = document.createElement('button');
    ButtonCaptura.textContent = `Capturar ${dataPokemon.stats[0].base_stat} Pokeballs`
    ButtonCaptura.dataset.Pokeballs = `Capturar ${dataPokemon.stats[0].base_stat} Pokeballs`
    ButtonCaptura.addEventListener('click', CapturePokemon);
    figure.appendChild(img)
    article.append(figure, h3, types, ButtonCaptura);
    dom.appendChild(article)

}
//Funcion que captura un Pokemon en la caja para que decidas si te lo quedas o no
function CapturePokemon(event){
    let boton = event.target;
    let articlePadre = boton.parentNode;
    carrito.appendChild(articlePadre);
    boton.textContent = 'Cancelar'
    boton.addEventListener('click', BorrarCompra)
}
//Funcion para cancelar captura y devolver el pokemon
function BorrarCompra(event){
    event.target.textContent = event.target.dataset.Pokeballs
    sectionGrid.appendChild(event.target.parentNode);
}
//Pintar todos los pokemon y reset del dom
function printAllCharacters(list, dom) {
    dom.innerHTML = "";
    list.forEach(pokemon => printOneCharacter(pokemon, dom))
    
}
//Funcion para poner cada tipo en el select
function printOneType(type, dom){
    const option = document.createElement('option')
    option.textContent = type.name;
    option.value = type.url;
    dom.appendChild(option);
}
//Funcion para cargar los tipos
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