const catalogo = document.querySelector('#contenedor-api');

const cargarCatalogoMl = async () => {
    const respuesta = await fetch('https://api.mercadolibre.com/sites/MLA/search?q=sublimacion')
        const datos = await respuesta.json();
        const data = await datos.results
        for( item of data) {
            const producto = document.createElement('div')
            catalogo.innerHTML += `
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src=${item.thumbnail} alt=${item.title}/>
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">Precio: $${item.price}.-</p>
                        <a href="#" class="btn btn-primary">Comprar</a>
                    </div>     
                </div>  
            `
    
            catalogo.appendChild(producto);
        }
}

cargarCatalogoMl();