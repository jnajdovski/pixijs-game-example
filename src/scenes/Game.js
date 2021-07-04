import { Scene } from "pixi-scenes";
import BackgroundContainer from "../containers/BackgroundContainer";
import HeroContainer from "../containers/HeroContainer";
import checkElements from "../helpers/checkElements"
import moveElements from "../helpers/moveElements";
import * as PIXI from "pixi.js"
import EnemyContainer from "../containers/EnemyContainer";
import moveEnemyBullets from "../helpers/moveEnemyBullets";

export default class Game extends Scene {
    /**
     * creating instances of containers 
     */
    init() {
        this.centerX = this.app.screen.width / 2;
        this.centerY = this.app.screen.height / 2;
        this.backgroundContainer = new BackgroundContainer(this.centerX, this.centerY)
        this.heroContainer = new HeroContainer(this.centerX, this.centerY)
        this.enemyContainer = new EnemyContainer(this.centerX, this.centerY)

        this.explosionsArray = []
        this.explosionFrames = [];
        for (let i = 0; i < 26; i++) {
            const texture = PIXI.Texture.from(`Explosion_Sequence_A ${i + 1}.png`);
            this.explosionFrames.push(texture);
        }

        this.addChild(this.backgroundContainer)
        this.addChild(this.heroContainer)
        this.addChild(this.enemyContainer)

        this.app.gamePaused = false
    }

    /**
     * showing containers
     */
    start() {
        this.backgroundContainer.draw()
        this.heroContainer.draw()
        this.enemyContainer.draw(this.heroContainer.hero)
    }

    /**
     * Moves the elements and check if some are colliding
     */
    updateElements() {
        const { bombsArray } = this.heroContainer
        const { enemyArray, bulletsArray, fireBallsArray } = this.enemyContainer
        const { hero } = this.heroContainer
        const { fuelsArray } = this.backgroundContainer

        for (let bullet of bulletsArray) {
            moveEnemyBullets(bullet)
        }

        moveElements(fuelsArray, 'down', Math.floor(Math.random() * 4) + 2)
        moveElements(bombsArray, 'down', 10)
        moveElements(enemyArray, 'left', 2)
        moveElements(fireBallsArray, 'down', Math.floor(Math.random() * 6) + 2)

        this.explosionsArray = checkElements(enemyArray, bombsArray, hero, fuelsArray, bulletsArray, fireBallsArray)
        for(let exp of this.explosionsArray) {
            this.explosion(exp.x, exp.y)
        }
        this.explosionsArray = []
    }
 
    /**
     * creates AnimatedSprite on given position
     * @param {Number} x 
     * @param {Number} y 
     */
    explosion(x, y) {
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
    
    update() {
        this.updateElements()
        this.backgroundContainer.updateBackground()
    }
}