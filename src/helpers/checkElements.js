import { Sprite } from "pixi.js";
import Enemy from "../components/Enemy";
import Hero from "../components/Hero";

/**
 * function that checks if some elements are colliding and what elements need to be destroyes
 * @param {Array<Enemy>} enemyArray 
 * @param {Array<Sprite>} bombsArray 
 * @param {Hero} hero 
 * @param {Array<Sprite>} fuelsArray 
 * @returns {Array} array with possitions where needs to be explosion
 */
function checkElements(enemyArray, bombsArray, hero, fuelsArray, bulletsArray) {
    let explosionPositions = []
    
    const checkCollision = (obj1, obj2) => {
        var ab = obj1.getBounds();
        var bb = obj2.getBounds();
        return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
    }

    const isOutOfGame = ({ x, y }) => {
        if ((x <= 0 || y <= 0) || (x >= 1280 || y >= 720)) {
            return true
        }
        return false
    }

    for (let enemy of enemyArray) {
        if (enemy.isActive) {
            for (let bomb of bombsArray) {
                if (bomb.isActive) {
                    if (checkCollision(bomb, enemy)) {
                        explosionPositions.push({x: enemy.x, y: enemy.y})
                        bomb.renderable = false
                        bomb.isActive = false
                        enemy.remove()
                    }
        
                    if (isOutOfGame(bomb)) {
                        bomb.renderable = false
                        bomb.isActive = false
                    }
                }
            }
            
            if (hero.isActive && checkCollision(hero, enemy)) {
                explosionPositions.push({x: hero.x, y: hero.y})
                enemy.remove()
                hero.refresh()
            }

            if (enemy.x <= 0) {
                enemy.remove()
            }
        }
    }

    for (let bullet of bulletsArray) {
        if (bullet.isActive) {
            if (hero.isActive && checkCollision(bullet, hero)) {
                explosionPositions.push({x: hero.x, y: hero.y})
                bullet.renderable = false
                bullet.isActive = false
                hero.refresh()
            }

            if (isOutOfGame(bullet)) {
                bullet.renderable = false
                bullet.isActive = false
            }
        }
    }

    for (let fuel of fuelsArray) {
        if (fuel.isActive) {
            if (hero.isActive && checkCollision(fuel, hero)) {
                fuel.renderable = false
                fuel.isActive = false
                hero.addFuel()
            }
    
            if (fuel.y >= 720) {
                fuel.renderable = false
                fuel.isActive = false
            }
        }
    }

    return explosionPositions
}
export default checkElements