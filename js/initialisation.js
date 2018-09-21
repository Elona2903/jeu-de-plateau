var game = {
    //création des armes;
    weapons: [],
    //modèle de l'objet armes
    weaponEx: {
        init: function(name, damage, image) {
            this.name = name;
            this.damage = damage;
            this.image = image;
        }
    },
    players: [],
    //modèle de l'objet joueurs
    newPlayer: {
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
        getDamage: function(ratio) {
            return this.weapon.damage * ratio;
        },
        //fonction permettant d'enlever les points de vie au joueur
        receivesDamage: function(opponent, action) {
            if (action === "attack") {
                this.health -= opponent.getDamage(1);
            } else if (action === "defend") {
                this.health -= opponent.getDamage(0.5);
            }
            alert("PV de " + this.name + ' : ' + game.players[0].health + ' pv ');
        },
        //fonction contenant les actions d'un mouvement
        moveToLeft: function() {
            id = this.positionCaseId() - 1;
            $('#' + this.name).appendTo($("#" + id + ""));
            this.changeWeapon();
            this.alternatePlayer();
            game.board.startFight();

            $('.sante').text("santé " + parseInt(player.health));
        },
        moveToRight: function() {
            id = this.positionCaseId() + 1;
            $('#' + this.name).appendTo($("#" + id + ""));
            this.changeWeapon();
            this.alternatePlayer();
            game.board.startFight();

            $('.sante').text("santé " + parseInt(player.health));
        },
        moveToBottom: function() {
            id = this.positionCaseId() + 10;
            $('#' + this.name).appendTo($("#" + id + ""));
            this.changeWeapon();
            this.alternatePlayer();
            game.board.startFight();

            $('.sante').text("santé " + parseInt(player.health));
        },
        moveToTop: function() {
            id = this.positionCaseId() - 10;
            $('#' + this.name).appendTo($("#" + id + ""));
            this.changeWeapon();
            this.alternatePlayer();
            game.board.startFight();

            $('.sante').text("santé " + parseInt(player.health));
        },

        //fonction de changement de joueurs
        changePlayer: function() {

            if (this === game.players[0]) {
                player = game.players[1];

            } else if (this === game.players[1]) {
                player = game.players[0];
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
        changeWeapon: function() {
            if ($("#" + this.positionCaseId() + " :first-child").attr("class") === "weapon") {
                for (var i = 0; i < game.weapons.length; i++) {
                    if ($("#" + this.positionCaseId() + " :first-child").attr("alt") === game.weapons[i].name) {
                        ($("#" + game.weapons[i].name + "")).remove();
                        $("<img class='weapon' id=" + this.weapon.name + " src='" + this.weapon.image + "' alt='" + this.weapon.name + "'/>").appendTo($("#" + this.positionCaseId() + ""));
                        this.weapon = game.weapons[i];
                    };
                };

            };
        }
    },

    //création de l'objet plateau;
    board: {
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
            while (placedPlayers < game.players.length) {
                var randomCase = parseFloat(Math.floor(Math.random() * this.nbCase));
                var idPlayerStartingCase = $('.case')[randomCase];
                if (idPlayerStartingCase.style.backgroundColor !== "grey") {
                    $("<img class='player' id=" + game.players[placedPlayers].name + " src='" + game.players[placedPlayers].image + "' alt='" + game.players[placedPlayers].name + "'/>").appendTo($('.case')[randomCase]);
                    placedPlayers++;
                };
            };
            //positionnement des armes ;
            placedWeapons = 0;
            while (placedWeapons < 3) {
                var randomCase = parseFloat(Math.floor(Math.random() * this.nbCase));
                var idWeaponCase = $('.case')[randomCase];
                if (idWeaponCase.style.backgroundColor !== "grey") {
                    $("<img class='weapon' id=" + game.weapons[placedWeapons].name + " src='" + game.weapons[placedWeapons].image + "' alt='" + game.weapons[placedWeapons].name + "'/>").appendTo($('.case')[randomCase]);
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
    },


    init: function() {


        //initialisation des différentes armes
        var scepter = Object.create(this.weaponEx);
        scepter.init("Sceptre", 20, "image/sceptre.jpg");
        var sling = Object.create(this.weaponEx);
        sling.init("Fronde", 15, "image/fronde.jpg");
        var wood = Object.create(this.weaponEx);
        wood.init("Bois", 5, "image/bois.jpg");
        var rapier = Object.create(this.weaponEx);
        rapier.init("Rapière", 10, "image/rapiere.jpg");
        var sword = Object.create(this.weaponEx);
        sword.init("epee", 10, "image/epee.jpg");
        this.weapons.push(scepter, sling, wood, rapier, sword);
        //initialisation des différents personnages
        var playerOne = Object.create(this.newPlayer);
        playerOne.init("joueurRouge", this.weapons[3], "image/joueur1.jpg", 81, 68, 90, 83);
        var playerTwo = Object.create(this.newPlayer);
        playerTwo.init("joueurBleu", this.weapons[4], "image/joueur2.jpg", 37, 39, 38, 40);
        this.players.push(playerOne, playerTwo);
        //affichage de la grille
        this.board.init()

    },
};
//initialisation du jeu

game.init();
//affichage données des joueurs:;
$('.droitej1').append(String.fromCharCode(game.players[0].right));
$('.gauchej1').append(String.fromCharCode(game.players[0].left));
$('.hautj1').append(String.fromCharCode(game.players[0].up));
$('.basj1').append(String.fromCharCode(game.players[0].down));
$('.santej1').text("santé " + parseInt(game.players[0].health));
$('.santej2').text("santé " + parseInt(game.players[0].health));