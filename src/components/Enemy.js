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
        this.isActive = true
    }

    /**
     * removes the interval, empty the array of bullets and destroy the Enemy
     */
    remove() {
        clearInterval(this.shotingInterval)
        this.isActive = false
        this.renderable = false
    }

    reset(x, y, hero) {
        this.x = x
        this.y = y
        this.hero = hero
        this.renderable = true
        this.isActive = true
    }

    /**
     * Function that creates bullet and gives direction to bullet
     */
    shot() {
        const max = 3000
        const min = 1500

        this.shotingInterval = setInterval(() => {
            const { x, y } = this.hero
            const freeBullet = this.parent.bulletsArray.find(({ isActive }) => isActive == false)
            if (freeBullet) {
                freeBullet.x = this.x
                freeBullet.y = this.y
                freeBullet.renderable = true
                freeBullet.rotation = 0
                freeBullet.isActive = true
                freeBullet.goal = {
                    x,
                    y
                }
            } else {
                const bullet = createSprite('tank_bullet', this.x, this.y)
                bullet.goal = {
                    x,
                    y
                }
                bullet.calculatePos = true
                bullet.isActive = true
                this.parent.addChild(bullet)
                this.parent.bulletsArray.push(bullet)
            }
        }, Math.floor(Math.random() * (max - min) + min));
    }
}

export default Enemy