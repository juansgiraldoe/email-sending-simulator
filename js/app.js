document.addEventListener('DOMContentLoaded', function () {
  
  //Seleccionar elementos de la interfaz.
  const inputMail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');

  //Asignacion de eventos.
  inputMail.addEventListener('blur', validar);
  inputAsunto.addEventListener('blur', validar);
  inputMensaje.addEventListener('blur', validar);
  
  //Validacion del evento.
  function validar(e) {
    //Verificamos si no hay algo escrito o tiene espacios vacios.
    if (e.target.value.trim() === '') {
      console.log('Debes llenar el campo');
    } else {
      console.log(e.target.value);
    }
  }
});