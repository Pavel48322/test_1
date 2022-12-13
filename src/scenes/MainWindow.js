import AnimCoins from "./classes/AnimCoins";

export class MainWindow extends Phaser.Scene {
    constructor() {
        super('MainWindow');
    }

    preload(){

        this.load.image(
            'one',
            'src/assets/one.png',
        );


    }

    create(){

        this.add
        .image(
            0,
            0,
            'one'
        ).setOrigin(0)

        }
}