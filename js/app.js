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
  const formulario = document.querySelector('#formulario');
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector('#spinner')

  //Asignacion de eventos.
  inputMail.addEventListener('input', validar);
  inputAsunto.addEventListener('input', validar);
  inputMensaje.addEventListener('input', validar);
  btnReset.addEventListener('click', function (e) {
    e.preventDefault();
    resetFormulario();
    
  });

  formulario.addEventListener('submit', enviarEmail);

  //
  function enviarEmail(e) {
    e.preventDefault();
    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    setTimeout(() => {
      // Reinnicio del spinner
      spinner.classList.remove('flex');
      spinner.classList.add('hidden');

      // Reinicio de campos del formulario
      resetFormulario();
      //Mostramos la alerta del envio exitoso del formulario.
      const alertaExito = document.createElement('P');
      alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
      alertaExito.textContent = 'Mensaje enviado correctamente.'
      formulario.appendChild(alertaExito)
      setTimeout(() => {
        alertaExito.remove();
      }, 2000);
    }, 3000);
  }
  
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

    //Asignar valores al objeto validador.
    validador[e.target.name] = e.target.value.trim().toLowerCase();
    
    //Comprobar validaciones.
    comprobarValidaciones();
  }

  //Generacion de alerta de error en HTML.
  function mostrarAlerta(mensaje, ref) {

    limpiarAlerta(ref);
    
    const error = document.createElement('P')
    error.textContent = mensaje;
    error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'font-bold');
    
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

  function resetFormulario() {
    //Reiniciar el objeto.
    validador.email = '';
    validador.asunto = '';
    validador.mensaje = '';
    
    formulario.reset();
  
    comprobarValidaciones();
  }
});