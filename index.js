/* 
Valentin Luciano Avila
UTN - Programación 3 - Div. 132
*/

//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() 
{
    let carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        return JSON.parse(carritoGuardado);
    } else {
        return [];
    }
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) 
{
    console.log("Estado del carrito antes de guardar:", carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function sumarAlCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    let li = elementoClickeado.closest("li"); // Subo al elemento li para poder leer el nombre y precio, no lo vimos en clase (lo agregue para no usar parentElement).
    let nombre = li.querySelector(".nombre-producto").textContent;
    let precio = li.querySelector(".precio-producto").textContent;
    
    let ul = li.closest("ul");
    let tipoId = ul.id;

    let mensajes = {
        "listado-hamburguesas": `Una hamburguesa "${nombre}" fue agregada a su pedido`,
        "listado-bebidas": `Una bebida "${nombre}" fue agregada a su pedido`,
        "listado-tragos": `Un trago "${nombre}" fue agregado a su pedido`
    };  

    // Obtengo el carrito actual (array vacio si no existe []).
    let carrito = obtenerCarrito();

    // Busco si el producto ya existe en el carrito
    let productoExistente = carrito.find(p => p.nombre === nombre);

    if (productoExistente) {
        // Punto c - Si existe, incremento cantidad
        productoExistente.cantidad++;
    } else { // si es undefined
        // Puntos b y e - Si no existe, lo agrego con cantidad 1
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    // Punto d - Alert con el nombre del producto
    alert(mensajes[tipoId] + " (ver en el carrito).");


    // Puntos f y a - Imprime en consola y guarda en LocalStorage
    guardarCarrito(carrito);
    
}

function restarDelCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    let li = elementoClickeado.closest("li");  // Subo al li padre para leer el nombre, si no leé dentro del botón.
    let nombre = li.querySelector(".nombre-producto").textContent;
    
    let ul = li.closest("ul");
    let tipoId = ul.id;

    let mensajesEliminacion = {
        "listado-hamburguesas": `Una hamburguesa "${nombre}" fue eliminada de su pedido`,
        "listado-bebidas": `Una bebida "${nombre}" fue eliminada de su pedido`,
        "listado-tragos": `Un trago "${nombre}" fue eliminado de su pedido`
    };
    
    let mensajesTipos = {
        "listado-hamburguesas": `No hay hamburguesas "${nombre}"`,
        "listado-bebidas": `No hay bebidas de "${nombre}"`,
        "listado-tragos": `No hay tragos "${nombre}"`
    };

    // Obtengo el carrito actual
    let carrito = obtenerCarrito();

    if (carrito.length !== 0) {
        // Se busca si el producto existe en el carrito
        let productoExistente = carrito.find(p => p.nombre === nombre);

        if (productoExistente) {
            // Punto g y i - Si existe, decremento cantidad y alert.
            productoExistente.cantidad--;
            alert(mensajesEliminacion[tipoId] + " (ver en el carrito).");

            // Punto j - Si la cantidad llega a 0, lo elimino del array
            if (productoExistente.cantidad === 0) {
                carrito = carrito.filter(p => p.nombre !== nombre);
            }

            // Guarda el carrito actualizado
            guardarCarrito(carrito);
        } else { // Punto h - Si el producto no existe
            alert(mensajesTipos[tipoId] + " en el carrito.");
        }

    } else {     // Punto k - Si el carrito esta vacio
        alert("No hay ningún producto guardado en el carrito");
        ;
    }

}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => 
{
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});
