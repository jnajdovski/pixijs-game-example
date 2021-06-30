
import * as PIXI from 'pixi.js'
import { SceneManager } from 'pixi-scenes'
import Boot from './scenes/Boot'
import Menu from './scenes/Menu'
import Game from './scenes/Game'
import Score from './scenes/Score'

const app = new PIXI.Application({ resizeTo: window })
document.body.appendChild(app.view)

const scene = new SceneManager(app)
scene.add('boot', new Boot())
scene.add('menu', new Menu())
scene.add('game', new Game())
scene.add('score', new Score())

app.loader.add('background', './assets/background.jpg')
app.loader.load(() => {
	const sprite = PIXI.Sprite.from('background')
	sprite.anchor.set(0.5) 
	app.stage.addChild(sprite)

	sprite.x = app.screen.width * 0.5
	sprite.y = app.screen.height * 0.5
	
    setTimeout(()=>{
        scene.start('boot')
    }, 2000)
})