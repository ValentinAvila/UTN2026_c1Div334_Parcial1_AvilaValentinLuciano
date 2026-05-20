# Burger Palace 🍔

1° Parcial — UTN Avellaneda 
Programación III | División 132  
Alumno: Avila, Valentin Luciano  
Docente: Javier Rodriguez Gallardo

---

## Descripción

Burger Palace es una aplicación web frontend para una hamburguesería emprendedora.
El proyecto fue iniciado por un programador anterior que dejó avanzada la vista del catálogo (index.html)
pero no llegó a desarrollar la vista del carrito (carrito.html).

El trabajo consistió en respetar y continuar el código existente, completando la funcionalidad
faltante y desarrollando desde cero la vista del carrito.

---

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript

---

## Estructura del proyecto

```
├── index.html
├── index.css
├── index.js
├── assets/
│   ├── icono.png
│   ├── hamburguesas/
│   ├── bebidas/
│   └── tragos/
└── pages/
    └── carrito/
        ├── carrito.html
        ├── carrito.css
        └── carrito.js
```

---

## Vistas

**Catálogo (index.html)**  
Muestra el listado de hamburguesas, bebidas y tragos disponibles.
Cada producto tiene botones para agregar o quitar del carrito,
cuyo estado se persiste en el localStorage del navegador.

**Carrito (carrito.html)**  
Muestra en forma de tabla los productos seleccionados con su nombre,
cantidad y precio unitario. Incluye el monto total a pagar y un botón
para limpiar el carrito.
