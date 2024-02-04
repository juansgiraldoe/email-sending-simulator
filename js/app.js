document.addEventListener('DOMContentLoaded', function () {
  
  const validador = {
    email: '',
    asunto: '',
    mensaje: ''
  }
  //Seleccionar elementos de la interfaz.
  const inputMail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');

  //Asignacion de eventos.
  inputMail.addEventListener('input', validar);
  inputAsunto.addEventListener('input', validar);
  inputMensaje.addEventListener('input', validar);
  
  //Validacion del evento.
  function validar(e) {
    //Seleccion del elemento padre.
    const itemSeleccionado = e.target.parentElement;

    //Verificamos si no hay algo escrito o tiene espacios vacios.
    if (e.target.value.trim() === '') {
      mostrarAlerta(`El campo ${e.target.id} es obligatorio.`, itemSeleccionado);
      validador[e.target.name] = '';
      comprobarValidaciones();
      return;
    }
    
    //Validacion de e-mail.
    if (e.target.id === 'email' && !validarEmail(e.target.value)) {
      mostrarAlerta(`El email no es valido`, itemSeleccionado);
      validador[e.target.name] = '';
      comprobarValidaciones();
      return;
    }

    limpiarAlerta(itemSeleccionado);

    //Asignar valores al objeto email.
    validador[e.target.name] = e.target.value.trim().toLowerCase();
    
    //Comprobar validaciones.
    comprobarValidaciones();
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

  //Expresion regular para validacion de email.
  function validarEmail( email ) {
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  //Comprobacion de campos y validaciones.
  function comprobarValidaciones() {
    if (Object.values(validador).includes('')) {
      btnSubmit.classList.add('opacity-50');
      btnSubmit.disabled = true;
      return;
    } 
    btnSubmit.classList.remove('opacity-50');
    btnSubmit.disabled = false;
  }
});