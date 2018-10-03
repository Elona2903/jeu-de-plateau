function oldFight() {

    alert("que le combat commence");
    alert(player.name + " commence");
    if (player.name = "joueurRouge") {
        players[1].receivesDamage(players[0],'attack');
    } else {
        players[0].receivesDamage(players[1],'attack');
    }
   /* while (players[0].health > 0 && players[1].health > 0) {
        /// $('button[name=j1]').removeAttr("disabled");

        var choicePlayer1 = prompt(" joueur 1 :Entrer A pour attaquer et D pour vous défendre");
        var choicePlayer2 = prompt("joueur 2 : Entrer A pour attaquer et D pour vous défendre");

        if (choicePlayer1 === "attack" && choicePlayer2 === "attack") {
            players[0].receivesDamage(players[1], 'attack');
            players[1].receivesDamage(players[0], 'attack');
        } else if (choicePlayer1 === "defense" && choicePlayer2 === "attack") {
            players[0].receivesDamage(players[1], 'defend');
        } else if (choicePlayer1 === "attack" && choicePlayer2 === "defense") {
            players[1].receivesDamage(players[0], 'defend');
        } else if (choicePlayer1 === "defense" && choicePlayer2 === "defense") {
            alert("les points de vie des joueurs n'ont pas changés")
        }
    }
    if (players[0].health === 0) {
        alert("joueur Rouge à gagné")
    } else {
        alert("joueur bleu à gagné")
    }*/
}
function fight(){
    
    if (choicePlayer1 === "attack" && choicePlayer2 === "attack") {
        players[0].receivesDamage(players[1], 'attack');
        players[1].receivesDamage(players[0], 'attack');
    } else if (choicePlayer1 === "defense" && choicePlayer2 === "attack") {
        players[0].receivesDamage(players[1], 'defend');
    } else if (choicePlayer1 === "attack" && choicePlayer2 === "defense") {
        players[1].receivesDamage(players[0], 'defend');
    } else if (choicePlayer1 === "defense" && choicePlayer2 === "defense") {
        alert("les points de vie des joueurs n'ont pas changés")
    }
    choicePlayer1=null;
    choicePlayer2=null;
}
var choicePlayer1;
var choicePlayer2;
function setPlayerChoice(choice){
    var actions = document.getElementsByName(player);

    for (var i = 0; i < actions.length; i++) {
        if (actions[i].checked) {
            choice = actions[i].value;
        }
    }
}
function checkFight(){
    return (choicePlayer1 && choicePlayer2 && players[0].health > 0 && players[1].health > 0);
}
function checkWinner(){
    if (players[0].health === 0) {
        alert("joueur Rouge à gagné")
    } else if (players[1].health === 0){
        alert("joueur bleu à gagné")
    }
}
function onclick(playerChoice){
    setPlayerChoice(playerChoice);
    if(checkFight()){
        fight();
        checkWinner();
    }
}
$('input[name=player1]').click(onclick);
$('input[name=player2]').click(onclick);