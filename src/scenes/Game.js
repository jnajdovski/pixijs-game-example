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
import saveGame from "../helpers/saveGame"

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

        this.app.onFuelTaken.add((fuel) => {
            this.app.playerConfig.fuel += fuel
            this.guiContainer.updateFuelText(this.app.playerConfig.fuel)
            if(this.app.playerConfig.fuel <= 0) {
                this.app.onHeroDestroy.dispatch()
                this.guiContainer.updateFuelText(0)
            }
        })

        this.app.onEnemyDestroy.add(() => {
            this.app.playerConfig.score += 15
            this.guiContainer.updateScoreText(this.app.playerConfig.score)
        })

        this.app.onHeroDestroy.add(() => {
            this.app.playerConfig.lives -= 1
            const { hero } = this.heroContainer
            this.explosion(hero.x, hero.y)
            if (this.app.playerConfig.lives > 0) {
                this.guiContainer.updateLivesText(this.app.playerConfig.lives)
                hero.refresh()
            } else {
                this.guiContainer.updateLivesText(0)
                hero.renderable = false
                if(!this.gameFinished) {
                    this.gameOver()
                }
            }
        })
        this.initialize = true
    }

    /**
     * showing containers
     */
    start() {
        if (!this.initialize) this.init()
        const { lives, fuel } = this.app.playerConfig
        this.backgroundContainer.draw()
        this.heroContainer.draw()
        const { hero } = this.heroContainer
        this.enemyContainer.draw(this.heroContainer.hero)
        this.guiContainer.draw(lives, fuel)

        this.decreaseHeroFuel(hero)
    }

    decreaseHeroFuel(hero) {
        this.fuelInterval = setInterval(() => {
            if (hero.isActive) {
                this.app.onFuelTaken.dispatch(-1)
            }
        }, 1150);
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

    gameOver() {
        clearInterval(this.fuelInterval)
        this.gameFinished = true
        saveGame(this.app.playerConfig)
        this.finishPopup = new Popup(this.centerX, this.centerY)
        this.finishPopup.show(`Game Over\nYour score: ${this.app.playerConfig.score}`)
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
        this.initialize = false
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
    }
}