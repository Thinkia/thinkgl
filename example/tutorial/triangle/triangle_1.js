/**
 * 2019.6.10
 *
 * 这里演示用 连线的方式画一个三角形
 *
 */


let ia = Ia();

let iaWorld = ia.world;

ia.action.view.jump([0,0,-5]);

let positions = [

    -1.0,0.0,
    4.0,0.0,
    1.5,2.0,

];

let colors = [

    1.0,0.0,0.0,1.0,   // 红 red
    1.0,0.0,0.0,0.0,   // 红 red
    1.0,0.0,0.0,1.0,   // 红 red

];

main();

function main() {

    iaWorld.initIaWorld( );
    // 开启混合  透明模式
    iaWorld.gl.enable(iaWorld.gl.BLEND)
    iaWorld.gl.blendFunc(iaWorld.gl.SRC_ALPHA, iaWorld.gl.ONE_MINUS_SRC_ALPHA);

    let buffers = iaWorld.buffer.positionBuffer.initBuffer( positions ,colors );

    iaWorld.helloIaWorld( buffers );

    iaWorld.drawTriangle(3);

}
