import { Sprite } from '@pixi/sprite'
import { Texture } from 'pixi.js';
import createSprite from '../helpers/createSprite';
import Hero from './Hero';

/**
 * Enemy class that create sprite of enemy
 */
class Enemy extends Sprite {
    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Hero} hero 
     */
    constructor(x, y, hero) {
        super(Texture.from('tank'))
        this.x = x
        this.y = y
        this.hero = hero
        this.anchor.set(.5)
        this.bulletArray = []
    }

    /**
     * removes the interval, empty the array of bullets and destroy the Enemy
     */
    remove() {
        clearInterval(this.shotingInterval)

        while (this.bulletArray.length > 0) {
            let bullet = this.bulletArray.pop()
            bullet.destroy()
        }
        this.destroy()
    }

    /**
     * Function that creates bullet and gives direction to bullet
     */
    shot() {
        const max = 4000
        const min = 1500

        this.shotingInterval = setInterval(() => {
            const { x, y } = this.hero
            const bullet = createSprite('tank_bullet', this.x, this.y)
            bullet.goal = {
                x,
                y
            }
            bullet.calculatePos = true
            this.parent.addChild(bullet)
            this.bulletArray.push(bullet)
        }, Math.floor(Math.random() * (max - min) + min));
    }
}

export default Enemy