
class MainWindow extends Phaser.Scene {
    constructor() {
        super('MainWindow');
    }

    preload(){

        this.load.image(
            'one',
            './assets/one.png?v=0.0.1',
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

export const gameSize = {
    width: 1080,
    height: 796,
}


const config = {
    type: Phaser.AUTO,
    parent: prov,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        // Or set parent divId here
        width: 1080,
        height: 796,
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