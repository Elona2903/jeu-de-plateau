$(document).keydown(function(e) {
    if (e.keyCode === player.left) { //left;
        if (board.isLeftAccessible()) {
            player.movementActions(-1);
        } else {
            alert("Vous ne pouvez pas effectuer ce déplacement");
        };
    } else if (e.keyCode === player.up) { //up;
        if (board.isTopAccessible()) {
            player.movementActions(-10);
        } else {
            alert("Vous ne pouvez pas effectuer ce déplacement");
        };
    } else if (e.keyCode === player.right) { //right;
        if (board.isRightAccessible()) {
            player.movementActions(+1);
        } else {
            alert("Vous ne pouvez pas effectuer ce déplacement");
        };
    } else if (e.keyCode === player.down) { //down;
        if (board.isBottomAccessible()) {
            player.movementActions(+10);
        } else {
            alert("Vous ne pouvez pas effectuer ce déplacement");
        };
    } else {
        alert("je ne comprend pas");
    };
});