const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
const urltypes ='https://pokeapi.co/api/v2/type?limit=18&offset=0';
/**
 recibe un url y devuelve un objeto con la info de la paginacion y results con los 10 Pokemons de esa pagina
 */
async function getApiInfo(url) {
    try {
        const peticion = await fetch(url, { method: 'get' })
        const data = await peticion.json();
        return data
    } catch (error) {
        console.log(error)
    }
}
