/**
 * destroying all elements of the given array
 * @param {Array} objArray 
 * @param {boolean} enemy 
 */
const clearObject = (objArray, enemy = false) => {
    while (objArray.length) {
        let child = objArray.pop()
        if (enemy) child.remove()
        child.destroy()
        child = null
    }
} 
export default clearObject