import { Scene } from "pixi-scenes";
import { Container } from "@pixi/display";
import BackgroundContainer from "../containers/BackgroundContainer";
import HeroContainer from "../containers/HeroContainer";
import checkCollision from "../helpers/checkCollision"
import * as PIXI from "pixi.js"

export default class Game extends Scene {
    init () {
        this.centerX = this.app.screen.width / 2;
        this.centerY = this.app.screen.height / 2;
        this.backgroundContainer = new BackgroundContainer(this.centerX, this.centerY)
        this.heroContainer = new HeroContainer(this.centerX, this.centerY)

        this.addChild(this.backgroundContainer)
        this.addChild(this.heroContainer)
    }

    start() {
        this.backgroundContainer.draw()
        this.heroContainer.draw()
    }

    moveHeroBombs() {
        for (let [index, bomb] of this.heroContainer.bombsArray.entries()) {
            bomb.y += 10
            if ((checkCollision(bomb, this.backgroundContainer.bgLand)) || (bomb.y > 720)) {
                this.explosion(bomb.x, bomb.y)
                bomb.destroy()
                bomb = null
                this.heroContainer.bombsArray.splice(index, 1)
                
            }
        }
    }

    explosion(x, y) {
        const frames = [];
        for (let i = 0; i < 26; i++) {
            const texture = PIXI.Texture.from(`Explosion_Sequence_A ${i + 1}.png`);
            frames.push(texture);
        }

        const anim = new PIXI.AnimatedSprite(frames);
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
            this.moveHeroBombs()
        }
    }
}