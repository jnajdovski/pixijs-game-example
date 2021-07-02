import { Scene } from "pixi-scenes";
import * as PIXI from 'pixi.js'

export default class Boot extends Scene {
    init () {
        this.loader = new PIXI.Loader();
    }

    start() {
        this.loadAssets();
        this.loader.load();
        this.loader.onComplete.add(this.finishLoading, this);
    }

    /**
     * Add all assets to the loader to be loaded
     */
    loadAssets() {
        //menu assets
        this.loader.add('background', './assets/menu/background.jpg');
        this.loader.add('button_start', './assets/menu/button-start.png');
        this.loader.add('button_score', './assets/menu/button-score.png');

        //load hero assets
        this.loader.add('plane', './assets/hero/plane.png');
        this.loader.add('plane_bomb', './assets/hero/bomb.png');

        //load background assets
        this.loader.add('cloud', './assets/background/cloud.png');
        this.loader.add('sky', './assets/background/sky.jpg');
        this.loader.add('land', './assets/background/land.png');
        this.loader.add('mountains', './assets/background/mountains.png');
        this.loader.add('gasoline_tank', './assets/background/gasoline.png');
        this.loader.add('falling_bomb', './assets/background/bomb.png');

        //load enemy assets
        this.loader.add('tank', './assets/enemy/tank.png');
        this.loader.add('tank_bullet', './assets/enemy/bullet.png');
    }

    /**
     * When loading is finished the "menu" scene will be started
     */
    finishLoading() {
        this.scenes.start('menu');
    }
}