//Variables
const costoEnvio = 6500;
let agregarEnvio = false;


mostrarCarrito();

const verificarCheckbox = document.querySelector('#envio');
verificarCheckbox.addEventListener('change', () => {
    agregarEnvio = verificarCheckbox.checked;
    mostrarCarrito();
})

//Funciones
function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let contenedorCarrito = document.querySelector('#contenedor-carrito');

    let html = '';

    for (const p of carrito) {
        html += `
        <div class ="card-carrito" id="${p.id}">
            <h3>${p.titulo}</h3>
            <p>Cantidad: ${p.cantidad}</p>
            <p>Precio: $${p.precio}</p>
            <p>Total: $${p.precioTotal}</p>
            <button class="eliminar" data-id="${p.id}">Eliminar</button>
        </div>
        `;
    }

    contenedorCarrito.innerHTML = html;

    document.querySelectorAll(".eliminar").forEach(btn => {
        btn.addEventListener('click', () => {
            let btnEliminar = btn.getAttribute('data-id');
            eliminarDelCarrito(btnEliminar);
        });
    });

    mostrarTotales(carrito, "#contenedor-total");
}
function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}
function mostrarTotales(carrito, contenedor) {
    let contenedorTotales = document.querySelector(contenedor);
    let subTotalCarrito = sumarTotal(...carrito);


    totalCarrito = agregarEnvio ? subTotalCarrito + costoEnvio : subTotalCarrito;

    contenedorTotales.innerHTML = `
    <div class="card-totales">
        <p>Subtotal: $${subTotalCarrito}</p>
        <h3>Total: $${totalCarrito}</h3>
    </div>
    `;
    
    if (agregarEnvio) {
        contenedorTotales.innerHTML += formularioEnvio();
    }
    contenedorTotales.innerHTML += `
        <button class="eliminar" id="confirmar">Confirmar pedido</button>
    `;

    carrito.length > 0 ? comprobarPedido("Pedido confirmado!"):comprobarPedido("Selecciona productos para confirmar tu pedido!");
}

function sumarTotal(...lista) {
    return lista.reduce((acc, p) => acc + p.precioTotal, 0);
}
function formularioEnvio() {
    let html = "";
    html += `
    <div class="formulario">
        <h2>Formulario de envío</h2>
        <form action="#" method="post">
            <div class="form-group">
                <label for="nombre">Nombre del Cliente:</label>
                <input type="text" id="nombre" name="nombre" required>
            </div>
            <div class="form-group">
                <label for="provincia">Provincia:</label>
                <input type="text" id="provincia" name="provincia" required>
            </div>
            <div class="form-group">
                <label for="ciudad">Ciudad:</label>
                <input type="text" id="ciudad" name="ciudad" required>
            </div>
            <div class="form-group">
                <label for="codigo-postal">Código Postal:</label>
                <input type="text" id="codigo-postal" name="codigo-postal" required>
            </div>
            <div class="form-group">
                <label for="direccion">Dirección:</label>
                <input type="text" id="direccion" name="direccion" required>
            </div>
        </form>
    </div>
            `;
    return html;
}
function comprobarPedido(dato){
    const btnConfirmar = document.querySelector("#confirmar");
        btnConfirmar.addEventListener('click', () => {
            Swal.fire(dato);
        })
}