//story engine
function enterNode(key){
  currentNode = key;
  const node = STORY[key];
  if (!node) { console.error("Node not found:", key); return; }

  // Update scene, location, time
  if(node.image) setScene(node.image);
  if(node.location) setLocation(node.location);
  if(node.time) setTime(node.time);
  if (node.action) node.action();

  const lines = (node.dialogue || []).map(s => s.replace("{player}", playerName || ""));
  enqueueDialogue(lines, ()=>{
    if (node.choices && node.choices.length){
      const opts = node.choices.map(ch => ({
        html: ch.html || ch.text,
        action: ()=> {
          if (ch.statCheck){
            triggerStatCheck(
              ch.statCheck.stat,
              ch.statCheck.DC,
              ch.statCheck.prompt || "Stat Check",
              // on success
              ()=> {
                ch.successAction && ch.successAction();
                const after = ()=> ch.successNext ? enterNode(ch.successNext) : null;
                if (ch.successDialogue && ch.successDialogue.length){
                  enqueueDialogue(ch.successDialogue, after);
                } else { after(); }
              },
              // on failure
              ()=> {
                ch.failureAction && ch.failureAction();
                const after = ()=> ch.failureNext ? enterNode(ch.failureNext) : null;
                if (ch.failureDialogue && ch.failureDialogue.length){
                  enqueueDialogue(ch.failureDialogue, after);
                } else { after(); }
              }
            );
          } else {
            // non-stat choice
            if (ch.action) ch.action();
            if (ch.dialogue && ch.dialogue.length){
              enqueueDialogue(ch.dialogue, ()=> ch.next ? enterNode(ch.next) : null);
            } else if (ch.next){
              enterNode(ch.next);
            }
          }
        }
      }));
      showChoices(opts);
    }
  });
}

//start game flow
function startGameAs(char){
  if (!CHARACTERS[char]) {
    console.error("Invalid character:", char);
    return;
  }

  playerName = char;
  stats = { ...CHARACTERS[char] }; // copy character stats
  inventory = [];
  morality = 100;

  // initialize trust bars
  trust = { Kane:100, Clarissa:100 };
  if(char === "Reyna") trust.Reyna = 100;
  else trust.Arthur = 100;

  updateTrust();
  updateMorale();
  updatePlayerStatsUI();
  updateBag();

  hide(charSelect);
  show(gameUI);

  enterNode("start");
}

function updatePlayerStatsUI(){
  const container = document.getElementById("stats-container");
  container.innerHTML = ""; // clear previous stats

  document.getElementById("player-name").textContent = playerName;

  for (let stat in stats){
    const barWrapper = document.createElement("div");
    barWrapper.className = "stat-bar";

    const label = document.createElement("div");
    label.className = "stat-bar-name";
    label.textContent = `${stat}: ${stats[stat]}`;

    const bar = document.createElement("div");
    bar.className = "stat-bar-fill";
    bar.style.width = `${stats[stat]}%`;

    barWrapper.appendChild(label);
    barWrapper.appendChild(bar);
    container.appendChild(barWrapper);
  }
}
