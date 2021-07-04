/**
 * 
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

const saveGame = (playerConfig) => {
    const { highScore, score } = playerConfig
    sortHighScoreArray(highScore, score)
    console.log(highScore);
    window.localStorage.setItem('high-score', JSON.stringify(highScore))
}

export default saveGame