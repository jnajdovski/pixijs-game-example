import { Scene } from "pixi-scenes";
import { Container, Text } from "pixi.js";
import Button from "../components/Button";
import createSprite from "../helpers/createSprite";
import clearObject from "../helpers/clearObject";

export default class Score extends Scene {
    init () {
        this.highScoreArray = this.app.playerConfig.highScore
        this.centerX = this.app.screen.width / 2;
        this.centerY = this.app.screen.height / 2;
        this.scoreContainer = new Container()
        this.addChild(this.scoreContainer)
        this.initialize = true
    }

    start() {
        if (!this.initialize) this.init()
        this.background = createSprite('score_background', this.centerX, this.centerY);
        this.scoreContainer.addChild(this.background);

        this.buttonStart = new Button('button_menu', this.centerX, this.centerY + 280);
        this.buttonStart.onClick.add(this.backToMenu, this)
        this.scoreContainer.addChild(this.buttonStart);

       this.showScores()
    }

    showScores() {
        let offsetY = 0
        for(let [index, score] of this.highScoreArray.entries()) {
            const scoreText = this.createText(`#${index + 1}: ${score} pts`, this.centerX-50, (this.centerY - 168) + offsetY)
            this.addChild(scoreText)
            offsetY += 40
        }
    }

    createText(message, x, y) {
        const text = new Text(message, {fontFamily : 'Arial', fontSize: 32, fill : 0xffffff, align : 'right', strokeThickness: 4})
        text.x = x
        text.y = y
        text.anchor.set(0, .5)
        return text
    }

    backToMenu(){
        this.shutdown()
        this.scenes.start('menu')
    }

    shutdown() {
        this.initialize = false
        this.background = null
        this.buttonStart = null
        clearObject(this.children)
        clearObject(this.scoreContainer.children)
        this.scoreContainer.destroy(true)
    }
}