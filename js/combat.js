function fight() {


    alert("que le combat commence");
    alert(player.name + " commence");
    if (player.name = "joueurRouge") {
        players[1].receivesDamage(players[0],'attack');
    } else {
        players[0].receivesDamage(players[1],'attack');
    }
    while (players[0].health > 0 && players[1].health > 0) {
        /// $('button[name=j1]').removeAttr("disabled");

        var player1Choice = prompt(" joueur 1 :Entrer A pour attaquer et D pour vous défendre");
        var player2Choice = prompt("joueur 2 : Entrer A pour attaquer et D pour vous défendre");

        if (player1Choice === "a" && player2Choice === "a") {
            players[0].receivesDamage(players[1], 'attack');
            players[1].receivesDamage(players[0], 'attack');
        } else if (player1Choice === "d" && player2Choice === "a") {
            players[0].receivesDamage(players[1], 'defend');
        } else if (player1Choice === "a" && player2Choice === "d") {
            players[1].receivesDamage(players[0], 'defend');
        } else if (player1Choice === "d" && player2Choice === "d") {
            alert("les points de vie des joueurs n'ont pas changés")
        }
    }
    if (players[0].health === 0) {
        alert("joueur Rouge à gagné")
    } else {
        alert("joueur bleu à gagné")
    }
}

/*var player1Choice = $('input[name=player1]').click(function() {
    var action = document.getElementsByName(player);
    var choice;
    for (var i = 0; i < action.length; i++) {
        if (action[i].checked) {
            choice = action[i].value;
        }
    }
    return choice;
});
var player2Choice = $('input[name=player2]').click(function() {
    var action = document.getElementsByName(player);
    var choice;
    for (var i = 0; i < action.length; i++) {
        if (action[i].checked) {
            choice = action[i].value;
        }
    }
    return choice;
});*/