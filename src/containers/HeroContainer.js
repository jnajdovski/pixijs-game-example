import { Container } from "@pixi/display";
import Hero from "../components/Hero";
import createSprite from "../helpers/createSprite";

/**
 * Displaying and move the background elements
 */
class HeroContainer extends Container {
    constructor(centerX, centerY) {
        super()
        this.centerX = centerX
        this.centerY = centerY
        this.bombsArray = []
        document.addEventListener('keydown', (key) => this._onKeyDown(key));
    }

    draw() {
        this.hero = new Hero(200, 300)
        this.addChild(this.hero)
    }

    _onKeyDown({ keyCode }) {
        if (keyCode === 32) {
            this._dropBomb()
        }
    }

    _dropBomb() {
        const bomb = createSprite('plane_bomb',this.hero.x, this.hero.y)
        this.addChild(bomb)
        this.bombsArray.push(bomb)
    }
}

export default HeroContainer