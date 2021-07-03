import { Scene } from "pixi-scenes";
import BackgroundContainer from "../containers/BackgroundContainer";
import HeroContainer from "../containers/HeroContainer";
import checkCollision from "../helpers/checkCollision"
import moveElements from "../helpers/moveElements";
import * as PIXI from "pixi.js"

export default class Game extends Scene {
    init () {
        this.centerX = this.app.screen.width / 2;
        this.centerY = this.app.screen.height / 2;
        this.backgroundContainer = new BackgroundContainer(this.centerX, this.centerY)
        this.heroContainer = new HeroContainer(this.centerX, this.centerY)

        this.explosionFrames = [];
        for (let i = 0; i < 26; i++) {
            const texture = PIXI.Texture.from(`Explosion_Sequence_A ${i + 1}.png`);
            this.explosionFrames.push(texture);
        }

        this.addChild(this.backgroundContainer)
        this.addChild(this.heroContainer)
    }

    start () {
        this.backgroundContainer.draw()
        this.heroContainer.draw()
        this.backgroundContainer.startFailling()
    }

    checkBombs () {
        const { bombsArray } = this.heroContainer
        const { bgLand } = this.backgroundContainer
        moveElements(bombsArray, 'down', 10)
        for (let [index, bomb] of bombsArray.entries()) {
            if (checkCollision(bomb, bgLand)) {
                this.explosion(bomb.x, bomb.y)
                bomb.destroy()
                bomb = null
                bombsArray.splice(index, 1)
            }
        }
    }

    checkFuelTanks () {
        const { hero } = this.heroContainer
        const { fuelsArray } = this.backgroundContainer
        moveElements(fuelsArray, 'down', Math.floor(Math.random() * 4) + 2)
        for (let [index, fuel] of fuelsArray.entries()) {
            if (checkCollision(fuel, hero)) {
                fuel.destroy()
                fuel = null
                fuelsArray.splice(index, 1)
                hero.addFuel()
            }
        }
    }

    checkBackground() {
        const { bgLand, bgMountains } = this.backgroundContainer
        moveElements(bgLand, 'left', 2)
        moveElements(bgMountains, 'left', 0.5)
    }

    explosion (x, y) {
        const anim = new PIXI.AnimatedSprite(this.explosionFrames);
        anim.anchor.set(0.5);
        anim.x = x;
        anim.y = y + 30;
        anim.animationSpeed = 0.5;
        anim.play();
        anim.onLoop = ()=> {
            anim.stop()
            anim.destroy()
        }
        this.addChild(anim)
    }

    update () {
        if (this.heroContainer.bombsArray.length) {
            this.checkBombs()
        }

        if (this.backgroundContainer.fuelsArray.length) {
            this.checkFuelTanks()
        }

        this.checkBackground()
    }
}