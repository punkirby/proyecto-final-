let playerLife = 10;
let enemyLife = 10;
let turn=1;
const deck = [
  {
    name: "Aprendiz del Bosque",
    type: "creature",
    power: 2,
    toughness: 2
  },
  {
    name: "Soldado del Alba",
    type: "creature",
    power: 3,
    toughness: 1
  },
  {
    name: "Bestia Ancestral",
    type: "creature",
    power: 4,
    toughness: 4
  },
  {
    name: "Guardia de la Fortaleza",
    type: "creature",
    power: 2,
    toughness: 3
  },
  {
    name: "Ladrón de Sombras",
    type: "creature",
    power: 3,
    toughness: 2
  },
  {
    name: "Dragón de Fuego",
    type: "creature",
    power: 5,
    toughness: 5
  },
  {
    name: "Hechicero Errante",
    type: "creature",
    power: 2,
    toughness: 1
  },
  {
    name: "Gigante de Piedra",
    type: "creature",
    power: 6,
    toughness: 6
  },
  {
    name: "Espíritu del Río",
    type: "creature",
    power: 1,
    toughness: 4
  },
  {
    name: "Caballero de la Noche",
    type: "creature",
    power: 4,
    toughness: 3
  }
];
const manoJugador = [];
const attackBtn = document.getElementById("attackBtn");

attackBtn.addEventListener("click", () => {
    if(turn!==1) return;
    enemyLife -=3
    updateTurn();

    if(enemyLife <=0){
        alert("has ganado!!!")
    }

    turn=0;
    attackBtn.disabled=true;

    setTimeout(enemyTurn, 2000);
});

function enemyTurn(){
    playerLife -=2;
    updateTurn();

    if (playerLife <= 0){
        alert("Perdiste");

        return;
    }

    turn=1;
    attackBtn.disabled = false
}

function updateTurn(){
    document.getElementById("playerLife").textContent=playerLife;
    document.getElementById("enemyLife").textContent=enemyLife;
}




function embarajar(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function robar(deck){
    if (deck.length==0){
        return null;
    }

    return deck.shift();
}




function ManoMostrar(mano){
      const contenedor = document.getElementById("mano");
      contenedor.innerHTML = "";
      mano.forEach(carta => {
        const cartaDiv = document.createElement("div");
        cartaDiv.textContent = `${carta.name} (P:${carta.power} / T:${carta.toughness})`;
        cartaDiv.style.border = "1px solid black";
        cartaDiv.style.padding = "5px";
        cartaDiv.style.margin = "5px";
        cartaDiv.style.display = "inline-block";
        cartaDiv.style.borderRadius = "5px";
        cartaDiv.style.backgroundColor = "#f0f0f0";
        cartaDiv.className=`${carta.name}`;
        contenedor.appendChild(cartaDiv);
        cartaDiv.onclick = () => jugar(carta);
      });
}

function robarCarta() {
    const carta = robar(deck); 
    if (carta) {
        manoJugador.push(carta); 
        ManoMostrar(manoJugador); 
    } else {
        alert("No quedan cartas en el mazo");
    }
}


function jugar(){
    let craitura=document.querySelector(".cardcreature");
    craitura.innerHTML+=`${carta.name} (P:${carta.power} / T:${carta.toughness})`
}