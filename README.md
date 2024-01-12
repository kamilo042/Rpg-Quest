# Rpg-Quest

Text-Based Adventure Game

Welcome to the Text-Based Adventure Game! This simple JavaScript game is a classic text-based adventure where players make choices to navigate through different locations, interact with monsters, and engage in combat. The game features various mechanics, including inventory management, buying/selling items, and battling monsters.
How to Play

    Initial Setup:
        The game begins in the town square.
        You have initial stats:
            Experience Points (xp)
            Health
            Gold
            Current Weapon (with different power levels)
            Inventory (starting with a basic weapon)

    Navigation:
        Use the buttons to navigate through different locations such as the town, store, cave, etc.
        Each location has unique options and consequences.

    Store:
        In the store, you can:
            Buy health for 10 gold.
            Buy a weapon for 30 gold (if available).
            Sell your weapon for 15 gold (if you have more than one).

    Cave:
        In the cave, you can encounter different monsters.
        Choose to fight a specific monster (slime, fanged beast, dragon).
        Combat involves attacking, dodging, and potential weapon breakage.

    Combat:
        Player and monsters have health points.
        Attack the monster with your current weapon.
        Dodging can help avoid damage.
        Winning battles earns gold and experience points.

    Win/Lose Conditions:
        The game ends if your health reaches zero (lose).
        If you defeat the dragon, you win the game!

    Inventory:
        You start with a basic weapon and can buy/sell weapons in the store.
        Inventory management is crucial for combat effectiveness.

    Easter Egg:
        Discover a secret game by following specific steps.
        Pick a number, and if it matches randomly generated numbers, you win gold!

Game Mechanics
Functions:

    The game uses various functions to handle different actions such as moving to a location, buying/selling items, and combat interactions.

Arrays and Objects:

    Arrays store information about weapons, monsters, and game locations.
    Objects represent individual elements like monsters, each with name, level, and health.

DOM Manipulation:

    The game interacts with the Document Object Model (DOM) to update HTML elements dynamically.
    Display areas, buttons, and other UI elements are accessed and modified using JavaScript.

Randomization:

    Random numbers are used for monster attacks, weapon breakage, and the easter egg game.

Conditional Statements:

    The game uses conditional statements to check various conditions, such as having enough gold to buy items, hitting a monster in combat, and determining win/lose conditions.

Event Handling:

    Button click events trigger functions to perform specific actions, such as moving to a location, buying items, and initiating combat.

Game Flow:

    The game follows a structured flow where the player progresses through different locations, makes decisions, and experiences consequences based on those decisions.

Credits

This game was created as a learning project and was inspired by classic text-based adventure games. Feel free to explore the code and make your modifications!

Enjoy the adventure!