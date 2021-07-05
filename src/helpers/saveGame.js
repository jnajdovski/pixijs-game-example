/**
 * adding current score to the array of high scores,
 * sorting of the array and leaves only ten high scores in the array 
 * @param {Array} highScore 
 * @param {Number} score 
 */
const sortHighScoreArray = (highScore, score) => {
    highScore.push(score)
    highScore = highScore.sort((a, b) => b - a)
    if (highScore.length > 10) {
        highScore.splice(10)
    }
}

/**
 * localy saving the players high scores
 * @param {Object} playerConfig 
 */
const saveGame = (playerConfig) => {
    const { highScore, score } = playerConfig
    sortHighScoreArray(highScore, score)
    window.localStorage.setItem('high-score', JSON.stringify(highScore))
}

export default saveGame