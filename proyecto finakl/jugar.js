let playerLife = 20;
let enemyLife = 20;
let turn = 'player';

const deckPlayer = [
  { name:"Savannah Lions", type:"creature", cost:{W:1}, power:2, toughness:1, basetoughness:1, image:"img/savannah_lions.webp" },
  { name:"Thraben Inspector", type:"creature", cost:{W:1}, power:1, toughness:2, basetoughness:2, image:"img/thraben_inspector.webp" },
  { name:"Luminarch Aspirant", type:"creature", cost:{W:2}, power:1, toughness:1, basetoughness:1, image:"img/luminarch_aspirant.webp" },
  { name:"Adanto Vanguard", type:"creature", cost:{W:2}, power:3, toughness:1, basetoughness:1, image:"img/adanto_vanguard.webp" },
  { name:"Voice of Resurgence", type:"creature", cost:{G:1, W:1}, power:2, toughness:2, basetoughness:2, image:"img/voice_resurgence.webp" },
  { name:"Fleecemane Lion", type:"creature", cost:{G:1, W:1}, power:3, toughness:3, basetoughness:3, image:"img/fleecemane_lion.webp" },
  { name:"Knight of Autumn", type:"creature", cost:{G:1, W:2}, power:2, toughness:1, basetoughness:1, image:"img/knight_autumn.webp" },
  { name:"Resplendent Angel", type:"creature", cost:{W:2, C:1}, power:3, toughness:3, basetoughness:3, image:"img/resplendent_angel.webp" },
  { name:"Baneslayer Angel", type:"creature", cost:{W:2, C:3}, power:5, toughness:5, basetoughness:5, image:"img/baneslayer_angel.webp" },
  { name:"Lyra Dawnbringer", type:"creature", cost:{W:2, C:3}, power:5, toughness:5, basetoughness:5, image:"img/lyra.webp" },
  { name:"Forest", type:"land", produces:["G"], image:"img/forest.webp" },
  { name:"Forest", type:"land", produces:["G"], image:"img/forest.webp" },
  { name:"Forest", type:"land", produces:["G"], image:"img/forest.webp" },
  { name:"Forest", type:"land", produces:["G"], image:"img/forest.webp" },
  { name:"Forest", type:"land", produces:["G"], image:"img/forest.webp" },
  { name:"Plains", type:"land", produces:["W"], image:"img/plains.webp" },
  { name:"Plains", type:"land", produces:["W"], image:"img/plains.webp" },
  { name:"Plains", type:"land", produces:["W"], image:"img/plains.webp" },
  { name:"Plains", type:"land", produces:["W"], image:"img/plains.webp" },
  { name:"Plains", type:"land", produces:["W"], image:"img/plains.webp" }
];

const EnemyDeck = [
  { name:"Shambling Ghast", type:"creature", cost:{B:1}, power:1, toughness:1, basetoughness:1, image:"img/shambling_ghast.webp" },
  { name:"Dread Wanderer", type:"creature", cost:{B:1}, power:2, toughness:1, basetoughness:1, image:"img/dread_wanderer.webp" },
  { name:"Gifted Aetherborn", type:"creature", cost:{B:2}, power:2, toughness:3, basetoughness:3, image:"img/aetherborn.webp" },
  { name:"Murderous Rider", type:"creature", cost:{B:2, C:1}, power:2, toughness:3, basetoughness:3, image:"img/murderous_rider.webp" },
  { name:"Phyrexian Obliterator", type:"creature", cost:{B:4}, power:5, toughness:5, basetoughness:5, image:"img/obliterator.webp" },
  { name:"Desecration Demon", type:"creature", cost:{B:2, C:2}, power:6, toughness:6, basetoughness:6, image:"img/desecration_demon.webp" },
  { name:"Archfiend of the Dross", type:"creature", cost:{B:2, C:2}, power:6, toughness:6, basetoughness:6, image:"img/archfiend.webp" },
  { name:"Rune-Scarred Demon", type:"creature", cost:{B:2, C:5}, power:6, toughness:6, basetoughness:6, image:"img/rune_scarred.webp" },
  { name:"Vilis, Broker of Blood", type:"creature", cost:{B:3, C:5}, power:8, toughness:8, basetoughness:8, image:"img/vilis.webp" },
  { name:"Griselbrand", type:"creature", cost:{B:3, C:5}, power:7, toughness:7, basetoughness:7, image:"img/griselbrand.webp" },
  { name:"Swamp", type:"land", produces:["B"], image:"img/swamp.webp" },
  { name:"Swamp", type:"land", produces:["B"], image:"img/swamp.webp" },
  { name:"Swamp", type:"land", produces:["B"], image:"img/swamp.webp" },
  { name:"Swamp", type:"land", produces:["B"], image:"img/swamp.webp" },
  { name:"Swamp", type:"land", produces:["B"], image:"img/swamp.webp" },
  { name:"Swamp", type:"land", produces:["B"], image:"img/swamp.webp" },
  { name:"Swamp", type:"land", produces:["B"], image:"img/swamp.webp" },
  { name:"Swamp", type:"land", produces:["B"], image:"img/swamp.webp" },
  { name:"Swamp", type:"land", produces:["B"], image:"img/swamp.webp" },
  { name:"Swamp", type:"land", produces:["B"], image:"img/swamp.webp" }
];

const manoJugador = [];
const manoRival = [];
let PlayerBattlefield = [];
let EnemyBattlefield = [];
let atacantesSeleccionados = [];
let atacantesNoBloqueados = [];
let esperandoBloqueos = false;

const attackBtn = document.getElementById("attackBtn");
const robarBtn = document.getElementById("robarBtn");
const preview = document.getElementById("preview");

let playerManaPool = { R:0, G:0, U:0, B:0, W:0, C:0 };
let enemyManaPool  = { R:0, G:0, U:0, B:0, W:0, C:0 };
let landPlayedThisTurn = false;
// --------------------- UTILES ---------------------
function log(text) {
    const logDiv = document.getElementById("log");
    const line = document.createElement("div");
    line.classList.add("log-line");
    line.textContent = text;
    logDiv.appendChild(line);
    logDiv.scrollTop = logDiv.scrollHeight;
}

function embarajar(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function robar(deck) {
    if (deck.length === 0) return null;
    embarajar(deck);
    return deck.shift();
}

// --------------------- MANO ---------------------
function ManoMostrar(mano) {
    const contenedor = document.getElementById("mano");
    contenedor.innerHTML = "";
    mano.forEach(carta => {
        const cartaDiv = document.createElement("div");
        cartaDiv.classList.add("carta");

        const img = document.createElement("img");
        img.src = carta.image;
        img.alt = carta.name;

        const texto = document.createElement("div");
        texto.textContent = `${carta.name} (P:${carta.power} / T:${carta.toughness})`;

        cartaDiv.appendChild(img);
        cartaDiv.appendChild(texto);

        cartaDiv.addEventListener('mouseenter', () => {
            preview.style.backgroundImage = `url(${img.src})`;
            preview.style.display = 'block';
        });
        cartaDiv.addEventListener('mousemove', (e) => {
            preview.style.top = e.clientY + 'px';
            preview.style.left = (e.clientX + 20) + 'px';
        });
        cartaDiv.addEventListener('mouseleave', () => {
            preview.style.display = 'none';
        });

        cartaDiv.addEventListener("click", () => jugar(carta));

        contenedor.appendChild(cartaDiv);
    });
}

function robarCarta() {
    const carta = robar(deckPlayer);
    if (carta) {
        carta.tapped = false;
        manoJugador.push(carta);
        ManoMostrar(manoJugador);
    } else log("No quedan cartas en el mazo");
}

function robarCartaEnemy() {
    const carta = robar(EnemyDeck);
    if (carta) {
        carta.tapped = false;
        manoRival.push(carta);
    } else log("No quedan cartas en el mazo");
}

// --------------------- JUEGO ---------------------
function jugar(carta) {
    const index = manoJugador.indexOf(carta);
    if (index !== -1) manoJugador.splice(index, 1);
    carta.tapped = false;
    carta.mareoInvocacion= true;
    PlayerBattlefield.push(carta);
    ManoMostrar(manoJugador);
    mostrarBattlefield();
}

function jugarEnemy(carta) {
    const index = manoRival.indexOf(carta);
    if (index !== -1) manoRival.splice(index, 1);
    carta.tapped = false;
    carta.mareoInvocacion=true;
    EnemyBattlefield.push(carta);
    mostrarEnemyBattlefield();
}

// --------------------- BATTLEFIELD ---------------------
function mostrarBattlefield() {
    const contenedor = document.querySelector("#PlayerBattlefield .cardcreature");
    while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
}

    PlayerBattlefield.forEach(carta => {
        let cartaDiv = carta.element;
        if (!cartaDiv) {
            cartaDiv = document.createElement("div");
            cartaDiv.classList.add("carta");
            carta.element = cartaDiv;

            const img = document.createElement("img");
            img.src = carta.image;
            img.alt = carta.name;
            cartaDiv.appendChild(img);

            cartaDiv.addEventListener("click", () => {

    
    if (esperandoBloqueos) {

        if (carta.tapped) {
            log(`${carta.name} está tappeada y no puede bloquear.`);
            return;
        }

        bloquear(carta);
    }

    else if (turn === 'player') {

        if (carta.tapped) {
            log(`${carta.name} está tappeada y no puede atacar.`);
            return;
        }

        seleccionarAtacante(carta);
    }
});

            cartaDiv.addEventListener('mouseenter', () => {
                preview.style.backgroundImage = `url(${carta.image})`;
                preview.style.display = 'block';
            });
            cartaDiv.addEventListener('mousemove', (e) => {
                preview.style.top = e.clientY + 'px';
                preview.style.left = (e.clientX + 20) + 'px';
            });
            cartaDiv.addEventListener('mouseleave', () => { preview.style.display = 'none'; });
        }

        cartaDiv.classList.toggle('tapped', carta.tapped);
        contenedor.appendChild(cartaDiv);
    });
}

function mostrarEnemyBattlefield() {
    const contenedor = document.querySelector("#EnemyBattlefield .cardcreature");
    contenedor.innerHTML = "";

    EnemyBattlefield.forEach(carta => {
        let cartaDiv = carta.element;
        if (!cartaDiv) {
            cartaDiv = document.createElement("div");
            cartaDiv.classList.add("carta");
            carta.element = cartaDiv;

            const img = document.createElement("img");
            img.src = carta.image;
            img.alt = carta.name;
            cartaDiv.appendChild(img);

            cartaDiv.addEventListener('mouseenter', () => {
                preview.style.backgroundImage = `url(${carta.image})`;
                preview.style.display = 'block';
            });
            cartaDiv.addEventListener('mousemove', (e) => {
                preview.style.top = e.clientY + 'px';
                preview.style.left = (e.clientX + 20) + 'px';
            });
            cartaDiv.addEventListener('mouseleave', () => { preview.style.display = 'none'; });
        }

        cartaDiv.classList.toggle('tapped', carta.tapped);

        contenedor.appendChild(cartaDiv);
    });
}

function tapCarta(carta) {
    carta.tapped = true;
    if (carta.element) {
        carta.element.classList.add('tapAnim'); 
        
        carta.element.addEventListener('animationend', () => {
            carta.element.classList.remove('tapAnim');
        }, { once: true });
    }
}
// --------------------- ATACAR ---------------------
attackBtn.addEventListener("click", () => {
    if (turn !== 'player') return;
    if (atacantesSeleccionados.length === 0) {
        log("Debes seleccionar al menos una criatura para atacar.");
        return;
    }

    atacantesSeleccionados.forEach(carta => {
        carta.tapped = true;
        carta.element.classList.add('tapped'); 
    });

    atacantesNoBloqueados = [...atacantesSeleccionados];
    esperandoBloqueos = true;

    log(`Has declarado ataque con ${atacantesSeleccionados.map(c => c.name).join(', ')}.`);
    atacantesSeleccionados.forEach(c => c.element.classList.remove('selected-to-attack'));
    atacantesSeleccionados = [];

    setTimeout(() => {
        while (atacantesNoBloqueados.length > 0) {
            const atacante = atacantesNoBloqueados.shift();
            if (EnemyBattlefield.length > 0) {
                const bloqueador = EnemyBattlefield.find(c => !c.hasBlocked && !c.tapped)
                if (bloqueador) {
                    bloqueador.hasBlocked = true;
                    log(`${bloqueador.name} bloquea a ${atacante.name}`);
                    Combate(atacante, bloqueador);
                } else {
                    enemyLife -= atacante.power;
                    log(`${atacante.name} golpea directamente al enemigo por ${atacante.power}`);
                }
            } else {
                enemyLife -= atacante.power;
                log(`${atacante.name} golpea directamente al enemigo por ${atacante.power}`);
            }
        }
        updateTurn();
        if (enemyLife <= 0) { log("¡Has ganado!"); return; }

        iniciarTurno('enemy');
    }, 500);
})

// --------------------- BLOQUEAR ---------------------
function bloquear(bloqueador) {
    if (!esperandoBloqueos || atacantesNoBloqueados.length === 0) return;

    if (bloqueador && bloqueador.hasBlocked) {
        log(`${bloqueador.name} ya ha bloqueado este turno.`);
        return;
    }

    const atacante = atacantesNoBloqueados.shift();

    if (!bloqueador) {
        playerLife -= atacante.power;
        log(`${atacante.name} golpea directamente a ti por ${atacante.power}`);
    } else {

        bloqueador.hasBlocked = true; 

        atacante.toughness -= bloqueador.power;
        bloqueador.toughness -= atacante.power;

        log(`${bloqueador.name} bloquea a ${atacante.name}`);
    }

    PlayerBattlefield = PlayerBattlefield.filter(c => c.toughness > 0);
    EnemyBattlefield = EnemyBattlefield.filter(c => c.toughness > 0);

    updateTurn();
    mostrarBattlefield();
    mostrarEnemyBattlefield();

    if (atacantesNoBloqueados.length === 0) {
        esperandoBloqueos = false;
        finalizarTurnoEnemy();
    }
}

function bloquearAutomatico(atacante) {
    const bloqueador = PlayerBattlefield.find(c => !c.tapped && !c.hasBlocked);

    if (!bloqueador) {
        playerLife -= atacante.power;
        log(`${atacante.name} golpea directamente a ti por ${atacante.power}`);
        return;
    }

    atacante.toughness -= bloqueador.power;
    bloqueador.toughness -= atacante.power;

    

    log(`${bloqueador.name} bloquea a ${atacante.name} y ambos reciben daño`);

    PlayerBattlefield = PlayerBattlefield.filter(c => c.toughness > 0);
    EnemyBattlefield = EnemyBattlefield.filter(c => c.toughness > 0);

    mostrarBattlefield();
    mostrarEnemyBattlefield();
    updateTurn();
}

document.getElementById("NoBloqueo").addEventListener("click", function () {

    if (!esperandoBloqueos) return;

    if (atacantesNoBloqueados.length === 0) {
        log("No hay atacantes.");
        esperandoBloqueos = false;
        finalizarTurnoEnemy();
        return;
    }

    atacantesNoBloqueados.forEach(atacante => {
        playerLife -= atacante.power;
        log(`${atacante.name} hace ${atacante.power} daño al jugador.`);
    });

    updateTurn();

    atacantesNoBloqueados = [];
    esperandoBloqueos = false;

    finalizarTurnoEnemy();
});

// --------------------- SELECCIONAR ATACANTE ---------------------
function seleccionarAtacante(carta) {
      if (carta.mareoInvocacion) {
        log(`${carta.name} no puede atacar este turno (mareo de invocaion).`);
        return;
    }
    const index = atacantesSeleccionados.indexOf(carta);
    if (index !== -1) {
        atacantesSeleccionados.splice(index, 1);
        carta.element.classList.remove('selected-to-attack');
    } else {
        atacantesSeleccionados.push(carta);
        carta.element.classList.add('selected-to-attack');
    }
}

// --------------------- COMBATE ---------------------
function Combate(atacante, defensor) {
    atacante.toughness -= defensor.power;
    defensor.toughness -= atacante.power;

    PlayerBattlefield = PlayerBattlefield.filter(c => c.toughness > 0);
    EnemyBattlefield = EnemyBattlefield.filter(c => c.toughness > 0);

    mostrarBattlefield();
    mostrarEnemyBattlefield();
    updateTurn();
}

// --------------------- TURNO ---------------------
function enderezarCriaturas(turnoActual) {
    let battlefield = turnoActual === 'player' ? PlayerBattlefield : EnemyBattlefield;

    battlefield.forEach(carta => {
        carta.mareoInvocacion = false;
        carta.tapped = false;
        carta.toughness = carta.basetoughness;
        
        if (carta.element) {
            carta.element.classList.remove('tapped');
            carta.element.classList.remove('untap'); 
            void carta.element.offsetWidth; 
            carta.element.classList.add('untap');

            carta.element.addEventListener('animationend', () => {
                carta.element.classList.remove('untap');
            }, { once: true });
        }
    });
}

function iniciarTurno(turnoActual) {
    turn = turnoActual;

    PlayerBattlefield.forEach(c => c.hasBlocked = false);
    EnemyBattlefield.forEach(c => c.hasBlocked = false);

    if (turnoActual === 'player') {
        attackBtn.disabled = false;
        robarBtn.disabled = false;
        enderezarCriaturas('player');
        mostrarBattlefield();
        log("Es tu turno.");
    } else {
        attackBtn.disabled = true;
        robarBtn.disabled = true;
        enderezarCriaturas('enemy');
        mostrarEnemyBattlefield();
        log("Turno del enemigo.");
        setTimeout(enemyTurn, 1000);
    }
}

function finalizarTurnoEnemy() {
    esperandoBloqueos = false;
    atacantesNoBloqueados = [];
    if (playerLife <= 0) { log("¡Perdiste!"); return; }
    iniciarTurno('player');
}

function enemyTurn() {
    attackBtn.disabled = true;
    robarBtn.disabled = true;

    robarCartaEnemy();

    if (manoRival.length > 0) {
        jugarEnemy(manoRival[0]);
    }

    mostrarEnemyBattlefield();
    mostrarBattlefield();

    const atacantesEnemy = EnemyBattlefield.filter(c => !c.tapped && !c.mareoInvocacion);

    if (atacantesEnemy.length === 0) {
        log("El enemigo no tiene criaturas para atacar.");
        finalizarTurnoEnemy();
        return;
    }

    atacantesEnemy.forEach(carta => {
        tapCarta(carta);
    });

    mostrarEnemyBattlefield();

    atacantesNoBloqueados = [...atacantesEnemy];
    esperandoBloqueos = true;

    log(`El enemigo ataca con ${atacantesEnemy.map(c => c.name).join(", ")}.`);
    log("Selecciona bloqueadores o pulsa 'NoBloqueo'.");
}

// --------------------- VIDA ---------------------
function updateTurn() {
    document.getElementById("playerLife").textContent = playerLife;
    document.getElementById("enemyLife").textContent = enemyLife;
}

// --------------------- PASAR TURNO ---------------------
document.getElementById("pasar").addEventListener("click", () => {
    if (turn === 'player') iniciarTurno('enemy');
    else iniciarTurno('player');
});