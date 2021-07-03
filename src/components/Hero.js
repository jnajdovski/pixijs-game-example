import { Sprite } from '@pixi/sprite'
import { Texture } from 'pixi.js';

class Hero extends Sprite {
    constructor(x, y) {
        super(Texture.from('plane'))
        this.x = x
        this.y = y
        this.anchor.set(.5)
        this.interactive = true
        this.on('mousedown', this.onDragStart)
        .on('mouseup', this.onDragEnd)
        .on('mouseupoutside', this.onDragEnd)
        .on('mousemove', this.onDragMove)
    }

    onDragStart(event) {
        this.data = event.data;
        this.dragging = true;
    }

    onDragEnd() {
        this.dragging = false;
        this.data = null;
    }
    
    onDragMove() {
        if (this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);
            this.position.x = newPosition.x >= 1280 ? 1280 : newPosition.x;
            this.position.y = newPosition.y >= 450 ? 450 : newPosition.y;
        }
    }
}

export default Hero