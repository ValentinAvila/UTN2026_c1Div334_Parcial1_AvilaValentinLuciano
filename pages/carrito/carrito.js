/* 
Valentin Luciano Avila
UTN - Programación 3 - Div. 132
*/

function obtenerCarrito() 
{
    let carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        return JSON.parse(carritoGuardado);
    } else {
        return [];
    }
}

function cargarProductosCarrito() 
{
    let tabla = document.getElementById("tabla-carrito");
    let carrito = obtenerCarrito(); // Punto a - Lee el LocalStorage

    // Se recorre el carrito y crea una fila por cada producto.
    carrito.forEach(producto => 
    {
        // Punto b y c - Solo agregar productos con cantidad valida (minimo 1)
        if (producto.cantidad >= 1) 
        {
            let fila = document.createElement("tr");

            // Por lo visto en clases sobre las inyecciones de scripts hago uso de crearElement + appendChild. 
            let celdaNombre = document.createElement("td");
            celdaNombre.textContent = producto.nombre;

            let celdaCantidad = document.createElement("td");
            celdaCantidad.textContent = producto.cantidad;

            let celdaPrecio = document.createElement("td");
            celdaPrecio.textContent = producto.precio;

            fila.appendChild(celdaNombre);
            fila.appendChild(celdaCantidad);
            fila.appendChild(celdaPrecio);

            tabla.appendChild(fila);
        }
    });

    // Calcula y muestra el total
    calcularTotal(carrito);
}

function limpiarCarrito()
{
    localStorage.removeItem("carrito");
    alert("Carrito limpiado correctamente");

    // Guardo la fila header antes de limpiar
    let tabla = document.getElementById("tabla-carrito");
    let filaHeader = document.querySelector(".fila-header-carrito");
    
    tabla.innerHTML = "";
    tabla.appendChild(filaHeader);

    cargarProductosCarrito();
}

function calcularTotal(carrito)
{
    let total = 0;

    carrito.forEach(producto =>
    {
        // Punto f - Limpio el $ del precio y lo convierto a numero para poder operar
        let precioNumerico = Number(producto.precio.replace("$", "")); // Conversión Explícita (Type Casting)
        total += precioNumerico * producto.cantidad;
    });

    valorFinal = `El valor final a pagar es de: $${total}`;
    // Punto e - Actualizo el elemento con el total (si no hay productos queda en 0)
    document.getElementById("valor-final").textContent = valorFinal;
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});