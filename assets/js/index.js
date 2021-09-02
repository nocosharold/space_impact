let left_position_value = 480;
let top_position_value = 300;

$(document).keydown(function(e){
    moveHero(e);
});

/**
*   DOCU: This function is used to move a hero space ship
* 	Triggered by keyboard arrow keys
*   Last updated at: September 2, 2021
*   @author Harold
*/
function moveHero(e){
    /* up arrow */
    if(e.keyCode == 38 && top_position_value - 8 != 12) {
        top_position_value = parseInt($("#hero").css("top"));
        top_position_value -= 8;
        $("#hero").css({ "top": top_position_value + "px" });
    }
    /* down arrow */
    else if(e.keyCode == 40 && top_position_value - 8 != 644) {
        top_position_value = parseInt($("#hero").css("top"));
        top_position_value += 8;
        $("#hero").css({ "top": top_position_value + "px" });
    }
    /* left arrow */
    else if(e.keyCode == 37 && left_position_value - 8 != 344) {
        left_position_value = parseInt($("#hero").css("left"));
        left_position_value -= 8;
        $("#hero").css({ "left": left_position_value + "px" });
    }
    /* right arrow */
    else if(e.keyCode == 39 && left_position_value + 8 != 888) {
        left_position_value = parseInt($("#hero").css("left"));
        left_position_value += 8;
        $("#hero").css({ "left": left_position_value + "px" });
    }
    console.log(e.keyCode);
}