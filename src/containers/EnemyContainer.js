import { Container } from "@pixi/display";
import Enemy from "../components/Enemy";
import Hero from "../components/Hero";

/**
 * Displaying enemies 
 */
class EnemyContainer extends Container {
    constructor(centerX, centerY) {
        super()
        this.centerX = centerX
        this.centerY = centerY
        this.bulletsArray = []
        this.enemyArray = []
    }

    /**
     * Create instance of Enemy class
     * @param {Hero} hero 
     */
    draw(hero) {
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
     * removes the interval thats creates enemies
     */
    remove(){
        clearInterval(this.dispatchEnemy)
    }
}

export default EnemyContainer