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
    //Seleccion del elemento padre.
    const itemSeleccionado = e.target.parentElement;

    //Verificamos si no hay algo escrito o tiene espacios vacios.
    if (e.target.value.trim() === '') {
      mostrarAlerta(`El campo ${e.target.id} es obligatorio.`, itemSeleccionado);
      return;
    }
    
    if (e.target.id === 'email' && !validarEmail(e.target.value)) {
      mostrarAlerta(`El email no es valido`, itemSeleccionado);
      return;
    }

    limpiarAlerta(itemSeleccionado);
  }

  //Generacion de alerta de error en HTML.
  function mostrarAlerta(mensaje, ref) {

    limpiarAlerta(ref);
    
    const error = document.createElement('P')
    error.textContent = mensaje;
    error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center', 'rounded-lg');
    
    ref.appendChild(error)
  }
  
  //Comprobar si ha hay alertas.
  function limpiarAlerta(ref) {
    const alerta = ref.querySelector('.bg-red-600')
    if (alerta) {
      alerta.remove();
    }
  }

  //Validacion de email.
  function validarEmail( email ) {
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }
});