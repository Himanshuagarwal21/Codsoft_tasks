const API =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://localhost:9090"
        : "https://codsoft-taskno1.onrender.com";
let attempts = 0;

function startGame() {

    fetch(API + "/game/new")
        .then(response => response.text())
        .then(data => {

            attempts = 0;

            document.getElementById("attempts").innerText = attempts;

            document.getElementById("result").innerText = data;

            document.getElementById("guess").value = "";

            document.getElementById("guess").focus();
        })
        .catch(error => {

            console.log(error);

            document.getElementById("result").innerText =
                "Backend connection failed!";
        });
}


function makeGuess() {

    const input = document.getElementById("guess");

    const number = input.value;

    if (number === "") {

        document.getElementById("result").innerText =
            "Please enter a number!";

        return;
    }

    if (number < 1 || number > 100) {

        document.getElementById("result").innerText =
            "Enter number between 1 and 100!";

        return;
    }

    fetch(API + "/game/guess?number=" + number)
        .then(response => response.text())
        .then(data => {

            attempts++;

            document.getElementById("attempts").innerText = attempts;

            document.getElementById("result").innerText = data;

            // Input ko dobara empty karo
            input.value = "";

            // Cursor dobara input box me lao
            input.focus();
        })
        .catch(error => {

            console.log(error);

            document.getElementById("result").innerText =
                "Backend connection failed!";
        });
}