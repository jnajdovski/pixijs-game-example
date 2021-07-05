import Button from './Button'
import { Sprite, Text, Texture } from "pixi.js";
import signals from 'signals';
import clearObject from '../helpers/clearObject';

class Popup extends Sprite {
    constructor(centerX, centerY) {
        super(Texture.from('popup'))
        this.x = centerX
        this.y = centerY
        this.anchor.set(.5)
        this.renderable = false
        this.onButtonClicked = new signals()
    }

    /**
     * creating message on the popup
     * @param {String} message 
     */
    show(message) {
        this.renderable = true
        let text = new Text(message, {fontFamily : 'Arial', fontSize: 34, fill : 0xffffff, align : 'center', strokeThickness: 4})
        text.x = 0
        text.y = -35
        text.anchor.set(.5)
        this.addChild(text)

        let button = new Button('button_ok', 0, 49)
        button.onClick.add(() => {
            this.onButtonClicked.dispatch()
        })
        this.addChild(button)
    }

    /**
     * destroying all elements
     */
    remove() {
        clearObject(this.children)
        this.destroy(true)
    }
}

export default Popup