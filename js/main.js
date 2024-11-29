/**Hola estimados.
 * Disculpen la simplicidad del proyecto, actualmente estoy sin tiemppo por cuestiones laborales
 * Sin embargo, considero que esta app cumple con los requisitos planteados en el desafio.
 * Espero cumpla con sus espectativas y quedo a la espera de su devolución, Saludos!
*/
let saldo = 0;
let opcion = 0;
let usuarioAutenticado = false;
let usuarioActual = null;

console.log("Iniciando cajero automático");
let usuarios = [];
let loginBoton = document.getElementById("loginButton");
let opcionBoton = document.getElementById("opcionButton");
let retirarBoton = document.getElementById("retirarButton");
let depositarBoton = document.getElementById("depositarButton");
let volverBoton = document.getElementById("volverButton");
let volverBoton2 = document.getElementById("volverButton2");
let respuestaLogin = document.getElementById("response");
let saldoCajero = document.getElementById("saldoContainer");

function guardarUsuariosEnLocalStorage() { 
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

async function cargarUsuariosDesdeJSON() {
    try {
        const response = await fetch("../data/usuarios.json");
        if (!response.ok) {
            throw new Error("Error al cargar el archivo JSON");
        }
        const data = await response.json();
        usuarios = data;
        guardarUsuariosEnLocalStorage(); // Almacenamos los usuarios en localStorage
    } catch (error) {
        console.error("Error al cargar usuarios:", error);
        alert("No se pudo cargar la lista de usuarios.");
    }
}

function inicializarUsuarios() {
    const usuariosEnStorage = localStorage.getItem("usuarios");
    if (usuariosEnStorage) {
        usuarios = JSON.parse(usuariosEnStorage);
    } else {
        cargarUsuariosDesdeJSON();
    }
}

function actualizarHistorialMovimientos(){
    const movimientosContainer = document.getElementById("movimientosContainer");
    const listMovimientos = document.getElementById("listaMovimientos");

    listMovimientos.innerHTML = "";

    if(usuarioActual.movimientos.length > 0){
        usuarioActual.movimientos.forEach(movimiento => {
            const listItem= document.createElement("li");
            listItem.className = "list-group-item d-flex justify-content-between align-items-center";
            const esDeposito = movimiento.tipo.toLowerCase() === "deposito" ;
            const iconoClase = esDeposito ? "fa-arrow-circle-up text-success" : "fa-arrow-circle-down text-danger";
            const badgeClase = esDeposito ? "bg-success" : "bg-danger";
            const signoMonto = esDeposito ? "+" : "";
            listItem.innerHTML = `
                <div>
                    <i class="fas ${iconoClase} me-2"></i>
                    <strong>${movimiento.tipo.toUpperCase()}</strong>
                    <br><small class="text-muted">${movimiento.fecha}</small>
                </div>
                <span class="badge ${badgeClase} rounded-pill">
                    ${signoMonto}$${movimiento.monto}
                </span>
            `;
            listMovimientos.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item text-muted";
        listItem.textContent = "No hay movimientos aún";
        listMovimientos.appendChild(listItem);
    }
    movimientosContainer.style.display = "block";
    
}

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

            actualizarHistorialMovimientos();
        } else {
            respuestaLogin.innerHTML = "<p>Usuario o contraseña incorrecta, inténtelo de nuevo</p>";
        }
    }
}

loginBoton.onclick = iniciarSesion;
opcionBoton.onclick = mainCajero;
volverBoton.onclick = volverAlMenu;
volverBoton2.onclick = volverAlMenu;

retirarBoton.onclick = () => {
    let retirar = parseFloat(document.getElementById("montoRetirar").value);
    if (!isNaN(retirar) && retirar > 0) {
        if (usuarioActual.saldo >= retirar) {
            usuarioActual.saldo -= retirar;
            usuarioActual.movimientos.push({ tipo: 'retiro', monto: retirar, fecha: new Date().toLocaleString() });
            guardarUsuariosEnLocalStorage();
            Swal.fire({
                icon: 'success',
                title: 'Retiro exitoso',
                text: `Has retirado $${retirar}`,
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: '¡Dinero insuficiente!',
            });
        }
        volverAlMenu();
        actualizarHistorialMovimientos();
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Monto inválido',
            text: 'Ingrese un monto válido para retirar.',
        });
    }
};

depositarBoton.onclick = () => {
    let depositar = parseFloat(document.getElementById("montoDepositar").value);
    if (!isNaN(depositar) && depositar > 0) {
        usuarioActual.saldo += depositar;
        usuarioActual.movimientos.push({ tipo: 'deposito', monto: depositar, fecha: new Date().toLocaleString() });
        guardarUsuariosEnLocalStorage();
        Swal.fire({
            icon: 'success',
            title: 'Depósito exitoso',
            text: `Has depositado $${depositar}`,
        });
        volverAlMenu();
        actualizarHistorialMovimientos();
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Monto inválido',
            text: 'Ingrese un monto válido para depositar.',
        });
    }
};
function agregarSaldoCajero() { 
    saldoCajero = document.createElement('div'); saldoCajero.id = 'saldoContainer'; 
    document.getElementById("cajeroContainer").appendChild(saldoCajero);
}

function mainCajero() {
    if (usuarioAutenticado) {
        opcion = document.getElementById("opcion").value;
        console.log("Opción seleccionada: " + opcion);
        console.log("llego?")
        
        switch (opcion) {
            case '1':
              if (!document.getElementById('saldoContainer')) { 
                agregarSaldoCajero(); 
                }
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
                    Swal.fire({
                        icon: 'info',
                        title: 'Gracias por usar el cajero',
                        text: '¡Hasta luego!',
                    }).then(() => {
                        usuarioAutenticado = false;
                        usuarioActual = null;
                        document.getElementById("cajeroContainer").style.display = "none";
                        document.getElementById("loginForm").style.display = "block";
                        saldoCajero.remove();
                    });
                    break;
                default:
                    Swal.fire({
                        icon: 'error',
                        title: 'Opción no válida',
                        text: 'Inténtalo de nuevo.',
                    });
            }
    }
}

function volverAlMenu() {
    document.getElementById("cajeroContainer").style.display = "block";
    document.getElementById("opcion2Container").style.display = "none";
    document.getElementById("opcion3Container").style.display = "none";
}

inicializarUsuarios();

