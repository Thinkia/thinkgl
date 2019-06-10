/**
 * 2019.6.10
 *
 * 这里演示用9个点 连接画线的方法
 *
 */

let ia = Ia();

let iaWorld = ia.world;

ia.action.view.jump([0,0,-100])

let positions = [
    0.0,0.0,

    1.0,0.0,

    2.0,0.0,

    3.0,0.0,

    4.0,0.0,

    5.0,0.0,

    6.0,0.0,

    7.0,0.0,

    8.0,0.0,

];

let colors = [

    1.0,0.0,0.0,1.0,   // 红 red
    1.0,0.0,0.0,1.0,   // 红 red
    1.0,0.0,0.0,1.0,   // 红 red

    1.0,0.0,0.0,1.0,   // 红 red
    1.0,0.0,0.0,1.0,   // 红 red
    1.0,0.0,0.0,1.0,   // 红 red

    1.0,0.0,0.0,1.0,   // 红 red
    1.0,0.0,0.0,1.0,   // 红 red
    1.0,0.0,0.0,1.0,   // 红 red




]

main();

function main() {

    iaWorld.initIaWorld( );

    let buffers = iaWorld.buffer.positionBuffer.initBuffer( positions ,colors );

    iaWorld.helloIaWorld( buffers );

    // set point size
    iaWorld.drawPoints(2);

}