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
}