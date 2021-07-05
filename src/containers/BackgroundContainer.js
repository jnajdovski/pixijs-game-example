import { Container } from "@pixi/display";
import { TilingSprite } from "@pixi/sprite-tiling";
import clearObject from "../helpers/clearObject";
import createSprite from "../helpers/createSprite";

/**
 * Container for all background elements
 */
class BackgroundContainer extends Container {
    constructor(centerX, centerY) {
        super()
        this.centerX = centerX
        this.centerY = centerY
        this.fuelsArray = []
        this.bgSpeed = 4
    }

    /**
     * drawing background layers
     */
    draw() {
        this.bgSky =  this._setBackground('sky')
        this.bgMountains = this._setBackground('mountains')
        this.bgLand = this._setBackground('land')
        this.addChild(this.bgSky)
        this.addChild(this.bgMountains)
        this.addChild(this.bgLand)
        this.createFuelTanks()
    }

    /**
     * Creating tilling sprite
     * @param {String} texture 
     * @returns 
     */
    _setBackground(texture) {
        let tilling = new TilingSprite.from(texture, 0, 0)
        tilling.width = 1280
        tilling.height = 720
        tilling.position.set(0, 0)
        return tilling
    }

    /**
     * function that moves the background layers
     */
    updateBackground() {
        this.bgLand.tilePosition.x -= this.bgSpeed
        this.bgMountains.tilePosition.x -= this.bgSpeed / 2
        this.bgSky.tilePosition.x -= this.bgSpeed / 4
    }

    /**
     * function that creates fuel tanks on random interval
     */
     createFuelTanks() {
        const max = this.centerX * 2
        const min = this.centerX - 200
        this.fallingInterval = setInterval(() => {
            const freeFuelTank = this.fuelsArray.find(({ isActive }) => isActive == false)
            const rndX = Math.floor(Math.random() * (max - min + 1) + min)
            if (freeFuelTank) {
                freeFuelTank.x = rndX
                freeFuelTank.y = -100
                freeFuelTank.renderable = true
                freeFuelTank.isActive = true
            } else {
                const fuelTank = createSprite('gasoline_tank', rndX, -100)
                fuelTank.isActive = true
                this.addChild(fuelTank)
                this.fuelsArray.push(fuelTank)
            }
        }, Math.floor(Math.random() * 12000) + 2000);
    }

    /**
     * removes the interval for creating new fuel tanks
     */
    stopFalling() {
        clearInterval(this.fallingInterval)
    }

    /**
     * destroying all elements
     */
    clear() {
        this.stopFalling()
        clearObject(this.fuelsArray)
        clearObject(this.children)
        this.destroy(true)
    }
}

export default BackgroundContainer