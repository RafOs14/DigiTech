function validar(formulario) {
//Valido si el campo esta vacio
  if (formulario.user.value.trim().length == 0) {
    errorUser.innerHTML = "El nombre de usuario no puede estar vacio"
    return false;
  }
    
    //Expresion regular del correo, si no cumple con la expresion, no se puede registrar  
    var mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!mail.test(formulario.email.value)) {
      errorEmail.innerHTML = "Email inválido";
      return false;
    }
  //Valido el largo de la contraseña, debe ser mayor a 8 caracteres
    if (formulario.contrasena.value.trim().length < 8) {
      errorContrasena.innerHTML = "Contraseña invalida. Debe tener al menos 8 caracteres"
      return false;
    }  
  //Valido si el campo no esta marcado
    if (!formulario.acepto.checked) {
      errorAcepto.innerHTML = "Debe aceptar los terminos";
      return false;
    }
  
    return true;
  
  }