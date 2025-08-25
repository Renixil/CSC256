//UI Helpers & DOM References
const show = el => el.classList.remove("hidden");
const hide = el => el.classList.add("hidden");

// DOM elements
const startScreen   = document.getElementById("start-screen");
const howScreen     = document.getElementById("how-screen");
const creditsScreen = document.getElementById("credits-screen");
const charSelect    = document.getElementById("character-select");
const gameUI        = document.getElementById("game-ui");

const dialogueBox   = document.getElementById("dialogue-box");
const dialogueText  = document.getElementById("dialogue-text");
const choicesWrap   = document.getElementById("choices");

const sceneImg      = document.getElementById("scene-img");

const bagBtn        = document.getElementById("bag-ui");
const bagOverlay    = document.getElementById("bag-overlay");
const bagCloseBtn   = document.getElementById("bag-close");
const bagItems      = document.getElementById("bag-items");

const menuBtn       = document.getElementById("menu-button");
const menuOverlay   = document.getElementById("menu-overlay");
const menuRestart   = document.getElementById("menu-restart");
const menuReturn    = document.getElementById("menu-return");
const menuHome      = document.getElementById("menu-home");

const timeDisplay   = document.getElementById("time-display");
const locationBadge = document.getElementById("location-badge");
const moralityFill  = document.getElementById("morality-fill");

const trustReynaSpan    = document.querySelector("#trust-reyna span");
const trustArthurSpan   = document.querySelector("#trust-arthur span");
const trustKaneSpan     = document.querySelector("#trust-kane span");
const trustClarissaSpan = document.querySelector("#trust-clarissa span");

const diceOverlay   = document.getElementById("dice-overlay");
const dicePrompt    = document.getElementById("dice-prompt");
const diceThreshold = document.getElementById("dice-threshold");
const diceResult    = document.getElementById("dice-result");
const diceRollBtn   = document.getElementById("dice-roll");
const diceConfirmBtn= document.getElementById("dice-confirm");

const statStrength    = document.querySelector("#stat-strength span");
const statIntelligence= document.querySelector("#stat-intelligence span");
const statAgility     = document.querySelector("#stat-agility span");
const statCharisma    = document.querySelector("#stat-charisma span");

//HUD Updater for time, location, scene
function setTime(str){ timeStr = str; timeDisplay.textContent = str; }
function setLocation(str){ locationName = str; locationBadge.textContent = str; }
function setScene(src){ sceneImg.src = src || ""; }

//Morale UI
function updateMorale(){
  morality = Math.max(0, Math.min(100, morality));
  moralityFill.style.width = `${morality}%`;
  if (morality >= 70)      moralityFill.style.background = "linear-gradient(90deg,#27ae60,#2ecc71)";
  else if (morality >= 35) moralityFill.style.background = "linear-gradient(90deg,#c58b19,#d6a526)";
  else                     moralityFill.style.background = "linear-gradient(90deg,#b33939,#e74c3c)";
}

//Trust UI
function updateTrust(){
  trustReynaSpan.textContent    = trust.Reyna;
  trustArthurSpan.textContent   = trust.Arthur;
  trustKaneSpan.textContent     = trust.Kane;
  trustClarissaSpan.textContent = trust.Clarissa;
  const selfRow = document.getElementById(`trust-${(playerName||"").toLowerCase()}`);
  if (selfRow) selfRow.style.display = "none";
}

//Player Stats UI
function updatePlayerStatsUI(){
  if(!stats) return;
  statStrength.textContent     = stats.Strength || 0;
  statIntelligence.textContent = stats.Perception || 0;
  statAgility.textContent      = stats.Athletics || 0;
  statCharisma.textContent     = stats.Deception || 0;
}

//Bag overlay
function updateBag(){
  bagItems.innerHTML = "";
  inventory.forEach(it=>{
    const li = document.createElement("li");
    li.textContent = it;
    bagItems.appendChild(li);
  });
}
function addItem(item){ inventory.push(item); updateBag(); }
function itemBonusFor(stat){
  let b = 0;
  for(const it of inventory){
    const info = ITEM_BONUS[it];
    if (info && stat in info) b += (info[stat]||0);
  }
  return b;
}
