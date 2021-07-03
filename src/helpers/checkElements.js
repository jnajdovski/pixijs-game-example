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
function checkElements(enemyArray, bombsArray, hero, fuelsArray) {
    let explosionPositions = []
    
    const checkCollision = (obj1, obj2) => {
        var ab = obj1.getBounds();
        var bb = obj2.getBounds();
        return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
    }

    const isOutOfGame = ({ x,y }) => {
        if ((x <= 0 && y <= 0) || (x >= 1280 && y >= 720)) {
            return true
        }
        return false
    }

    for (let [enemyIndex, enemy] of enemyArray.entries()) {
        for (let [bombIndex, bomb] of bombsArray.entries()) {
            if (bomb && enemy) {
                if (checkCollision(bomb, enemy)) {
                    explosionPositions.push({x: enemy.x, y: enemy.y})
                    bomb.destroy()
                    bomb = null
                    bombsArray.splice(bombIndex, 1)
    
                    enemy.remove()
                    enemy = null
                    enemyArray.splice(enemyIndex, 1)
                }
    
                if (bomb && isOutOfGame(bomb)) {
                    bomb.destroy()
                    bomb = null
                    bombsArray.splice(bombIndex, 1)
                }
            }
            
        }
        
        if (enemy) {
            for (let [bulletIndex, bullet] of enemy.bulletArray.entries()) {
                if (checkCollision(hero, bullet)) {
                    explosionPositions.push({x: hero.x, y: hero.y})
                    hero.refresh()
                    bullet.destroy()
                    bullet = null
                    enemy.bulletArray.splice(bulletIndex, 1)
                } else {
                    if (bullet) {
                        if (isOutOfGame(bullet)) {
                            bullet.destroy()
                            bullet = null
                            enemy.bulletArray.splice(bulletIndex, 1)
                        }
                    }
                }
            }

            if (checkCollision(hero, enemy)) {
                explosionPositions.push({x: hero.x, y: hero.y})
                enemy.remove()
                hero.refresh()
            }

            if (enemy.x <= 0) {
                enemy.remove()
                enemyArray.splice(enemyIndex, 1)
            }
        }
    }

    for (let [index, fuel] of fuelsArray.entries()) {
        if (checkCollision(fuel, hero)) {
            fuel.destroy()
            fuel = null
            fuelsArray.splice(index, 1)
            hero.addFuel()
        }

        if (fuel && isOutOfGame(fuel)) {
            fuel.destroy()
            fuel = null
            fuelsArray.splice(index, 1)
        }
    }

    return explosionPositions
}
export default checkElements