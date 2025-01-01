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