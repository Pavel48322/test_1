const fragShader = `
precision mediump float;
uniform sampler2D uMainSampler;
uniform float uTime;

uniform vec2 uPos;
uniform vec2 uSizeImage;
uniform vec2 uScale;

uniform vec2 uResolution;
varying vec2 outTexCoord;
#define PI 0.01
void main()
{
    vec2 coord = vec2(0.0,0.0);
    
    float pY = ((gl_FragCoord.y - (uResolution.y - (uPos.y + uSizeImage.y))) / uResolution.y);
   
    float sx = uTime;
    float dy = ((0.1 * uScale.x) / (1.0 - (uScale.x - uScale.y))) / (10.0 * abs((pY * 4.5) - sx));
    vec4 pixel = texture2D(uMainSampler, outTexCoord);

    vec4 prov;
    
    if ((pixel.r <= 0.2 && pixel.g <= 0.2 && pixel.b <= 0.2) || pixel.a < 0.1 ) {
        prov = vec4(pixel.r, pixel.g, pixel.b, pixel.a);
    } else if (dy > 0.5) {
        prov = vec4(pixel.r + 0.5, pixel.g + 0.5, pixel.b + 0.5, pixel.a);
    } else if (dy > 0.0 && dy <= 0.5) {
        prov = vec4(pixel.r + dy , pixel.g + dy , pixel.b + dy , pixel.a);
    } else {
        prov = vec4(pixel.r, pixel.g, pixel.b, pixel.a);
    }
    gl_FragColor = prov;
}
`;

export default class LasersYouWin extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline
{
    constructor (game)
    {
        super({
            game,
            renderTarget: true,
            fragShader,
            uniforms: [
                'uProjectionMatrix',
                'uMainSampler',
                'uTime',
                'uResolution',
                'uPos',
                'uSizeImage',
                'uScale'
            ],
        });
        this.loop = 0;

        this.params = {
            duraction: 700,
            cropWidth: 200,
        }

        this.isAddParam = false;
    }

    onPreRender ()
    {
        if (!!this.gameObject && !this.isAddParam) {
            this.set2f( // Передаем размеры блика в шейдер
                'uResolution',
                this.renderer.width, // Ширина блика с учетом Scale
                this.renderer.height // Высота блика с учетом Scale
            );

            this.set2f( // Передаем размеры картинки в шейдер
                'uSizeImage',
                (this.gameObject['width'] * this.gameObject['scaleX']) // Ширина всей картинки
                - (this.params.cropWidth * this.gameObject['scaleX']), // Уменьшение области пролета полосы
                // - (this.gameObject['x'] - (this.gameObject['x'] * this.gameObject['scaleX'])), // Положение с учетом масштаба X
                (this.gameObject['height'] * this.gameObject['scaleY']) // Высота всей картинки
                // - (this.gameObject['y'] - (this.gameObject['y'] * this.gameObject['scaleY'])) // Положение с учетом масштаба Y
            );

            // let pos = { // Положение анимации блика с учетом Scale
            //     x: this.gameObject['x'] + this.gameObject['x'] - (this.gameObject['x'] * this.gameObject['scaleX']),
            //     y: this.gameObject['y'] + this.gameObject['y'] - (this.gameObject['y'] * this.gameObject['scaleY'])
            // };
            this.set2f( // Передаем позицию блика в шейдер
                'uPos',
                this.gameObject['x'] - ((this.gameObject['width'] * this.gameObject['scaleX']) * this.gameObject['originX']), // Положение блика по оси X с учетом Origin
                this.gameObject['y'] - ((this.gameObject['height'] * this.gameObject['scaleY']) * this.gameObject['originY']) // Положение блика по оси Y с учетом Origin
            );

            this.set2f('uScale', this.gameObject['scaleX'], this.gameObject['scaleY']);
            // this.set2f('uScale', this.gameObject['scaleX'], this.gameObject['scaleY']);
            // this.set2f('uOrigin', this.gameObject['displayOriginX'], this.gameObject['displayOriginY']);
            this.isAddParam = true;
        }

        if (this.isStart) {
            this.set1f('uTime', this.loop);
            if (this.loop > 0.42 * this.gameObject['scaleX']) {
                this.loop = 0;
                this.stopAnim()
            } else {
                this.loop += 3 / (this.params.duraction / this.gameObject['scaleX']);
            }
        }

    }

    startAnim() {
        this.loop = 0;
        this.isStart = true;
    }

    stopAnim() {
        this.loop = 0;
        this.isStart = false;
        this.set1f('uTime', this.loop);
    }
}


