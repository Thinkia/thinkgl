/**
 * 2019.6.10
 *
 * 这里演示用  LINES 、LIN_STROP、LIN_LOOP  画线的方法
 *
 *  iaWorld.drawLines( num =1 )
 *  1  --> LINES  绘制线段 两个一组
 *  2  --> LINE_STRIP 绘制线段 依次连接
 *  3  --> LINE_LOOP 绘制线段 依次连接 首尾相连
 *
 */

let ia = Ia();

let iaWorld = ia.world;

ia.action.view.jump([0,0,-5])

let positions = [
    -1.0,0.0,
    -1.0,1.0,
    4.0,1.0,
    4.0,0.0,
];

let colors = [
    1.0,0.0,0.0,1.0,   //  red
    0.0,0.0,1.0,1.0,   //  blue
    0.0,1.0,0.0,1.0,   //  green
    0.0,1.0,0.0,1.0,   //  green
];

main();

function main() {

    iaWorld.initIaWorld( );

    let buffers = iaWorld.buffer.positionBuffer.initBuffer( positions ,colors );

    iaWorld.helloIaWorld( buffers );

    iaWorld.drawLines(3);
    //  iaWorld.drawLines(2);
    //  iaWorld.drawLines(1);

}