/**
 *  2019.6.6
 *
 *  这里将使用ia 绘制工具类  ia.world 演示如何绘制一个点
 *
 *  非常基础又非常重要！
 *  如果会了绘制一个点， 那么很多个点就可以组成一条线；
 *  很多条线和又可以组成 一个面；
 *  很多个面可以组成三维集合体；
 *
 **/

let ia = Ia();

let iaWorld = ia.world;

ia.action.view.jump([0,0,-10])

let positions = [
    0.0,0.0,

    1.0,1.0,

    2.0,0.0

];

let colors = [

    1.0,0.0,0.0,1.0,   // 红

    0.0,1.0,0.0,1.0,   // 绿

    0.0,0.0,1.0,1.0   //  蓝

]

main();

 function main() {

     iaWorld.initIaWorld( );

     let buffers = iaWorld.buffer.positionBuffer.initBuffer( positions ,colors );

     iaWorld.helloIaWorld( buffers );

    // ia.action.view.rotate([0,1,0],45*Math.PI/180)



     iaWorld.drawPoints();

 }
