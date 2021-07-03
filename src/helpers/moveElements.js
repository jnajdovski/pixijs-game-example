const moveElements = (elementsToMove, direction = 'down', speed = 10) => {
    if (Array.isArray(elementsToMove)) {
        for (let el of elementsToMove) {
            if (direction == 'down') {
                el.y += speed
            } else if(direction == 'left') {
                el.x -= speed
            }
        }
    } else {
        if (direction == 'down') {
            elementsToMove.y += speed
        } else if(direction == 'left') {
            elementsToMove.x -= speed
        }
    }
}
export default moveElements