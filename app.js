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

const start = document.querySelector(".startBtn");
const next = document.querySelector(".nextBtn");

const title = document.getElementById("title");
const round = document.getElementById("round");
const winner = document.getElementById("winner");

const shipName = document.getElementById("shipName");
const shipHealth = document.getElementById("shipHealth");
const alienName = document.getElementById("alienName");
const alienHealth = document.getElementById("alienHealth");
/*
            <div class="spaceship"></div>
            <div class="alien"><
*/
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
// console.log(usShip);

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

// console.log(alienShips);

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
let spaceshipIndex = 0;

// let currentAlien = parseInt(getRandomValue (0,5));
// console.log(currentAlien);
// console.log(alienShips[currentAlien]);
function us_attack() {
  if (Math.random() < usShip.accuracy) {
    winner.textContent ="Direct hit! Alien ship took damage!";
    alienShips[spaceshipIndex].hull -= usShip.firepower;
    alienHealth.textContent = "Hull " + alienShips[spaceshipIndex].hull;
    // console.log(alienShips[spaceshipIndex].hull);
    if (alienShips[spaceshipIndex].hull <= 0) {
      winner.textContent ="Alien ship destroyed";
    } else {
        winner.textContent = "Alien ship not destroyed, its hull " + alienShips[spaceshipIndex].hull;
    }
  } else winner.textContent ="You missed!";
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
    winner.textContent = "The alien ship hits you! Your ship tooks damage!";
    usShip.hull -= alienShips[spaceshipIndex].firepower;
    shipHealth.textContent = "Hull " + usShip.hull;

    // console.log(usShip.hull);
    if (usShip.hull <= 0) {
      winner.textContent = "Your ship has been destroyed!";
      title.textContent = "GAME OVER!";
      start.style.display = "inline-block";
      
    } else {
        shipHealth.textContent = "Hull " + usShip.hull;  
        winner.textContent = "Your hull " + usShip.hull;
    }
  } else winner.textContent ="Alien missed!";
}



function spaceBattle () {
    title.textContent = "Battle begins";
    start.style.display = "none";

    



  

    while (spaceshipIndex < alienShips.length && usShip.hull > 0) {
        
        let target = alienShips[spaceshipIndex];

        shipName.textContent = usShip.name ;
        shipHealth.textContent = "Hull " + usShip.hull;

        alienName.textContent = target.name;
        alienHealth.textContent = "Hull " + target.hull;

        round.textContent = `Round ${spaceshipIndex + 1}`;
        winner.textContent = `You are facing ${target.name}`;

        next.addEventListener("click", () => {
            while (target.hull > 0 && usShip.hull > 0) {
                // US Ship attacks first
                us_attack();
    
                // Alien ship attacks if it's alive 
                if (target.hull > 0) alien_atack();
                else break;

                if (usShip.hull > 0 && target.hull <= 0)
                    winner.textContent = `${usShip.name} win this round`;
                else if (usShip.hull <= 0 && target.hull > 0)
                    winner.textContent = `${target.name} win this round`;
            
    
               
    
               
            }
            

        });

         
        spaceshipIndex++;
    }
    
    if (spaceshipIndex >= alienShips.length && usShip.hull > 0) {
        round.textContent = "Congratulations!";
        winner.textContent = "Congratulations! You have destroyed all the alien ships";
        title.textContent = "You WIN!";
        start.style.display = "inline-block";
        
    }
}



    

// start.addEventListener(onclick, spaceBattle );