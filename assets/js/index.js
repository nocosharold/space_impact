let hero_position = {
    height: 56,
    width: 37,
    x: 400,
    y: 300,
}

let enemies = [
    { name: "enemy_drone", x: 850, y: 300, height: 46, width: 45 },
    { name: "enemy_bumblebee", x: 1000, y: 100, height: 24, width: 37 },
    { name: "enemy_bumblebee", x: 900, y: 200, height: 24, width: 37 },
    { name: "enemy_bumblebee", x: 800, y: 450, height: 24, width: 37 }
    /* { name: "boss_enemy_poseidon", x: 1152, y: 240, height: 96, width: 45 },
    { name: "boss_enemy_valkyrie", x: 1152, y: 380, height: 102, width: 84 },
    { name: "boss_enemy_doppelganger", x: 1152, y: 540, height: 102, width: 84 } */
];

let life_remaining = 3;
let lasers = [];
let score = 0;
let enemy_move_speed = 2;
let hero_move_speed = 8;

/**
*   DOCU: This function is used to move a hero space ship
* 	Triggered by keyboard arrow keys
*   Last updated at: September 2, 2021
*   @author Harold
*/
function controlHero(e){
    /* up arrow */
    if(e.keyCode === 38 && hero_position.y - hero_move_speed != 12) {
        hero_position.y = parseInt($("#hero").css("top"));
        hero_position.y -= hero_move_speed;
        $("#hero").css({ "top": hero_position.y + "px" });
    }
    /* w key */
    else if(e.keyCode === 87 && hero_position.y - hero_move_speed != 12) {
        hero_position.y = parseInt($("#hero").css("top"));
        hero_position.y -= hero_move_speed;
        $("#hero").css({ "top": hero_position.y + "px" });
    }
    /* down arrow */
    else if(e.keyCode === 40 && hero_position.y - hero_move_speed != 588) {
        hero_position.y = parseInt($("#hero").css("top"));
        hero_position.y += hero_move_speed;
        $("#hero").css({ "top": hero_position.y + "px" });
    }
    /* s key */
    else if(e.keyCode === 83 && hero_position.y - hero_move_speed != 588) {
        hero_position.y = parseInt($("#hero").css("top"));
        hero_position.y += hero_move_speed;
        $("#hero").css({ "top": hero_position.y + "px" });
    }
    /* left arrow */
    else if(e.keyCode === 37 && hero_position.x - hero_move_speed != 288) {
        hero_position.x = parseInt($("#hero").css("left"));
        hero_position.x -= hero_move_speed;
        $("#hero").css({ "left": hero_position.x + "px" });
    }
    /* a key */
    else if(e.keyCode === 65 && hero_position.x - hero_move_speed != 288) {
        hero_position.x = parseInt($("#hero").css("left"));
        hero_position.x -= hero_move_speed;
        $("#hero").css({ "left": hero_position.x + "px" });
    }
    /* right arrow */
    else if(e.keyCode === 39 && hero_position.x + hero_move_speed != 888) {
        hero_position.x = parseInt($("#hero").css("left"));
        hero_position.x += hero_move_speed;
        $("#hero").css({ "left": hero_position.x + "px" });
    }
    /* d key */
    else if(e.keyCode === 68 && hero_position.x + hero_move_speed != 888) {
        hero_position.x = parseInt($("#hero").css("left"));
        hero_position.x += hero_move_speed;
        $("#hero").css({ "left": hero_position.x + "px" });
    }
}

/**
*   DOCU: This function is used to display life and score
*   Last updated at: September 2, 2021
*   @author Harold
*/
function displayLifeAndScore() {
    let life_template = ``;

    for(let life = 0; life < life_remaining; life++){
        life_template += `<div class="hero_life"></div>`;
    }
    life_template += `<h2>SCORE:${score}</h2>`;
    $("#life_score_container").html(life_template);
}

function shotLaser(e) {
    /* shoot a laser */
    if(e.keyCode === 32){
        lasers.push({ x: hero_position.x + 37, y: hero_position.y + 26 });
        displayHeroLaser();
    }
}

/**
*   DOCU: This function is used to display laser
* 	Triggered by space bar key
*   Last updated at: September 3, 2021
*   @author Harold
*/
function displayHeroLaser() {
    let laser_template = ``;
        for(let laser = 0; laser < lasers.length; laser++){
            lasers[laser].height = 4;
            lasers[laser].width = 28;
            laser_template += `<div class="hero_laser" style="top:${ lasers[laser].y }px; left:${ lasers[laser].x }px;"></div>`;
        }
    $("#hero_laser").html(laser_template);
}

/**
*   DOCU: This function is used to make hero laser move
*   Last updated at: September 3, 2021
*   @author Harold
*/
function moveHeroLaser() {
    for(let laser = 0; laser < lasers.length; laser++){
        lasers[laser].x += enemy_move_speed;
        if(lasers[laser].x > 988) {
            lasers[laser] = lasers[lasers.length - 1];
            lasers.pop();
        }
    }
}

/**
*   DOCU: This function is used to display enemies
*   Last updated at: September 3, 2021
*   @author Harold
*/
function displayEnemies() {
    let enemy_template = ``;
    for(let enemy = 0; enemy < enemies.length; enemy++ ){
        enemy_template += `<div class="${ enemies[enemy].name }" style="top:${ enemies[enemy].y }px; left:${ enemies[enemy].x }px;"></div>`;
    }
    $("#enemies").html(enemy_template);
}

/**
*   DOCU: This function is used to move enemies
*   Last updated at: September 3, 2021
*   @author Harold
*/
function moveEnemies() {
    for(let enemy = 0; enemy < enemies.length; enemy++){
        enemies[enemy].x -= enemy_move_speed;
        if (enemies[enemy].x < 288) {
            enemies[enemy].x = 1024;
            enemies[enemy].y = Math.floor(Math.random() * 400);
        }
    }
}

/**
*   DOCU: This function is used to detect hero lasers and enemies collision
*   Last updated at: September 13, 2021
*   @author Harold
*/
function heroLaserToEnemyCollider() {
    for(let enemy = 0; enemy < enemies.length; enemy++){
        for(let laser = 0; laser < lasers.length; laser++){
            if (
                lasers[laser].x < enemies[enemy].x + enemies[enemy].width &&
                lasers[laser].x + lasers[laser].width - hero_move_speed > enemies[enemy].x &&
                lasers[laser].y < enemies[enemy].y + enemies[enemy].height &&
                lasers[laser].y + lasers[laser].height - hero_move_speed > enemies[enemy].y
            ) {
                lasers[laser] = lasers[lasers.length - 1];
                lasers.pop(); 
                enemies[enemy].y = -300;
                score += 10;
            }
        }
    }
}

function gameLoop(){
    displayLifeAndScore();
    displayEnemies();
    moveEnemies();
    displayHeroLaser();
    moveHeroLaser();
    heroLaserToEnemyCollider();

    setTimeout(() => {
        gameLoop();
    }, 16);
}

$(document).ready(function(){
    gameLoop();
    $('body')
        .on("keydown", function(e){ controlHero(e); })
        .on("keyup", function(e){ shotLaser(e); })
});

/**
 * Game Over when player loses all 3 lives
 * When Player collides with an enemy or an enemy bullet, player loses one life, then respawns in the middle left side of the game screen
 * After respawning player has 5 to be invulnerable to enemies and bullets
 * While invulnerable, colliding enemies or enemy bullets get automatically destroyed
 * Enemies and enemy bullets take damage when they collide with player bullets
 ** Bullets are destroyed when they reach the end of the game screen
 ** Spawn enemies outside the right side of the game screen
 ** Spawn regular enemies in random vertical positions
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