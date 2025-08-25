//Global State
let playerName = null;            // "Reyna" or "Arthur"
let stats = null;                 // will reference CHARACTERS[playerName]
let inventory = [];
let morality = 100;
let trust = { Reyna:100, Arthur:100, Kane:100, Clarissa:100 };
let timeStr = "6:00 AM — Saturday";
let locationName = "Home — Bedroom";
let dialogueQueue = [];
let afterDialogueCallback = null;
let pendingRoll = null;
let currentNode = "start";

// Track visited nodes for one-time searches
let visited = new Set();
function markVisited(nodeId) { visited.add(nodeId); }
function hasVisited(nodeId) { return visited.has(nodeId); }

//inventory utilities
function addItem(item){
  if (!inventory.includes(item)) inventory.push(item);
}
function removeItem(item){
  inventory = inventory.filter(i => i !== item);
}

//Morale & Trust meter
function updateMorale(){
  if (morality < 0) morality = 0;
  if (morality > 100) morality = 100;
}
function updateTrust(){
  for (let key in trust){
    if (trust[key] > 100) trust[key] = 100;
    if (trust[key] < 0) trust[key] = 0;
  }
}
function checkAlive(){
  if (!isAlive) enterNode("ending_death");
}

// Stat Rolls
function getEffectiveStat(statName){
  if (!playerName || !CHARACTERS[playerName]) return 0;
  let baseStat = CHARACTERS[playerName][statName] || 0;

// Inventory Bonus to stats
  let bonus = inventory.reduce((sum, item) => {
    if (ITEM_BONUS[item] && ITEM_BONUS[item][statName]){
      return sum + ITEM_BONUS[item][statName];
    }
    return sum;
  }, 0);

  return baseStat + bonus;
}
function rollStatCheck(statCheck){
  const effectiveStat = getEffectiveStat(statCheck.stat);
  const roll = Math.floor(Math.random() * 20) + 1; // D20
  const total = roll + effectiveStat;

  console.log(`Rolling ${statCheck.stat}: D20(${roll}) + Effective Stat(${effectiveStat}) vs DC(${statCheck.DC}) = Total(${total})`);

  return total >= statCheck.DC;
}

//Dialogue Queues
function enqueueDialogue(lines, callback=null){
  dialogueQueue.push(...lines);
  afterDialogueCallback = callback;
}

// Node Handling
function enterNode(nodeName){
  if (!STORY[nodeName]){
    console.error(`Node not found: ${nodeName}`);
    return;
  }

  currentNode = nodeName;
  const node = STORY[nodeName];

  // Update location & time
  locationName = node.location || locationName;
  timeStr = node.time || timeStr;

  // Queue dialogue
  if (node.dialogue) enqueueDialogue(node.dialogue);

  // Execute node action
  if (node.action) node.action();
}
