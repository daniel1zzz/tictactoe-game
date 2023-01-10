/**
* Proyecto web simple juego de tic tac toc
* @author Daniel Andino Camacho
* Es un proyecto realizado como practica de web developer
* Codigo: https://github.com/daniel1zzz/tictactoc-game
* Sientente libre de crear y modificar el proyecto.
**/
var table = ['','','','','','','','',''];
var state = true; //Stado X o O
var game = true; //Game en proceso

//Se termino el juego
var gameOver = (st) => {
  if(st){
    document.getElementById('canvas').removeAttribute('hidden');
    alert('Enhorabuena has ganado!, fin del juego...');
  }
  else alert('Se termino el juego, Enmpate!');
  game = false;
}

//Informar turno del jugador
var turn = () => {
  let noti = document.getElementById('noti');
  noti.innerText = 'Turno del jugador '.concat(state ? 'X' : 'O');
}

//Imprimir que alguien gano
var ok = (x,y,z) => {
  document.getElementById('tab-item-' + x).setAttribute('class','tab-item-ok');
  document.getElementById('tab-item-' + y).setAttribute('class','tab-item-ok');
  document.getElementById('tab-item-' + z).setAttribute('class','tab-item-ok');
  gameOver(true);
}

//Resetear tabla de juego
var reset = () => {
  document.getElementById('tab-item-1').setAttribute('class','tab-item');
  document.getElementById('tab-item-2').setAttribute('class','tab-item');
  document.getElementById('tab-item-3').setAttribute('class','tab-item');
  document.getElementById('tab-item-4').setAttribute('class','tab-item');
  document.getElementById('tab-item-5').setAttribute('class','tab-item');
  document.getElementById('tab-item-6').setAttribute('class','tab-item');
  document.getElementById('tab-item-7').setAttribute('class','tab-item');
  document.getElementById('tab-item-8').setAttribute('class','tab-item');
  document.getElementById('tab-item-9').setAttribute('class','tab-item');
  document.querySelector('#tab-item-1 > h1').textContent = '';
  document.querySelector('#tab-item-2 > h1').textContent = '';
  document.querySelector('#tab-item-3 > h1').textContent = '';
  document.querySelector('#tab-item-4 > h1').textContent = '';
  document.querySelector('#tab-item-5 > h1').textContent = '';
  document.querySelector('#tab-item-6 > h1').textContent = '';
  document.querySelector('#tab-item-7 > h1').textContent = '';
  document.querySelector('#tab-item-8 > h1').textContent = '';
  document.querySelector('#tab-item-9 > h1').textContent = '';
  document.getElementById('btn-restart').setAttribute('hidden',''); 
  document.getElementById('canvas').setAttribute('hidden','');
  table = ['','','','','','','','',''];
  state = true;
  game = true;
  turn();
}

//Validar si un jugador gano
var validate = () => {

  //Permite saber si hay un enmpate
  let istab = () => table.toString().length == 17 ? true : false;
  //Validar si el valor es 0 o 3 -> true else false
  let j = value => [0,3].indexOf(value) != -1 ? true : false;
  let pos = {
    j1: j(table[0] + table[1] + table[2]),
    j2: j(table[3] + table[4] + table[5]),
    j3: j(table[6] + table[7] + table[8]),
    j4: j(table[0] + table[3] + table[6]),
    j5: j(table[1] + table[4] + table[7]),
    j6: j(table[2] + table[5] + table[8]),
    j7: j(table[0] + table[4] + table[8]),
    j8: j(table[6] + table[4] + table[2])
  }

  //Validar posibles juegos ganados
  if(pos.j1) ok(1,2,3);
  else if(pos.j2) ok(4,5,6);
  else if(pos.j3) ok(7,8,9);
  else if(pos.j4) ok(1,4,7);
  else if(pos.j5) ok(2,5,8);
  else if(pos.j6) ok(3,6,9);
  else if(pos.j7) ok(1,5,9);
  else if(pos.j8) ok(3,5,7);

  //Si hay un enmpate
  else if(istab()) gameOver(false);

}

//Funcion para click X o O y la posicion
var add = pos => {
  if(!game) return; //El juego finalizo
  let box = document.querySelector('#tab-item-' + pos + ' > h1');
  if(!box.textContent == '') return;
  
  box.textContent = state ? 'X' : 'O';
  if(state) {
    box.setAttribute('class', 'tab-item-x');
    table[pos-1] = 1;
  } else {
    box.setAttribute('class', 'tab-item-o');
    table[pos-1] = 0;
  }
  
  state = !state; //Invertir estado de X o O
  validate(); //Validar a ver si gano alguien
  turn(); //Mensaje a jugador de turno 
  document.getElementById('btn-restart').removeAttribute('hidden');
}

//Agregar onclick a cada element de la tabla
var addAction = v => {
  let t = document.getElementById('tab-item-' + v);
  t.onclick = () => add(v);
}

//Boton reset para volver a jugar
bt_r = document.getElementById('btn-restart');
bt_r.onclick = () => reset();

//Action click de los botones de la tabla
addAction(1);
addAction(2);
addAction(3);
addAction(4);
addAction(5);
addAction(6);
addAction(7);
addAction(8);
addAction(9);

turn();

//Eliminar marca de agua de 000webhost
//window.addEventListener("load", (event) => {
//  var delt = document.getElementsByTagName('div'); 
//  delt[delt.length-1].remove();
//});