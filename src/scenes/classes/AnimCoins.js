import { gameSize } from "../..";
import LasersOlvera from "../classes/LasersOlvera"
import LasersYouWin from "../classes/LasersYouWin"
import LasersLogo from "../classes/LasersLogo"
import LasersLogoUltimate from "../classes/LasersLogoUltimate"


 /* Этот класс нужен для запуска анимации */
 class AnimatedParticle extends Phaser.GameObjects.Particles.Particle {
    constructor(emitter) {
      super(emitter);
  
      // Set in emitCallback
      this.anim = null;
      this.t = 0;
      this.i = 0;
    }
  
    update(delta, step, processors) {
      const result = super.update(delta, step, processors);
  
      this.t += delta;
  
      if (this.t >= this.anim.msPerFrame) {
        this.i++;
  
        if (this.i >= this.anim.getTotalFrames()) {
          this.i = 0;
        }
  
        this.frame = this.anim.frames[this.i].frame;
  
        this.t -= this.anim.msPerFrame;
      }
  
      return result;
    }
}



export default class AnimCoins {
    constructor(scene) {
        this.scene = scene;

        /*this.bigWinParam = {
            symbolNames: ['b','i','g','w','i','n','!'],
            symbolStartX: [330,395,470,630,710,785,855],
            symbolEndY: [550,540,530,520,510,505,500],
            scales: [[5,12], [3,12], [5,12], [8,12], [3,12], [4,12],[3,12]]
        }

        this.createAnims();
        this.createBigWin();

        this.createFirework();


        this.createAnimDrops();*/

        // this.points = [];
        // this.pointsOlvera = [];
        // this.pointsYouWon = [];
        // this.pointsPressToStart = [];

        // this.createAnimOlvera()

        // this.createAnimFreeSpinText();
        // this.createLogo()
        // this.createTransitionDoor()
        this.prov()
        // this.createYouWin();
        // this.createAnimPressToStart()
        // this.createAnimDrops()
        this.scene.input.keyboard.on("keyup-J", () => {
            this.startTransitionDoor()
            // this.startDrops()
            // this.startFreeSpinText(false)
            // this.startOlvera()
            // this.startYouWin();
            // this.startPressToStartFirst()
            // this.startPressToStartSecond()
            // this.startLogo()
        });

        this.scene.input.keyboard.on("keyup-K", () => {
            // this.stopLogo()
            // this.stopPressToStartSecond()
            // this.stopOlvera();
            // this.stopYouWin()
            // this.stopPressToStartFirst()
        });

    }

    prov() {

    }

    //Получаем наше число + процент
    percentageOfNumber(mainNumber, percent) {
        return mainNumber + (mainNumber / 100 * percent)
    }

    //====================================== Создание анимации transitionDoorAnim ===================================================
    createTransitionDoor() {
        const transitionDoorParam = {
            x: 0, // Положение по оси X
            y: 0, // Положение по оси Y
            width: 500, // Ширина анимации
            height: 500, // Высота анимации
            scale: {
                x: 0.5,
                y: 0.5,
            },
            origin: { // Положение якоря (точка отсчета координат)
                x: 0,
                y: 0,
            },
            scaleText: {
                x: 0.55,
                y: 0.55,
            },
            originText: { // Положение якоря (точка отсчета координат)
                x: 0.5,
                y: 0.5,
            },
            heightCropDoor: 3.12,
        }

        this.transitionDoor = this.scene.add
            .image(
                transitionDoorParam.x,
                transitionDoorParam.y,
                'transitionDoor'
            )
            .setScale(
                transitionDoorParam.scale.x,
                transitionDoorParam.scale.y,
            )
            .setOrigin(
                transitionDoorParam.origin.x,
                transitionDoorParam.origin.y
            ).setVisible(false)

        this.transitionText = this.scene.add
            .image(
                (transitionDoorParam.x + (this.transitionDoor.width * transitionDoorParam.scale.x)/2),
                (this.transitionDoor.height * transitionDoorParam.scale.y / transitionDoorParam.heightCropDoor * 0.5) - 20,
                'transitionText'
            )
            .setScale(
                transitionDoorParam.scaleText.x,
                transitionDoorParam.scaleText.y,
            )
            .setOrigin(
                transitionDoorParam.originText.x,
                transitionDoorParam.originText.y
            ).setDepth(10)
            .setVisible(false)
        
        var transitionDoorParticles = this.scene.add.particles('white');

        this.transitionDoorEmitter = transitionDoorParticles.createEmitter({
            x: { min: transitionDoorParam.x, max: (this.transitionDoor.width * transitionDoorParam.scale.x) + transitionDoorParam.x },
            y: 0,
            lifespan: 1000,
            alpha: 1,
            speedY: { min: 600, max: 800 },
            scale: { min: 0.06, max: 0 },
            quantity: 8,
            blendMode: 'SCREEN'
        }).stop()

        this.transitionDoorTextEmitter = transitionDoorParticles.createEmitter({
            x: { min: (this.transitionText.x - this.transitionText.width * 0.5) + 100, max: (this.transitionText.width * 0.5 + this.transitionText.x) - 100 },
            y: { 
                min: ((this.transitionDoor.height * transitionDoorParam.scale.y - ((this.transitionDoor.height * transitionDoorParam.scale.y / transitionDoorParam.heightCropDoor * 0.5))) - this.transitionText.height * 0.5) + 30, 
                max: (this.transitionText.height * 0.5 + this.transitionDoor.height * transitionDoorParam.scale.y - ((this.transitionDoor.height * transitionDoorParam.scale.y / transitionDoorParam.heightCropDoor * 0.5) + 20)) - 50 
            },
            lifespan: 4000,
            alpha: 1,
            speed: 40,
            gravityY: -400,
            scale: { min: 0.02, max: 0 },
            maxParticles: 9000,
            quantity: 1000,
            blendMode: 'NORMAL',
            tint: 0xB9AD61,
        }).stop()

        this.transitionDoor.setY(-((this.transitionDoor.height * transitionDoorParam.scale.y) - ((this.transitionDoor.height * transitionDoorParam.scale.y) / transitionDoorParam.heightCropDoor)))

        this.transitionDoorAnim = this.scene.tweens 
            .add({
                targets: this.transitionDoor,
                y: {from: this.transitionDoor.y, to: 0},
                duration: 1100, 
                completeDelay: 300,
                onComplete:() => {
                    this.scene.tweens 
                        .add({
                            targets: this.transitionDoor,
                            y: {from: 0, to: -this.transitionDoor.height * transitionDoorParam.scale.y},
                            duration: 1050, 
                        });
                    this.scene.tweens 
                        .add({
                            targets: this.transitionText,
                            y: {from: (this.transitionDoor.height * transitionDoorParam.scale.y - ((this.transitionDoor.height * transitionDoorParam.scale.y / transitionDoorParam.heightCropDoor * 0.5) + 20)) , to: -((this.transitionDoor.height * transitionDoorParam.scale.y / transitionDoorParam.heightCropDoor * 0.5) + 20)},
                            duration: 1050, 
                        })
                    this.scene.tweens 
                        .add({
                            targets: this.transitionText,
                            alpha: {from: 1, to: 0},
                            duration: 400, 
                        })
                    this.scene.tweens 
                        .add({
                            targets: this.transitionDoorTextEmitter.alpha,
                            propertyValue: {from: 1, to: 0 },
                            duration: 1050, 
                            onComplete:() =>{
                                this.transitionDoorTextEmitter.stop().killAll();
                            }
                        })
                }
            }).stop()

        this.transitionTextAnim = this.scene.tweens 
            .add({
                targets: this.transitionText,
                y: {from: this.transitionText.y, to: (this.transitionDoor.height * transitionDoorParam.scale.y - ((this.transitionDoor.height * transitionDoorParam.scale.y / transitionDoorParam.heightCropDoor * 0.5) + 20))},
                duration: 1100, 
                onComplete: () => {
                    this.scene.tweens.add({
                        targets: this.transitionDoorEmitter.alpha,
                        duration: 200,
                        propertyValue: {from: 1, to: 0},
                        onComplete:() =>{
                            this.transitionDoorEmitter.stop().killAll();
                        }
                    });
                    this.transitionDoorTextEmitter.alive = [];
                    this.transitionDoorTextEmitter.dead = [];
                    this.transitionDoorTextEmitter.start()
                    this.transitionDoorTextEmitter.setSpeed(40);
                    this.scene.tweens 
                        .add({
                            targets:this.transitionDoorTextEmitter,
                            speed: {from: 40, to: 0 },
                            duration: 100, 
                        })
                    this.scene.tweens 
                        .add({
                            targets:this.transitionDoorTextEmitter.alpha,
                            propertyValue: {from: 0, to: 1 },
                            duration: 300, 

                        })
                }
            }).stop()

        this.transitionParticlesAnim = this.scene.tweens 
            .add({
                targets:this.transitionDoorEmitter.y,
                propertyValue: {
                    from: 0,
                    to: this.transitionDoor.height * transitionDoorParam.scale.y,
                },
                duration: 1600, 
            }).stop()
// ------------------------------------------------------------------------------------------------
        // this.transitionDoorAnimSptite = this.scene.add
        //     .sprite(            
        //         600,
        //         0,
        //         "transitionDoorAnim"
        //     )
        //     .setOrigin(
        //         transitionDoorParam.origin.x,
        //         transitionDoorParam.origin.y
        //     )
        //     .stop()
// ------------------------------------------------------------------------------------------------
    }
    startTransitionDoor() {
        this.transitionText.setAlpha(1).setVisible(true)
        this.transitionDoor.setVisible(true)
        this.transitionDoorAnim.play()
        this.transitionTextAnim.play()
// ------------------------------------------------------------------------------------------------
        // this.transitionDoorAnimSptite.play('transitionDoor')
// ------------------------------------------------------------------------------------------------
        this.transitionParticlesAnim.play()
        this.transitionDoorEmitter.alpha.propertyValue = 1;
        this.transitionDoorEmitter.alive = [];
        this.transitionDoorEmitter.dead = [];
        this.transitionDoorEmitter.start()
    }

    stopTransitionDoor() {
        this.transitionDoor.setVisible(false)
        this.transitionText.setVisible(false)
        this.transitionDoorEmitter.stop().killAll();
        this.transitionDoorTextEmitter.stop().killAll();

    }
    //====================================== Создание анимации Logo ===================================================
    createLogo() {
        const logoParam = {
            x: 600, // Положение по оси X
            y: 400, // Положение по оси Y
            width: 500, // Ширина анимации
            height: 500, // Высота анимации
            scale: {
                x: 1,
                y: 1,
            },
            origin: { // Положение якоря (точка отсчета координат)
                x: 0.5,
                y: 0.5,
            },
        }
        this.arrLogo = []
        
        const logoTextHeader = this.scene.add
            .image(
                logoParam.x,
                logoParam.y,
                'logoTextHeader'
            )
            .setScale(
                this.percentageOfNumber(logoParam.scale.x, -30),
                this.percentageOfNumber(logoParam.scale.y, -30),
            )
            .setOrigin(
                logoParam.origin.x,
                logoParam.origin.y
            );
        const logoFrame = this.scene.add
            .image(
                logoParam.x,
                logoParam.y,
                'logoFrame'
            )
            .setScale(
                this.percentageOfNumber(logoParam.scale.x, -30),
                this.percentageOfNumber(logoParam.scale.y, -30),
            )
            .setOrigin(
                logoParam.origin.x,
                logoParam.origin.y
            );
        const logoText = this.scene.add
            .image(
                logoParam.x,
                logoParam.y,
                'logoText'
            )
            .setScale(
                this.percentageOfNumber(logoParam.scale.x, -30),
                this.percentageOfNumber(logoParam.scale.y, -30),
            )
            .setOrigin(
                logoParam.origin.x,
                logoParam.origin.y
            );
        const logoFireLink = this.scene.add
            .image(
                logoParam.x,
                logoParam.y,
                'logoFireLink'
            )
            .setScale(
                this.percentageOfNumber(logoParam.scale.x, -30),
                this.percentageOfNumber(logoParam.scale.y, -30),
            )
            .setOrigin(
                logoParam.origin.x,
                logoParam.origin.y
            );
        const logoGlow = this.scene.add
            .image(
                logoParam.x,
                logoParam.y,
                'logoGlow'
            )
            .setScale(
                logoParam.scale.x,
                logoParam.scale.y
            )
            .setOrigin(
                logoParam.origin.x,
                logoParam.origin.y
            ).setAlpha(0.3)

        this.arrLogo.push(logoTextHeader, logoFrame, logoText, logoFireLink, logoGlow)
        this.arrLogo[2].setPostPipeline(LasersLogo);
        this.arrLogo[0].setPostPipeline(LasersLogoUltimate);

        let isStartLogo = false;
        this.logoGlowAnim = this.scene.tweens 
            .add({
                targets: [this.arrLogo[4]],
                alpha: {from: 0.3, to: 1},
                duration: 1750,
                yoyo: true,
                onUpdate: (tween) => { 
                    if ((tween.progress > 0.29 && tween.progress < 0.3) && !isStartLogo) {
                    this.arrLogo[2].postPipelines[0].startAnim()
                        isStartLogo = true
                    }   
                },
                onComplete: () => {
                    isStartLogo = false
                },          
            }).stop()
// ------------------------------------------------------------------------------------------------
        // this.prov = this.scene.add
        //     .sprite(            
        //         logoParam.x+ 30,
        //         800,
        //         "logoAnim"
        //     )
        //     .setOrigin(
        //         logoParam.origin.x,
        //         logoParam.origin.y
        //     )
// ------------------------------------------------------------------------------------------------
    }

    startLogo() {
        this.arrLogo.forEach(item => item.setVisible(true).setAlpha(1))
        const startAnim = () => {
            this.logoGlowAnim.play();
            this.arrLogo[0].postPipelines[0].startAnim()
        }
        startAnim()
        this.logoTimer = this.scene.time.addEvent({
            delay: 15000,
            callback: () => { 
                startAnim() 
            },
            loop: true,
        })
    }

    stopLogo() {
        this.arrLogo.forEach(item => item.setVisible(false))
        this.arrLog[4].setAlpha(0.3)
        this.arrLogo[0].postPipelines[0].stopAnim();
        this.arrLogo[2].postPipelines[0].stopAnim();
        this.logoTimer && this.logoTimer.destroy();
        this.logoTimer = null;
        this.logoGlowAnim && this.logoGlowAnim.stop()
    }
    //=========================================================================================


    //====================================== Создание анимации PressToStartFirst ===================================================

    createAnimPressToStart() {
        this.arrPressToStart = []
        const pressToStart = {
            x: gameSize.height/2, // Положение по оси X
            y: 300, // Положение по оси Y
            width: 500, // Ширина анимации
            height: 500, // Высота анимации
            scale: {
                x: 0.9,
                y: 0.7,
            }, // Масштаб анимации
            origin: { // Положение якоря (точка отсчета координат)
                x: 0.5,
                y: 0.5,
            },
        }

        const red = this.scene.add
            .image(
                pressToStart.x + (2 * pressToStart.scale.x),
                pressToStart.y + (7 * pressToStart.scale.y),
                'pressToStartRed'
            )
            .setScale(
                pressToStart.scale.x,
                pressToStart.scale.y,
            )
            .setOrigin(
                pressToStart.origin.x,
                pressToStart.origin.y
            );
        const main = this.scene.add
            .image(
                pressToStart.x,
                pressToStart.y,
                'pressToStartMain'
            )
            .setScale(
                pressToStart.scale.x,
                pressToStart.scale.y,
            )
            .setOrigin(
                pressToStart.origin.x,
                pressToStart.origin.y
            );
        const framing = this.scene.add
            .image(
                pressToStart.x - (2 * pressToStart.scale.x),
                pressToStart.y + (3 * pressToStart.scale.y),
                'pressToStartFraming'
            )
            .setScale(
                pressToStart.scale.x,
                pressToStart.scale.y,
            )
            .setOrigin(
                pressToStart.origin.x,
                pressToStart.origin.y
            );
        const pressText = this.scene.add
            .image(
                pressToStart.x + (2 * pressToStart.scale.x),
                pressToStart.y - (110 * pressToStart.scale.y),
                'pressToStartPressText'
            )
            .setScale(
                pressToStart.scale.x,
                pressToStart.scale.y,
            )
            .setOrigin(
                pressToStart.origin.x,
                pressToStart.origin.y
            );
        const toStartText = this.scene.add
            .image(
                pressToStart.x + (2 * pressToStart.scale.x),
                pressToStart.y,
                'pressToStartToStartText'
            )
            .setScale(
                pressToStart.scale.x,
                pressToStart.scale.y,
            )
            .setOrigin(
                pressToStart.origin.x,
                pressToStart.origin.y
            );
        const freeGamesText = this.scene.add
            .image(
                pressToStart.x + (4 * pressToStart.scale.x),
                pressToStart.y + (75 * pressToStart.scale.y),
                'pressToStartFreeGamesText'
            )
            .setScale(
                pressToStart.scale.x,
                pressToStart.scale.y,
            )
            .setOrigin(
                pressToStart.origin.x,
                pressToStart.origin.y
            );
        this.arrPressToStart.push(red, main, framing, pressText, toStartText, freeGamesText)
        // this.arrPressToStart.forEach(item => item.setVisible(false))

        this.pressTextAnim = this.scene.tweens
            .add({
                targets: this.arrPressToStart[3],
                scaleX: {from: pressToStart.scale.x, to: this.percentageOfNumber(pressToStart.scale.x, 5)},
                scaleY: {from: pressToStart.scale.y, to: this.percentageOfNumber(pressToStart.scale.y, 5)},
                duration: 200,
                yoyo: true,
                onUpdate: (tween) => { 
                    if (tween.progress > 0.2 && tween.progress < 0.22) {
                        this.toStartTextAnim = this.scene.tweens 
                        .add({
                            targets: this.arrPressToStart[4],
                            scaleX: {from: pressToStart.scale.x, to: this.percentageOfNumber(pressToStart.scale.x, 5)},
                            scaleY: {from: pressToStart.scale.y, to: this.percentageOfNumber(pressToStart.scale.y, 5)},
                            duration: 200,
                            yoyo: true,
                            onUpdate: (tweenToStart) => {
                                if (tweenToStart.progress > 0.2 && tweenToStart.progress < 0.22) {
                                    this.freeGamesTextAnim = this.scene.tweens 
                                        .add({
                                            targets: this.arrPressToStart[5],
                                            scaleX: {from: pressToStart.scale.x, to: this.percentageOfNumber(pressToStart.scale.x, 5)},
                                            scaleY: {from: pressToStart.scale.y, to: this.percentageOfNumber(pressToStart.scale.y, 5)},
                                            duration: 200,
                                            yoyo: true,
                                        });
                                }
                            },
                        });
                    }                    
                },
            }).stop()
        
        
        // анимации для PressToStartSecond    ----------------------------------------------------------------
            this.pressToStartAlphaAnim = this.scene.tweens 
                .add({
                    targets: [this.arrPressToStart[0], this.arrPressToStart[1], this.arrPressToStart[2], this.arrPressToStart[3], this.arrPressToStart[4], this.arrPressToStart[5]],
                    alpha: {from: 1, to: 0},
                    duration: 500,
                }).stop()

            this.scaleTextPressToStart = this.scene.tweens 
                .add({
                    targets: [this.arrPressToStart[3], this.arrPressToStart[4], this.arrPressToStart[5]],
                    scaleX: {from: pressToStart.scale.x, to: this.percentageOfNumber(pressToStart.scale.x, 2)},
                    scaleY: {from: pressToStart.scale.y, to: this.percentageOfNumber(pressToStart.scale.y, 2)},
                    duration: 200,
                }).stop()
            this.scaleFramingPressToStart = this.scene.tweens 
                .add({
                    targets: [this.arrPressToStart[2]],
                    scaleX: {from: pressToStart.scale.x, to: this.percentageOfNumber(pressToStart.scale.x, -3)},
                    scaleY: {from: pressToStart.scale.y, to: this.percentageOfNumber(pressToStart.scale.y, -3)},
                    duration: 50,
                    hold: 50,
                    yoyo: true,
                    onComplete: () => {
                        this.scene.tweens 
                            .add({
                                targets: [this.arrPressToStart[2]],
                                scaleX: {from: pressToStart.scale.x, to: this.percentageOfNumber(pressToStart.scale.x, 10)},
                                scaleY: {from: pressToStart.scale.y, to: this.percentageOfNumber(pressToStart.scale.y, 10)},
                                yoyo: true,
                                duration: 40,
                                repeat: 3,
                            })
                    }
                }).stop()
        // -------------------------------------------------------------------
        // ========= Функция создания анимации перемещения по пути =========
        const createAnimStarPath = (points) => {
            points.forEach((item, ind) => {
                if (ind % 2 === 0) {
                    points[ind] = item * pressToStart.scale.x
                } else {
                    points[ind] = item * pressToStart.scale.y
                }
            })
            let star = new Phaser.Curves.Spline(points);

            let starTexture = this.scene.add // Создаем звезду
                .follower(
                    star,
                    pressToStart.x + (points[0] - (this.arrPressToStart[2].width * pressToStart.scale.x) * pressToStart.origin.x),
                    pressToStart.y + (points[1] - (this.arrPressToStart[2].height * pressToStart.scale.y) * pressToStart.origin.y),
                    'star'
                )
                .setVisible(false)
                .setScale(1 * pressToStart.scale.x, 1 * pressToStart.scale.y);
            
            let animStart = this.scene.tweens // Создаем анимацию появления звезды
                .add({
                    targets: starTexture,
                    alpha: {from: 0, to: 1},
                    duration: 10,
                })
                .stop(0);

            let animOut = this.scene.tweens // Создаем анимацию исчезновения звезды
                .add({
                    targets: starTexture,
                    alpha: {from: 1, to: 0},
                    duration: 100,
                    onComplete: () => {
                        starTexture.setVisible(false);
                    }
                });

            starTexture.startFollow({ // Создаем анимацию движения звезды
                duration: 600,
                // repeat: -1,
                rotateToPath: false,
                verticalAdjust: true,
                onUpdate: (tween,value) => {
                    if ( // Если анимация только началась то раскрываем ее
                        value.value === 0.0
                        && !animStart.isPlaying()
                    ){
                        starTexture.setVisible(true);
                        animStart.play();

                    }
                    if ( // Если анимация подходит к завершению скрываем ее
                        value.value > 0.9
                        && value.value < 0.99 + 0.01
                        && !animOut.isPlaying()
                    ) {
                        animOut.play();
                    }
                },
                onStop: () => {
                    animOut.isPlaying() && animOut.stop(0)
                    animStart.isPlaying() && animStart.stop(0);
                    starTexture.setVisible(false);
                }
            });
            starTexture.pathTween.stop(0);

            return starTexture;
        };
        // =================================================================

        // ============ Создание пути следования нижней звезды =============
        let pointsSB = [
            183, 14, 242, 27, 289, 10, 354, 74,
            325, 144, 356, 235, 359, 286, 328,
            342, 237, 367, 183, 390
        ];

        this.starAnimBottomPressToStart = createAnimStarPath(pointsSB);
        // =================================================================

        // ============ Создание пути следования нижней звезды =============
        let pointsSH = [
            183, 14, 127, 27, 76, 10, 14, 74,
            42, 144, 11, 235, 13, 286, 57,
            342, 150, 367, 183, 390
        ];

        this.starAnimHeaderPressToStart = createAnimStarPath(pointsSH);
        // =================================================================

        // // ======== Создание линий отображающих путь ==========
        // let graphics = this.scene.add.graphics();

        // graphics.fillStyle(0x00ff00, 1);

        // for (let i = 0; i <  this.starAnimHeaderPressToStart.points.length; i++)
        // {
        //     graphics.fillCircle(
        //         pressToStart.x +  this.starAnimHeaderPressToStart.points[i].x,
        //         pressToStart.y +  this.starAnimHeaderPressToStart.points[i].y,
        //         4
        //     );
        // }
        // // // ====================================================

        // this.pointsPressToStart = pointsSH;
        // this.scene.input.on('pointerup', (pointer) => {
        //     this.starAnimHeaderPressToStart.addPoint(pointer.x  - gameSize.width / 2, pointer.y)

        //     graphics.lineStyle(3, 0xe0e00e7,1);
        //     // graphics.fillStyle(0x00ff00, 1);
        //     graphics.fillCircle(
        //         pointer.x,
        //         pointer.y,
        //         4
        //     );

        //     this.pointsPressToStart.push(+(pointer.x - gameSize.width / 2).toFixed(0))
        //     this.pointsPressToStart.push(+(pointer.y).toFixed(0))
        //     console.log(this.pointsPressToStart)
        // });
// ------------------------------------------------------------------------------------------------
        // this.scene.add
        //     .sprite(            
        //         400,
        //         800,
        //         "pressToStartFirstAnim"
        //     )
        //     .play('pressToStartFirst')
        // this.scene.add
        //     .sprite(            
        //         800,
        //         800,
        //         "pressToStartSecondAnim"
        //     )
        //     .play('pressToStartSecond')
// ------------------------------------------------------------------------------------------------
    }

    startPressToStartFirst() {
        this.arrPressToStart.forEach(item => item.setVisible(true).setAlpha(1))
        const startAnim = () => {
            this.starAnimBottomPressToStart.pathTween.play();
            this.starAnimHeaderPressToStart.pathTween.play();
            this.pressTextAnim.play()
        }
        startAnim()
        this.pressToStartFirst = this.scene.time.addEvent({
            delay: 1400,
            callback: () => { 
                startAnim() 
            },
            loop: true,
        })
    }

    stopPressToStartFirst() {
        this.starAnimBottomPressToStart.pathTween.stop(0);
        this.starAnimHeaderPressToStart.pathTween.stop(0);
        this.pressTextAnim && this.pressTextAnim.stop()
        this.freeGamesTextAnim && this.freeGamesTextAnim.stop()
        this.toStartTextAnim && this.toStartTextAnim.stop()
        this.pressToStartFirst.destroy();
        this.pressToStartFirst = null;
    }

    startPressToStartSecond() {
        this.pressToStartAlphaAnim.play()
        this.scaleTextPressToStart.play()
        this.scaleFramingPressToStart.play()
    }

    stopPressToStartSecond() {
        this.pressToStartAlphaAnim && this.pressToStartAlphaAnim.stop()
        this.scaleTextPressToStart && this.scaleTextPressToStart.stop()
        this.scaleFramingPressToStart && this.scaleFramingPressToStart.stop()
    }

    //====================================== Создание анимации YouWon ===================================================
    createYouWin() {
        const youWinParam = {
            x: gameSize.width / 2, // Положение по оси X
            y: 0, // Положение по оси Y
            width: 500, // Ширина анимации
            height: 500, // Высота анимации
            scale: {
                x: 1,
                y: 1,
            }, // Масштаб анимации
            origin: { // Положение якоря (точка отсчета координат)
                x: 0.5,
                y: 0.5,
            },
        }
        
        this.youWinImg = this.scene.add
        .image(
            youWinParam.x,
            youWinParam.y,
            'youWin'
        )
        .setScale(
            youWinParam.scale.x,
            youWinParam.scale.y
        )
        .setOrigin(
            youWinParam.origin.x,
            youWinParam.origin.y
        );

        this.youWinImg.setPostPipeline(LasersYouWin);

// ------------------------------------------------------------------------------------------------
        // this.youWin = this.scene.add
        //     .sprite(            
        //         youWinParam.x + 38 - youWinParam.width * youWinParam.origin.x,
        //         youWinParam.y + 437 - youWinParam.height * youWinParam.origin.y, 
        //         "YouWinAnim"
        //     )
        //     .setScale(
        //         youWinParam.scale
        //     )
        //     .setOrigin(
        //         youWinParam.origin.x,
        //         youWinParam.origin.y
        //     )
        //     .play('YouWinAnim')
// ------------------------------------------------------------------------------------------------
    }

    startYouWin() {
        this.youWinImg.setVisible(true)
        this.youWinImg.postPipelines[0].startAnim()
    }

    stopYouWin() {
        this.youWinImg.setVisible(false)
    }
    //====================================== Создание анимации Olvera ===================================================

    createAnimOlvera() {
        this.scene.events.on("startStar", this.startStar, this); //Регистрация события начала звездочек на Olvera

        const olveraParam = {
            x: gameSize.width / 2, // Положение по оси X
            y: 300, // Положение по оси Y
            width: 500, // Ширина анимации
            height: 500, // Высота анимации
            scale: {
                x: 1,
                y: 1,
            },
            origin: { // Положение якоря (точка отсчета координат)
                x: 0.5,
                y: 0.5
            },
        }

        this.olveraImg = this.scene.add
            .image(
                olveraParam.x,
                olveraParam.y,
                'route66'
            )
            .setOrigin(
                olveraParam.origin.x,
                olveraParam.origin.y
                )
            .setScale(
                olveraParam.scale.x,
                olveraParam.scale.y,
            );
        this.olveraImg.setPostPipeline(LasersOlvera);

        this.tweensOlvera = this.scene.tweens
            .add({
                targets: this.olveraImg,
                scale: {from: 0, to: 1},
                duration: 400,
                onCompleteScope: this,
                onComplete: () => {
                    this.olveraImg.postPipelines[0].startAnim()
                }
            }).stop(0);

        // ========= Функция создания анимации перемещения по пути =========
        const createAnimStarPath = (points) => {
            points.forEach((item, ind) => {
                if (ind % 2 === 0) {
                    points[ind] = item * olveraParam.scale.x
                } else {
                    points[ind] = item * olveraParam.scale.y
                }
            })
            let star = new Phaser.Curves.Spline(points);

            let starTexture = this.scene.add // Создаем звезду
                .follower(
                    star,
                    olveraParam.x + (points[0] - (this.olveraImg.width * olveraParam.scale.x) * olveraParam.origin.x),
                    olveraParam.y + (points[1] - (this.olveraImg.height * olveraParam.scale.y) * olveraParam.origin.y),
                    'star'
                )
                .setVisible(false)
                .setScale(1 * olveraParam.scale.x, 1 * olveraParam.scale.y);
            
            let animStart = this.scene.tweens // Создаем анимацию появления звезды
                .add({
                    targets: starTexture,
                    alpha: {from: 0, to: 1},
                    duration: 10,
                })
                .stop(0);

            let animOut = this.scene.tweens // Создаем анимацию исчезновения звезды
                .add({
                    targets: starTexture,
                    alpha: {from: 1, to: 0},
                    duration: 300,
                    onComplete: () => {
                        starTexture.setVisible(false);
                    }
                });

            starTexture.startFollow({ // Создаем анимацию движения звезды
                duration: 600,
                // repeat: -1,
                rotateToPath: false,
                verticalAdjust: true,
                onUpdate: (tween,value) => {
                    if ( // Если анимация только началась то раскрываем ее
                        value.value === 0.0
                        && !animStart.isPlaying()
                    ){
                        starTexture.setVisible(true);
                        animStart.play();

                    }
                    if ( // Если анимация подходит к завершению скрываем ее
                        value.value > 0.7
                        && value.value < 0.8 + 0.01
                        && !animOut.isPlaying()
                    ) {
                        animOut.play();
                    }
                },
                onStop: () => {
                    animOut.isPlaying() && animOut.stop(0)
                    animStart.isPlaying() && animStart.stop(0);
                    starTexture.setVisible(false);
                }
            });
            starTexture.pathTween.stop(0);

            return starTexture;
        };
        // =================================================================

        // ============ Создание пути следования нижней звезды =============
        let pointsSB = [
            490, 17, 469, 23, 455, 39, 445, 65, 444, 
            92, 451, 103, 462, 108, 480, 104, 492, 92, 
            499, 75, 498, 61, 491, 51, 478, 51, 464, 
            57, 450, 69
        ];

        this.starAnimBottomOlvera = createAnimStarPath(pointsSB);
        // =================================================================

        // ============ Создание пути следования нижней звезды =============
        let pointsSH = [
            577, 16, 561, 21, 545, 38, 533, 64, 533, 
            97, 541, 105, 556, 106, 575, 98, 585, 85, 
            587, 69, 585, 57, 576, 51, 561, 53, 546, 
            62, 535, 71
        ];

        this.starAnimHeaderOlvera = createAnimStarPath(pointsSH);
        // =================================================================

        // ======== Создание линий отображающих путь ==========
        // let graphics = this.scene.add.graphics();

        // graphics.fillStyle(0x00ff00, 1);

        // for (let i = 0; i <  this.starAnimHeader.points.length; i++)
        // {
        //     graphics.fillCircle(
        //         freeSpinTextParam.x +  this.starAnimHeader.points[i].x,
        //         freeSpinTextParam.y +  this.starAnimHeader.points[i].y,
        //         4
        //     );
        // }
        // // ====================================================

        // this.points = pointsSH;
        // this.scene.input.on('pointerup', (pointer) => {
        //     this.starAnimHeader.addPoint(pointer.x  - gameSize.width / 2, pointer.y)

        //     graphics.lineStyle(3, 0xe0e00e7,1);
        //     // graphics.fillStyle(0x00ff00, 1);
        //     graphics.fillCircle(
        //         pointer.x,
        //         pointer.y,
        //         4
        //     );

        //     this.points.push(+(pointer.x - gameSize.width / 2).toFixed(0))
        //     this.points.push(+(pointer.y).toFixed(0))
        // });
    }

    startOlvera() {
        this.tweensOlvera.play();
    }

    startStar() {
        this.starAnimBottomOlvera.pathTween.play();
        this.starAnimHeaderOlvera.pathTween.play();
    }

    stopOlvera() {
        this.olveraImg.postPipelines[0].stopAnim()
        this.starAnimBottomOlvera.pathTween.stop(0);
        this.starAnimHeaderOlvera.pathTween.stop(0);
        this.tweensOlvera.targets[0].setScale(0);

    }


    //====================================== Создание анимации FreeSpinText ===================================================

    createAnimFreeSpinText() {
        const freeSpinTextParam = {
            x: gameSize.width / 2, // Положение по оси X
            y: 400, // Положение по оси Y
            width: 500, // Ширина анимации
            height: 500, // Высота анимации
            scale: {
                x: 0.5,
                y: 0.5,
            }, // Масштаб анимации
            origin: { // Положение якоря (точка отсчета координат)
                x: 1,
                y: 0.5
            },
        }

        const img = this.scene.add // Добавляем картинку с надписью FreeGames
            .image(
                freeSpinTextParam.x,
                freeSpinTextParam.y,
                'freeGameTextElem'
            )
            .setOrigin(
                freeSpinTextParam.origin.x,
                freeSpinTextParam.origin.y
                )
            .setScale(
                freeSpinTextParam.scale.x,
                freeSpinTextParam.scale.y,
            );
        // ========= Функция создания анимации перемещения по пути =========
        const createAnimStarPath = (points) => {
            points.forEach((item, ind) => {
                if (ind % 2 === 0) {
                    points[ind] = item * freeSpinTextParam.scale.x
                } else {
                    points[ind] = item * freeSpinTextParam.scale.y
                }
            })
            let star = new Phaser.Curves.Spline(points);

            let starTexture = this.scene.add // Создаем звезду
                .follower(
                    star,
                    freeSpinTextParam.x + (points[0] - (img.width * freeSpinTextParam.scale.x) * freeSpinTextParam.origin.x),
                    freeSpinTextParam.y + (points[1] - (img.height * freeSpinTextParam.scale.y) * freeSpinTextParam.origin.y),
                    'star'
                )
                .setVisible(true)
                .setAlpha(1)
                .setScale(0.5 * freeSpinTextParam.scale.x, 0.5 * freeSpinTextParam.scale.y);
            let animStart = this.scene.tweens // Создаем анимацию появления звезды
                .add({
                    targets: starTexture,
                    alpha: {from: 0, to: 1},
                })
                .stop(0);

            let animOut = this.scene.tweens // Создаем анимацию исчезновения звезды
                .add({
                    targets: starTexture,
                    alpha: {from: 1, to: 0},
                    duration: 700,
                    onComplete: () => {
                        starTexture.setVisible(false);
                    }
                });

            starTexture.startFollow({ // Создаем анимацию движения звезды
                duration: 5000,
                // repeat: -1,
                rotateToPath: false,
                verticalAdjust: true,
                onUpdate: (tween,value) => {
                    if ( // Если анимация только началась то раскрываем ее
                        value.value === 0.0
                        && !animStart.isPlaying()
                    ){
                        starTexture.setVisible(true);
                        animStart.play();
                    }
                    if ( // Если анимация подходит к завершению скрываем ее
                        value.value > 0.9
                        && value.value < 0.9 + 0.01
                        && !animOut.isPlaying()
                    ) {
                        animOut.play();
                    }
                },
                onStop: () => {
                    animStart.isPlaying() && animStart.stop(0);
                    animOut.isPlaying() && animOut.stop(0)
                    starTexture.setVisible(false);
                }
            });
            starTexture.pathTween.stop(0);

            return starTexture;
        };
        // =================================================================

        // ============ Создание пути следования нижней звезды =============
        let pointsSB = [
            10, 158, 2, 191, 15, 216, 41, 223,
            66, 217, 89, 214, 118, 209, 125, 191,
            136, 191, 161, 211, 174, 206, 200, 205,
            205, 185, 226, 196, 238, 181, 255, 197,
            280, 193, 386, 182
        ];

        this.starAnimBottom = createAnimStarPath(pointsSB);
        // =================================================================

        // ============ Создание пути следования нижней звезды =============
        let pointsSH = [
            344, 65, 337, 59, 322, 62, 336, 57,
            346, 45, 343, 32, 333, 32, 349, 29,
            358, 14, 353, 1, 290, 10, 235, 15,
            222, 26, 208, 17, 167, 22, 162, 11,
            133, 10
        ];

        this.starAnimHeader = createAnimStarPath(pointsSH);
        // =================================================================

        /*// ======== Создание линий отображающих путь ==========
        let graphics = this.scene.add.graphics();

        graphics.fillStyle(0x00ff00, 1);

        for (let i = 0; i < starHeader.points.length; i++)
        {
            graphics.fillCircle(
                freeSpinTextParam.x + starHeader.points[i].x,
                freeSpinTextParam.y + starHeader.points[i].y,
                4
            );
        }
        // ====================================================

        this.points = pointsSH;
        this.scene.input.on('pointerup', (pointer) => {
            starHeader.addPoint(pointer.x  - gameSize.width / 2, pointer.y)

            graphics.lineStyle(3, 0xe0e00e7,1);
            // graphics.fillStyle(0x00ff00, 1);
            graphics.fillCircle(
                pointer.x,
                pointer.y,
                4
            );

            this.points.push(+(pointer.x - gameSize.width / 2).toFixed(0))
            this.points.push(+(pointer.y).toFixed(0))
        });*/
    }

    startFreeSpinText(loop = false) {
        const startAnim = () => {
            this.starAnimBottom.pathTween.play();
            this.starAnimHeader.pathTween.play();
        }
        startAnim();

        if (loop) {
            this.freeSpinTextTimer = this.scene.time.addEvent({
                delay: 4000,
                callback: () => { startAnim(); },
                repeat:-1,
            });
        }
    }

    stopFreeSpinText() {
        if (this.freeSpinTextTimer) {
            this.freeSpinTextTimer.destroy();
            this.freeSpinTextTimer = null;
        }

        this.starAnimBottom.pathTween.stop(0);
        this.starAnimHeader.pathTween.stop(0);
    }

    //==================================================================================================================

    //====================================== Создание анимации Drops ===================================================

    createAnimDrops() {
        const dropsParam = {
            x: gameSize.width / 2, // Положение по оси X
            y: 0, // Положение по оси Y
            width: 1168, // Ширина анимации
            height: 1061, // Высота анимации
            scale: 1, // Масштаб анимации
            origin: { // Положение якоря (точка отсчета координат)
                x: 0.5,
                y: 0
            },
        }

        const dropsParticle = this.scene.add.particles('dropsParticle'); // Создание партикуляра

        const emitZone = new Phaser.Geom.Rectangle( // Создание области генерации частиц
            dropsParam.x - dropsParam.width * dropsParam.origin.x,
            dropsParam.y,
            dropsParam.width * dropsParam.scale,
            -10 * dropsParam.scale
        );
        const deathZone = new Phaser.Geom.Rectangle( // Создание области действия частиц
            dropsParam.x - dropsParam.width * dropsParam.origin.x,
            dropsParam.y - 10 * dropsParam.scale,
            dropsParam.width * dropsParam.scale,
            dropsParam.height * dropsParam.scale + 10 * dropsParam.scale
        );

        this.dropsEmitter = dropsParticle // Создание поведения частиц
            .createEmitter(
                {
                    x: 0,
                    y: 0,
                    speedY: {min: 400 * dropsParam.scale, max: 500 * dropsParam.scale},
                    speedX: {min: 150 * dropsParam.scale, max: -150 * dropsParam.scale},
                    rotate: {
                        onEmit: (particle) => {
                            return Math.round( // расчитываем угол поворота частицы
                                Math.atan(
                                    particle.velocityY / particle.velocityX
                                ) * ( 180 / Math.PI )
                            ) - 90
                        },
                        onUpdate: (particle, key, t, value) => {
                            /* ====== Постепенно ускоряем частицы ====== */
                            particle.velocityX += particle.velocityX / 10 * dropsParam.scale;
                            particle.velocityY += particle.velocityY / 10 * dropsParam.scale;
                            /* ========================================= */
                            return value;
                        }
                    },
                    scale: {min: 0.3 * dropsParam.scale, max: 0.6 * dropsParam.scale},
                    lifespan: 3000,
                    quantity: 1,
                    frequency: 40,
                    emitZone: { source: emitZone },
                    deathZone: { type: 'onLeave', source: deathZone },
                }
            )
            .stop();
    }

    startDrops(loop = false) {
        const startAnim = () => {
            this.dropsEmitter.start();
        }
        startAnim();

        if (loop) {
            this.dropsTimer = this.scene.time.addEvent({
                delay: 4000,
                callback: () => { startAnim(); },
                repeat:-1,
            });
        }
    }

    stopDrops() {
        if (this.dropsTimer) {
            this.dropsTimer.destroy();
            this.dropsTimer = null;
        }

        this.dropsEmitter.killAll().stop();
    }

    //==================================================================================================================


    createFirework() {
        const params = {
                startPoint: {
                    x: gameSize.width/2,
                    y: gameSize.height,
                },
                speed: {
                  min: 200,
                  max: 400
                },
                scales: {
                  start: 0.02,
                  end: 0
                },
                gravityY: 50,
                maxEmitters: 30,
                scaleFirstParticle: 0.05
            },
            particleFireworks = this.scene.add.particles('white');

        this.arrFireworkEmitter = [];

        for (let i = 0; i < params.maxEmitters; ++i) {
            const endPoint = {
                    x: this.random(
                        params.startPoint.x - (200 + 0.15*200),
                        params.startPoint.x + (200 + 0.15*200)
                    ),
                    y: this.random(
                        params.startPoint.y - (180 + 0.15 * 180),
                        params.startPoint.y
                    )
                },
                angle = this.angle(
                    params.startPoint.x,
                    params.startPoint.y,
                    endPoint.x,
                    endPoint.y
                ),
                delay = this.random(0,2);

            const emitterFireworks = particleFireworks
                .createEmitter(
                    {
                        x: params.startPoint.x,
                        y: params.startPoint.y,
                        angle: {min: angle, max: angle + 5},
                        lifespan: 500,
                        speed: params.speed,
                        gravityY: params.gravityY,
                        scale: params.scales,
                        quantity: 2,
                        blendMode: 'SCREEN'
                    }
                )
                .stop()
                .setVisible(false);

            const image = this.scene.add
                .image(
                    params.startPoint.x,
                    params.startPoint.y,
                    'white'
                )
                .setScale(params.scaleFirstParticle)
                .setVisible(false);

            const tweenAnimX = this.scene.tweens
                .add(
                    {
                        targets: [image, emitterFireworks.x],
                        ease: "linear",
                        delay: delay === 0 ? 0 : 150 * delay,
                        x: {
                            from: params.startPoint.x,
                            to: endPoint.x
                        },
                        propertyValue: {
                            from: params.startPoint.x,
                            to: endPoint.x
                        },
                        duration: 1200,
                    }
                );

            const tweenAnimY = this.scene.tweens
                .add(
                    {
                        targets: [image, emitterFireworks.y],
                        ease: "linear",
                        delay: delay === 0 ? 0 : 150 * delay,
                        y: {
                            from: params.startPoint.y,
                            to: endPoint.y
                        },
                        propertyValue: {
                            from: params.startPoint.y,
                            to: endPoint.y
                        },
                        /*onStart: () => {
                            console.log('ff')
                            emitterFireworks.start()/!*.setVisible(true);
                            image.setVisible(true)*!/
                        },*/
                        duration: 1200,
                    }
                );

            const tweenSetAlpha = this.scene.tweens.add({
                targets: [image, emitterFireworks.alpha],
                alpha: {from: 1, to: 0},
                propertyValue: {from: 1, to: 0}, /* для emitter.alpha */
                delay: 550,
                duration: 450,
                onComplete : () => {
                    emitterFireworks.killAll().stop().setAlpha(1).setVisible(false);
                    image.setAlpha(1).setVisible(false);
                }
            })

            this.arrFireworkEmitter.push([emitterFireworks, image, tweenAnimX, tweenAnimY, tweenSetAlpha]);
        }

    }

    startFirework() {
        this.arrFireworkEmitter.forEach(el => {
            el.forEach((elem, i)=> {
                if (i === 0) {
                    elem.start().setVisible(true);
                    elem['alive'].length = 0;
                    elem['dead'].length = 0;
                } else if (i === 1) {
                    elem.setVisible(true);
                } else {
                    elem.play();
                }
            });
        });
    }

    stopFirework() {
        this.arrFireworkEmitter.forEach(el => {
            el.forEach((elem, i)=> {
                if (i === 0) {
                    elem.killAll().stop().setAlpha(1).setVisible(false);
                } else if (i === 1) {
                    elem.setAlpha(1).setVisible(false);
                } else {
                    elem.stop(0);
                }
            });
        });
    }
    /* ================================== Функции создания анимаций ==================================== */


    createAnims(){
        this.fireWorksAnims = [];

        for(let i = 0; i < 30; i++){
            this.createFireWorks();
        }

        this.speedCounter = 1;

        this.coinsParticles = this.scene.add.particles('coins').setDepth(3);
        this.coinsAnim = this.coinsParticles.createEmitter({
            x:  gameSize.width/2,
            y: gameSize.height,
            quantity: 38,
            speedX:{
                onEmit: () => {
                    /* Генерация рандомной скорости для определенных монет */
                    let randomedNumber = this.random(
                        -50 + 2 * this.speedCounter,
                        50 - 2 * this.speedCounter
                    );

                    return  (50 - 2 * this.speedCounter) < 0 ? this.random(-50, 50) : randomedNumber
                }
            },
            speedY:{
                onEmit: () => {
                    /* Генерация рандомной скорости для определенных монет */
                    let speed = -300 + (300/38) * this.speedCounter
                    this.speedCounter += 1;

                    return speed < -100 ? speed : this.random(-220, -270)
                }
            },
            scale: { min: 0.8, max: 1.3 },
            gravityY: 100,
            lifespan: 8000,
            maxParticles: 38,
            timeScale : 2.75,
            particleClass: AnimatedParticle,
            emitCallbackScope: this,
            emitCallback: (particle) => {
                particle.anim = this.scene.anims.get('coins');
                particle.i = this.random(1,16);
            }
        }).stop();

        this.brillsParticles = this.scene.add.particles('brills').setDepth(2);
        this.brillsAnim = this.brillsParticles.createEmitter({
            x:  gameSize.width/2,
            y: gameSize.height,
            quantity: 14,
            scale: { min: 0.6, max: 0.8},
            speedX: { min: -40, max: 40},
            speedY: { min: -230, max: -280},
            gravityY: 100,
            lifespan: 8000,
            maxParticles: 14,
            timeScale : 2.75,
            particleClass: AnimatedParticle,
            emitCallbackScope: this,
            emitCallback: (particle) => {
                particle.anim = this.scene.anims.get('brills');
                particle.i = this.random(1,16);
            }
        }).stop()

        this.rubysParticles = this.scene.add.particles('ruby');
        this.rubyAnim = this.rubysParticles.createEmitter({
            x:  gameSize.width/2,
            y: gameSize.height,
            quantity: 6, /* кол-во разбрасываемых партикуляров */
            frequency: 25, /* через какое время будет разбрасываться партикуляры (до максимального значения партикуляров) */
            scale: { min: 0.4, max: 0.6},
            speedX: { min: -40, max: 40},
            speedY: { min: -230, max: -280},
            gravityY: 100,
            velocityY: 80,
            lifespan: 8000, /* сколько будет существовать партикл в ms */
            maxParticles: 6, /* максимальной количество партиклов */
            timeScale : 2.75,
            particleClass: AnimatedParticle /* этот класс нужен для запуска анимации  */,
            emitCallbackScope: this,
            emitCallback: (particle) => {
                particle.anim = this.scene.anims.get('ruby');
                particle.i = this.random(0,16);
            }
        }).stop()
    }

    createFireWorks(){
        const startPoint  = {   /* стартовые позиции */
                x: gameSize.width/2,
                y: gameSize.height
            },
            fireworks = this.scene.add.particles('white'), /* создание партикуляров */
            emitter = fireworks.createEmitter({ /* создание эмиттера */
                speed: { min: 200, max: 300 },
                gravityY: 50,
                scale: { start: 0.02, end: 0 },
                quantity: 2,
                blendMode: 'SCREEN'
            }).stop().setVisible(false),
            image = this.scene.add.image(startPoint.x,startPoint.y,'white').setScale(0.05).setVisible(false); /* создание главного летящего партикуляра */

        this.fireWorksAnims.push([emitter,fireworks,image])
    }
    /* ================================================================================================================= */

    /* =========================================== Функции запуска анимаций =========================================== */

    startFireWorks(){
        this.fireWorksAnims.forEach((arr)=>{
            const emitter = arr[0],
                fireworks = arr[1],
                image = arr[2],
                startPoint  = {
                    x: gameSize.width/2,
                    y: gameSize.height
                },
                endPoint = {
                    x: this.random(gameSize.width/2 - (200 + 0.15*200),gameSize.width/2 + (200 + 0.15*200)), /* Высчитывается random x значения */
                    y: this.random(gameSize.height-(180 + 0.15*180), gameSize.height) /* Высчитывается random y значения */
                },
                angle = this.angle(startPoint.x, startPoint.y, endPoint.x, endPoint.y),
                delay = this.random(0,2)

            emitter.setAngle(angle)
            image.setX(startPoint.x).setY(startPoint.y)

            /* Перемещние эмиттера по траектории */
            this.scene.tweens.add({
                targets: [fireworks,image],
                ease: "linear",
                delay: delay === 0 ? 0 : 150 * delay,
                x: {from: startPoint.x, to: endPoint.x},
                y: {from: startPoint.y, to: endPoint.y},
                onStart: () => {
                    emitter.start().setVisible(true);
                    image.setVisible(true)
                },
                duration: 1200,
            })

            /* Картинке и эмиттеру выставляется альфа */
            this.scene.tweens.add({
                targets: [image, emitter.alpha],
                alpha: 0,
                propertyValue:0, /* для emitter.alpha */
                delay: 550,
                duration: 450,
                onComplete : () => {
                    emitter.stop().setAlpha(1).setVisible(false);
                    image.setAlpha(1).setVisible(false);
                }
            })
        })
    }

    startCoinsAnim(){
        const startAnim = () => {
            this.coinsAnim.start();
            this.coinsAnim.alive.length = 0;
            this.coinsAnim.dead.length = 0;
            this.speedCounter = 1;
            this.startFireWorks();
        }
        startAnim();

        this.coinsTimer = this.scene.time.addEvent({
            delay: 4000,
            callback: () => { startAnim() },
            repeat:-1,
        })
    }

    startBrillsAnim(){
        const startAnim = () => {
            this.speedCounter = 1;
            [this.coinsAnim,this.rubyAnim,this.brillsAnim].forEach((elem) => {
                elem.start();
                elem.alive.length = 0;
                elem.dead.length = 0;
            })

            this.startFireWorks();
        }
        startAnim();

        this.brillsTimer = this.scene.time.addEvent({
            delay: 4000,
            callback: () => { startAnim() },
            repeat:-1,
        })
    }
    /* ================================================================================================================= */

    /* =========================================== Функции остановки анимаций =========================================== */

    stopBrillsAnim(){
        this.brillsTimer.destroy();
        this.brillsTimer = null;

        this.stopFireWorks();

        [this.coinsAnim,this.rubyAnim,this.brillsAnim].forEach((elem) => {
            elem.stop();
            elem.killAll();
        })
    }

    stopFireWorks(){
        this.fireWorksAnims.forEach((elem)=>{
            elem[0].stop().setVisible(false)
            elem[2].setVisible(false)
        })
    }

    stopCoinsAnim(){
        this.coinsTimer.destroy();
        this.coinsAnim.stop();
        this.coinsAnim.killAll();
        this.coinsTimer = null;

        this.stopFireWorks();
    }

    /* ================================================================================================================= */

    /* =========================================== Функции рандома чисел =========================================== */

    random(min,max){
        return Math.floor(Math.random() * (max - min) + min)
    }

    /* ================================================================================================================= */

    /* =========================================== Функции вычисления угла эмиттера =========================================== */

    angle(startpointX, startpointY, endpointX, endpointY){
        return Math.acos(
            (startpointX - endpointX) /
            Math.sqrt(
                Math.pow(startpointX - endpointX,2)+Math.pow(startpointY - endpointY,2)
            )
        )*57
    }
    /* ================================================================================================================= */

    /* =========================================== Функции запуска timeLine =========================================== */
    startTimeline(timelineAnim) {
        if (timelineAnim.progress === 0) {
            // Проверяем запускается ли первый раз анимация
            timelineAnim.play();
        } else if (timelineAnim.progress > 0) {
            this.scene.tweens.makeActive(timelineAnim);
        }
    }

    /* ================================================================================================================= */

    createBigWin(){
        this.createStars(); // Создание анимации звезд
        this.createBigWinAnimText();
        this.createBigWinParticle();
    }

    createStars() {
        //============= Анимация генерации звез ==================
        const shape = new Phaser.Geom // Создаем область в которой будут появляться звезды
            .Rectangle(
                gameSize.width/2 - 818/2,
                gameSize.height - (448 - 50),
                818,
                448 - 100
            );

        this.starsParticles = this.scene.add.particles('star'); // Создаем партикуляр

        this.starsAnim = this.starsParticles // Настраиваем принцип появления партикуляров
            .createEmitter(
                {
                    lifespan: 5000, // Время жизни партикуляра
                    frequency: 500, // Задержка между появлением частиц
                    quantity: 5, // Количество частиц которые появляются за раз
                    scale: { // Настраиваем размер партикуляров
                        min: 0.2,
                        max: 1.1
                    },
                    blendMode: 'ADD',
                    emitZone: { // Привязываем зону генерации частиц
                        type: 'random',
                        source: shape,
                    },
                    deathZone: { // Привязываем зону удаления частиц
                        type: 'onLeave',
                        source: shape
                    },
                    speed: { // Настраиваем скорость движения частиц
                        min: 30,
                        max: -30
                    }
                }
            )
            .stop();
        //========================================================

        //================ Анимация мигания звезд ================
        this.starsTween = this.scene.tweens.add({
            targets: [this.starsAnim.alpha],
            propertyValue: {from: 1, to: 0}, /* для emitter.alpha */
            duration: 1200,
            yoyo: true,
            repeat: 1,
        }).stop(1);
        //========================================================

        //============= Анимация исчезновения звезд ==============
        this.starsEnd = this.scene.tweens.add({
            targets: [this.starsAnim.alpha],
            propertyValue: {from: 1, to: 0}, /* для emitter.alpha */
            delay: 1000,
            duration: 600,
            onComplete: () => {
                this.starsAnim
                    .stop()
                    .killAll();
            },
        }).stop(1);
        //========================================================
    }

    createBigWinParticle() {
        this.speedBigWinCounter = 1;
        this.partsParticles = this.scene.add.particles('parts');
        this.partsAnim = this.partsParticles.createEmitter({
            frame: [ 'break', 'gear_1', 'gear_2', 'steering_wheel', 'wheel'],
            x:  gameSize.width/2,
            y: gameSize.height,
            frequency: 25,
            quantity: 2,
            scale: { min: 0.6, max: 0.8},
            speedX:{
                onEmit: () => {
                    /* Генерация рандомной скорости для определенных монет */
                    let randomedNumber = this.random(
                        -80 + (50/75) * this.speedBigWinCounter,
                        80 - (50/75) * this.speedBigWinCounter
                    );

                    return  randomedNumber/*(80 - (80/75) * this.speedBigWinCounter) <= 0 ? this.random(-80, 80) : randomedNumber*/
                }
            },
            speedY:{
                onEmit: () => {
                    /* Генерация рандомной скорости для определенных монет */
                    let speed = -300 + (200/75) * this.speedBigWinCounter
                    this.speedBigWinCounter += 1;

                    return speed /*< -100 ? speed : -100this.random(-220, -270)*/
                }
            },
            gravityY: 100,
            lifespan: 8000,
            maxParticles: 75,
            timeScale : 2.75,
        }).stop();
    }

    createBigWinAnimText(){
        this.bigWinSymbols = [];
        this.bigWinTimeLines = [];
        this.repeatedGlareTimes = 0 /* Количество повторяемых бликов */

        const createImage = (name,index) => {
            this.bigWinSymbols.push(
                this.scene.add.image(
                    this.bigWinParam.symbolStartX[index],
                    gameSize.height+85,
                    "bigWinElems",
                    name
                ),
            )
        }

        this.bigWinParam.symbolNames.forEach((elem,index)=> {
            createImage(elem, index)
        });

        this.sparkle = this.scene.add
            .image(
                this.bigWinParam.symbolStartX[0],
                this.bigWinParam.symbolEndY[0],
                "sparkle",
            )
            .setScale(
                this.bigWinParam.scales[0][0],
                this.bigWinParam.scales[0][1]
            )
            .setVisible(false);

        this.bigWinSymbols.forEach((elem, index)=> {
            let symbolsTimeLine = this.scene.tweens.timeline();

            symbolsTimeLine.add({
                /* Стартовый выезд букв */
                targets: elem,
                ease: "linear",
                delay:
                    index === 0 || index === 6 ? 0 :
                        index === 3 || index === 4 ? 400 : 300,
                y: {from: gameSize.height+85, to: this.bigWinParam.symbolEndY[index]},
                duration:
                    index === 0 || index === 6 ? 400 :
                        index === 3 || index === 4 ? 200 : 300,
                onCompleteScope: this,
                onComplete: () => {
                    if(index === 6) {
                        // == Запуск анимации звезд ==
                        this.starsAnim.start();
                        this.starsAnim['alive'].length = 0;
                        this.starsAnim['dead'].length = 0;
                        this.starsTween.play();
                        // ===========================
                    }
                },
            })

            symbolsTimeLine.add({
                /* Тряска букв */
                delay:
                    index === 5 || index === 6 || index === 0 ? 200 :
                        index === 3 || index === 1 ? 180 :
                            index === 4 ? 20 : 0,
                targets: elem,
                ease: "linear",
                y: this.bigWinParam.symbolEndY[index] + 15,
                duration: 180,
                yoyo: true,
                repeat:15
            })

            this.bigWinTimeLines.push(symbolsTimeLine)
        });

        let finishTimeLine = this.scene.tweens.timeline();

        const changePositionSpark = (params) => {
            this.sparkle
                .setVisible(true,params)
                .setAlpha(0)
                .setX(this.bigWinParam.symbolStartX[params])
                .setY(this.bigWinParam.symbolEndY[params])
                .setScale(this.bigWinParam.scales[params][0], this.bigWinParam.scales[params][1])
        }

        finishTimeLine.add({ // Создаем анимацию бликов на буквах
            delay: 2150,
            targets: this.sparkle,
            ease: "linear",
            alpha: 1,
            duration: 180,
            yoyo: true,
            onStart: () => { // Когда анимация запускается устанавливаем исходное положение
                changePositionSpark(this.repeatedGlareTimes);
            },
            onRepeat: () => { // Когда анимация повторяется меняем положение блика
                this.repeatedGlareTimes += 1;
                changePositionSpark(this.repeatedGlareTimes);
            },
            onComplete: () => { // Когда анимация завершается сбрасываем положение в исходное состояние
                this.repeatedGlareTimes = 0;
                changePositionSpark(this.repeatedGlareTimes);

                this.starsEnd.play();// Запуск анимации завершения для звезд
            },
            repeat:6,
        });

        finishTimeLine.add({
            /* Окончание анимации */
            targets: this.bigWinSymbols,
            alpha: 0,
            delay: 1000,
            duration: 600,
        });

        this.bigWinTimeLines.push(finishTimeLine)
    }

    startBigWinAnim(){
        this.partsAnim.start();
        this.partsAnim['alive'].length = 0;
        this.partsAnim['dead'].length = 0;

        this.speedBigWinCounter = 1;


        [...this.bigWinSymbols].forEach((elem) => elem.setVisible(true).setY(gameSize.height+85).setAlpha(1))
        this.sparkle.setAlpha(0).setVisible(true);


        this.bigWinTimeLines.forEach((elem,index) => {
            this.startTimeline(elem)
        });
    }

    stopBigWinAnim(){
        this.starsTween.stop(1);
        this.starsEnd.stop(1);

        [this.partsAnim, this.starsAnim].forEach((elem) => {
            elem.stop().killAll();
        });

        this.repeatedGlareTimes = 0;
        this.sparkle
            .setVisible(true,this.repeatedGlareTimes)
            .setAlpha(0)
            .setX(this.bigWinParam.symbolStartX[this.repeatedGlareTimes])
            .setY(this.bigWinParam.symbolEndY[this.repeatedGlareTimes])
            .setScale(
                this.bigWinParam.scales[this.repeatedGlareTimes][0],
                this.bigWinParam.scales[this.repeatedGlareTimes][1]
            )

        this.bigWinTimeLines.forEach((elem) => elem.stop());
        [...this.bigWinSymbols, this.sparkle].forEach((elem) => elem.setVisible(false).setAlpha(1));
    }
 }
