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
const divOfertas = document.getElementById("ofertas");

function mostrarOfertas(){  
    divOfertas.innerHTML = "";  
    fetch('./ofertas.json')
    .then (res => res.json())
    .then(ofertas => {
        ofertas.forEach((articulos) => {
            divOfertas.innerHTML += `                       
                <tr>
                    <th scope="row">${articulos.descripcion}</th>
                    <td ><b> ${articulos.precio} </b></td>                    
                </tr>`;
        });
    }); 
   
};

//Llamadas a las funciones

mostrarOfertas();
