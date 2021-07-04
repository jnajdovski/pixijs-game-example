import { Container } from "@pixi/display";
import Hero from "../components/Hero";
import clearObject from "../helpers/clearObject";
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
        const freeBomb = this.bombsArray.find(({ isActive }) => isActive == false)
        if (freeBomb) {
            freeBomb.x = this.hero.x
            freeBomb.y = this.hero.y
            freeBomb.renderable = true
            freeBomb.isActive = true
        } else {
            const bomb = createSprite('plane_bomb',this.hero.x, this.hero.y)
            bomb.isActive = true
            this.addChildAt(bomb, 0)
            this.bombsArray.push(bomb)
        }
    }

    clear() {
        clearObject(this.bombsArray)
        clearObject(this.children)
        this.destroy(true)
    }
}

export default HeroContainer