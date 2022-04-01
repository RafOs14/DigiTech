function validar(formulario) {
  if (formulario.user.value.trim().length == 0) {
    errorUser.innerHTML = "El nombre de usuario no puede estar vacio";
    return false;
  }

  //Expresion regular del correo

  var mail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!mail.test(formulario.email.value)) {
    errorEmail.innerHTML = "Email inválido";
    return false;
  }

  if (formulario.contrasena.value.trim().length < 8) {
    errorContrasena.innerHTML =
      "Contraseña invalida. Debe tener al menos 8 caracteres";
    return false;
  }

  return true;
}

let users = [];
const formulario = document.getElementById("formulario");
const mensaje = document.getElementById("mensaje");
const botonIngreso = document.getElementById("ingresar");
ingresar.innerHTML += `<button type="submit" class="btn btn-primary" onclick="return validar(this.form)" id="enlace">Acceder</button>`;


formulario.addEventListener("submit", (e) => {
  //Prevengo que se envie el formulario
  e.preventDefault();

  //Consulto por los usuarios del local storage
  if (localStorage.getItem("usuarios")) {
    users = JSON.parse(localStorage.getItem("usuarios"));
  }

  //Guardo los inputs del formulario en variables
  const nombre = document.getElementById("user").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("contrasena").value;

  //Valido que el usuario exista en la coleccion de usuarios
  if (!users.some((usuarioEnArray) => usuarioEnArray.email === email)) {
    if(!users.some((usuarioEnArray) => usuarioEnArray.password === password)){
      //si no existe, muestra un mensaje de error
      Toastify({
        text: "El usuario no existe",            
        duration: 2000,
        gravity: "bottom", 
        style: {
            background: 'linear-gradient(to right, #f85032, #e73827)',
        }         
        }).showToast();
      formulario.reset();
    }
  } else {
    //si existe, ingresa al sitio
    window.location.replace('productos.html');  
  }
});
