//Evento que oculta el menu lateral
window.addEventListener('DOMContentLoaded', event => {
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {        
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }
});

//Declaramos variables y guardamos los elementos del DOM
const divProductos = document.getElementById("productos");
const divOfertas = document.getElementById("ofertas");
const divCarrito = document.getElementById("carrito");
const carro = document.querySelector(".cuerpo_carro");
const btnFinal = document.querySelector(".btn-final");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


//Funcion que muestra los productos utilizando FEtCH
function mostrarProductos(){  
    divProductos.innerHTML = "";  
    fetch('./datos.json')
    .then (response => response.json())
    .then(productos => {
    productos.forEach((element) => {
        divProductos.innerHTML += `        
            <div class="col-md-3 m-2 card shadow">   
               <img class="card-img m-1" src="${element.imagen}">
                <div class="card-body articulosDatos">                        
                    <p class="descripcion">${element.descripcion}</p>
                    <p class="preciotxt"><span>Precio USD: ${element.precio}</span></p>
                    <p hidden class="precio">${element.precionro}</p>
                    <button class="btn btn-primary btn-agregar" data-id="${element.id}"><i class="fas fa-shopping-cart"></i> Agregar</button>
                </div>                
            </div>`;

             //Se asigna un evento a cada boton de agregar al carrito
            const btnAgregar = document.querySelectorAll(".btn-agregar");
            btnAgregar.forEach((e) => {
                e.addEventListener('click', (e) => {
                    let articulo = e.target.parentElement;            
                    //Al agregar un producto se muestra la notificacion
                    Toastify({
                        text: "Producto agregado al carrito",            
                        duration: 1500,
                        gravity: "bottom",
                        style: {
                            background: 'linear-gradient(to right, #000000, #434343)',
                        }         
                    }).showToast();
                    //Se llama a la funcion que agrega el producto y se le envian los parametros
                    agregarAlCarrito(articulo);
                });
            });
        });
            
    });  
   
};

//Funcion que agrega productos al carrito
const agregarAlCarrito = (articulo) => {
    let producto = {
        descripcion: articulo.querySelector(".descripcion").textContent,
        precio: Number(articulo.querySelector(".precio").textContent),
        cantidad: 1,
        id: Number(articulo.querySelector("button").getAttribute("data-id"))
    };
    
    //Busca el producto en el arreglo de carrito y lo guarda en la variable carrito
    let productoEncontrado = carrito.find(
        (element) => element.id === producto.id
        );
    //Si encuentra el producto en el carrito suma en cantidad
    if (productoEncontrado) {
        productoEncontrado.cantidad++;
    }else{
    //Si no lo encuentra lo agrega al carrito
        carrito.push(producto);
    }    
    mostrarCarrito();
    mostrarTotal();
};

//Funcion que muestra el carrito
const mostrarCarrito = () =>{   
    divCarrito.innerHTML = "";      
    carrito.forEach((element) => {
        let{descripcion,precio,cantidad,id} = element;
        divCarrito.innerHTML += `                       
            <tr>
                <th scope="row">${descripcion}</th>
                <td > ${precio} </td>
                <td >${cantidad}</td>
                <td >${precio * cantidad}</td>                
                <td>
                <button class="btn btn-warning btn-md btn-restar" data-id="${id}"><i class="fas fa-minus"></i></button>                
                <button class="btn btn-danger btn-md btn-borrar" data-id="${id}"><i class="fas fa-trash"></i></button>    
                </td>
            </tr>`;
    }); 
    localStorage.setItem("carrito", JSON.stringify(carrito)); 
    aumentarNumeroCantidadCarrito();  
    mostrarTotal();
};

//Funcion que resta productos del carrito
const restarCantidad = (productoRestar) => {
    let productoEncontrado = carrito.find(
        (element) => element.id === Number(productoRestar)
        );
    if (productoEncontrado) {
        productoEncontrado.cantidad--;
        if (productoEncontrado.cantidad === 0) {
            productoEncontrado.cantidad = 1;
        }
    }
    mostrarCarrito();
    mostrarTotal();
};

//Funcion que elimina productos del carrito
const borrarProducto = (productoBorrar) => {
    carrito = carrito.filter((element) => element.id !== Number(productoBorrar));
    mostrarCarrito();
    mostrarTotal();
};

const escucharBotonesModal = () => {
    carro.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-restar")) {
        restarCantidad(e.target.getAttribute("data-id"));
      }      
      if (e.target.classList.contains("btn-borrar")) {
        borrarProducto(e.target.getAttribute("data-id"));
      }
    });
};

//Aumenta el contador del carrito
const aumentarNumeroCantidadCarrito = () => {
    let total = carrito.reduce((acc, ite) => acc + ite.cantidad, 0);
    document.querySelector(".cantCarrito").textContent = total;
  };

//Funcion que muestra el total de los productos en el carrito con impuestos incluidos
function mostrarTotal(){
    let totalCarrito = carrito.reduce((total, producto) => total + ((Number(producto.precio * producto.cantidad))* 1.22), 0);
    document.getElementById("total").innerHTML = `${totalCarrito.toFixed(2)}`;    
}

//Evento que controla si existen productos en el carrito, si no hay productos muestra un mensaje, si hay productos va a finalizar la compra
btnFinal.addEventListener("click", (e) => {
    e.preventDefault();
    if (carrito.length === 0) {
        Toastify({
            text: "No tienes productos en el carrito",
            duration: 1500,
            gravity: "top",
            position: 'right',
            style: {
                background: 'linear-gradient(to right, #c21500, #ffc500)',
            }
        }).showToast();
    } else {
        window.location.href = "./compra.html";
    }
});

//Llamadas a las funciones
mostrarProductos();
mostrarCarrito();
escucharBotonesModal();
