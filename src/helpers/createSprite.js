import * as PIXI from 'pixi.js'

/**
 * 
 * @param {String} texture 
 * @param {Number} x 
 * @param {Number} y 
 * @returns {PIXI.Sprite} sprite
 */
function createSprite(texture, x, y) {
    let sprite = new PIXI.Sprite.from(texture);
    sprite.x = x;
    sprite.y = y;
    sprite.anchor.set(0.5);
    return sprite;
}

export default createSprite