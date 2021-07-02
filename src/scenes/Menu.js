import { Scene } from "pixi-scenes";
import createSprite from "../helpers/createSprite";
import Button from "../components/Button";

export default class Menu extends Scene {
    init () {
        this.centerX = this.app.screen.width / 2;
        this.centerY = this.app.screen.height / 2;
    }

    start() {
        this.background = createSprite('background', this.centerX, this.centerY);
        this.addChild(this.background);

        this.buttonStart = new Button('button_start', this.centerX, this.centerY);
        this.buttonStart.onClick.add(this.startGame, this)
        this.addChild(this.buttonStart);

        this.buttonScore = new Button('button_score', this.buttonStart.x, this.buttonStart.y + 120);
        this.buttonScore.onClick.add(this.showScore, this)
        this.addChild(this.buttonScore);
    }

    startGame() {
        console.log('Start Game');
    }

    showScore() {
        console.log('Show score');
    }

    update () {

    }
}