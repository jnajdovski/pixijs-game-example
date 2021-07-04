import { Application, Sprite } from "pixi.js";
import Enemy from "../components/Enemy";
import Hero from "../components/Hero";


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

/**
 * function that checks if some elements are colliding and what elements need to be destroyes
 * @param {Array<Enemy>} enemyArray 
 * @param {Array<Sprite>} bombsArray 
 * @param {Hero} hero 
 * @param {Array<Sprite>} fuelsArray
 * @returns {Array} array with possitions where needs to be explosion
 */

const checkElements = (enemyArray, bombsArray, hero, fuelsArray, bulletsArray, fireBallsArray, app) => {
    let explosionPositions = []
    
    for (let enemy of enemyArray) {
        if (enemy.isActive) {
            for (let bomb of bombsArray) {
                if (bomb.isActive) {
                    if (checkCollision(bomb, enemy)) {
                        bomb.renderable = false
                        bomb.isActive = false
                        enemy.remove()
                        app.onEnemyDestroy.dispatch()
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
                app.onHeroDestroy.dispatch()
            }

            if (enemy.x <= 0) {
                enemy.remove()
            }
        }
    }

    for (let bullet of bulletsArray) {
        if (bullet.isActive) {
            if (hero.isActive && checkCollision(bullet, hero)) {
                bullet.renderable = false
                bullet.isActive = false
                app.onHeroDestroy.dispatch()
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
                app.onFuelTaken.dispatch(10)
            }
    
            if (fuel.y >= 720) {
                fuel.renderable = false
                fuel.isActive = false
            }
        }
    }

    for (let fireBall of fireBallsArray) {
        if (fireBall.isActive) {
            if (hero.isActive && checkCollision(fireBall, hero)) {
                fireBall.renderable = false
                fireBall.isActive = false
                app.onHeroDestroy.dispatch()
            }
    
            if (fireBall.y >= 720) {
                fireBall.renderable = false
                fireBall.isActive = false
            }
        }
    }

    return explosionPositions
}
export default checkElements