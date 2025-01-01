/*
START GAME
    Initialize USS Assembly spaceship with:
        hull = 20
        firepower = 5
        accuracy = 0.7

    Initialize an empty array for alien ships

    FOR i = 1 TO 6
        Generate random alien ship properties:
            hull = random value between 3 and 6
            firepower = random value between 2 and 4
            accuracy = random value between 0.6 and 0.8
        Add alien ship to the alien ships array

    SET currentAlienIndex = 0

    WHILE USS Assembly is alive (hull > 0) AND currentAlienIndex < total number of aliens
        DISPLAY "You are facing Alien Ship {currentAlienIndex + 1}"

        REPEAT
            PLAYER ATTACK
                GENERATE random number between 0 and 1
                IF random number <= USS Assembly's accuracy
                    DEAL USS Assembly's firepower damage to alien ship's hull
                    DISPLAY "Direct hit! Alien ship took damage!"
                    IF alien ship's hull <= 0
                        DISPLAY "Alien ship destroyed!"
                        BREAK out of REPEAT loop
                ELSE
                    DISPLAY "You missed!"

            ALIEN ATTACK (if the alien ship is still alive)
                GENERATE random number between 0 and 1
                IF random number <= alien ship's accuracy
                    DEAL alien ship's firepower damage to USS Assembly's hull
                    DISPLAY "The alien ship hit you! Your ship took damage!"
                    IF USS Assembly's hull <= 0
                        DISPLAY "Your ship has been destroyed! Game over!"
                        END GAME
                ELSE
                    DISPLAY "The alien ship missed!"

        UNTIL either USS Assembly or the alien ship is destroyed

       

    IF USS Assembly hull >0 AND currentAlienIndex >= total number of aliens
        DISPLAY "Congratulations! You have destroyed all alien ships. You win!"

END GAME

*/

// --------GAME START ---------------

/* 
Initialize USS Assembly spaceship with:
        hull = 20
        firepower = 5
        accuracy = 0.7
*/

class AssemblySpaceship {
  constructor(name) {
    this.name = name;
    this.hull = 20;
    this.firepower = 5;
    this.accuracy = 0.7;
  }
}

const usShip = new AssemblySpaceship("USS Assembly spaceship");
console.log(usShip);

/*Initialize an empty array for alien ships
    FOR i = 1 TO 6
        Generate random alien ship properties:
            hull = random value between 3 and 6
            firepower = random value between 2 and 4
            accuracy = random value between 0.6 and 0.8
        Add alien ship to the alien ships array*/

function getRandomValue(min, max) {
  return Math.random() * (max - min) + min;
}

class AlienSpaceship {
  constructor(name) {
    this.name = name;
    this.hull = Math.round(getRandomValue(3, 6));
    this.firepower = Math.round(getRandomValue(2, 4));
    this.accuracy = getRandomValue(0.6, 0.8);
  }
}

let alienShips = [];
for (let i = 0; i < 6; i++) {
  alienShips[i] = new AlienSpaceship(`AlienSpaceship ${i + 1}`);
}

console.log(alienShips);

/*
PLAYER ATTACK
    IF random number <= USS Assembly's accuracy
        DISPLAY "Direct hit! Alien ship took damage!"
        Alien ship's hull - USS Assembly's firepower
        IF alien ship's hull <= 0
            DISPLAY "Alien ship destroyed!"    
        ELSE
            DISPLAY Alien ship's hull                        
    ELSE
        DISPLAY "You missed!"             

*/

// let currentAlien = parseInt(getRandomValue (0,5));
// console.log(currentAlien);
// console.log(alienShips[currentAlien]);
function us_attack() {
  if (Math.random() < usShip.accuracy) {
    console.log("Direct hit! Alien ship took damage!");
    alienShips[spaceshipIndex].hull -= usShip.firepower;
    // console.log(alienShips[spaceshipIndex].hull);
    if (alienShips[spaceshipIndex].hull <= 0) {
      console.log("Alien ship destroyed");
    } else {
      console.log(
        "Alien ship not destroyed, its hull " + alienShips[spaceshipIndex].hull
      );
    }
  } else console.log("You missed!");
}

/*
ALIEN ATTACK
                
IF random number <= alien ship's accuracy
   
    DISPLAY "The alien ship hit you! Your ship took damage!
    USS Assembly's hull - alien ship's firepower
    IF USS Assembly's hull <= 0
        DISPLAY "Your ship has been destroyed! Game over!"
        END GAME
    ELSE
        DISPLAY USS Assembly's hull
ELSE
    DISPLAY "Alien missed!"
*/

function alien_atack() {
  if (Math.random() < alienShips[spaceshipIndex].accuracy) {
    console.log("The alien ship hits you! Your ship tooks damage!");
    usShip.hull -= alienShips[spaceshipIndex].firepower;
    // console.log(usShip.hull);
    if (usShip.hull <= 0) {
      console.log("Your ship has been destroyed!");
      console.log("GAME OVER!");
    } else {
      console.log("Your hull " + usShip.hull);
    }
  } else console.log("Alien missed!");
}

let spaceshipIndex = 0;
console.log("Battle begins");

while (spaceshipIndex < alienShips.length && usShip.hull > 0) {
    // console.log("Index "+spaceshipIndex + "length " + alienShips.length);
    let target = alienShips[spaceshipIndex];
    // console.log(target);
    console.log(`Round ${spaceshipIndex + 1}. You are facing ${target.name}`);

    while (target.hull > 0 && usShip.hull > 0) {
        us_attack();
        if (target.hull > 0) alien_atack();
        else break;
    }

    if (usShip.hull > 0 && target.hull <= 0)
        console.log(`${usShip.name} win this round`);
    else if (usShip.hull <= 0 && target.hull > 0)
        console.log(`${target.name} win this round`);
  
    spaceshipIndex++;
}

if (spaceshipIndex >= alienShips.length && usShip.hull > 0) {
    console.log("Congratulations!");
    console.log("You have destroyed all aliens' ships.");
    console.log("You WIN!");
}
