let hero_position = {
    x: 480,
    y: 300
}

let life_remaining = 3;
let lasers = [];

/**
*   DOCU: This function is used to move a hero space ship
* 	Triggered by keyboard arrow keys
*   Last updated at: September 2, 2021
*   @author Harold
*/
function controlHero(e){
    /* up arrow */
    if(e.keyCode === 38 && hero_position.y - 8 != 12) {
        hero_position.y = parseInt($("#hero").css("top"));
        hero_position.y -= 8;
        $("#hero").css({ "top": hero_position.y + "px" });
    }
    /* down arrow */
    else if(e.keyCode === 40 && hero_position.y - 8 != 644) {
        hero_position.y = parseInt($("#hero").css("top"));
        hero_position.y += 8;
        $("#hero").css({ "top": hero_position.y + "px" });
    }
    /* left arrow */
    else if(e.keyCode === 37 && hero_position.x - 8 != 344) {
        hero_position.x = parseInt($("#hero").css("left"));
        hero_position.x -= 8;
        $("#hero").css({ "left": hero_position.x + "px" });
    }
    /* right arrow */
    else if(e.keyCode === 39 && hero_position.x + 8 != 888) {
        hero_position.x = parseInt($("#hero").css("left"));
        hero_position.x += 8;
        $("#hero").css({ "left": hero_position.x + "px" });
    }
    /* shoot a laser */
    if(e.keyCode === 32){
        lasers.push({ x: hero_position.x - 278, y: hero_position.y + 29});
        displayLaser();
    }
}

/**
*   DOCU: This function is used to display life and score
*   Last updated at: September 2, 2021
*   @author Harold
*/
function displayLifeAndScore(){
    let life_template = ``;

    for(let i = 0; i < life_remaining; i++){
        life_template += `<div class="hero_life"></div>`
    }
    life_template += `<h2>SCORE:100</h2>`
    $("#life_score_container").html(life_template);
}

/**
*   DOCU: This function is used to display laser
* 	Triggered by space bar key
*   Last updated at: September 3, 2021
*   @author Harold
*/
function displayLaser(){
    let laser_template = ``;
        for(let i=0; i<lasers.length; i++){
            laser_template += `<div class="laser" style="top:${lasers[i].y}px; left:${lasers[i].x}px;"></div>`;
        }
    $(".laser").html(laser_template);
    console.log(laser_template);
}

/**
*   DOCU: This function is used to make laser move
* 	Triggered by gameLoop
*   Last updated at: September 3, 2021
*   @author Harold
*/
function moveLaser(){
    for(let i=0; i<lasers.length; i++){
        lasers[i].x += 8;
        if(lasers[i].x > 995) {
            lasers[i] = lasers[lasers.length - 1];
            lasers.pop();
        }
    }
}

function gameLoop(){
    displayLifeAndScore();
    displayLaser();
    moveLaser();
}

setInterval(gameLoop, 50);

$(document).keydown(function(e){
    controlHero(e);
});

/**
 * Game Over when player loses all 3 lives
 * When Player collides with an enemy or an enemy bullet, player loses one life, then respawns in the middle left side of the game screen
 * After respawning player has 5 to be invulnerable to enemies and bullets
 * While invulnerable, colliding enemies or enemy bullets get automatically destroyed
 * Enemies and enemy bullets take damage when they collide with player bullets
 * Bullets are destroyed when they reach the end of the game screen
 * Spawn enemies outside the right side of the game screen
 * Spawn regular enemies in random vertical positions
 * Boss enemies spawn in the vertical middle of the screen, then begin their movement patterns after they reach the center of the boss area
 * Spawn a random Boss every score of 1500
 * Boss enemies do not go beyond the boss area (approx 1/4 of the game screen)
 * When a boss enemy is active, do not spawn new regular enemies until the boss is destroyed. Current regular enemies stay until they leave the game screen
 * Increase the movement of Regular enemies, every 1000 pts
 * Increase the spawn rate of Regular enemies, every 200 pts
 * e.g. enemy_count = (score == 0) ? 1 : Math.round(score/200)
 ** Player Start with 3 lives
 ** Game Screen follows 4:3 ratio
*/