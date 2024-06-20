//declarar la variable tipo array que guardara las puntuaciones
let puntuaciones = [0, 0];
let rondaActual = 1;
const numRondas = 5;
//creamos un array que guardará los resultados de cada jugador en cada ronda
let lanzamientoJugador1 = [];
let lanzamientoJugador2 = [];

//escuchar los eventos que el usuario pulse
//cuando la función es llamada desde un evento no se le coloca ()
document
  .querySelector("#lanzar_j1")
  .addEventListener("click", lanzarDadosJugador1);
document
  .querySelector("#lanzar_j2")
  .addEventListener("click", lanzarDadosJugador2);

//crear una función de mostrar el dado
function crearImagenDado(valor) {
  //random 1 al 6
  let img = document.createElement("img");
  img.src = `img/${valor}.png`;
  img.alt = `Dado ${valor}`; //img.setAttribute("alt", `Dado${valor}`)
  return img; //devuelve el valor a quien lo llama
}

function lanzarDadosJugador1() {
  if (rondaActual > numRondas) return; //no hará más partidas, porque se ha alcanzado el límite
  //generar el valor del dado 1 del jugador 1
  let dado1 = Math.floor(Math.random() * 6) + 1;
  let dado2 = Math.floor(Math.random() * 6) + 1; //el .floor redondea el resultado (pag 159)
  lanzamientoJugador1.push([dado1, dado2]);

  //deshabilitar el botón del jugador 1 para que solo pueda jugar el jugador 2
  document.querySelector("#lanzar_j1").disabled = true;
  document.querySelector("#lanzar_j2").disabled = false;
  actualizarRondaHTML(rondaActual, dado1, dado2, "jugador1"); //es una cadena
}

function lanzarDadosJugador2() {
  if (rondaActual > numRondas) return; //no hará más partidas, porque se ha alcanzado el límite
  //generar el valor del dado 1 del jugador 2
  let dado1 = Math.floor(Math.random() * 6) + 1;
  let dado2 = Math.floor(Math.random() * 6) + 1; //el .floor redondea el resultado (pag 159)
  lanzamientoJugador2.push([dado1, dado2]);

 //deshabilitar el botón del jugador 2 para que solo pueda jugar el jugador 1
  document.querySelector("#lanzar_j1").disabled = false;
  document.querySelector("#lanzar_j2").disabled = true;
  actualizarRondaHTML(rondaActual, dado1, dado2, "jugador2"); //es una cadena
  rondaActual++; //se incrementa la ronda
}

function actualizarRondaHTML(ronda, dado1, dado2, jugador) {
  let rondaDiv = document.querySelector(`#ronda-${ronda}`);
  if (!rondaDiv) {
    rondaDiv = document.createElement("div");
    rondaDiv.classList.add("ronda");
    // rondaDiv.className=("ronda"); es lo mismo que la línea anterior, pero solo agrega una clase
    rondaDiv.setAttribute("id", `ronda-${ronda}`);
    rondaDiv.innerHTML = `
        <h3>Ronda ${ronda}</h3>
        <div class="dados" id="dados-ronda-${ronda}">
            <div id="jugador1-ronda-${ronda}"> </div>
            <div id="jugador2-ronda-${ronda}"> </div>
        </div>`;

    document.querySelector("#rondas").appendChild(rondaDiv);
  }

  //buscara del html lo que hemos creado anteriormente (jugador1-ronda1)
  let jugadorDiv = document.querySelector(`#${jugador}-ronda-${ronda}`);
  jugadorDiv.innerHTML = "";
  // creamos los dados en el html con el valor que nos ha dado los dados
  jugadorDiv.appendChild(crearImagenDado(dado1));
  jugadorDiv.appendChild(crearImagenDado(dado2));
  let suma = dado1 + dado2;
  //Operador ternario
  jugadorDiv.innerHTML += `<p> Jugador ${
    jugador === `jugador1` ? 1 : 2
  } : ${suma} </p> `;
}

document.querySelector("#terminar").addEventListener("click", () => {
  // cree una salida para indicar el ganador
  for (let i = 0; i < numRondas; i++) {
    let sumaJugador1 = lanzamientoJugador1[i]
      ? lanzamientoJugador1[i][0] + lanzamientoJugador1[i][1]
      : 0;
    let sumaJugador2 = lanzamientoJugador2[i]
      ? lanzamientoJugador2[i][0] + lanzamientoJugador2[i][1]
      : 0;

    if (sumaJugador1 > sumaJugador2) {
      puntuaciones[0]++;
    } else if (sumaJugador2 > sumaJugador1) {
      puntuaciones[1]++;
    }
  }
  // determinar el ganador
  let ganador = determinarGanador();
  let puntuacionesHTML = `
  <h3>Puntuaciones acumuladas </h3>
  <p>Jugador 1 - ${puntuaciones[0]}</p>
  <p>Jugador 2 - ${puntuaciones[1]}</p>
  <h3>Ganador: ${ganador}</h3>
  `;

  //le damos salida en el html
  document.querySelector("#puntuaciones").innerHTML = puntuacionesHTML;

  //deshabilitar los botones para que no se sigan utilizando
  document.querySelector("#lanzar_j1").disabled = true;
  document.querySelector("#lanzar_j2").disabled = true;
  document.querySelector("#terminar").disabled = true;
});

function determinarGanador() {
  if (puntuaciones[0] > puntuaciones[1]) {
    return "Jugador 1";
  } else if (puntuaciones[1] > puntuaciones[0]) {
    return "Jugador 2";
  } else {
    return "Empate";
  }
}
