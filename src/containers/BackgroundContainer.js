import { Container } from "@pixi/display";
import createSprite from "../helpers/createSprite";

/**
 * Displaying and move the background elements
 */
class BackgroundContainer extends Container {
    constructor(centerX, centerY) {
        super()
        this.centerX = centerX
        this.centerY = centerY
        this.fuelsArray = []
    }

    draw() {
        this.bgSky = createSprite('sky', this.centerX, this.centerY)
        this.bgMountains = createSprite('mountains', this.centerX, this.centerY)
        this.bgLand = createSprite('land', this.centerX, this.centerY + 264)

        this.addChild(this.bgSky)
        this.addChild(this.bgMountains)
        this.addChild(this.bgLand)
    }

    startFailling() {
        const max = this.centerX * 2
        const min = this.centerX - 200
        this.fallingInterval = setInterval(() => {
            const fuelTank = createSprite('gasoline_tank', Math.floor(Math.random() * (max - min + 1) + min), -100)
            fuelTank.type = 'fuel'
            this.addChild(fuelTank)
            this.fuelsArray.push(fuelTank)
        }, Math.floor(Math.random() * 15000) + 6000);
    }

    stopFalling(){
        clearInterval(this.fallingInterval)
    }
}

export default BackgroundContainer