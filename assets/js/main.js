const destacado = [
    {
        id: 1,
        img: "./assets/img/1.png",
        titulo: "Taza cerámica mágica",
        precio: 6500,
        descripcion: "Una taza que cambia de color con el calor.",
        contenedor: "#contenedor-tazas"
    },
    {
        id: 2,
        img: "./assets/img/6.png",
        titulo: "Remera algodón adulto",
        precio: 10500,
        descripcion: "Remera de algodón para adultos, ideal para cualquier ocasión.",
        contenedor: "#contenedor-remeras"
    },
    {
        id: 3,
        img: "./assets/img/11.png",
        titulo: "Fotos polaroid souvenirs 12u",
        precio: 4900,
        descripcion: "Set de 12 fotos polaroid para souvenirs.",
        contenedor: "#contenedor-fotos"
    },
    {
        id: 4,
        img: "./assets/img/8.png",
        titulo: "Remera modal niños",
        precio: 7500,
        descripcion: "Remera de modal para niños, cómoda y duradera.",
        contenedor: "#contenedor-remeras"
    }
]

cargarProductos(destacado, "#contenedor-destacados");
bienvenida();

//Funciones
function bienvenida() {
    Toastify({

        text: "Bienvenidos!",

        duration: 3000,
        style: {
            background: "linear-gradient(to right, cyan, magenta, #FFF4B9)",
        },

    }).showToast();
}

function cargarProductos(id, contenedor) {
    let catalogo = document.querySelector(contenedor);
    catalogo.innerHTML = listarProductos(id);
}

function listarProductos(lista) {
    let html = "";
    for (const producto of lista) {
        html += `
        <div class="card" style="width: 18rem;">
            <img src="${producto.img}" class="card-img-top" alt="${producto.descripcion}">
            <div class="card-body">
                <p class="producto__titulo">${producto.titulo}</p>
                <p class="producto_titulo">${producto.descripcion}</p>
                <a class="btn-verproducto" href="./assets/page/productos.html${producto.contenedor}">Ver producto</a>
            </div>
        </div>
        `;
    }
    return html;
}