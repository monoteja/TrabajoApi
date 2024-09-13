const obtenervalorInput = () => {
    let inputTexto = document.getElementById('input_pokemon');
    let valor = inputTexto.value.toLowerCase();  // Convertimos el valor a minúsculas
    peticionApi(valor);  // Llama a la función que hará la petición a la API
}

const peticionApi = (pokemon) => {
    const baseURL = 'https://pokeapi.co/api/v2/';
    const endpoint = `pokemon/${pokemon}`;
    const url = `${baseURL}${endpoint}`;
  
    axios.get(url)
        .then((res) => printData(res.data))  // Si la petición es exitosa, mostramos los datos
        .catch((err) => {
            document.getElementById('show-info').innerHTML = '<p>Pokémon no encontrado. Intenta de nuevo.</p>';
            console.log(err);
        });
}

const printData = (data) => {
    let respuesta = document.getElementById('show-info');

    // Imagen del Pokémon
    const spriteUrl = data.sprites.front_default;

    // Habilidades
    const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');

    // Estadísticas base
    const stats = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ');

    // Movimientos (limitado a los primeros 5 para no sobrecargar)
    const moves = data.moves.slice(0, 5).map(moveInfo => moveInfo.move.name).join(', ');

    // Mostrar información en el cuadro de la Pokédex
    respuesta.innerHTML = `
        <img src="${spriteUrl}" alt="${data.name}">
        <span>ID: ${data.id}</span>
        <label>Nombre: <h3>${data.name}</h3></label>
        <label>Altura: <h4>${data.height}</h4></label>
        <label>Peso: <h4>${data.weight}</h4></label>
        <label>Tipo: <h4>${data.types.map(typeInfo => typeInfo.type.name).join(', ')}</h4></label>
        <label>Habilidades: <h4>${abilities}</h4></label>
        <label>Estadísticas: <h4>${stats}</h4></label>
        <label>Experiencia Base: <h4>${data.base_experience}</h4></label>
        <label>Movimientos (primeros 5): <h4>${moves}</h4></label>
    `;
}
