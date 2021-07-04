const clearObject = (objArray, enemy = false) => {
    while (objArray.length) {
        let child = objArray.pop()
        if (enemy) child.remove()
        child.destroy()
        child = null
    }
} 
export default clearObject