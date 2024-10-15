let saldo = 0;
let  sigo = true; 
let usuarios = [
{
    nombre: 'Usuario1',
    password: '1234',
    saldo: 0
},
{
    nombre: 'Usuario2',
    password: '1234',
    saldo: 0
},
{
    nombre: 'admin',
    password: 'admin',
    saldo: 0
}];

let usuarioAutenticado = false;
let usuarioActual = null; 

function iniciarSesion() {
    let intentos = 3;
  
    while (intentos > 0) {
      let nombre = prompt("Ingresa tu nombre de usuario:");
      let contraseña = prompt("Ingresa tu contraseña:");
  
      let usuario = usuarios.find(u => u.nombre === nombre && u.password === contraseña);
  
      if (usuario) {
        alert(`Bienvenido, ${usuario.nombre}`);
        usuarioAutenticado = true;
        usuarioActual = usuario;  
        break; 
      } else {
        intentos--;
        alert(`Datos incorrectos. Te quedan ${intentos} intentos.`);
      }
    }
    if (intentos === 0) {
        alert("Has agotado tus intentos. Adiós.");
    }
}

iniciarSesion();

if (usuarioAutenticado) {
    let sigo = true;
  
    while (sigo) {
      let opcion = prompt(`
        Bienvenido al cajero automático.
        Selecciona una opción:
        1. Consultar saldo
        2. Retirar dinero
        3. Depositar dinero
        0. Salir
      `);
  
      switch (opcion) {
        case '1':
          alert("Tu saldo es de ."+ usuarioActual.saldo);
          break;
        case '2':
            let retirar = prompt(`
                ¿cuanto desea retirar?:
                ingrese el monto.
              `);
            retirar = parseFloat(retirar);
            if(usuarioActual.saldo> retirar){
                usuarioActual.saldo -= retirar;
                alert("Has retirado "+retirar);
            }else{
                alert("Dinero insuficiente!");
            }
          break;
        case '3':
            let depositar = prompt(`
                ¿cuanto desea depositar?:
                ingrese el monto.
              `);
            depositar = parseFloat(depositar);
            if(depositar>0){
                usuarioActual.saldo += depositar;
                alert("Has depositado "+depositar);
            }else{
                alert("No puedes depositar menos de 0!!");
            }
          break;
        case '0':
          alert("Gracias por usar el cajero. ¡Hasta luego!");
          sigo = false;
          break;
        default:
          alert("Opción no válida. Inténtalo de nuevo.");
      }
    }
  }