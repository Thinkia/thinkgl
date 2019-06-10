/**
 * 2019.6.10
 *
 * 这里演示用 drawTriangle() 方法绘制两个三角形组成正方形
 *
 */


let ia = Ia();

let iaWorld = ia.world;

ia.action.view.jump([-1,0,-5])

let positions = [

    0.0,0.0,
    0.0,2.0,

    4.0,0.0,
    4.0,2.0,

];

let colors = [

    1.0,0.0,0.0,1.0,   //  red
    1.0,0.0,0.0,1.0,   //  red

    0.0,0.0,1.0,1.0,   //  blue
    0.0,0.0,1.0,1.0,   //  blue

]

main();

function main() {

    iaWorld.initIaWorld( );

    let buffers = iaWorld.buffer.positionBuffer.initBuffer( positions ,colors );

    iaWorld.helloIaWorld( buffers );

    iaWorld.drawTriangle();

}