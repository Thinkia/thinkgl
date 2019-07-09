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
    1.0,0.0,0.0,1.0,   // 红 red
    1.0,0.0,0.0,1.0,   // 红 red

];

main();

function main() {

    iaWorld.initIaWorld( );

    let buffers = iaWorld.buffer.positionBuffer.initBuffer( positions ,colors );

    iaWorld.helloIaWorld( buffers );

    iaWorld.drawLines(3);


}