import { Application } from '@pixi/app'
import { Renderer } from '@pixi/core'
import { BatchRenderer } from '@pixi/core' 
import { Sprite } from '@pixi/sprite'
import { TickerPlugin } from '@pixi/ticker'
import { AppLoaderPlugin } from '@pixi/loaders'

Renderer.registerPlugin('batch', BatchRenderer)
Application.registerPlugin(TickerPlugin)
Application.registerPlugin(AppLoaderPlugin)

const app = new Application({ resizeTo: window })
document.body.appendChild(app.view)

app.loader.add('logo', './assets/logo.png')
app.loader.load(() => {
	const sprite = Sprite.from('logo')
	sprite.anchor.set(0.5) 
	app.stage.addChild(sprite)

	sprite.x = app.screen.width * 0.5
	sprite.y = app.screen.height * 0.5

	app.ticker.add(delta => {
		sprite.rotation += 0.02 * delta
	})
})