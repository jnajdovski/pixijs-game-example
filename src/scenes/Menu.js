import { Scene } from "pixi-scenes";
import createSprite from "../helpers/createSprite";
import Button from "../components/Button";
import { Container } from "@pixi/display";
import clearObject from "../helpers/clearObject";

export default class Menu extends Scene {
    init () {
        this.centerX = this.app.screen.width / 2;
        this.centerY = this.app.screen.height / 2;
        this.menuContainer = new Container()
        this.addChild(this.menuContainer)
    }

    start() {
        this.background = createSprite('background', this.centerX, this.centerY);
        this.menuContainer.addChild(this.background);

        this.buttonStart = new Button('button_start', this.centerX, this.centerY);
        this.buttonStart.onClick.add(this.startGame, this)
        this.menuContainer.addChild(this.buttonStart);

        this.buttonScore = new Button('button_score', this.buttonStart.x, this.buttonStart.y + 120);
        this.buttonScore.onClick.add(this.showScore, this)
        this.menuContainer.addChild(this.buttonScore);
    }

    startGame() {
        this.shutdown()
        this.scenes.start('game')
    }

    showScore() {
        this.shutdown()
        console.log('Show score');
    }

    update () {

    }

    shutdown() {
        clearObject(this.menuContainer.children)
        this.menuContainer.destroy(true)
        this.background = null
        this.buttonStart = null
        this.buttonScore = null
        this.destroy(true)
    }
}