//création des armes;
var weapons = [];
//modèle de l'objet armes
var weaponEx = {
    init: function(name, damage, image) {
        this.name = name;
        this.damage = damage;
        this.image = image;
    }
};

var players = [];
//modèle de l'objet joueurs
var newPlayer = {
    init: function(name, weapon, image, left, right, up, down) {
        this.name = name;
        this.health = 100;
        this.weapon = weapon;
        this.image = image;
        this.left = left;
        this.right = right;
        this.up = up;
        this.down = down;
    },
    //permet de récuperer l'id de la case du joueur
    positionCaseId: function() {
        return parseFloat($('#' + this.name).parent().attr("id"));
    },
    //permet de stocker les dégats fait par un joueur
    getDamage: function() {
        return this.weapon.damage;
    },
    //fonction permettant d'enlever les points de vie au joueur
    receivesDamage: function(opponent) {
        this.health -= opponent.getDamage();
        alert("PV de " + this.name + ' : ' + players[0].health + ' pv ');
    },
    //fonction contenant les actions d'un mouvement
    movementActions: function(idOperator) {
        id = this.positionCaseId() + idOperator;
        $('#' + this.name).appendTo($("#" + id + ""));
        this.changeWeapon(id);
        this.alternatePlayer();
        board.startFight();

        $('.sante').text("santé " + parseInt(player.health));
    },
    //fonction de changement de joueurs
    changePlayer: function() {

        if (this === players[0]) {
            player = players[1];

        } else if (this === players[1]) {
            player = players[0];
        };
    },
    //compteur de tour et changement ;
    alternatePlayer: function() {
        if (nbTurn < 2) {
            nbTurn++;
        } else {
            nbTurn = 0;
            this.changePlayer();

        };
    },
    //fonction de changement de l'arme
    changeWeapon: function(idCase) {
        if ($("#" + idCase + " :first-child").attr("class") === "weapon") {
            for (var i = 0; i < weapons.length; i++) {
                if ($("#" + idCase + " :first-child").attr("alt") === weapons[i].name) {
                    ($("#" + weapons[i].name + "")).remove();
                    $("<img class='weapon' id=" + this.weapon.name + " src='" + this.weapon.image + "' alt='" + this.weapon.name + "'/>").appendTo($("#" + idCase + ""));
                    this.weapon = weapons[i];
                };
            };

        };
    }
};

//création de l'objet plateau;
var board = {
    nbCol: 10,
    nbRow: 10,
    nbCase: 100,
    nbObstacle: 20,
    //initialisation du plateau
    init: function() {
        //ligne
        for (var i = 0; i < this.nbRow; i++) {
            $('<div class="ligne"></div>').appendTo($("#jeu"));

        };
        //colonne
        for (var j = 0; j < this.nbCol; j++) {
            $(`<div class="case"></div>`).appendTo($(".ligne"));
        };
        //donne un id de 1 $ 100 à chaque case pour le repérages des éléments
        for (var i = 0; i < this.nbCase; i++) {
            var nombre = parseInt(i + 1);
            var cases = document.getElementsByClassName('case');
            cases[i].setAttribute("id", nombre);
        };
        //génération aléatoire des obstacles;
        var placedObstacle = 0;
        while (placedObstacle < this.nbObstacle) {
            var randomCase = parseFloat(Math.floor(Math.random() * this.nbCase));
            var obstacleCase = $('.case')[randomCase];
            if (obstacleCase.style.backgroundColor !== "grey") {
                var obstacle = $('.case')[randomCase];
                obstacle.style.backgroundColor = "grey";
                placedObstacle++;
            };
        };
        //positionnement des joueurs;
        placedPlayers = 0;
        while (placedPlayers < players.length) {
            var randomCase = parseFloat(Math.floor(Math.random() * this.nbCase));
            var idPlayerStartingCase = $('.case')[randomCase];
            if (idPlayerStartingCase.style.backgroundColor !== "grey") {
                $("<img class='player' id=" + players[placedPlayers].name + " src='" + players[placedPlayers].image + "' alt='" + players[placedPlayers].name + "'/>").appendTo($('.case')[randomCase]);
                placedPlayers++;
            };
        };
        //positionnement des armes ;
        placedWeapons = 0;
        while (placedWeapons < 3) {
            var randomCase = parseFloat(Math.floor(Math.random() * this.nbCase));
            var idWeaponCase = $('.case')[randomCase];
            if (idWeaponCase.style.backgroundColor !== "grey") {
                $("<img class='weapon' id=" + weapons[placedWeapons].name + " src='" + weapons[placedWeapons].image + "' alt='" + weapons[placedWeapons].name + "'/>").appendTo($('.case')[randomCase]);
                placedWeapons++
            };
        };
    },
    //vérifie si la case ciblée est un obstacle
    isTargetedCaseAnObstacle: function(idTargetedCase) {
        return $("#" + idTargetedCase + "").css("backgroundColor") === "rgb(128, 128, 128)";
    },
    //vérifie si la case de droite est accessible
    isRightAccessible: function() {
        var idRightCase = player.positionCaseId() + 1;
        return !(player.positionCaseId() % 10 === 0 || this.isTargetedCaseAnObstacle(idRightCase));
    },
    //vérifie si la case de gauche est accessible
    isLeftAccessible: function() {
        var idLeftCase = player.positionCaseId() - 1;
        return !(player.positionCaseId() % 10 === 1 || this.isTargetedCaseAnObstacle(idLeftCase));
    },
    //vérifie si la case du dessus est accessible
    isTopAccessible: function() {
        var idTopCase = player.positionCaseId() - 10;
        return !(player.positionCaseId() <= 10 || this.isTargetedCaseAnObstacle(idTopCase));
    },
    //vérifie si la case du dessous est accessible
    isBottomAccessible: function() {
        var idBottomCase = player.positionCaseId() + 10;
        return !(player.positionCaseId() > 90 || this.isTargetedCaseAnObstacle(idBottomCase));
    },
    //vérifie si les joueurs sont côte côte est lance le combat si oui
    startFight: function() {

        nearbyCase = [player.positionCaseId() + 1, player.positionCaseId() - 1, player.positionCaseId() + 10, player.positionCaseId() - 10];
        for (var i = 0; i < nearbyCase.length; i++) {
            if ($("#" + parseInt(nearbyCase[i]) + " :first-child").attr("class") === "player") {
                fight();
            }
        }
    }
};

var game = {
    init: function() {

        //initialisation des différents personnages
        var playerOne = Object.create(newPlayer);
        playerOne.init("joueurRouge", weapons[3], "image/joueur1.jpg", 81, 68, 90, 83);
        var playerTwo = Object.create(newPlayer);
        playerTwo.init("joueurBleu", weapons[4], "image/joueur2.jpg", 37, 39, 38, 40);
        players.push(playerOne, playerTwo);
        //initialisation des différentes armes
        var scepter = Object.create(weaponEx);
        scepter.init("Sceptre", 20, "image/sceptre.jpg");
        var sling = Object.create(weaponEx);
        sling.init("Fronde", 15, "image/fronde.jpg");
        var wood = Object.create(weaponEx);
        wood.init("Bois", 5, "image/bois.jpg");
        var rapier = Object.create(weaponEx);
        rapier.init("Rapière", 10, "image/rapiere.jpg");
        var sword = Object.create(weaponEx);
        sword.init("epee", 10, "image/epee.jpg");
        weapons.push(scepter, sling, wood, rapier, sword);
        //affichage de la grille
        board.init()

    },
};
//initialisation du jeu
game.init();
var nbTurn = 0;
var player = players[1];
//affichage données des joueurs:;
$('.droitej1').append(String.fromCharCode(players[0].right));
$('.gauchej1').append(String.fromCharCode(players[0].left));
$('.hautj1').append(String.fromCharCode(players[0].up));
$('.basj1').append(String.fromCharCode(players[0].down));
$('.santej1').text("santé " + parseInt(players[0].health));
$('.santej2').text("santé " + parseInt(players[0].health));