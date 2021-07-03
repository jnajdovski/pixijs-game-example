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

    /**
     * Create instance of Hero class
     */
    draw() {
        this.hero = new Hero(200, 300)
        this.addChild(this.hero)
    }

    /**
     * Checks the keyCode of pressed key if its 32 (Space) to call the _dropBomb function
     * @param {Number} param0 
     */
    _onKeyDown({ keyCode }) {
        if (keyCode === 32) {
            this._dropBomb()
        }
    }

    /**
     * Creates bomb sprite
     */
    _dropBomb() {
        const bomb = createSprite('plane_bomb',this.hero.x, this.hero.y)
        this.addChildAt(bomb, 0)
        this.bombsArray.push(bomb)
    }
}

export default HeroContainer