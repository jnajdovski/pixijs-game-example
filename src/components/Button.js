import * as PIXI from 'pixi.js'
import signals from 'signals'

/**
 * Button Class that returns interactive sprite
 */

export default class Button extends PIXI.Sprite.from {
    /**
     * 
     * @param {String} texture 
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor (texture, x, y) {
        super(texture)
        this.x = x
        this.y = y
        this.anchor.set(.5)
        this.interactive = true
        this.onClick = new signals()
        this.on('click', () => this.onClick.dispatch());
    }
}