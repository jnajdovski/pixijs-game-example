import { Sprite } from "pixi.js"

/**
 * Functiont that changes the position of given elements by given direction and speed
 * @param {Array<Sprite>} elementsToMove
 * @param {String} direction 
 * @param {Number} speed 
 */
const moveElements = (elementsToMove, direction = 'down', speed = 10) => {
    if(elementsToMove.length == 0) return

    for (let el of elementsToMove) {
        if (direction == 'down') {
            el.y += speed
        } else if(direction == 'left') {
            el.x -= speed
        }
    }
}
export default moveElements