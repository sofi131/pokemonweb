
var pokemon = {};
var next = "";
var previous = "";
// Aquí ponemos lo que usa el DOM
window.onload = () => {

    let menu = document.getElementById("barras-menu");

    menu.onclick = () => {
        // Objeto - método classList - propiedad ya que no tiene paréntesis
        // Contains es un método que contiene el objeto menú móvil
        if (document.getElementById("menu-movil").classList.contains("menu-movil")) {
            document.getElementById("menu-movil").classList.remove("menu-movil");
        } else {
            document.getElementById("menu-movil").classList.add("menu-movil");
        }
    }
    let buttonNext=document.getElementById("next");
    buttonNext.onclick=()=>{
        getDataUrl(next)
    }
    let buttonPrevious=document.getElementById("previous");
    buttonPrevious.onclick=()=>{
        getDataUrl(previous)
    }
    // Solicitar primeros Pokémon
    let url = "https://pokeapi.co/api/v2/pokemon";
    //mostramos loading
    getDataUrl(url);
}

// Pide info de la URL
function getDataUrl(url) {
    if (document.getElementById("loading"))
        document.getElementById("loading").style.display = "block"
    fetch(url)
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
            return resp.json();
        })
        .then(data => {
            // Datos palante => patrás <=
            if(data.next==null){
                document.getElementById("next").style.display="none";
                 // console.log(data); // Aquí puedes trabajar con los datos de respuesta
            }else{
                document.getElementById("next").style.display="inline";           
            }
            next = data.next;
            if(data.previous==null){
                document.getElementById("previous").style.display="none";
            }else{
                document.getElementById("previous").style.display="inline";           
            }
            previous = data.previous;
            if (document.getElementById("loading"))
                document.getElementById("loading").style.display = "none";
            //console.log(data); // Aquí puedes trabajar con los datos de respuesta
            mostrarDatosIniciales(data.results)
            for (const pk of data.results) {
                if (pokemon[pk.name] == undefined) {
                    pokemon[pk.name] = { url: pk.url }
                }
            }
            cargarDatosPokemon();

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function fetchPokemonRetardada(url) {
    fetch(url)
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
            return resp.json();
        })
        .then(datos => {
            extractInfoPokemon(datos);

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
// Función para obtener datos -> iterator elemento que recorre el objeto
function cargarDatosPokemon() {
    for (const pk in pokemon) {
        if (pk.img == undefined) {
            setTimeout(fetchPokemonRetardada, 2000, pokemon[pk].url);
        }
    }
}
// Cargar la información de cada Pokémon
function extractInfoPokemon(info) {
    pokemon[info.name] = {
        img: info.sprites.front_default,
        types: info.types.map(t => t.type.name),
        id: info.id,
        experience: info.base_experience
    }
    let selector = "#" + info.name + " img";
    document.querySelector(selector).src = info.sprites.front_default;
    selector = "#" + info.name + " span";
    let textos = document.querySelectorAll(selector);
    textos[0].innerHTML = pokemon[info.name].types;
    textos[1].innerHTML = pokemon[info.name].id;
    textos[2].innerHTML = pokemon[info.name].experience;

}
// Muestra nombres iniciales
function mostrarDatosIniciales(listaPk) {
    var contenidoPK = "";
    for (const pk in listaPk) {
        if (Object.hasOwnProperty.call(listaPk, pk)) {
            const element = listaPk[pk];
            contenidoPK += `
            <article id="${element.name}">
                <h3>${element.name}</h3>
                <img src="img/loading.gif" alt="">
                <div>
                    <p><label>Types: </label><span></span></p>
                    <p><label>Id: </label><span></span></p>
                    <p><label>Experience: </label><span></span></p> 
                </div>
            </article>`;
        }
    }
    document.getElementById("containerpk").innerHTML = contenidoPK;
}