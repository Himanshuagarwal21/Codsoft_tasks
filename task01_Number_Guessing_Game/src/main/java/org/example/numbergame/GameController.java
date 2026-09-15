package org.example.numbergame;

import org.springframework.web.bind.annotation.*;

import java.util.Random;

@RestController
@RequestMapping("/game")
@CrossOrigin(origins = "*")
public class GameController {

    private int secretNumber;
    private int attempts;

    @GetMapping("/new")
    public String newGame() {

        Random random = new Random();

        secretNumber = random.nextInt(100) + 1;
        attempts = 0;

        System.out.println("Secret Number = " + secretNumber);

        return "Game Started! Guess a number between 1 and 100.";
    }

    @GetMapping("/guess")
    public String guessNumber(@RequestParam int number) {

        System.out.println("User Guess = " + number);
        System.out.println("Secret Number = " + secretNumber);

        attempts++;

        if (number < secretNumber) {
            return "Too Low! Attempts: " + attempts;
        }

        else if (number > secretNumber) {
            return "Too High! Attempts: " + attempts;
        }

        else {
            return "Correct! 🎉 Attempts: " + attempts;
        }
    }
}