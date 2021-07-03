function checkCollision(obj1, obj2) {
    var ab = obj1.getBounds();
    var bb = obj2.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

export default checkCollision