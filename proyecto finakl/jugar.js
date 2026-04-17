let playerLife = 20;
let enemyLife = 20;
let turn = 'player';

const deckPlayer = [
  { name:"Savannah Lions", type:"creature", cost:{W:1}, power:2, toughness:1, basetoughness:1, image:"img/savannah_lions.webp" },
  { name:"Thraben Inspector", type:"creature", cost:{W:1}, power:1, toughness:2, basetoughness:2, image:"img/thraben_inspector.webp" },
  { name:"Luminarch Aspirant", type:"creature", cost:{W:1, C:1}, power:1, toughness:1, basetoughness:1, image:"img/luminarch_aspirant.webp" },
  { name:"Adanto Vanguard", type:"creature", cost:{W:1, C:1}, power:3, toughness:1, basetoughness:1, image:"img/adanto_vanguard.webp" },
  { name:"Voice of Resurgence", type:"creature", cost:{G:1, W:1}, power:2, toughness:2, basetoughness:2, image:"img/voice_resurgence.webp" },
  { name:"Fleecemane Lion", type:"creature", cost:{G:1, W:1}, power:3, toughness:3, basetoughness:3, image:"img/fleecemane_lion.webp" },
  { name:"Knight of Autumn", type:"creature", cost:{G:1, W:1, C:1}, power:2, toughness:1, basetoughness:1, image:"img/knight_autumn.webp" },
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
let bloqueadoresSeleccionados = [];
let esperandoBloqueos = false;

const attackBtn = document.getElementById("attackBtn");
const robarBtn = document.getElementById("robarBtn");
const passBtn = document.getElementById("pasar");
const confirmBlockBtn = document.getElementById("confirmBlock");
const damagePanel = document.getElementById("damageDistribution");
const damageDistributionTitle = document.getElementById("damageDistributionTitle");
const damageDistributionInputs = document.getElementById("damageDistributionInputs");
const damageDistributionConfirm = document.getElementById("damageDistributionConfirm");
const damageDistributionCancel = document.getElementById("damageDistributionCancel");
const preview = document.getElementById("preview");
let previewTimeout = null;
let pendingDamageResolution = null;
let tutorialActivated = false;

function updateGameControlAvailability() {
    if (turn !== 'player') return;
    attackBtn.disabled = !tutorialActivated;
    robarBtn.disabled = !tutorialActivated;
    passBtn.disabled = !tutorialActivated;
}

function showPreview(imageUrl) {
    clearTimeout(previewTimeout);
    previewTimeout = setTimeout(() => {
        preview.style.backgroundImage = `url(${imageUrl})`;
        preview.style.display = 'block';
        requestAnimationFrame(() => preview.classList.add('visible'));
    }, 150);
}

function hidePreview() {
    clearTimeout(previewTimeout);
    preview.classList.remove('visible');
    setTimeout(() => {
        if (!preview.classList.contains('visible')) {
            preview.style.display = 'none';
        }
    }, 180);
}

const tutorialOverlay = document.getElementById('tutorial');
const tutorialMini = document.getElementById('tutorialMini');
const tutorialText = document.getElementById('tutorialText');
const tutorialNext = document.getElementById('tutorialNext');
const tutorialSkip = document.getElementById('tutorialSkip');
let tutorialIndex = 0;
let activeTutorialHighlight = null;

const tutorialSteps = [
    {
        text: 'Bienvenido, aprendiz. Soy el narrador del Multiverso y te guiaré en tu primer turno.',
        target: '#tutorial'
    },
    {
        text: 'Primero, roba una carta con el botón ROBAR. Cada turno puedes robar una carta.',
        target: '#robarBtn'
    },
    {
        text: 'Si tienes tierras en la mano, bájalas en el campo. Solo puedes jugar una tierra por turno.',
        target: '#mano'
    },
    {
        text: 'Gira una tierra en tu campo para generar maná del color del mismo y poder lanzar tus cartas de criaturas o hechizos.',
        target: '#PlayerBattlefield .cardlands'
    },
    {
        text: 'Ahora si tuvieras criaturas que lleven en el campo al menos un turno, puedes declarar ataque con ellas usando el boton ATACAR.',
        target: '#attackBtn'
    },
    {
        text: 'Cuando el enemigo ataque, puedes bloquear con tus criaturas que no esten tappeadas o usar NO BLOQUEO.',
        target: '#NoBloqueo'
    },
    {
        text: 'Usa PASAR para terminar tu turno y dejar que el rival tome su turno.',
        target: '#pasar'
    },
    {
        text: 'Listo. A partir de aqui vas solo, suerte y bienvenido al mundo de Magic: The Gathering',
        target: '#tutorial'
    }
];

function clearTutorialHighlight() {
    if (activeTutorialHighlight) {
        activeTutorialHighlight.classList.remove('tutorial-highlight');
        activeTutorialHighlight = null;
    }
}

function setTutorialHighlight(selector) {
    clearTutorialHighlight();
    if (!selector) return;
    const element = document.querySelector(selector);
    if (element) {
        element.classList.add('tutorial-highlight');
        activeTutorialHighlight = element;
        element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
}

function updateTutorialStep() {
    const step = tutorialSteps[tutorialIndex] || tutorialSteps[tutorialSteps.length - 1];
    tutorialText.textContent = step.text;
    tutorialNext.textContent = tutorialIndex < tutorialSteps.length - 1 ? 'Siguiente' : 'Cerrar';
    if (tutorialMini) {
        tutorialMini.title = step.text;
    }
    setTutorialHighlight(step.target);
    updateTutorialLandGlow();
}

function clearTutorialLandGlow() {
    document.querySelectorAll('#mano .carta.land-tutorial-glow').forEach(el => {
        el.classList.remove('land-tutorial-glow');
    });
}

function updateTutorialLandGlow() {
    clearTutorialLandGlow();
    if (tutorialIndex !== 2) return;
    document.querySelectorAll('#mano .carta[data-type="land"]').forEach(el => {
        el.classList.add('land-tutorial-glow');
    });
}

function applyTutorialSquareMode() {
    if (!tutorialOverlay) return;
    tutorialOverlay.classList.add('square');
}

function resetTutorialOverlaySize() {
    if (!tutorialOverlay) return;
    const logElement = document.getElementById('log');
    tutorialOverlay.style.position = '';
    tutorialOverlay.style.width = '';
    tutorialOverlay.style.height = '';
    tutorialOverlay.style.top = '';
    tutorialOverlay.style.bottom = '';
    tutorialOverlay.style.right = '';
    tutorialOverlay.style.left = '';
    tutorialOverlay.classList.remove('square');
    if (logElement) {
        logElement.style.marginBottom = '';
        logElement.style.height = '';
    }
}

function showTutorialOverlay() {
    if (!tutorialOverlay) return;
    tutorialIndex = 0;
    updateTutorialStep();
    applyTutorialSquareMode();
    tutorialOverlay.classList.add('visible');
    tutorialOverlay.style.display = 'flex';
    if (tutorialMini) {
        tutorialMini.hidden = true;
        tutorialMini.style.display = 'none';
    }
}

function showTutorialMini() {
    if (tutorialOverlay) {
        tutorialOverlay.classList.remove('visible');
        tutorialOverlay.style.display = 'none';
    }
    if (tutorialMini) {
        tutorialMini.hidden = false;
        tutorialMini.style.display = 'inline-flex';
        if (!tutorialActivated) {
            tutorialMini.classList.add('notice');
        }
    }
    clearTutorialHighlight();
}

function activateTutorialStart() {
    tutorialActivated = true;
    if (tutorialMini) {
        tutorialMini.classList.remove('notice');
    }
    updateGameControlAvailability();
}

function hideTutorial() {
    if (tutorialOverlay) {
        tutorialOverlay.classList.remove('visible');
        tutorialOverlay.style.display = 'none';
        resetTutorialOverlaySize();
    }
    if (tutorialMini) {
        tutorialMini.hidden = false;
        tutorialMini.style.display = 'inline-flex';
    }
    clearTutorialHighlight();
    clearTutorialLandGlow();
}

if (tutorialNext) {
    tutorialNext.addEventListener('click', () => {
        tutorialIndex += 1;
        if (tutorialIndex >= tutorialSteps.length) {
            hideTutorial();
            return;
        }
        updateTutorialStep();
    });
}

if (tutorialMini) {
    tutorialMini.addEventListener('click', () => {
        activateTutorialStart();
        showTutorialOverlay();
    });
}

if (tutorialSkip) {
    tutorialSkip.addEventListener('click', () => {
        hideTutorial();
    });
}

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
        cartaDiv.dataset.type = carta.type;

        cartaDiv.addEventListener('mouseenter', () => {
            showPreview(img.src);
        });
        cartaDiv.addEventListener('mousemove', (e) => {
            preview.style.top = e.clientY + 'px';
            preview.style.left = (e.clientX + 20) + 'px';
        });
        cartaDiv.addEventListener('mouseleave', () => {
            hidePreview();
        });

        cartaDiv.addEventListener("click", () => jugar(carta));

        contenedor.appendChild(cartaDiv);
    });

    updateTutorialLandGlow();
}

function robarCarta() {
    if (!tutorialActivated) {
        log('Debes mostrar la guía antes de empezar.');
        return;
    }
    if (turn !== 'player' || robarBtn.disabled) return;

    const carta = robar(deckPlayer);
    robarBtn.disabled = true;
    if (carta) {
        carta.tapped = false;
        manoJugador.push(carta);
        ManoMostrar(manoJugador);
        const manoContainer = document.getElementById('mano');
        const drawnCardElement = manoContainer.lastElementChild;
        if (drawnCardElement) {
            drawnCardElement.classList.add('drawn');
        }
    } else {
        log("No quedan cartas en el mazo");
    }
}

function robarCartaEnemy() {
    const carta = robar(EnemyDeck);
    if (carta) {
        carta.tapped = false;
        manoRival.push(carta);
    } else log("No quedan cartas en el mazo");
}

function robarManoInicial(cantidad = 5) {
    for (let i = 0; i < cantidad; i++) {
        const carta = robar(deckPlayer);
        if (carta) {
            carta.tapped = false;
            manoJugador.push(carta);
        }
        robarCartaEnemy();
    }
    ManoMostrar(manoJugador);
    log(`Ambos jugadores roban ${cantidad} cartas iniciales.`);
}   

// --------------------- JUEGO ---------------------
function jugar(carta) {
    if (!tutorialActivated) {
        log('Debes mostrar la guía antes de empezar.');
        return;
    }
    if (turn !== 'player') {
        log('Solo puedes jugar cartas en tu turno.');
        return;
    }

    if (carta.type === 'land') {
        if (landPlayedThisTurn) {
            log('Solo puedes jugar una tierra por turno.');
            return;
        }

        const indexLand = manoJugador.indexOf(carta);
        if (indexLand !== -1) manoJugador.splice(indexLand, 1);
        carta.tapped = false;
        carta.mareoInvocacion = false;
        PlayerBattlefield.push(carta);
        landPlayedThisTurn = true;
        ManoMostrar(manoJugador);
        mostrarBattlefield();
        log(`Bajas tierra: ${carta.name}.`);
        return;
    }

    if (!canPayCost(carta.cost, playerManaPool)) {
        log(`No tienes maná suficiente para jugar ${carta.name}.`);
        return;
    }

    payCost(carta.cost, playerManaPool);
    updateManaUI();

    const index = manoJugador.indexOf(carta);
    if (index !== -1) manoJugador.splice(index, 1);
    carta.tapped = false;
    carta.mareoInvocacion = true;
    PlayerBattlefield.push(carta);
    ManoMostrar(manoJugador);
    mostrarBattlefield();
    log(`Lanzas ${carta.name}.`);
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
    const contenedorCriaturas = document.querySelector("#PlayerBattlefield .cardcreature");
    const contenedorTierras = document.querySelector("#PlayerBattlefield .cardlands");

    contenedorCriaturas.innerHTML = "";
    contenedorTierras.innerHTML = "";

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
                if (carta.isDying) return;
                if (esperandoBloqueos) {
                    if (carta.type !== 'creature') {
                        log(`${carta.name} no puede bloquear.`);
                        return;
                    }

                    if (carta.tapped) {
                        log(`${carta.name} está tappeada y no puede bloquear.`);
                        return;
                    }

                    const index = bloqueadoresSeleccionados.indexOf(carta);
                    if (index !== -1) {
                        bloqueadoresSeleccionados.splice(index, 1);
                        carta.element.classList.remove('selected-blocker');
                        log(`${carta.name} ya no bloquea el atacante actual.`);
                    } else {
                        if (carta.hasBlocked) {
                            log(`${carta.name} ya ha bloqueado este turno.`);
                            return;
                        }
                        bloqueadoresSeleccionados.push(carta);
                        carta.element.classList.add('selected-blocker');
                        log(`${carta.name} se usa para bloquear al atacante actual.`);
                    }
                    return;
                }

                if (turn === 'player') {
                    if (carta.type === 'land') {
                        tapLandForMana(carta, 'player');
                        mostrarBattlefield();
                        return;
                    }

                    if (carta.tapped) {
                        log(`${carta.name} está tappeada y no puede atacar.`);
                        return;
                    }

                    seleccionarAtacante(carta);
                }
            });

            cartaDiv.addEventListener('mouseenter', () => {
                showPreview(carta.image);
            });
            cartaDiv.addEventListener('mousemove', (e) => {
                preview.style.top = e.clientY + 'px';
                preview.style.left = (e.clientX + 20) + 'px';
            });
            cartaDiv.addEventListener('mouseleave', () => { hidePreview(); });
        }

        cartaDiv.classList.toggle('tapped', carta.tapped);
  if (carta.type === 'land') {
            contenedorTierras.appendChild(cartaDiv);
        } else {
            contenedorCriaturas.appendChild(cartaDiv);
        }    });
}

function mostrarEnemyBattlefield() {
      const contenedorCriaturas = document.querySelector("#EnemyBattlefield .cardcreature");
    const contenedorTierras = document.querySelector("#EnemyBattlefield .cardlands");

    contenedorCriaturas.innerHTML = "";
    contenedorTierras.innerHTML = "";
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
                showPreview(carta.image);
            });
            cartaDiv.addEventListener('mousemove', (e) => {
                preview.style.top = (e.clientY + 70) + 'px';
                preview.style.left = (e.clientX + 20) + 'px';
            });
            cartaDiv.addEventListener('mouseleave', () => { hidePreview(); });
        }

        cartaDiv.classList.toggle('tapped', carta.tapped);

   if (carta.type === 'land') {
            contenedorTierras.appendChild(cartaDiv);
        } else {
            contenedorCriaturas.appendChild(cartaDiv);
        }    });
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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function animateCard(carta, className) {
    if (!carta || !carta.element) return;
    carta.element.classList.add(className);
    carta.element.addEventListener('animationend', () => {
        carta.element.classList.remove(className);
    }, { once: true });
}

function clearBlockSelections() {
    bloqueadoresSeleccionados.forEach(carta => {
        if (carta.element) carta.element.classList.remove('selected-blocker');
    });
    bloqueadoresSeleccionados = [];
}

function markDyingCreature(carta) {
    if (!carta || carta.type !== 'creature') return;
    carta.isDying = true;
    if (carta.element) {
        carta.element.classList.add('dead');
        carta.element.style.pointerEvents = 'none';
        carta.element.classList.remove('selected-to-attack', 'selected-blocker');
    }
    atacantesSeleccionados = atacantesSeleccionados.filter(c => c !== carta);
    bloqueadoresSeleccionados = bloqueadoresSeleccionados.filter(c => c !== carta);
}

function showDamageDistributionPanel(atacante, bloqueadores) {
    if (!damagePanel || !damageDistributionTitle || !damageDistributionInputs) return;
    damageDistributionTitle.textContent = `Repartir ${atacante.power} daño de ${atacante.name}`;
    damageDistributionInputs.innerHTML = '';

    bloqueadores.forEach((bloqueador, index) => {
        const row = document.createElement('div');
        row.className = 'damage-distribution-row';

        const label = document.createElement('label');
        label.textContent = `${bloqueador.name} (T:${bloqueador.toughness})`;
        label.htmlFor = `damage-input-${index}`;

        const input = document.createElement('input');
        input.id = `damage-input-${index}`;
        input.type = 'number';
        input.min = '0';
        input.value = Math.floor(atacante.power / bloqueadores.length);
        input.dataset.index = index;
        input.className = 'damage-input';

        row.appendChild(label);
        row.appendChild(input);
        damageDistributionInputs.appendChild(row);
    });

    damagePanel.classList.add('visible');
}

function hideDamageDistributionPanel() {
    if (!damagePanel) return;
    damagePanel.classList.remove('visible');
    pendingDamageResolution = null;
}

function validateDamageDistribution(atacante, bloqueadores) {
    if (!damageDistributionInputs) return null;
    const inputs = damageDistributionInputs.querySelectorAll('input');
    const values = [];
    let total = 0;

    inputs.forEach(input => {
        const value = parseInt(input.value, 10);
        const damage = Number.isNaN(value) ? 0 : Math.max(0, value);
        values.push(damage);
        total += damage;
    });

    if (values.length !== bloqueadores.length || total > atacante.power) return null;
    return values;
}

function autoAssignDamage(atacante, bloqueadores) {
    const remainingDamage = atacante.power;
    const assignment = bloqueadores.map(() => 0);
    let damageLeft = remainingDamage;

    bloqueadores.forEach((bloqueador, index) => {
        if (damageLeft <= 0) return;
        const needed = Math.max(0, bloqueador.toughness);
        const assigned = Math.min(needed, damageLeft);
        assignment[index] = assigned;
        damageLeft -= assigned;
    });

    if (damageLeft > 0 && bloqueadores.length > 0) {
        assignment[bloqueadores.length - 1] += damageLeft;
    }

    return assignment;
}

function requestDamageDistribution(atacante, bloqueadores) {
    if (EnemyBattlefield.includes(atacante)) {
        const aiAssignment = autoAssignDamage(atacante, bloqueadores);
        log(`El enemigo reparte automáticamente ${atacante.power} daño entre los bloqueadores.`);
        return Promise.resolve(aiAssignment);
    }

    return new Promise(resolve => {
        if (!damageDistributionConfirm || !damageDistributionCancel) {
            resolve(Array(bloqueadores.length).fill(Math.floor(atacante.power / bloqueadores.length)));
            return;
        }

        pendingDamageResolution = { atacante, bloqueadores, resolve };
        showDamageDistributionPanel(atacante, bloqueadores);
    });
}

function removeDeadCreature(carta, battlefield) {
    if (!carta || carta.type !== 'creature' || carta.toughness > 0 || carta.isDying) return;

    markDyingCreature(carta);
    const index = battlefield.indexOf(carta);
    if (index !== -1) battlefield.splice(index, 1);

    if (!carta.element) return;

    carta.element.addEventListener('animationend', () => {
        if (carta.element && carta.element.parentElement) {
            carta.element.parentElement.removeChild(carta.element);
        }
        mostrarBattlefield();
        mostrarEnemyBattlefield();
    }, { once: true });
}

function handleCombatDeaths(atacante, defensor) {
    if (Array.isArray(defensor)) {
        if (PlayerBattlefield.includes(atacante)) {
            defensor.forEach(blocker => removeDeadCreature(blocker, EnemyBattlefield));
            removeDeadCreature(atacante, PlayerBattlefield);
        } else {
            defensor.forEach(blocker => removeDeadCreature(blocker, PlayerBattlefield));
            removeDeadCreature(atacante, EnemyBattlefield);
        }
        return;
    }

    if (PlayerBattlefield.includes(atacante)) {
        removeDeadCreature(atacante, PlayerBattlefield);
        removeDeadCreature(defensor, EnemyBattlefield);
    } else {
        removeDeadCreature(atacante, EnemyBattlefield);
        removeDeadCreature(defensor, PlayerBattlefield);
    }
}

async function bloquearAtacanteActual() {
    const atacante = atacantesNoBloqueados.shift();
    if (!atacante) return;

    const bloqueadores = [...bloqueadoresSeleccionados];
    clearBlockSelections();

    if (bloqueadores.length === 0) {
        if (EnemyBattlefield.includes(atacante)) {
            playerLife -= atacante.power;
            log(`${atacante.name} golpea directamente a ti por ${atacante.power}`);
        } else {
            enemyLife -= atacante.power;
            log(`${atacante.name} golpea directamente al enemigo por ${atacante.power}`);
        }
        updateTurn();
        mostrarBattlefield();
        mostrarEnemyBattlefield();
    } else {
        bloqueadores.forEach(blocker => {
            blocker.hasBlocked = true;
        });

        const damageAssignment = await requestDamageDistribution(atacante, bloqueadores);
        damageAssignment.forEach((damage, index) => {
            const blocker = bloqueadores[index];
            blocker.toughness -= damage;
            log(`${atacante.name} asigna ${damage} daño a ${blocker.name}`);
        });

        const totalBlockPower = bloqueadores.reduce((sum, blocker) => sum + blocker.power, 0);
        atacante.toughness -= totalBlockPower;
        log(`${atacante.name} recibe ${totalBlockPower} daño de los bloqueadores.`);

        mostrarBattlefield();
        mostrarEnemyBattlefield();
        updateTurn();
        handleCombatDeaths(atacante, bloqueadores);
        limpiarCriaturasMuertas();
    }

    if (atacantesNoBloqueados.length === 0) {
        esperandoBloqueos = false;
        if (confirmBlockBtn) confirmBlockBtn.disabled = true;
        finalizarTurnoEnemy();
        return;
    }

    const siguiente = atacantesNoBloqueados[0];
    if (siguiente) {
        log(`Atacante siguiente: ${siguiente.name}. Selecciona bloqueadores y confirma.`);
    }
}

function limpiarCriaturasMuertas() {
    PlayerBattlefield = PlayerBattlefield.filter(c => c.type !== 'creature' || c.toughness > 0);
    EnemyBattlefield = EnemyBattlefield.filter(c => c.type !== 'creature' || c.toughness > 0);
}
// --------------------- ATACAR ---------------------
attackBtn.addEventListener("click", async () => {
    if (!tutorialActivated) {
        log('Debes mostrar la guía antes de empezar.');
        return;
    }
    if (turn !== 'player') return;
    if (atacantesSeleccionados.length === 0) {
        log("Debes seleccionar al menos una criatura para atacar.");
        return;
    }

    passBtn.disabled = true;

    atacantesSeleccionados.forEach(carta => {
        carta.tapped = true;
        carta.element.classList.add('tapped'); 
    });

    atacantesNoBloqueados = [...atacantesSeleccionados];
    esperandoBloqueos = true;

    log(`Has declarado ataque con ${atacantesSeleccionados.map(c => c.name).join(', ')}.`);
    atacantesSeleccionados.forEach(c => c.element.classList.remove('selected-to-attack'));
    atacantesSeleccionados = [];

    while (atacantesNoBloqueados.length > 0) {
        const atacante = atacantesNoBloqueados.shift();
        const bloqueadores = EnemyBattlefield.filter(c => c.type === 'creature' && !c.hasBlocked && !c.tapped);

        if (bloqueadores.length === 0) {
            enemyLife -= atacante.power;
            log(`${atacante.name} golpea directamente al enemigo por ${atacante.power}`);
            continue;
        }

        bloqueadores.forEach(blocker => blocker.hasBlocked = true);
        log(`${bloqueadores.map(c => c.name).join(', ')} bloquean a ${atacante.name}`);
        const damageAssignment = await requestDamageDistribution(atacante, bloqueadores);
        damageAssignment.forEach((damage, index) => {
            const blocker = bloqueadores[index];
            blocker.toughness -= damage;
            log(`${atacante.name} asigna ${damage} daño a ${blocker.name}`);
        });

        const totalBlockPower = bloqueadores.reduce((sum, blocker) => sum + blocker.power, 0);
        atacante.toughness -= totalBlockPower;
        log(`${atacante.name} recibe ${totalBlockPower} daño de los bloqueadores.`);

        mostrarBattlefield();
        mostrarEnemyBattlefield();
        updateTurn();
        handleCombatDeaths(atacante, bloqueadores);
        limpiarCriaturasMuertas();
    }

    esperandoBloqueos = false;
    if (confirmBlockBtn) confirmBlockBtn.disabled = true;
    updateTurn();
    if (enemyLife <= 0) { log("¡Has ganado!"); return; }
    iniciarTurno('enemy');
})

// --------------------- BLOQUEAR ---------------------
function bloquearAutomatico(atacante) {
const bloqueador = PlayerBattlefield.find(c => c.type === 'creature' && !c.tapped && !c.hasBlocked);
    if (!bloqueador) {
        playerLife -= atacante.power;
        log(`${atacante.name} golpea directamente a ti por ${atacante.power}`);
        return;
    }

    atacante.toughness -= bloqueador.power;
    bloqueador.toughness -= atacante.power;

    log(`${bloqueador.name} bloquea a ${atacante.name} y ambos reciben daño`);

    mostrarBattlefield();
    mostrarEnemyBattlefield();
    updateTurn();
    handleCombatDeaths(atacante, bloqueador);
    limpiarCriaturasMuertas();
}

document.getElementById("NoBloqueo").addEventListener("click", function () {

    if (!esperandoBloqueos) return;

    if (bloqueadoresSeleccionados.length > 0) {
        clearBlockSelections();
        log('Se cancelaron los bloqueadores seleccionados.');
    }

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
    if (confirmBlockBtn) confirmBlockBtn.disabled = true;

    finalizarTurnoEnemy();
});

if (confirmBlockBtn) {
    confirmBlockBtn.disabled = true;
    confirmBlockBtn.addEventListener('click', async () => {
        if (!esperandoBloqueos || atacantesNoBloqueados.length === 0) return;
        await bloquearAtacanteActual();
    });
}

if (damageDistributionConfirm) {
    damageDistributionConfirm.addEventListener('click', () => {
        if (!pendingDamageResolution) return;
        const { atacante, bloqueadores, resolve } = pendingDamageResolution;
        const values = validateDamageDistribution(atacante, bloqueadores);
        if (!values) {
            log('Distribución inválida. Ajusta los valores para que sumen como máximo el poder del atacante.');
            return;
        }
        hideDamageDistributionPanel();
        resolve(values);
        pendingDamageResolution = null;
    });
}

if (damageDistributionCancel) {
    damageDistributionCancel.addEventListener('click', () => {
        if (!pendingDamageResolution) return;
        const { atacante, bloqueadores, resolve } = pendingDamageResolution;
        hideDamageDistributionPanel();
        const defaultDamage = Array(bloqueadores.length).fill(Math.floor(atacante.power / bloqueadores.length));
        resolve(defaultDamage);
    });
}

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


    mostrarBattlefield();
    mostrarEnemyBattlefield();
    updateTurn();
    handleCombatDeaths(atacante, defensor);
    limpiarCriaturasMuertas();
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
    if (turn && turn !== turnoActual) {
        clearManaPool(turn);
    }

    turn = turnoActual;
    landPlayedThisTurn = false;

    PlayerBattlefield.forEach(c => c.hasBlocked = false);
    EnemyBattlefield.forEach(c => c.hasBlocked = false);

    updateManaUI();

    if (turnoActual === 'player') {
        attackBtn.disabled = !tutorialActivated;
        robarBtn.disabled = !tutorialActivated;
        passBtn.disabled = !tutorialActivated;
        if (confirmBlockBtn) confirmBlockBtn.disabled = true;
        enderezarCriaturas('player');
        mostrarBattlefield();
        log("Es tu turno.");
    } else {
        attackBtn.disabled = true;
        robarBtn.disabled = true;
        passBtn.disabled = true;
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

async function enemyTurn() {
    attackBtn.disabled = true;
    robarBtn.disabled = true;

    robarCartaEnemy();
    log("El enemigo roba una carta.");
    mostrarEnemyBattlefield();
    mostrarBattlefield();
    await delay(700);

    // 1) Juega una tierra si tiene
    const tierraEnMano = manoRival.find(c => c.type === 'land');
    if (tierraEnMano) {
        jugarEnemy(tierraEnMano);
        mostrarEnemyBattlefield();
        animateCard(tierraEnMano, 'played');
        log(`El enemigo baja tierra: ${tierraEnMano.name}.`);
        await delay(700);
    }

    // 2) Solo intenta generar maná si hay hechizos en mano
    const hechizosEnMano = manoRival.filter(c => c.type !== 'land');
    if (hechizosEnMano.length > 0) {
        const tierrasEnemy = EnemyBattlefield.filter(c => c.type === 'land' && !c.tapped);

        // Mana hipotético: pool actual + tierras enderezadas
        const manaPotencial = { ...enemyManaPool };
        for (const tierra of tierrasEnemy) {
            const color = tierra.produces && tierra.produces[0];
            if (color) {
                manaPotencial[color] = (manaPotencial[color] || 0) + 1;
            }
        }

        // Busca un hechizo realmente jugable con ese maná potencial
        const hechizoJugable = hechizosEnMano.find(c => canPayCost(c.cost, manaPotencial));

        if (hechizoJugable) {
            for (const tierra of tierrasEnemy) {
                if (canPayCost(hechizoJugable.cost, enemyManaPool)) break;
                tapLandForMana(tierra, 'enemy');
                mostrarEnemyBattlefield();
                updateManaUI();
                await delay(500);
            }

            await delay(500);
            if (canPayCost(hechizoJugable.cost, enemyManaPool)) {
                payCost(hechizoJugable.cost, enemyManaPool);
                jugarEnemy(hechizoJugable);
                updateManaUI();
                mostrarEnemyBattlefield();
                animateCard(hechizoJugable, 'played');
                log(`El enemigo lanza ${hechizoJugable.name}.`);
                await delay(700);
            }
        }
    }

    mostrarEnemyBattlefield();
    mostrarBattlefield();

    const atacantesEnemy = EnemyBattlefield.filter(
        c => c.type === 'creature' && !c.tapped && !c.mareoInvocacion
    );

    if (atacantesEnemy.length === 0) {
        log("El enemigo no tiene criaturas para atacar.");
        await delay(600);
        finalizarTurnoEnemy();
        return;
    }

    for (const carta of atacantesEnemy) {
        tapCarta(carta);
        mostrarEnemyBattlefield();
        await delay(450);
    }

    await delay(400);
    mostrarEnemyBattlefield();

    atacantesNoBloqueados = [...atacantesEnemy];
    esperandoBloqueos = true;
    passBtn.disabled = true;
    if (confirmBlockBtn) confirmBlockBtn.disabled = false;

    log(`El enemigo ataca con ${atacantesEnemy.map(c => c.name).join(", ")}.`);
    log("Selecciona bloqueadores, confirma y asigna daño entre ellos.");
}   
updateManaUI();
robarManoInicial(5);
iniciarTurno('player');
showTutorialMini();

// --------------------- VIDA ---------------------
function updateTurn() {
    document.getElementById("playerLife").textContent = playerLife;
    document.getElementById("enemyLife").textContent = enemyLife;
}

// --------------------- PASAR TURNO ---------------------
document.getElementById("pasar").addEventListener("click", () => {
    if (!tutorialActivated) {
        log('Debes mostrar la guía antes de empezar.');
        return;
    }
    if (turn === 'player') iniciarTurno('enemy');
    else iniciarTurno('player');
});

//-----------------------MANA---------------------------------
function manaPoolToText(pool) {
    return `W:${pool.W} U:${pool.U} B:${pool.B} R:${pool.R} G:${pool.G} C:${pool.C}`;
}

function updateManaUI() {
    const playerMana = document.getElementById("playerMana");
    const enemyMana = document.getElementById("enemyMana");

    if (playerMana) playerMana.textContent = manaPoolToText(playerManaPool);
    if (enemyMana) enemyMana.textContent = manaPoolToText(enemyManaPool);
}

function clearManaPool(turnoActual) {
    const pool = turnoActual === 'player' ? playerManaPool : enemyManaPool;
    Object.keys(pool).forEach(color => pool[color] = 0);
}

function canPayCost(cost, pool) {
    if (!cost) return true;

    const available = { ...pool };

    for (const color of ['W', 'U', 'B', 'R', 'G']) {
        const required = cost[color] || 0;
        if (available[color] < required) return false;
        available[color] -= required;
    }

    const generic = cost.C || 0;
    const totalLeft = Object.values(available).reduce((sum, value) => sum + value, 0);
    return totalLeft >= generic;
}

function payCost(cost, pool) {
    if (!cost) return;

    for (const color of ['W', 'U', 'B', 'R', 'G']) {
        const required = cost[color] || 0;
        if (required > 0) pool[color] -= required;
    }

    let generic = cost.C || 0;
    const spendOrder = ['C', 'W', 'U', 'B', 'R', 'G'];

    for (const color of spendOrder) {
        while (generic > 0 && pool[color] > 0) {
            pool[color] -= 1;
            generic -= 1;
        }
    }
}

function tapLandForMana(carta, turnoActual) {
    if (!carta || carta.type !== 'land') return;
    if (carta.tapped) {
        log(`${carta.name} ya está girada.`);
        return;
    }

    const pool = turnoActual === 'player' ? playerManaPool : enemyManaPool;
    const manaColor = carta.produces && carta.produces[0];

    if (!manaColor) return;

    tapCarta(carta);
    pool[manaColor] = (pool[manaColor] || 0) + 1;
    updateManaUI();
    log(`${turnoActual === 'player' ? 'Generas' : 'El enemigo genera'} 1 maná ${manaColor} con ${carta.name}.`);
}