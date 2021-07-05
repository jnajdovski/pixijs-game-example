import { Container, Text } from "pixi.js";
import clearObject from "../helpers/clearObject";

/**
 * container for Gui elements
 */
class GuiContainer extends Container{
    constructor() {
        super()
    }

    /**
     * drawing Gui elements
     * @param {number} lives 
     * @param {number} fuel 
     */
    draw(lives, fuel) {
        this.livesText = this._addText(`lives: ${lives}`, 30, 30)
        this.addChild(this.livesText)

        this.fuelText = this._addText(`fuel: ${fuel}`, 370, 30)
        this.addChild(this.fuelText)

        this.scoreText = this._addText(`Score: 0`, 1050, 30)
        this.addChild(this.scoreText)
    }

    /**
     * creating and returning Text object
     * @param {String} message 
     * @param {number} x 
     * @param {number} y 
     * @returns {Text}
     */
    _addText(message, x, y) {
        const text = new Text(message, {fontFamily : 'Arial', fontSize: 32, fill : 0x000000, align : 'center', strokeThickness: 3})
        text.x = x
        text.y = y
        return text
    }

    /**
     * Updating text of fuelText Gui element
     * @param {number} fuel 
     */
    updateFuelText(fuel) {
        this.fuelText.text = `fuel: ${fuel}`
    }

    /**
     * Updating text of livesText Gui element
     * @param {number} lives 
     */
    updateLivesText(lives) {
        this.livesText.text = `lives: ${lives}`
    }

    /**
     * Updating text of scoreText Gui element
     * @param {number} score 
     */
    updateScoreText(score) {
        this.scoreText.text = `Score: ${score}`
    }

    /**
     * destroying all elements
     */
    clear() {
        clearObject(this.children)
        this.destroy(true)
    }
}

export default GuiContainer