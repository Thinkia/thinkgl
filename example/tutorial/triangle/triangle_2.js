/**
 * 2019.6.10
 *
 * 这里演示用 连线的方式画三角形drawTriangle( way =1 )
 *
 *  way==1 --> TRIANGLES        绘制三角形 三个一组        n/2
 *
 *  比如6个顶点 有两个三角形 012 和345 ; 这里的数字为顶点序号
 *
 *  way==2 --> TRIANGLE_STRIP   绘制三角形 依次组成三角形  n-2    （顶点中心顺序替换  ）
 *
 *  比如6个顶点 有四个三角形 012 123 234 345
 *
 *  way==3 --> TRIANGLE_FAN     以第一个顶点为中心点，其他顶点作为边缘点依次绘制 n-2    （ 顶点中心始终为第一个点）
 *
 *  比如6个顶点 有四个三角形 012  023  034 045
 *
 */


let ia = Ia();

let iaWorld = ia.world;

ia.action.view.jump([0,0,-5])

let positions = [

    -1.0,0.0,
    -1.0,2.0,

    4.0,2.0,
    4.0,0.0,

    5.0,0.0,
    5.0,2.0

];

let colors = [

    1.0,0.0,0.0,1.0,   //  red
    1.0,0.0,0.0,1.0,   //  red
    1.0,0.0,0.0,1.0,   //  red

    0.0,0.0,1.0,1.0,   //  blue
    0.0,0.0,1.0,1.0,   //  blue
    0.0,0.0,1.0,1.0,   //  blue


]

main();

function main() {

    iaWorld.initIaWorld( );

    let buffers = iaWorld.buffer.positionBuffer.initBuffer( positions ,colors );

    iaWorld.helloIaWorld( buffers );

    iaWorld.drawTriangle();
    //iaWorld.drawTriangle(1);
    //iaWorld.drawTriangle(3);


}