//Dialogue and Choices
function enqueueDialogue(lines, onComplete){
  dialogueQueue = Array.isArray(lines) ? lines.slice() : [String(lines)];
  afterDialogueCallback = onComplete || null;
  showNextLine();
}

function showNextLine(){
  if (!dialogueQueue.length){
    if (typeof afterDialogueCallback === "function"){
      const cb = afterDialogueCallback;
      afterDialogueCallback = null;
      cb(); // continue to choices or next node
    }
    return;
  }
  choicesWrap.innerHTML = ""; // hide choices while showing dialogue
  dialogueText.textContent = dialogueQueue.shift();
}

dialogueBox.addEventListener("click", ()=>{
  const hasChoices = choicesWrap.children.length > 0;
  const diceVisible = !diceOverlay.classList.contains("hidden");
  if (!hasChoices && !diceVisible){ showNextLine(); }
});

//Show choices if requirements are met like weapons and such
function showChoices(options){
  choicesWrap.innerHTML = "";
  options.forEach(opt=>{
    const btn = document.createElement("button");
    btn.innerHTML = opt.html || opt.text || "…";
    btn.disabled = !!opt.disabled;
    if (opt.disabledReason) btn.title = opt.disabledReason;
    btn.addEventListener("click", (ev)=>{
      ev.stopPropagation();
      choicesWrap.innerHTML = "";
      if (typeof opt.action === "function") opt.action();
    });
    choicesWrap.appendChild(btn);
  });
}
