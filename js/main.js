
let saldo = 0;
let opcion = 0;
let usuarios = [
    {
        nombre: 'Usuario1',
        password: '1234',
        saldo: 1000
    },
    {
        nombre: 'Usuario2',
        password: '1234',
        saldo: 500
    },
    {
        nombre: 'admin',
        password: 'admin',
        saldo: 2000
    }
];

let usuarioAutenticado = false;
let usuarioActual = null;
console.log("Iniciando cajero automático");

let loginBoton = document.getElementById("loginButton");
let opcionBoton = document.getElementById("opcionButton");
let retirarBoton = document.getElementById("retirarButton");
let depositarBoton = document.getElementById("depositarButton");

let respuestaLogin = document.getElementById("response");
let saldoCajero = document.getElementById("saldoContainer");
function iniciarSesion() {
    if (!usuarioAutenticado) {
        let nombre = document.getElementById("name").value;
        let contraseña = document.getElementById("password").value;
        let usuario = usuarios.find(u => u.nombre === nombre && u.password === contraseña);

        if (usuario) {
            console.log("Usuario autenticado");
            usuarioAutenticado = true;
            usuarioActual = usuario;
            document.getElementById("loginForm").style.display = "none";
            document.getElementById("cajeroContainer").style.display = "block";
            respuestaLogin.innerHTML = "";
        } else {
            respuestaLogin.innerHTML = "<p>Usuario o contraseña incorrecta, inténtelo de nuevo</p>";
        }
    }
}

loginBoton.onclick = iniciarSesion;

opcionBoton.onclick = () => {
  mainCajero();
};

retirarBoton.onclick = () => {
    let retirar = parseFloat(document.getElementById("montoRetirar").value);
    if (!isNaN(retirar) && retirar > 0) {
        if (usuarioActual.saldo >= retirar) {
            usuarioActual.saldo -= retirar;
            alert("Has retirado " + retirar);
        } else {
            alert("Dinero insuficiente!");
        }
        volverAlMenu();
    } else {
        alert("Ingrese un monto válido para retirar.");
    }
};

depositarBoton.onclick = () => {
    let depositar = parseFloat(document.getElementById("montoDepositar").value);
    if (!isNaN(depositar) && depositar > 0) {
        usuarioActual.saldo += depositar;
        alert("Has depositado " + depositar);
        volverAlMenu();
    } else {
        alert("Ingrese un monto válido para depositar.");
    }
};

function mainCajero() {
    if (usuarioAutenticado) {
        opcion = document.getElementById("opcion").value;
        console.log("Opción seleccionada: " + opcion);
        console.log("llego?")
        
        switch (opcion) {
            case '1':
              saldoCajero.innerHTML = `<p>Tu saldo es de: $${usuarioActual.saldo}</p>`
                
                break;
            case '2':
                document.getElementById("opcion2Container").style.display = "block";
                document.getElementById("cajeroContainer").style.display = "none";
                saldoCajero.remove();
                break;
            case '3':
                document.getElementById("opcion3Container").style.display = "block";
                document.getElementById("cajeroContainer").style.display = "none";
                saldoCajero.remove();
                break;
            case '0':
                alert("Gracias por usar el cajero. ¡Hasta luego!");
                usuarioAutenticado = false;
                usuarioActual = null;
                document.getElementById("cajeroContainer").style.display = "none";
                document.getElementById("loginForm").style.display = "block";
                saldoCajero.remove();
                break;
            default:
                alert("Opción no válida. Inténtalo de nuevo.");
        }
    }
}

function volverAlMenu() {
    document.getElementById("cajeroContainer").style.display = "block";
    document.getElementById("opcion2Container").style.display = "none";
    document.getElementById("opcion3Container").style.display = "none";
}
