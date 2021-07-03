import { Sprite } from "pixi.js";

/**
 * Moves the bullet in direction of hero
 * @param {Sprite} bullet 
 */
const moveEnemyBullets = (bullet) => {
    if (bullet.rotation == 0) {
        const goalX = bullet.goal.x
        const goalY = bullet.goal.y
    
        let toPlayerX = goalX - bullet.x;
        let toPlayerY = goalY - bullet.y;
        bullet.rotation = Math.atan2(toPlayerY, toPlayerX)
    }

    bullet.x += Math.cos(bullet.rotation) * 4;
    bullet.y += Math.sin(bullet.rotation) * 4;
}

export default moveEnemyBullets