
// Main Menu
document.getElementById("btn-start").addEventListener("click", ()=>{
  hide(startScreen); show(charSelect);
});
document.getElementById("btn-how").addEventListener("click", ()=>{
  hide(startScreen); show(howScreen);
});
document.getElementById("btn-credits").addEventListener("click", ()=>{
  hide(startScreen); show(creditsScreen);
});
document.getElementById("how-back").addEventListener("click", ()=>{
  hide(howScreen); show(startScreen);
});
document.getElementById("credits-back").addEventListener("click", ()=>{
  hide(creditsScreen); show(startScreen);
});

// Character Select
document.querySelectorAll("#character-select .char-buttons button").forEach(btn=>{
  btn.addEventListener("click", (e)=>{
    const char = e.currentTarget.dataset.char;
    startGameAs(char);
  });
});
document.getElementById("char-cancel").addEventListener("click", ()=>{
  hide(charSelect); show(startScreen);
});

// Bag Overlay
bagBtn.addEventListener("click", ()=> bagOverlay.classList.toggle("hidden"));
bagCloseBtn.addEventListener("click", ()=> hide(bagOverlay));

// Settings
menuBtn.addEventListener("click", ()=> menuOverlay.classList.toggle("hidden"));
menuReturn.addEventListener("click", ()=> hide(menuOverlay));
menuRestart.addEventListener("click", ()=> location.reload());
menuHome.addEventListener("click", ()=>{
  hide(menuOverlay); hide(gameUI);
  show(startScreen);
});

// Initialization to hide everything till game start.
(function init(){
  hide(gameUI);
  hide(howScreen);
  hide(creditsScreen);
  show(startScreen);
})();
