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
    },
    //fonction contenant les actions d'un mouvement
    moveToLeft: function() {
        id = this.positionCaseId() - 1;
        $('#' + this.name).appendTo($("#" + id + ""));
        this.changeWeapon(id);
        this.alternatePlayer();
        board.startFight();
    },
    moveToRight: function() {
        id = this.positionCaseId() + 1;
        $('#' + this.name).appendTo($("#" + id + ""));
        this.changeWeapon(id);
        this.alternatePlayer();
        board.startFight();
    },
    moveToBottom: function() {
        id = this.positionCaseId() + 10;
        $('#' + this.name).appendTo($("#" + id + ""));
        this.changeWeapon(id);
        this.alternatePlayer();
        board.startFight();
    },
    moveToTop: function() {
        id = this.positionCaseId() - 10;
        $('#' + this.name).appendTo($("#" + id + ""));
        this.changeWeapon(id);
        this.alternatePlayer();
        board.startFight();
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

                if (player === players[0]) {
                    $('.armej1').text(this.weapon.name);
                    $('.degatsj1').text(this.weapon.damage);
                } else if (player === players[1]) {
                    $('.armej2').text(this.weapon.name);
                    $('.degatsj2').text(this.weapon.damage);
                }

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
    placeObstacle: function() {
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
    },
    getNearbyCase(randomCase) {
        nearbyCase = [];
        nearbyCaseP = [];
        if (randomCase < 10) {
            nearbyCase = [$('.case')[randomCase - 1], $('.case')[randomCase + 1], $('.case')[randomCase + 10]];
            nearbyCaseP = [$('.case :nth-child(' + parseFloat(randomCase - 1) + ')'),
                $('.case :nth-child(' + parseFloat(randomCase + 1) + ')'), , $('.case :nth-child(' + parseFloat(randomCase + 10) + ')')
            ];
        } else if (randomCase % 10 === 0) {
            nearbyCase = [$('.case')[randomCase + 1],
                $('.case')[randomCase - 10],
                $('.case')[randomCase + 10]
            ];
            nearbyCaseP = [$('.case :nth-child(' + parseFloat(randomCase + 1) + ')'),
                $('.case :nth-child(' + parseFloat(randomCase - 10) + ')'),
                $('.case :nth-child(' + parseFloat(randomCase + 10) + ')')
            ];
        } else if (randomCase % 10 === 9) {
            nearbyCase = [$('.case')[randomCase - 1],
                $('.case')[randomCase - 10],
                $('.case')[randomCase + 10]
            ];
            nearbyCaseP = [$('.case :nth-child(' + parseFloat(randomCase - 1) + ')'),
                $('.case :nth-child(' + parseFloat(randomCase - 10) + ')'),
                $('.case :nth-child(' + parseFloat(randomCase + 10) + ')')
            ];
        } else if (randomCase > 89) {
            nearbyCase = [$('.case')[randomCase - 1],
                $('.case')[randomCase + 1],
                $('.case')[randomCase - 10],
            ];
            nearbyCaseP = [$('.case :nth-child(' + parseFloat(randomCase - 1) + ')'),
                $('.case :nth-child(' + parseFloat(randomCase + 1) + ')'),
                $('.case :nth-child(' + parseFloat(randomCase - 10) + ')')
            ];

        } else if (randomCase === 0) {
            nearbyCase = [$('.case')[randomCase + 1],
                $('.case')[randomCase + 10]
            ];
            nearbyCaseP = [$('.case :nth-child(' + parseFloat(randomCase + 1) + ')'),
                $('.case :nth-child(' + parseFloat(randomCase + 10) + ')')
            ];
        } else if (randomCase === 9) {
            nearbyCase = [$('.case')[randomCase - 1], $('.case')[randomCase + 10]];
            nearbyCaseP = [$('.case :nth-child(' + parseFloat(randomCase - 1) + ')'),
                $('.case :nth-child(' + parseFloat(randomCase + 10) + ')')
            ];
        } else if (randomCase === 90) {
            nearbyCase = [$('.case')[randomCase + 1], $('.case')[randomCase - 10]];
            nearbyCaseP = [$('.case :nth-child(' + parseFloat(randomCase + 1) + ')'),
                $('.case :nth-child(' + parseFloat(randomCase - 10) + ')')
            ];
        } else if (randomCase === 99) {
            nearbyCase = [$('.case')[randomCase - 1], $('.case')[randomCase - 10], ];
            nearbyCaseP = [$('.case :nth-child(' + parseFloat(randomCase - 1) + ')'),
                $('.case :nth-child(' + parseFloat(randomCase - 10) + ')'),
            ];
        } else {
            nearbyCase = [$('.case')[randomCase - 1], $('.case')[randomCase + 1], $('.case')[randomCase - 10], $('.case')[randomCase + 10]];
            nearbyCaseP = [$('.case :nth-child(' + parseFloat(randomCase - 1) + ')'),
                $('.case :nth-child(' + parseFloat(randomCase + 1) + ')'),
                $('.case :nth-child(' + parseFloat(randomCase - 10) + ')'), $('.case :nth-child(' + parseFloat(randomCase + 10) + ')')
            ];
        }
        return nearbyCase;
        return nearbyCaseP;
    },
    placePlayer: function() {
        var placedPlayers = 0;
        while (placedPlayers < players.length) {

            var isPlayerPlaceable = true;
            var randomCase = parseFloat(Math.floor(Math.random() * this.nbCase));
            var PlayerStartingCase = $('.case')[randomCase];
            this.getNearbyCase(randomCase);
            for (var i = 0; i < nearbyCase.length; i++) {
                if (nearbyCase[i].style.backgroundColor === "grey" ||
                    (nearbyCaseP[i]).find(">:first-child").attr('class') !== 'player') {
                    isPlayerPlaceable = true;
                }
            }
            if (PlayerStartingCase.style.backgroundColor !== "grey" && isPlayerPlaceable === true) {
                $("<img class='player' id=" + players[placedPlayers].name + " src='" + players[placedPlayers].image + "' alt='" + players[placedPlayers].name + "'/>").appendTo($('.case')[randomCase]);
                placedPlayers++;
            };
        }

    },
    placeWeapon: function() {
        placedWeapons = 0;
        while (placedWeapons < 3) {
            isWeaponPlaceable = false
            var randomCase = parseFloat(Math.floor(Math.random() * this.nbCase));
            var idWeaponCase = $('.case')[randomCase];
            this.getNearbyCase(randomCase);
            for (var i = 0; i < nearbyCase.length; i++) {
                if (nearbyCase[i].style.backgroundColor === "grey" ||
                    (nearbyCaseP[i]).find(">:first-child").attr('class') !== 'player' ||
                    (nearbyCaseP[i]).find(">:first-child").attr('class') !== 'weapon') {
                    isWeaponPlaceable = true;
                }
            }
            if (idWeaponCase.style.backgroundColor !== "grey" && isWeaponPlaceable === true) {
                $("<img class='weapon' id=" + weapons[placedWeapons].name + " src='" + weapons[placedWeapons].image + "' alt='" + weapons[placedWeapons].name + "'/>").appendTo($('.case')[randomCase]);
                placedWeapons++
            };
        };
    },

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
        this.placeObstacle();
        this.placePlayer();
        this.placeWeapon();

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

                $(document).unbind("keydown")
                console.log("fight");
                fight();
            }
        }
    }
}

var game = {
    init: function() {


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
        sword.init("Epée", 10, "image/epee.jpg");
        weapons.push(scepter, sling, wood, rapier, sword);
        //initialisation des différents personnages
        var playerOne = Object.create(newPlayer);
        playerOne.init("joueurRouge", weapons[3], "image/joueur1.jpg", 81, 68, 90, 83);
        var playerTwo = Object.create(newPlayer);
        playerTwo.init("joueurBleu", weapons[4], "image/joueur2.jpg", 37, 39, 38, 40);
        players.push(playerOne, playerTwo);
        //affichage de la grille
        board.init();
        //affichage données des joueurs
        $('.armej1').append(players[0].weapon.name);
        $('.degatsj1').append(players[0].weapon.damage);
        $('.armej2').append(players[1].weapon.name);
        $('.degatsj2').append(players[1].weapon.damage);
        $('.santej1').text(parseInt(players[0].health));
        $('.santej2').text(parseInt(players[0].health));
        $('input').attr("disabled", "disabled");
    }
};

//initialisation du jeu
game.init();
var nbTurn = 0;
var player = players[1];