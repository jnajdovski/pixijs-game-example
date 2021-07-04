import * as PIXI from "pixi.js"
import { Scene } from "pixi-scenes";
import BackgroundContainer from "../containers/BackgroundContainer";
import HeroContainer from "../containers/HeroContainer";
import checkElements from "../helpers/checkElements"
import moveElements from "../helpers/moveElements";
import EnemyContainer from "../containers/EnemyContainer";
import moveEnemyBullets from "../helpers/moveEnemyBullets";
import GuiContainer from "../containers/GuiContainer";
import signals from "signals";
import Popup from "../components/Popup";
import clearObject from "../helpers/clearObject";

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
        this.guiContainer = new GuiContainer()
        
        this.gameFinished = false
    
        this.explosionsArray = []
        this.explosionFrames = [];
        for (let i = 0; i < 26; i++) {
            const texture = PIXI.Texture.from(`Explosion_Sequence_A ${i + 1}.png`);
            this.explosionFrames.push(texture);
        }

        this.addChild(this.backgroundContainer)
        this.addChild(this.heroContainer)
        this.addChild(this.enemyContainer)
        this.addChild(this.guiContainer)

        this.app.onFuelTaken = new signals()
        this.app.onEnemyDestroy = new signals()
        this.app.onHeroDestroy = new signals()

        this.app.onFuelTaken.add(() => {
            this.app.playerConfig.fuel += 10
            this.guiContainer.updateFuelText(this.app.playerConfig.fuel)
        })

        this.app.onEnemyDestroy.add(() => {
            this.app.playerConfig.score += 15
            this.guiContainer.updateScoreText(this.app.playerConfig.score)
        })

        this.app.onHeroDestroy.add(() => {
            this.app.playerConfig.lives -= 1
            const { hero } = this.heroContainer
            if (this.app.playerConfig.lives > 0) {
                this.guiContainer.updateLivesText(this.app.playerConfig.lives)
                hero.refresh()
            } else {
                this.guiContainer.updateLivesText(0)
                this.gameFinished = true
                hero.renderable = false
                this.gameOver()
            }
        })
    }

    /**
     * showing containers
     */
    start() {
        const { lives, fuel } = this.app.playerConfig
        this.backgroundContainer.draw()
        this.heroContainer.draw()
        this.enemyContainer.draw(this.heroContainer.hero)
        this.guiContainer.draw(lives, fuel)
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

        this.explosionsArray = checkElements(enemyArray, bombsArray, hero, fuelsArray, bulletsArray, fireBallsArray, this.app)
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
        anim.onLoop = () => {
            anim.stop()
            anim.destroy()
        }
        this.addChild(anim)
    }

    gameOver () {
        this.gameFinished = true
        this.finishPopup = new Popup(this.centerX, this.centerY)
        this.finishPopup.show('You are dead')
        this.addChild(this.finishPopup)
        this.finishPopup.onButtonClicked.add(this.shutdown, this)
    }
    
    update() {
        if (!this.gameFinished) {
            this.updateElements()
            this.backgroundContainer.updateBackground()
        }
    }

    shutdown() {
        this.backgroundContainer.clear()
        this.backgroundContainer = null
        this.heroContainer.clear()
        this.heroContainer = null
        this.enemyContainer.clear()
        this.enemyContainer = null
        this.guiContainer.clear()
        this.guiContainer = null
        clearObject(this.children)
        this.scenes.start('score')
        this.destroy(true)
    }
}