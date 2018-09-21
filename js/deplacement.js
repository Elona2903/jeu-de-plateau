var nbTurn = 0;
var player = game.players[1];
$(document).keydown(function(e) {
    if (e.keyCode === player.left) { //left;
        if (game.board.isLeftAccessible()) {
            player.moveToLeft();
        } else {
            alert("Vous ne pouvez pas effectuer ce déplacement");
        };
    } else if (e.keyCode === player.up) { //up;
        if (game.board.isTopAccessible()) {
            player.moveToTop();
        } else {
            alert("Vous ne pouvez pas effectuer ce déplacement");
        };
    } else if (e.keyCode === player.right) { //right;
        if (game.board.isRightAccessible()) {
            player.moveToRight();
        } else {
            alert("Vous ne pouvez pas effectuer ce déplacement");
        };
    } else if (e.keyCode === player.down) { //down;
        if (game.board.isBottomAccessible()) {
            player.moveToBottom();
        } else {
            alert("Vous ne pouvez pas effectuer ce déplacement");
        };
    } else {
        alert("je ne comprend pas");
    };
});