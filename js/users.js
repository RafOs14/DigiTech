//Declaro la clase usuario con sus atributos
class User{
    constructor(nombre, email, password) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
    }
}

//Creo las variables necesarias
let users = [];
let mensaje = document.getElementById('mensaje');


//Consulto por los usuarios del local storage
if(localStorage.getItem('usuarios')) {
    users = JSON.parse(localStorage.getItem('usuarios'));    
}else{
    //Si no existe el usuario, lo creo
    localStorage.setItem('usuarios', JSON.stringify(users));
}

//Guardo el elemento con el id formulario en una variable
const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', (e) => {
    //Prevengo el comportamiento del boton submit por defecto
    e.preventDefault();
    //Guardo los inputs del formulario en variables
    const nombre = document.getElementById('user').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('contrasena').value;
   // Valido que el usuario no exista en el array
    if(!users.some(usuarioEnArray => usuarioEnArray.email === email)){
        //si no existe, creo el objeto de la clase usuario
        const usuario = new User(nombre, email, password);
        //lo agrego al array de usuarios
        users.push(usuario);
        //lo guardo en el local storage
        localStorage.setItem('usuarios', JSON.stringify(users));
        
        Toastify({
            text: "Usuario registrado con éxito, presione Ingresar para continuar",            
            duration: 2000,
            gravity: "bottom",
            style: {
                background: 'linear-gradient(to right, #bdc3c7, #2c3e50)',
            }         
            }).showToast();
        formulario.reset();
    }else{   
        //Si el usuario existe, aviso al usuario     
       Toastify({
        text: "Usuario ya registrado",            
        duration: 2000,
        gravity: "bottom", 
        style: {
            background: 'linear-gradient(to right, #f85032, #e73827)',
        }         
        }).showToast();
        //Reseteo el formulario
        formulario.reset();
    }
});