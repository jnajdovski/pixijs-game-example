import { Container } from "@pixi/display";
import Enemy from "../components/Enemy";
import Hero from "../components/Hero";
import clearObject from "../helpers/clearObject";
import createSprite from "../helpers/createSprite";

/**
 * container for the enemies 
 */
class EnemyContainer extends Container {
    constructor(centerX, centerY) {
        super()
        this.centerX = centerX
        this.centerY = centerY
        this.bulletsArray = []
        this.enemyArray = []
        this.fireBallsArray = []
    }

    /**
     * Create instance of Enemy class
     * @param {Hero} hero 
     */
    draw(hero) {
        this.createFireBalls()
        const max = 6000
        const min = 2000
        this.dispatchEnemy = setInterval(() => {
            const freeEnemy = this.enemyArray.find(({ isActive }) => isActive == false)
            if (freeEnemy) {
                freeEnemy.reset(1306, 524, hero)
                freeEnemy.shot()
            } else {
                const enemy = new Enemy(1306, 524, hero)
                this.addChild(enemy)
                enemy.shot()
                this.enemyArray.push(enemy)
            }
           
        }, Math.floor(Math.random() * (max - min) + min));
        
    }

    /**
     * creating fire balls that falls on some interval
     */
    createFireBalls() {
        const max = this.centerX * 2
        const min = 0
        this.dispatchFireBall = setInterval(() => {
            const freeFireBall = this.fireBallsArray.find(({ isActive }) => isActive == false)
            const rndX = Math.floor(Math.random() * (max - min + 1) + min)
            if (freeFireBall) {
                freeFireBall.x = rndX
                freeFireBall.y = -100
                freeFireBall.renderable = true
                freeFireBall.isActive = true
            } else {
                const fireBall = createSprite('fire_ball', rndX, -100)
                fireBall.isActive = true
                this.addChild(fireBall)
                this.fireBallsArray.push(fireBall)
            }
        }, Math.floor(Math.random() * 12000) + 4000);
    }


    /**
     * removes the interval thats creates enemies
     */
    remove(){
        clearInterval(this.dispatchEnemy)
        clearInterval(this.dispatchFireBall)
    }

    /**
     * destroying all elements
     */
    clear() {
        this.remove()
        clearObject(this.fireBallsArray)
        clearObject(this.enemyArray, true)
        clearObject(this.bulletsArray)
        clearObject(this.children)
        this.destroy(true)
    }
}

export default EnemyContainer