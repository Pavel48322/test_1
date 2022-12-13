
class MainWindow extends Phaser.Scene {
    constructor() {
        super('MainWindow');
    }

    preload(){

        this.load.image(
            'one',
            './assets/one.png?v=0.0.2',
        );


    }

    create(){

        this.add
        .image(
            document.documentElement.clientWidth/ 2,
            0,
            'one'
        ).setOrigin(0.5, 0)
        .setScale(0.35)

        }
}

export const gameSize = {
    width: document.documentElement.clientWidth,
    height: window.screen.availHeight,
}


const config = {
    type: Phaser.AUTO,
    parent: prov,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        // Or set parent divId here
        width: document.documentElement.clientWidth,
        height: window.screen.availHeight,
    },
    //--------------------------------------------------------------------------------
    // При работе с шейдерами дает сбой (шейдеры не работают при включеном параметре)
    // render: {
    //     //  A custom batch size of 1024 quads
    //     batchSize: 512,
    //     antialiasGL: false,
    // },
    //--------------------------------------------------------------------------------
    scene: [MainWindow]
};

const game = new Phaser.Game(config);