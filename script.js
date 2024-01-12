// Player stats
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

// DOM elements
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// Weapons available for purchase
const weapons = [
    { name: 'stick', power: 5 },
    { name: 'dagger', power: 30 },
    { name: 'claw hammer', power: 50 },
    { name: 'sword', power: 100 }
];

// Different types of monsters
const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
]

// Different locations in the game with associated actions

const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, goTown],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die. ☠️"
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// Function to update the game interface based on the player's location
function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

// Functions for moving to different locations
function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}
// Function to buy health in the store
function buyHealth() {
    // Check if the player has enough gold to buy health
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        // Display a message if the player doesn't have enough gold
        text.innerText = "You do not have enough gold to buy health.";
    }
}

// Function to buy a weapon in the store
function buyWeapon() {
    // Check if the player can buy a more powerful weapon
    if (currentWeapon < weapons.length - 1) {
        // Check if the player has enough gold to buy a weapon
        if (gold >= 30) {
            // Deduct gold, upgrade weapon, and update display
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon + ".";
            // Add the new weapon to the inventory and display inventory
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory;
        } else {
            // Display a message if the player doesn't have enough gold
            text.innerText = "You do not have enough gold to buy a weapon.";
        }
    } else {
        // Display a message if the player already has the most powerful weapon
        text.innerText = "You already have the most powerful weapon!";
        // Change button2 text and function to sell the weapon
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

// Function to sell the current weapon
function sellWeapon() {
    // Check if the player has more than one weapon in the inventory
    if (inventory.length > 1) {
        // Gain gold, remove the sold weapon, and update display
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        // Display the updated inventory
        text.innerText += " In your inventory you have: " + inventory;
    } else {
        // Display a message if the player tries to sell their only weapon
        text.innerText = "Don't sell your only weapon!";
    }
}


// Functions to initiate a fight with the monsters
function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

// Function to transition to the fight location and display monster stats
function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

// Function for the player's attack during a fight
function attack() {
    // Display attack information
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    // Deduct player health based on monster's attack
    health -= getMonsterAttackValue(monsters[fighting].level);
    // Check if the player's attack hits
    if (isMonsterHit()) {
        // Deduct monster health based on weapon power and randomness
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    } else {
        // Display a message if the player misses
        text.innerText += " You miss.";
    }

    // Update health and monster health displays
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    // Check if the player or the monster is defeated
    if (health <= 0) {
        lose(); // Player loses if health reaches zero
    } else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster(); // Win or continue fighting
    }
    // Random chance for the player's weapon to break
    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += " Your " + inventory.pop() + " breaks.";
        currentWeapon--;
    }
}

// Function to calculate the monster's attack value

function getMonsterAttackValue(level) {
    // Calculate hit value based on monster level and randomness
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit > 0 ? hit : 0; // Ensure a non-negative value
}

// Function to determine if the player's attack hits the monster
function isMonsterHit() {
    return Math.random() > .2 || health < 20;
}

// Function for the player to dodge the monster's attack
function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

// Function for the player to defeat a monster
function defeatMonster() {
    // Gain gold and experience points, and update displays
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

// Function for the player to lose the game
function lose() {
    update(locations[5]); // Transition to the "lose" location
}

// Function for the player to win the game
function winGame() {
    update(locations[6]);
}

// Function to restart the game
function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];

    // Update displays and go back to the town square
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

function easterEgg() {
    update(locations[7]);
}

function pickTwo() {
    pick(2);
}

function pickEight() {
    pick(8);
}

function pick(guess) {
    const numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }
    if (numbers.includes(guess)) {
        text.innerText += "Right! You win 20 gold!";
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText += "Wrong! You lose 10 health!";
        health -= 10;
        healthText.innerText = health;
        if (health <= 0) {
            lose();
        }
    }
}