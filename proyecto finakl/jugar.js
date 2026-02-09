  let playerLife = 10;
  let enemyLife = 10;
  let turn='player';
  const deckPlayer = [
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
  const robarBtn = document.getElementById("robarBtn");
  let PlayerBattlefield = [];
  let EnemyBattlefield = [];
  const manoRival = [];
  const EnemyDeck = [
    {
      name: "Explorador del Valle",
      type: "creature",
      power: 1,
      toughness: 3
    },
    {
      name: "Guerrero Escarlata",
      type: "creature",
      power: 3,
      toughness: 2
    },
    {
      name: "Oso Colosal",
      type: "creature",
      power: 4,
      toughness: 4
    },
    {
      name: "Arquera del Viento",
      type: "creature",
      power: 2,
      toughness: 1
    },
    {
      name: "Chamán del Fuego",
      type: "creature",
      power: 3,
      toughness: 3
    },
    {
      name: "Titán de Hierro",
      type: "creature",
      power: 6,
      toughness: 5
    },
    {
      name: "Acechador Nocturno",
      type: "creature",
      power: 4,
      toughness: 2
    },
    {
      name: "Guardián del Roble",
      type: "creature",
      power: 2,
      toughness: 5
    },
    {
      name: "Elemental de Tormenta",
      type: "creature",
      power: 5,
      toughness: 3
    },
    {
      name: "Caballero del Juramento",
      type: "creature",
      power: 3,
      toughness: 4
    }
  ]

  let atacantesEnemigos = [];
  let esperandoBloqueos = false;
  let atacantesNoBloqueados = [];



  attackBtn.addEventListener("click", () => {
  if (turn !== 'player') return;
  if (PlayerBattlefield.length === 0) return;

  atacantesNoBloqueados = [...PlayerBattlefield];
  esperandoBloqueos = true;

  alert("El enemigo está decidiendo cómo bloquear...");

  setTimeout(() => {
    while (atacantesNoBloqueados.length > 0) {
      const atacante = atacantesNoBloqueados.shift();

      if (EnemyBattlefield.length > 0) {
        const bloqueador = EnemyBattlefield[0]; 
        alert(`${bloqueador.name} bloquea a ${atacante.name}`);
        Combate(atacante, bloqueador)
      } else {
        enemyLife -= atacante.power; 
        alert(`${atacante.name} golpea directamente al enemigo por ${atacante.power} de daño`);
      }
    }


    updateTurn();

    if (enemyLife <= 0) {
      alert("¡Has ganado!");
      turn = 'player';
      attackBtn.disabled = false;
      robarBtn.disabled = false;
      return;
    }


    turn = 'enemy';

    setTimeout(enemyTurn, 1000);

  }, 500); 
});


function enemyTurn() {
   attackBtn.disabled = true;
    robarBtn.disabled = true;
  robarCartaEnemy(); 
  if (manoRival.length > 0) {
    jugarEnemy(manoRival[0]);
  }

  if (EnemyBattlefield.length === 0) {
    finalizarTurnoEnemy();
    return;
  }

  atacantesNoBloqueados = [...EnemyBattlefield];
  esperandoBloqueos = true;

  mostrarBattlefield();
  alert(`El enemigo ataca con ${atacantesNoBloqueados[0].name}. Haz click en tus criaturas para bloquear o "No Bloqueo".`);
}


  function updateTurn(){
      document.getElementById("playerLife").textContent=playerLife;
      document.getElementById("enemyLife").textContent=enemyLife;
  }




    function embarajar(deckPlayer) {
      for (let i = deckPlayer.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deckPlayer[i], deckPlayer[j]] = [deckPlayer[j], deckPlayer[i]];
      }
    }

    function robar(deckPlayer){
      if (deckPlayer.length==0){
        return null;
      }
      embarajar(deckPlayer)
        return deckPlayer.shift();
    }




  function ManoMostrar(mano) {
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
      cartaDiv.style.cursor = "pointer";
      cartaDiv.classList.add("carta");
      cartaDiv.addEventListener("click", () => {
        jugar(carta);

      });
      contenedor.appendChild(cartaDiv);
    });
  }


  function robarCarta() {
      const carta = robar(deckPlayer); 
      if (carta) {
          manoJugador.push(carta); 
          ManoMostrar(manoJugador); 
      } else {
          alert("No quedan cartas en el mazo");
      }
  }


  function jugar(carta){
    const index = manoJugador.indexOf(carta);
    if (index !== -1) {
      manoJugador.splice(index, 1);
    }
    PlayerBattlefield.push(carta);

    ManoMostrar(manoJugador);
    mostrarBattlefield();
  }



  function mostrarBattlefield() {
    const contenedor = document.querySelector("#PlayerBattlefield .cardcreature");
    contenedor.innerHTML = "";

    PlayerBattlefield.forEach(carta => {
      const cartaDiv = document.createElement("div");
      cartaDiv.textContent = `${carta.name} (P:${carta.power} / T:${carta.toughness})`;
      cartaDiv.style.border = "2px solid darkgreen";
      cartaDiv.style.padding = "6px";
      cartaDiv.style.margin = "5px";
      cartaDiv.style.display = "inline-block";
      cartaDiv.style.borderRadius = "5px";
      cartaDiv.style.backgroundColor = "#dff0d8";
      cartaDiv.addEventListener("click", () => {
      if (esperandoBloqueos) {
        bloquear(carta);
      }
    });
      contenedor.appendChild(cartaDiv);
    });
  }

//----------------------------------------------------------------------------COMBATE-----------------------------------------------------------------//

function bloquear(bloqueador) {
  if (!esperandoBloqueos || atacantesNoBloqueados.length === 0) return;

  const atacante = atacantesNoBloqueados.shift();

  if (!bloqueador) {
    playerLife -= atacante.power;
    alert(`${atacante.name} golpea directamente a ti por ${atacante.power} de daño`);
  } else {
    atacante.toughness -= bloqueador.power;
    bloqueador.toughness -= atacante.power;
    alert(`${bloqueador.name} bloquea a ${atacante.name} y ambos reciben daño`);
  }

  PlayerBattlefield = PlayerBattlefield.filter(c => c.toughness > 0);
  EnemyBattlefield = EnemyBattlefield.filter(c => c.toughness > 0);

  updateTurn();
  mostrarBattlefield();
  mostrarEnemyBattlefield();

if (atacantesNoBloqueados.length === 0) {
    finalizarTurnoEnemy();  
    alert("Turno enemigo finalizado. Es tu turno.");
}
}

function finalizarTurnoEnemy() {
    esperandoBloqueos = false;
    atacantesNoBloqueados = [];
    if (playerLife <= 0) {
        alert("¡Perdiste!");
        return;
    }
    turn = 'player';
    attackBtn.disabled = false;
    robarBtn.disabled = false;  
}


function Combate(atacante, defensor) {
  atacante.toughness -= defensor.power;
  defensor.toughness -= atacante.power;

  PlayerBattlefield = PlayerBattlefield.filter(c => c.toughness > 0);
  EnemyBattlefield = EnemyBattlefield.filter(c => c.toughness > 0);

  mostrarBattlefield();
  mostrarEnemyBattlefield();
  updateTurn();
}
function finalizarCombate() {
  esperandoBloqueos = false;
  atacantesNoBloqueados = [];

  updateTurn();

  if (playerLife <= 0) { alert("Perdiste"); return; }
  if (enemyLife <= 0) { alert("¡Has ganado!"); return; }

   if (turn === 'player') {
    turn = 'enemy';
    attackBtn.disabled = true;
    setTimeout(enemyTurn, 2000);
  } else {
    turn = 'player';
    attackBtn.disabled = false;
  }
}

document.getElementById("NoBloqueo").onclick = () => {
  if (esperandoBloqueos && atacantesNoBloqueados.length > 0){
    bloquear(null);    
  }       
};

    function robarEnemy(EnemyDeck){
      if (EnemyDeck.length==0){
        return null;
      }
      embarajarEnemy(EnemyDeck)
        return EnemyDeck.shift();
    }

      function embarajarEnemy(EnemyDeck) {
      for (let i = EnemyDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [EnemyDeck[i], EnemyDeck[j]] = [EnemyDeck[j], EnemyDeck[i]];
      }
    }

    function robarCartaEnemy() {
      const carta = robarEnemy(EnemyDeck); 
      if (carta) {
          manoRival.push(carta); 
      } else {
          alert("No quedan cartas en el mazo");
      }
  }

function jugarEnemy(carta){
  const index = manoRival.indexOf(carta);
  if (index !== -1) {
    manoRival.splice(index, 1);
  }
  EnemyBattlefield.push(carta);
  mostrarEnemyBattlefield();
}
  function mostrarEnemyBattlefield() {
    const contenedor = document.querySelector("#EnemyBattlefield .cardcreature");
    contenedor.innerHTML = "";

  EnemyBattlefield.forEach(carta => {
      const cartaDiv = document.createElement("div");
      cartaDiv.textContent = `${carta.name} (P:${carta.power} / T:${carta.toughness})`;

      cartaDiv.style.border = "2px solid darkgreen";
      cartaDiv.style.padding = "6px";
      cartaDiv.style.margin = "5px";
      cartaDiv.style.display = "inline-block";
      cartaDiv.style.borderRadius = "5px";
      cartaDiv.style.backgroundColor = "#dff0d8";

      contenedor.appendChild(cartaDiv);
    });
  }

document.getElementById("pasar").addEventListener("click", () => {
  if (turn === 'player') {
    turn = 'enemy';
    attackBtn.disabled = true;
    enemyTurn();
  } else {
    turn = 'player';
    attackBtn.disabled = false;
  }
});