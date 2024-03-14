var pokemon = {};
var next = "";
var previous = "";

// Función para buscar Pokémon
function searchPokemon() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();

    // Ocultar todas las tarjetas de Pokémon
    const allPokemonArticles = document.querySelectorAll('#containerpk article');
    allPokemonArticles.forEach(article => {
        article.style.display = 'none';
    });

    // Mostrar solo la tarjeta del Pokémon buscado
    const articleToShow = document.getElementById(searchTerm);
    if (articleToShow) {
        articleToShow.style.display = 'block';
    } else {
        alert('No se encontró ningún Pokémon con ese nombre.');
    }
}


// Aquí ponemos lo que usa el DOM
window.onload = () => {
    let menu = document.getElementById("barras-menu");

    menu.onclick = () => {
        if (document.getElementById("menu-movil").classList.contains("menu-movil")) {
            document.getElementById("menu-movil").classList.remove("menu-movil");
        } else {
            document.getElementById("menu-movil").classList.add("menu-movil");
        }
    }

    let buttonNext = document.getElementById("next");
    buttonNext.onclick = () => {
        getDataUrl(next)
    }

    let buttonPrevious = document.getElementById("previous");
    buttonPrevious.onclick = () => {
        getDataUrl(previous)
    }

    // Solicitar primeros Pokémon
    let url = "https://pokeapi.co/api/v2/pokemon";
    // Mostrar loading
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
            if (data.next == null) {
                document.getElementById("next").style.display = "none";
            } else {
                document.getElementById("next").style.display = "inline";
            }
            next = data.next;
            if (data.previous == null) {
                document.getElementById("previous").style.display = "none";
            } else {
                document.getElementById("previous").style.display = "inline";
            }
            previous = data.previous;
            if (document.getElementById("loading"))
                document.getElementById("loading").style.display = "none";
            // Mostrar datos iniciales
            mostrarDatosIniciales(data.results)
            // Cargar datos de Pokémon
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

// Función para cargar datos de Pokémon
function cargarDatosPokemon() {
    for (const pk in pokemon) {
        if (pk.img == undefined) {
            setTimeout(fetchPokemonRetardada, 2000, pokemon[pk].url);
        }
    }
}

// Función para extraer información de los Pokémon
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

// Función para mostrar nombres iniciales de los Pokémon
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
