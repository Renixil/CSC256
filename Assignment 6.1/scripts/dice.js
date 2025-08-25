// Dice Setup
function triggerStatCheck(statName, DC, promptText, onSuccess, onFailure){
  // store the pending roll context
  pendingRoll = { statName, DC, onSuccess, onFailure, _total: null };

  // prep UI
  dicePrompt.textContent = promptText;
  const statVal = (stats && stats[statName]) ? stats[statName] : 0;
  const itemMod = itemBonusFor(statName);
  diceThreshold.textContent = `Target (DC) ${DC} • ${statName} ${statVal} • Item +${itemMod}`;
  diceResult.textContent = "";

  diceRollBtn.style.display = "inline-block";
  hide(diceConfirmBtn);
  show(diceOverlay);

  // roll system
  diceRollBtn.onclick = ()=>{
    if(!pendingRoll) return;
    const raw = Math.floor(Math.random()*20)+1;
    const total = raw + statVal + itemMod;
    pendingRoll._total = total;
    diceResult.textContent = `Rolled ${raw} + Stat ${statVal} + Items ${itemMod} = ${total}`;

    diceRollBtn.style.display = "none";
    show(diceConfirmBtn);
  };

  // confirm result button 
  diceConfirmBtn.onclick = ()=>{
    if(!pendingRoll) return;
    const pass = (pendingRoll._total ?? -Infinity) >= DC;

    hide(diceOverlay);
    const { onSuccess: ok, onFailure: bad } = pendingRoll;
    pendingRoll = null;

    if (pass){
      if (typeof ok === "function") ok();
    } else {
      if (typeof bad === "function") bad();
    }
  };
}
