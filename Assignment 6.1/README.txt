Project Name: Dead Together

Description

This is a browser-based interactive story/game where the player chooses a character and navigates through a zombie apocalypse. Choices, stats, inventory, and random rolls influence the story outcome.

```project-folder/
│
├─ images/                 # Background images for the game
│   └─ [zombie.jpeg]
│
├─ scripts/                # JavaScript files
│   ├─ constants.js        # Story data, characters, items, node definitions
│   ├─ dialogue.js         # Dialogue queue and display logic
│   ├─ dice.js             # Stat check and dice roll functions
│   ├─ game.js             # Main game logic (entering nodes, applying effects)
│   ├─ main.js             # Initialization and event listeners
│   ├─ script.js           # Additional functions (if any)
│   ├─ state.js            # Tracks player state (stats, inventory, trust, morale)
│   └─ ui.js               # Handles updating the user interface
│
├─ dead together.html       # Main HTML file for the game
├─ Styles.css               # Styling for the game UI
└─ README.txt               # This file

*How to Run

Open dead together.html in a modern web browser.

Make sure the images folder and scripts folder are in the same directory as the HTML file.

Your character selection and story will appear. Follow on-screen prompts to progress.

*Gameplay Notes

Characters: Reyna and Arthur, each with unique stats.

Inventory: Collect items like Hammer, Kitchen Knife, Medkit, and Food to affect stats and story outcomes.

Stats: Strength, Perception, Athletics, Deception.

Choices: Most choices involve branching paths and can include stat checks.

One Background: The game currently uses a single background image for all nodes.

*Dependencies

Pure HTML, CSS, and JavaScript.

No external libraries required.

*Credits

dialogue, coding assistance, and error fixes helped with OpenAI’s ChatGPT.

*Author

[John Arcagua]