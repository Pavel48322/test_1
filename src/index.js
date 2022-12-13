import Phaser, {Scale} from 'phaser';
import { MainWindow } from './scenes/MainWindow';
import LasersOlvera from "./scenes/classes/LasersOlvera";
import LasersYouWin from "./scenes/classes/LasersYouWin";
import LasersLogo from "./scenes/classes/LasersLogo";
import LasersLogoUltimate from "./scenes/classes/LasersLogoUltimate";

export const gameSize = {
    width: 1080,
    height: 796,
}


const config = {
    type: Phaser.AUTO,
    parent: 'GoldRush',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
        width: gameSize.width,
        height: gameSize.height,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        },
    },
    //--------------------------------------------------------------------------------
    // При работе с шейдерами дает сбой (шейдеры не работают при включеном параметре)
    // render: {
    //     //  A custom batch size of 1024 quads
    //     batchSize: 512,
    //     antialiasGL: false,
    // },
    //--------------------------------------------------------------------------------
    pipeline: { LasersOlvera, LasersYouWin, LasersLogo, LasersLogoUltimate },
    scene: [MainWindow]
};

export const game = new Phaser.Game(config);