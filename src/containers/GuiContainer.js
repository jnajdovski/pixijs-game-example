import { Container, Text } from "pixi.js";
import clearObject from "../helpers/clearObject";

class GuiContainer extends Container{
    constructor() {
        super()
    }

    draw(lives, fuel) {
        this.livesText = this._addText(`lives: ${lives}`, 30, 30)
        this.addChild(this.livesText)

        this.fuelText = this._addText(`fuel: ${fuel}`, 370, 30)
        this.addChild(this.fuelText)

        this.scoreText = this._addText(`Score: 0`, 1050, 30)
        this.addChild(this.scoreText)
    }

    _addText(message, x, y) {
        const text = new Text(message, {fontFamily : 'Arial', fontSize: 32, fill : 0x000000, align : 'center', strokeThickness: 3})
        text.x = x
        text.y = y
        return text
    }

    updateFuelText(fuel) {
        this.fuelText.text = `fuel: ${fuel}`
    }

    updateLivesText(lives) {
        this.livesText.text = `lives: ${lives}`
    }

    updateScoreText(score) {
        this.scoreText.text = `Score: ${score}`
    }

    clear() {
        clearObject(this.children)
        this.destroy(true)
    }
}

export default GuiContainer