//création des armes
var armes =
    [
        {
            nom: "baton",
            degats: 15,
            image: './image/baton.jpg'
        },
        {
            nom: "fronde",
            degats: 20,
            image: './image/fronde.jpg'
        },
        {
            nom: "bois",
            degats: 5,
            image: './image/bois.jpg'
        },
        {
            arme: "rapiere",
            degats: 10,
            image: './image/rapiere.jpg'
        },
        {
            arme: "epee",
            degats: 10,
            image: './image/epee.jpg'
        }
    ]
//création des personnages
var joueurs =
    [
        {
            nom: "joueur rouge",
            pv: 100,
            arme: armes[3].arme,
            degats: armes[3].degats,
            image: './image/joueur1.jpg'
        },
        {
            nom: "joueur bleu",
            pv: 100,
            arme: armes[4].arme,
            degats: armes[4].degats,
            image: './image/joueur2.jpg'
        }
    ]

//création de l'objet plateau
var plateau =
{
    nbCol: 10,
    nbLigne: 10,
    nbCase: 100,
    nbObstacle: 20
}
//creation de la grille 
for (var i = 0; i < plateau.nbLigne; i++) {
    $('<div class="ligne"></div>').appendTo($("#jeu"))

};
for (var j = 0; j < plateau.nbCol; j++) {
    $(`<div class="case col-md-10"></div>`).appendTo($(".ligne"))
}
for (var i = 0; i < plateau.nbCase; i++) {
    var nombre = parseInt(i + 1)
    var cases = document.getElementsByClassName('case')
    cases[i].setAttribute("id", nombre)
    cases[i].style.backgroundColor = "white"

}

//génération aléatoire des obstacles
var obstacleCree = 0
while (obstacleCree < plateau.nbObstacle) {
    var obstacle = parseFloat(Math.floor(Math.random() * plateau.nbCase))
    var caseChoisie = $('.case')[obstacle]
    if (caseChoisie.style.backgroundColor !== "grey") {
        var gris = $('.case')[obstacle]
        gris.style.backgroundColor = "grey"
        obstacleCree++
    }
}
//positionnement des joueurs
joueurPlace = 0

caseJoueurs = []
while (joueurPlace < joueurs.length) {

    var place = parseFloat(Math.floor(Math.random() * plateau.nbCase))
    var placement = $('.case')[place]
    if (placement.style.backgroundColor = "white") {
        $("<img src='" + joueurs[joueurPlace].image + "' alt='player'/>").appendTo($('.case')[place])
    }
    joueurPlace++

}
//positionnement des armes 
armePlace = 0

caseArme = []
while (armePlace < 3) {
    var place = parseFloat(Math.floor(Math.random() * plateau.nbCase))
    var placement = $('.case')[place]
    if (placement.style.backgroundColor === "white" || placement.style.backgroundImage === null) {
        placement.style.backgroundImage = 'url(' + armes[armePlace].image + ')';
        armePlace++;
    }
}
