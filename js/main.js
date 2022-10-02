var btnIniciar = document.querySelector("#iniciar-juego");
var btnAgregarPalabra = document.querySelector("#palabra-nueva");
var btnGuardar = document.querySelector("#btn-guardar");
var btncancelar = document.querySelector("#btn-cancelar");
var btnJuegoNuevo = document.querySelector("#btn-nuevo-juego");
var btnSalir = document.querySelector("#btn-salir");
var agregarPalabraBtn = document.getElementById("palabra-nueva");
var divAgregarPalabra = document.getElementById("agregar-palabra");
var palabras = ["PERRO", "ONE", "NINTENDO", "GATO", "BARCO"];
var tablero = document.getElementById("fuerza").getContext("2d");
var palabraSecreta = "";
var letras = [];
var palabraCorrecta = "";
var errores = 8;
let letrasIncorrectas = [];
let numeroDeErrores = 8
let letraElegida = [];
ocultarBtnNuevoSalir();
divAgregarPalabra.style.display = 'none'
//divAgregarPalabra

function mostrarBntNuevoSalir() {
    btnJuegoNuevo.style.display = 'block';
    btnSalir.style.display = 'block';

}

function ocultarBtnNuevoSalir() {
    btnJuegoNuevo.style.display = 'none';
    btnSalir.style.display = 'none'
}

function selecionarPalabraSecreta() {
    let palabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabraSecreta = palabra;
    return palabra;
    console.log(palabraSecreta);
}

function comprobarLetra(key) {
    let estado = false;
    if (key >= 65 && letras.indexOf(key) || key <= 90 && letras.indexOf(key)) {
        letras.push(key);
        console.log(key);
        return estado;
    } else {
        estado = true;
        console.log(key);
        return estado;
    }
}
function adicionarLetraCorrecta(i) {
    palabraCorrecta += palabraSecreta[i].toUpperCase()
  }
  
function agregarLetraIncorrecta(letras) {
    if (palabraSecreta.indexOf(letras) <= 0) {
        errores -= 1
      }
    console.log(errores);
}

function verificarFinJuego(letra) {
    //checa si la letra ha sido incluída en el array de  las letras correctas o incorrectas
   if(letraElegida.length < palabraSecreta.length) { 
      //incluye las letras ya digitadas en el arrau
      letrasIncorrectas.push(letra);
      
  
      //valida se el usuário cometió el numero maximo de errores
      if (letrasIncorrectas.length > numeroDeErrores) {
        perdiste()
      }
      else if(letraElegida.length < palabraSecreta.length) {
        agregarLetraIncorrecta(letra)
        escribirLetraIncorrecta(letra, errores)
      }
    }
   } 
  

  
//impide que teclas como shift y otras, sean consideradas errores y sean escritas
function verificarLetra(keyCode) {
    if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
      return true;
    } else {
      return false;
    }
  }
  
  
//Verifica si el usuario ha ganado
function verificarVencedor(letra) {
    letraElegida.push(letra.toUpperCase());
    if (letraElegida.length == palabraSecreta.length) {

        ganaste()

    }

}


// guarda la palabra que el usuario quiere agregar
function guardarPalabra() {

    //captura lo que el usuario ha digitado
    let nuevaPalabra = document.getElementById('input-nueva-palabra').value;

    // incluye la palabra que el usuario digitó en el array de las palabras a seren sorteadas
    if (nuevaPalabra !== "") {
        palabras.push(nuevaPalabra.toUpperCase());
        alert('La palabra fue guardada')


        // haz con que los componentes de la pantalla de agregar palabra desaparezcan
        document.getElementById("agregar-palabra").style.display = "none";
        iniciarJuego();
    } else {
        alert("Ninguna palabra ha sido digitada")
    }

}

// verifica cual es la letra en que el usuario hizo clic
function verificarLetraClicada(key) {
    if (letras.length < 1 || letras.indexOf(key) < 0) {
      letras.push(key)
      return false
      
    }
    else {
      letras.push(key)
      return true
    }
  }
function iniciarJuego() {
    btnIniciar.style.display = 'none';
    btnAgregarPalabra.style.display = 'none';
    selecionarPalabraSecreta();
    dibujarCanvas();
    dibujarLinea();
    mostrarBntNuevoSalir()


    document.onkeydown = (e) => {
        let letra = e.key.toUpperCase();
    if (letrasIncorrectas.length <= numeroDeErrores) {
        if (!verificarLetraClicada(e.key) && verificarLetra(e.keyCode)) {
          if (palabraSecreta.includes(letra)) {
            adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
            for (let i = 0; i < palabraSecreta.length; i++) {
              if (palabraSecreta[i] === letra) {
                escribirLetraCorrecta(i)
                verificarVencedor(letra)
  
              }
            }
  
          }
          // si el usuario cometió más errores de los que son permitidos, 
          //llama las funciones que dibujan el ahorcado y exibe el mensaje de fin de juego
          else {
            if (!verificarLetraClicada(e.key) && !verificarVencedor(letra)) return
            dibujarAhorcado(errores)
            verificarFinJuego(letra)
          }
        }
      }
      else {
        alert('Has atingido el límite de letras incorrectas')
      }
  
    };


}

btnAgregarPalabra.addEventListener('click', function () {
    divAgregarPalabra.style.display='block';
    btnIniciar.style.display='none';
    btnAgregarPalabra.style.display='none';
 
});

btnGuardar.addEventListener('click', function () {
    guardarPalabra();
});
btncancelar.addEventListener('click', function () {
    location.reload();

});


btnIniciar.addEventListener('click', function () {
    iniciarJuego();

});

btnSalir.addEventListener('click', function () {
    location.reload();
});
btnJuegoNuevo.addEventListener('click', function () {
    location.reload();
});