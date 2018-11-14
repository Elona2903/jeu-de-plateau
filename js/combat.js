var choicePlayer1;
var choicePlayer2;

function checkFight() {
    return (choicePlayer1 && choicePlayer2 && players[0].health > 0 && players[1].health > 0);
}

function checkWinner() {
    if (players[0].health === 0) {
        alert("joueur Rouge à gagné")
    } else if (players[1].health === 0) {
        alert("joueur bleu à gagné")
    }
}

function onclick(players, choice) {
    console.log("click")
    setPlayerChoice(players, choice);
    if (checkFight()) {
        fight();
        checkWinner();
    }
}
$('input[name=player1]').click(function() {
    choicePlayer1 = ($(this).attr("value"));
    $('input[name=player2]').removeAttr("disabled");
    $('input[name=player1]').attr("disabled", "disabled")

});

$('input[name=player2]').click(function() {
    choicePlayer2 = ($(this).attr("value"))
    $('input[name=player2]').attr("disabled", "disabled")
    fight()
});

function fight() {
    if (players[0].health > 0 && players[1].health > 0) {
        $('input[name=player1]').removeAttr("disabled")
        if (choicePlayer1 === "attaquer" && choicePlayer2 === "attaquer") {
            players[0].receivesDamage(players[1], 'attack');
            players[1].receivesDamage(players[0], 'attack');
        } else if (choicePlayer1 === "se défendre" && choicePlayer2 === "attaquer") {
            players[0].receivesDamage(players[1], 'defend');
        } else if (choicePlayer1 === "attaquer" && choicePlayer2 === "se défendre") {
            players[1].receivesDamage(players[0], 'defend');
        } else if (choicePlayer1 === "se défendre" && choicePlayer2 === "se défendre") {
            alert("les points de vie des joueurs n'ont pas changés")
        }

        $('.santej1').text("santé " + parseInt(players[0].health));
        $('.santej2').text("santé " + parseInt(players[1].health));
    } else {
        if (players[0].health > 0) {
            $('.victoire').text(players[1].name + " a gagné");
        } else if (players[1].health > 0) {
            $('.victoire').text(players[0].name + " a gagné");
        }
    }
}