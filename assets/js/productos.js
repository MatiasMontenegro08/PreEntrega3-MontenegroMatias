let html = "";
let listaProductos = [];

const obtenerDatos = async () => {
    try {
        //Cargo los datos y el DOM
        const respuesta = await fetch('../data/productos.json');
        listaProductos = await respuesta.json();
        listaProductos.forEach(p => {
            switch (p.categoria) {
                case "Tazas":
                    cargarProductos(p, "#contenedor-tazas");
                    break;
                case "Remeras":
                    cargarProductos(p, "#contenedor-remeras");
                    break;
                case "Fotos":
                    cargarProductos(p, "#contenedor-fotos");
                    break;
            }
        });

        // Asigno los eventos luego que se carga el DOM 
        document.querySelectorAll(".btn-agregar").forEach(btn => {
            btn.addEventListener("click", () => {
                const idProducto = btn.getAttribute("data-id");
                agregarAlCarrito(idProducto);
                mensajeExito();
                itemCarrito();
            });
        });
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
};

// Llamo a las funciones
obtenerDatos();
itemCarrito();

// Funciones
function cargarProductos(p, contenedor) {
    let catalogo = document.querySelector(contenedor);
    catalogo.innerHTML += listarProductos(p);
}

function listarProductos(p) {
    return `
        <div class="card" style="width: 18rem;">
            <img src="${p.img}" class="card-img-top" alt="${p.descripcion}">
            <div class="card-body">
                <p class="producto__titulo">${p.titulo}</p>
                <p class="producto_titulo">${p.descripcion}</p>
                <p class="producto__precio">$${p.precio}</p>
                <button class="btn-agregar" data-id="${p.id}">Agregar</button>
            </div>
        </div>
    `;
}

function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const product = listaProductos.find(product => product.id == id);
    const productosEnCarrito = carrito.find(p => p.id == id);

    if (productosEnCarrito) {
        productosEnCarrito.cantidad += 1;
        productosEnCarrito.precioTotal = productosEnCarrito.cantidad * productosEnCarrito.precio;
    } else {
        carrito.push({
            id: product.id,
            titulo: product.titulo,
            precio: product.precio,
            cantidad: 1,
            precioTotal: product.precio
        });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mensajeExito() {
    Toastify({
        text: "Producto agregado al carrito!",
        duration: 1000,
        style: {
            background: "green",
        },
    }).showToast();
}

function itemCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length > 0) {
        let item = document.createElement("p");
        item.classList.add("icon-carrito-item");
        item.innerText = "+" + sumarCantidadProductos(...carrito);
        document.body.appendChild(item);
    }
}

function sumarCantidadProductos(...lista) {
    return lista.reduce((acc, p) => acc + p.cantidad, 0);
}
