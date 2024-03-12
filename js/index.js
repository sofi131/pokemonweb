var pokemon = {};

//aquí ponemos lo que usa el DOM
window.onload = () => {
    let menu = document.getElementById("barras-menu");

    menu.onclick = () => {
        // objeto - método classList - propiedad ya que no tiene paréntesis
        // contains es un método que contiene el objeto menú móvil
        if (document.getElementById("menu-movil").classList.contains("menu-movil")) {
            document.getElementById("menu-movil").classList.remove("menu-movil");
        } else {
            document.getElementById("menu-movil").classList.add("menu-movil");
        }
    }
    //solicitar primeros pokemon
    //Solicitar primeros pokemon
    let url = "https://pokeapi.co/api/v2/pokemon";
    //mostramos loading
    document.getElementById("loading").style.display = "block";
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("loading").style.display = "none";
            //console.log(data); // Aquí puedes trabajar con los datos de respuesta
            //for
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
//función para obtener datos -> iterator elemento que recorre el objeto
function cargarDatosPokemon(params) {
    for (const pk in pokemon) {
        //llamada fetch
        fetch(pokemon[pk].url)
            //convertimos en un json
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(datos => {
                console.log(datos);
            }).catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
}


