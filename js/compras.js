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

//Declaramos las variables necesarias
const formulario = document.getElementById('formulario');
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//Al presionar finalizar muestra la alerta de compra finalizada con exito
formulario.addEventListener("submit", event => {
  //Prevenimos el comportamiento por defecto del formulario
      event.preventDefault();
      //Se muestra la alerta de compra finalizada con exito
      swal({
          title: "Compra Finalizada",
          text: "Llegara a su correo la información de la entrega",
          icon: "success",
          duration: 3000
      });
      localStorage.removeItem("carrito");
      devolverInicio()
  });

//Funcion que nos devuelve a la página principal luego de 3 segundos
  function mySleepFunction(delayTime) {
    return new Promise(resolve => setTimeout(resolve, delayTime));
    }
    async function devolverInicio() {      
        await mySleepFunction(3000);   
        //Redirección a la página principal
        window.location.href = "./productos.html"; 
    }
    
  
  
  





