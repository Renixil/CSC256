/*************************************************
 * PART 1 — HOUSE / FIRST HOUR
 *************************************************/
const CHARACTERS = {
  Reyna: { Strength:5, Perception:10, Athletics:4, Deception:10, description:"Reyna is highly intelligent, perceptive, with protective instincts." },
  Arthur:{ Strength:9, Perception:5, Athletics:9, Deception:2, description:"Arthur is strong, willing to sacrifice himself, values honor." }
};

const ITEM_BONUS = {
  "Hammer": { Strength:2 },
  "Kitchen Knife": { Strength:2 },
  "Gun": { Strength:3 },
  "Medkit": {},
  "Food": {}
};

let inventory = [];
function addItem(item) { inventory.push(item); }

let visited = new Set();
function markVisited(nodeId) { visited.add(nodeId); }
function hasVisited(nodeId) { return visited.has(nodeId); }

const STORY_PART1 = {
  start: {
    dialogue:[
      "You wake up groggy. The house is quiet except for faint distant noises.",
      "Your children, Kane and Clarissa, are still asleep upstairs."
    ],
    location:"Home — Bedroom",
    time:"6:00 AM — Saturday",
    image:"images/zombie.jpeg",
    choices:[
      { text:"Check your phone", next:"phone" },
      { text:"Turn on the TV", next:"tv" }
    ]
  },

  phone: {
    dialogue:[
      "Your phone has no signal. Battery blinks red.",
      "Kane calls from upstairs, 'Mom/Dad, what's happening?'"
    ],
    location:"Home — Bedroom",
    time:"6:05 AM",
    choices:[{ text:"Go to the kitchen", next:"grab_weapon" }]
  },

  tv: {
    dialogue:[
      "The TV shows static. Suddenly, a loud *BANG* comes from outside.",
      "Clarissa cries, 'Is that… someone outside?'"
    ],
    location:"Home — Bedroom",
    time:"6:05 AM",
    choices:[{ text:"Go to the kitchen", next:"grab_weapon" }]
  },

  grab_weapon: {
    dialogue:[
      "You enter the kitchen. On the counter: a hammer and a kitchen knife.",
      "Kane and Clarissa shuffle in behind you, confused and wide-eyed from the noise outside."
    ],
    location:"Home — Kitchen",
    time:"6:05 AM",
    choices:[
      { text:"Take the hammer", action:()=>addItem("Hammer"), next:"zombie_encounter" },
      { text:"Take the kitchen knife", action:()=>addItem("Kitchen Knife"), next:"zombie_encounter" },
      { text:"Leave empty-handed", next:"zombie_encounter" }
    ]
  },

  zombie_encounter: {
    dialogue:["Suddenly, a zombie slams against the living room window!"],
    location:"Home — Living Room",
    time:"6:10 AM",
    get choices() {
      if (inventory.some(i => i==="Hammer" || i==="Kitchen Knife" || i==="Gun")) {
        return [
          { html:'<span class="stat-check">(Strength)</span> Attack zombie with weapon', statCheck:{ stat:"Strength", DC:12, prompt:"Use your weapon to kill the zombie!" }, successNext:"zombie_killed", failureNext:"zombie_death" },
          { text:"Freeze in fear", next:"zombie_breakin" }
        ];
      } else {
        return [
          { html:'<span class="stat-check">(Strength)</span> Shove zombie away', statCheck:{ stat:"Strength", DC:15, prompt:"Try to push the zombie back!" }, successNext:"zombie_retreats", failureNext:"zombie_death" },
          { text:"Freeze in fear", next:"zombie_breakin" }
        ];
      }
    }
  },

  zombie_killed: {
    dialogue:[
      "You strike decisively. The zombie collapses, finally still.",
      "Kane and Clarissa breathe a shaky sigh of relief."
    ],
    location:"Home — Living Room",
    time:"6:15 AM",
    choices:[{ text:"Search the house for supplies", next:"house_supplies" }]
  },

  zombie_retreats: {
    dialogue:[
      "You slam your shoulder against the window, knocking the zombie back long enough to lock the shutters.",
      "Your arms ache from the effort, but the house is safe — for now."
    ],
    location:"Home — Living Room",
    time:"6:15 AM",
    choices:[{ text:"Search the house for supplies", next:"house_supplies" }]
  },

  zombie_breakin: {
    dialogue:[
      "The glass shatters. The zombie claws its way inside, shrieking.",
      "Kane and Clarissa scream behind you."
    ],
    location:"Home — Living Room",
    time:"6:12 AM",
    choices:[
      { html:'<span class="stat-check">(Strength)</span> Fight bare-handed', statCheck:{ stat:"Strength", DC:14, prompt:"You wrestle with the zombie for your life!" }, successNext:"zombie_killed", failureNext:"zombie_death" }
    ]
  },

  zombie_death: {
    dialogue:[
      "The zombie overpowers you, tearing into your flesh.",
      "Your vision blurs as Kane and Clarissa’s screams fade into silence.",
      "You are dead."
    ],
    location:"Home — Living Room",
    time:"6:15 AM",
    choices:[{ text:"GAME OVER — Restart", next:"start" }]
  },

  house_supplies: {
    dialogue:["You start searching the house for anything useful."],
    location:"Home",
    time:"6:20 AM",
    get choices() {
      let opts = [];
      if (!hasVisited("found_medkit")) opts.push({ text:"Search the bathroom", action:()=>markVisited("found_medkit"), next:"found_medkit" });
      if (!hasVisited("found_food")) opts.push({ text:"Check the pantry", action:()=>markVisited("found_food"), next:"found_food" });
      if (!hasVisited("found_closet")) opts.push({ text:"Look inside the closet", action:()=>markVisited("found_closet"), next:"found_closet" });
      if (opts.length===0) opts.push({ text:"You’ve searched everywhere. Time to decide your next move.", next:"part1_end" });
      return opts;
    }
  },

  found_medkit: { dialogue:["You find a medkit tucked under the sink."], location:"Bathroom", time:"6:22 AM", choices:[{ text:"Keep searching", next:"house_supplies" }], action:()=>addItem("Medkit") },
  found_food: { dialogue:["You gather a few canned goods from the pantry."], location:"Kitchen", time:"6:23 AM", choices:[{ text:"Keep searching", next:"house_supplies" }], action:()=>addItem("Food") },
  found_closet: { dialogue:["Inside the hall closet, you find a heavy flashlight — solid enough to use as a weapon."], location:"Hall Closet", time:"6:24 AM", choices:[{ text:"Keep searching", next:"house_supplies" }], action:()=>addItem("Hammer") },

  part1_end: {
    dialogue:[
      "You’ve gathered what you could. Outside, the world is collapsing.",
      "Do you stay barricaded in the house or risk the streets?"
    ],
    location:"Home — Living Room",
    time:"6:30 AM",
    choices:[
      { text:"Stay inside the house", next:"part2_house_start" },
      { text:"Escape to the streets", next:"part2_street_start" }
    ]
  }
};
/*************************************************
 * PART 2 — HOUSE VS STREETS
 *************************************************/
let part2Visited = new Set();
function markPart2Visited(nodeId) { part2Visited.add(nodeId); }
function hasPart2Visited(nodeId) { return part2Visited.has(nodeId); }

const STORY_PART2 = {

  // ====== IF YOU STAY IN THE HOUSE ======
  part2_house_start: {
    dialogue:[
      "You decide to stay barricaded in the house, but survival means finding more supplies.",
      "The neighborhood might still have resources... or danger."
    ],
    location:"Home — Living Room",
    time:"7:00 AM",
    get choices() {
      const opts = [];
      if (!hasPart2Visited("police_station")) opts.push({ text:"Head to the police station", action:()=>markPart2Visited("police_station"), next:"police_station" });
      if (!hasPart2Visited("school")) opts.push({ text:"Go to the school", action:()=>markPart2Visited("school"), next:"school" });
      if (!hasPart2Visited("neighborhood_grocery")) opts.push({ text:"Sneak to the grocery store", action:()=>markPart2Visited("neighborhood_grocery"), next:"neighborhood_grocery" });
      if (opts.length===0) opts.push({ text:"Finish searching neighborhood", next:"part2_house_end" });
      return opts;
    }
  },

  police_station: {
    dialogue:[
      "You creep into the police station. The front desk is overturned, papers scattered.",
      "Two zombies shamble inside the holding cells."
    ],
    location:"Police Station",
    time:"7:20 AM",
    choices:[
      { html:'<span class="stat-check">(Strength)</span> Fight the zombies for supplies', statCheck:{ stat:"Strength", DC:14, prompt:"You swing at the undead with desperate strength!" }, successNext:"police_loot", failureNext:"zombie_death" },
      { text:"Retreat back home", next:"part2_house_start" }
    ]
  },

  police_loot: {
    dialogue:[
      "You manage to dispatch the zombies. In the weapons locker, you find a handgun with a single magazine.",
      "You rush home before more show up."
    ],
    location:"Police Station",
    time:"7:35 AM",
    choices:[{ text:"Return home", next:"part2_house_start" }],
    action:()=>addItem("Gun")
  },

  school: {
    dialogue:[
      "The elementary school is eerily silent. Tiny backpacks are scattered in the halls.",
      "A locked nurse’s office might have medical supplies."
    ],
    location:"School",
    time:"7:40 AM",
    choices:[
      { html:'<span class="stat-check">(Perception)</span> Pick the lock quietly', statCheck:{ stat:"Perception", DC:12, prompt:"You try to pick the lock with a paperclip." }, successNext:"school_medkit", failureNext:"school_alarm" },
      { text:"Leave quickly", next:"part2_house_start" }
    ]
  },

  school_medkit: {
    dialogue:["Inside the office, you grab another medkit before sneaking away."],
    location:"School — Nurse’s Office",
    time:"7:50 AM",
    choices:[{ text:"Return home", next:"part2_house_start" }],
    action:()=>addItem("Medkit")
  },

  school_alarm: {
    dialogue:[
      "The lockpick snaps — setting off the school’s alarm!",
      "Zombies pour in through the doors. You barely escape with your life."
    ],
    location:"School",
    time:"7:50 AM",
    choices:[{ text:"Run home", next:"part2_house_start" }]
  },

  neighborhood_grocery: {
    dialogue:[
      "The local grocery store has already been ransacked.",
      "A group of looters glare at you — one raises a bat."
    ],
    location:"Neighborhood Grocery",
    time:"8:00 AM",
    choices:[
      { html:'<span class="stat-check">(Deception)</span> Bluff that you’re infected', statCheck:{ stat:"Deception", DC:13, prompt:"You try to scare them off by faking a cough and stumble." }, successNext:"looters_backoff", failureNext:"looters_attack" },
      { text:"Fight them off", next:"looters_attack" },
      { text:"Retreat", next:"part2_house_start" }
    ]
  },

  looters_backoff: {
    dialogue:[
      "The looters recoil in fear, convinced you’re infected.",
      "They flee the store, leaving some canned food behind."
    ],
    location:"Neighborhood Grocery",
    time:"8:10 AM",
    choices:[{ text:"Return home", next:"part2_house_start" }],
    action:()=>addItem("Food")
  },

  looters_attack: {
    dialogue:[
      "The looters don’t buy it. They swing their weapons!",
      "After a brutal scuffle, you manage to escape — bloodied but alive."
    ],
    location:"Neighborhood Grocery",
    time:"8:15 AM",
    choices:[{ text:"Return home", next:"part2_house_start" }]
  },

  part2_house_end: {
    dialogue:[
      "You’ve searched what you could in the neighborhood.",
      "The house feels less safe with every passing minute… it’s time to move on."
    ],
    location:"Home — Living Room",
    time:"8:30 AM",
    choices:[{ text:"Continue to Part 3", next:"part3_house_start" }]
  },

  // ====== IF YOU ESCAPE TO THE STREETS ======
  part2_street_start: {
    dialogue:[
      "You decide it’s too dangerous to stay home. You pile into the car with Kane and Clarissa.",
      "The streets are chaos — fires, wrecked cars, distant screams."
    ],
    location:"Street",
    time:"7:00 AM",
    get choices() {
      const opts = [];
      if (!hasPart2Visited("home_depot")) opts.push({ text:"Drive toward Home Depot", action:()=>markPart2Visited("home_depot"), next:"home_depot" });
      if (!hasPart2Visited("street_grocery")) opts.push({ text:"Head for the grocery store", action:()=>markPart2Visited("street_grocery"), next:"street_grocery" });
      if (!hasPart2Visited("highway")) opts.push({ text:"Take the highway out of town", action:()=>markPart2Visited("highway"), next:"highway" });
      if (opts.length===0) opts.push({ text:"End street exploration", next:"part2_street_end" });
      return opts;
    }
  },

  home_depot: {
    dialogue:[
      "You stop at a Home Depot. The huge store is dark and ransacked.",
      "A man with a crowbar blocks your path, clearly desperate."
    ],
    location:"Home Depot",
    time:"7:30 AM",
    choices:[
      { html:'<span class="stat-check">(Deception)</span> Pretend you’re here to help', statCheck:{ stat:"Deception", DC:14, prompt:"You lie smoothly to calm him." }, successNext:"home_depot_friend", failureNext:"home_depot_attack" },
      { text:"Fight him", next:"home_depot_attack" }
    ]
  },

  home_depot_friend: {
    dialogue:[
      "The man lowers his crowbar, muttering thanks. He gives you a toolbox with duct tape and nails.",
      "You leave before his suspicion returns."
    ],
    location:"Home Depot",
    time:"7:40 AM",
    choices:[{ text:"Back to the streets", next:"part2_street_start" }],
    action:()=>addItem("Hammer")
  },

  home_depot_attack: {
    dialogue:[
      "The fight is quick and brutal. You knock the man out cold and grab some supplies before fleeing.",
      "Kane stares at you in silence."
    ],
    location:"Home Depot",
    time:"7:40 AM",
    choices:[{ text:"Back to the streets", next:"part2_street_start" }],
    action:()=>addItem("Hammer")
  },

  street_grocery: {
    dialogue:[
      "This grocery store is half-burned, shelves stripped bare.",
      "A group of survivors wave you down, asking for help with an injured woman."
    ],
    location:"Street Grocery",
    time:"7:45 AM",
    choices:[
      { text:"Stop and help them", next:"street_help" },
      { text:"Refuse and drive away", next:"part2_street_start" }
    ]
  },

  street_help: {
    dialogue:[
      "You stabilize the woman with your medkit. The survivors give you food and bless your kindness.",
      "Clarissa whispers, ‘We did the right thing.’"
    ],
    location:"Street Grocery",
    time:"8:00 AM",
    choices:[{ text:"Back to the streets", next:"part2_street_start" }],
    action:()=>addItem("Food")
  },

  highway: {
    dialogue:[
      "You take the highway. Burned-out cars block the road.",
      "Ahead, a military checkpoint is abandoned… or worse."
    ],
    location:"Highway",
    time:"8:15 AM",
    choices:[
      { text:"Search the checkpoint", next:"checkpoint" },
      { text:"Turn back", next:"part2_street_start" }
    ]
  },

  checkpoint: {
    dialogue:[
      "You search cautiously. Among the wreckage, you find scattered rations and an empty rifle.",
      "The silence is heavy, unnatural."
    ],
    location:"Military Checkpoint",
    time:"8:20 AM",
    choices:[{ text:"Back to the streets", next:"part2_street_start" }],
    action:()=>addItem("Food")
  },

  part2_street_end: {
    dialogue:[
      "You’ve risked enough time in the streets. The city is burning, and the way forward is uncertain.",
      "It’s time to move on."
    ],
    location:"Street — Outskirts",
    time:"8:30 AM",
    choices:[{ text:"Continue to Part 3", next:"part3_street_start" }]
  }
};
/*************************************************
 * PART 3 — FINAL ACT
 *************************************************/
const STORY_PART3 = {

  // ===================== HOUSE FINALE =====================
  part3_house_start: {
    dialogue:[
      "Days pass. The barricades hold, but food runs low.",
      "Whispers of gunfire echo through the neighborhood — humans are moving in.",
      "Kane whispers: 'We can’t last like this…'"
    ],
    location:"Home — Living Room",
    time:"Day 3, 9:00 AM",
    choices:[
      { text:"Fortify the house further", next:"fortify_house" },
      { text:"Investigate the gunfire", next:"raider_encounter" }
    ]
  },

  fortify_house: {
    dialogue:[
      "You reinforce doors and windows with scavenged planks.",
      "The children help, silently focused — they know the stakes."
    ],
    location:"Home",
    time:"Day 3, 10:00 AM",
    choices:[{ text:"Night falls…", next:"house_attack" }]
  },

  house_attack: {
    dialogue:[
      "That night, moans echo outside. A horde gathers, drawn by the scent of life.",
      "The barricades groan as claws scrape at the walls."
    ],
    location:"Home",
    time:"Day 3, 11:30 PM",
    choices:[
      { html:'<span class="stat-check">(Strength)</span> Hold the barricade', statCheck:{ stat:"Strength", DC:15, prompt:"Push against the door with all your might!" }, successNext:"house_survive", failureNext:"zombie_death" },
      { html:'<span class="stat-check">(Athletics)</span> Escape out the back with the kids', statCheck:{ stat:"Athletics", DC:14, prompt:"Flee before the horde overruns the house!" }, successNext:"escape_to_street", failureNext:"zombie_death" }
    ]
  },

  house_survive: {
    dialogue:[
      "You slam boards back in place as the horde eventually drifts away.",
      "Exhausted, you collapse to the floor. For now, you’ve bought another day."
    ],
    location:"Home — Living Room",
    time:"Day 4, Dawn",
    choices:[{ text:"Ending: Survive in Isolation", next:"credits" }]
  },

  raider_encounter: {
    dialogue:[
      "You track the gunfire to a nearby block. Armed raiders are looting houses.",
      "One spots you and grins. 'Fresh meat!'"
    ],
    location:"Neighborhood",
    time:"Day 3, 11:00 AM",
    choices:[
      { html:'<span class="stat-check">(Deception)</span> Bluff: “I have nothing worth taking.”', statCheck:{ stat:"Deception", DC:15, prompt:"Convince them to let you go." }, successNext:"raider_bluff_success", failureNext:"raider_bluff_fail" },
      { html:'<span class="stat-check">(Strength)</span> Attack first', statCheck:{ stat:"Strength", DC:16 }, successNext:"raider_fight_win", failureNext:"zombie_death" }
    ]
  },

  raider_bluff_success: {
    dialogue:[
      "The raiders hesitate. One spits on the ground. 'Fine. Not worth the bullet.'",
      "They leave you shaken but alive."
    ],
    location:"Neighborhood",
    time:"Day 3, Noon",
    choices:[{ text:"Return home", next:"house_attack" }]
  },

  raider_bluff_fail: {
    dialogue:[
      "The raiders laugh. 'You think we’re that stupid?' They raise their guns."
    ],
    location:"Neighborhood",
    time:"Day 3, Noon",
    choices:[
      { html:'<span class="stat-check">(Athletics)</span> Run for your life!', statCheck:{ stat:"Athletics", DC:15 }, successNext:"escape_to_street", failureNext:"zombie_death" }
    ]
  },

  raider_fight_win: {
    dialogue:[
      "With brutal strength, you down one raider. The rest scatter in fear.",
      "You scavenge ammo and food from their packs."
    ],
    location:"Neighborhood",
    time:"Day 3, Noon",
    action:()=>addItem("Food"),
    choices:[{ text:"Return home", next:"house_attack" }]
  },

  // ===================== STREET FINALE =====================
  part3_street_start: {
    dialogue:[
      "The highway stretches ahead, smoke and ruins in every direction.",
      "Other survivors are on the move — not all friendly."
    ],
    location:"Highway",
    time:"Day 2, 3:00 PM",
    choices:[
      { text:"Head toward the city", next:"city_ruins" },
      { text:"Seek shelter off the road", next:"militia_encounter" }
    ]
  },

  city_ruins: {
    dialogue:[
      "The city is overrun. Burned cars block streets. Moans echo everywhere.",
      "You find a group of survivors on a rooftop, waving you over."
    ],
    location:"City Ruins",
    time:"Day 2, 5:00 PM",
    choices:[
      { html:'<span class="stat-check">(Deception)</span> Pretend you’re alone (hide the kids)', statCheck:{ stat:"Deception", DC:16, prompt:"Convince them you’re not a burden." }, successNext:"city_survivor_accept", failureNext:"city_survivor_reject" },
      { text:"Ignore and move deeper", next:"horde_chase" }
    ]
  },

  city_survivor_accept: {
    dialogue:[
      "They believe you. Supplies are shared, and you rest safely for the first time.",
      "But the truth weighs heavy — lies keep you alive, for now."
    ],
    location:"City Rooftop",
    time:"Day 2, Night",
    choices:[{ text:"Ending: Join survivor group (Deceptive Path)", next:"credits" }]
  },

  city_survivor_reject: {
    dialogue:[
      "They spot your kids and panic. 'We can’t take dead weight!' They shove you away.",
      "As you argue, zombies flood the street — there’s no time."
    ],
    location:"City Rooftop",
    time:"Day 2, Night",
    choices:[
      { html:'<span class="stat-check">(Athletics)</span> Escape the horde', statCheck:{ stat:"Athletics", DC:15 }, successNext:"horde_escape", failureNext:"zombie_death" }
    ]
  },

  horde_chase: {
    dialogue:[
      "The horde spots you. A tide of bodies crashes forward.",
      "You grab your kids’ hands and run for your life."
    ],
    location:"City Streets",
    time:"Day 2, Evening",
    choices:[
      { html:'<span class="stat-check">(Athletics)</span> Sprint through alleys', statCheck:{ stat:"Athletics", DC:15 }, successNext:"horde_escape", failureNext:"zombie_death" }
    ]
  },

  horde_escape: {
    dialogue:[
      "Panting and bloody, you duck into an abandoned subway tunnel.",
      "For now, the horde has lost your trail."
    ],
    location:"Subway",
    time:"Day 2, Night",
    choices:[{ text:"Ending: Escaped into the underground", next:"credits" }]
  },

  militia_encounter: {
    dialogue:[
      "You stumble on a militia checkpoint. Armed, disciplined, and ruthless.",
      "The commander narrows his eyes: 'State your business.'"
    ],
    location:"Checkpoint",
    time:"Day 2, 4:00 PM",
    choices:[
      { html:'<span class="stat-check">(Deception)</span> Claim you’re useful', statCheck:{ stat:"Deception", DC:17, prompt:"Convince them you’re worth sparing." }, successNext:"militia_accept", failureNext:"militia_execute" },
      { text:"Attack first", next:"militia_fight" }
    ]
  },

  militia_accept: {
    dialogue:[
      "The commander nods. 'Fine. You work for us now.'",
      "You and your family are dragged into service — safe, but prisoners."
    ],
    location:"Militia Camp",
    time:"Day 2, Night",
    choices:[{ text:"Ending: Enslaved by Militia", next:"credits" }]
  },

  militia_execute: {
    dialogue:[
      "The commander laughs. 'A liar and a fool.'",
      "The world fades as the rifle barrels rise."
    ],
    location:"Checkpoint",
    time:"Day 2, 4:10 PM",
    choices:[{ text:"GAME OVER — Restart", next:"start" }]
  },

  militia_fight: {
    dialogue:[
      "You charge, desperate. Gunfire erupts.",
      "There’s no turning back now."
    ],
    location:"Checkpoint",
    time:"Day 2, 4:05 PM",
    choices:[
      { html:'<span class="stat-check">(Strength)</span> Overpower nearest guard', statCheck:{ stat:"Strength", DC:17 }, successNext:"militia_fight_win", failureNext:"zombie_death" }
    ]
  },

  militia_fight_win: {
    dialogue:[
      "Against all odds, you seize a rifle. The militia scatters in shock.",
      "You lead your kids into the wilderness — free, but hunted."
    ],
    location:"Wilderness",
    time:"Day 2, Night",
    choices:[{ text:"Ending: Free but Hunted", next:"credits" }]
  },

  // ===================== COMMON ENDINGS =====================
  escape_to_street: {
    dialogue:[
      "Smoke fills your lungs as you flee the collapsing house.",
      "You and your kids vanish into the dark streets…"
    ],
    location:"Street",
    time:"Night",
    choices:[{ text:"Continue on the Street Path (Part 3)", next:"part3_street_start" }]
  },

  zombie_death: {
    dialogue:[
      "The zombie overpowers you, tearing into your flesh.",
      "Your vision blurs as Kane and Clarissa’s screams fade into silence.",
      "You are dead."
    ],
    location:"Home / Street",
    time:"—",
    choices:[{ text:"GAME OVER — Restart", next:"start" }]
  },

  credits: {
    dialogue:[
      "Your story ends here.",
      "Every choice mattered. Every roll sealed your fate."
    ],
    location:"Credits",
    time:"—",
    choices:[{ text:"Restart", next:"start" }]
  }

};
// Merge all parts into the main STORY object
const STORY = {
  ...STORY_PART1,
  ...STORY_PART2,
  ...STORY_PART3
};
