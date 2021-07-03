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
    }

    draw() {
        let bgSky = createSprite('sky', this.centerX, this.centerY)
        let bgMountains = createSprite('mountains', this.centerX, this.centerY)
        this.bgLand = createSprite('land', this.centerX, this.centerY + 264)

        this.addChild(bgSky)
        this.addChild(bgMountains)
        this.addChild(this.bgLand)
    }
}

export default BackgroundContainer