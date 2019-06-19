/**
 *
 * 2019.6.17
 *
 * 这里演示在 n 个 点中 ，挑选任意点绘制并自由设置其大小颜色
 *
 * iaWorld.drawPoints( size,offset,count)
 *
 * size: 点的大小  默认为10
 *
 * offset: 从第几个点开始绘制  默认为0
 *
 * count : 绘制几个点 ，  默认全部绘制
 *
 * */


let ia = Ia();

let iaWorld = ia.world;

let positions = [
    -1.0,0.0,       //0
    0.0,1.0,        //1
    1.0,0.0,        //2
    2.0,1.0         //3
];

let colors = [
    1.0,0.0,0.0,1.0,   // 红
    0.0,1.0,0.0,1.0,   // 绿
    0.0,0.0,1.0,1.0,   // 蓝
    1.0,0.0,0.0,1.0,   // 红
]

main();

function main() {

    iaWorld.initIaWorld( );

    let buffers = iaWorld.buffer.positionBuffer.initBuffer( positions ,colors );

    iaWorld.helloIaWorld( buffers );

    // 先绘制第0个点 并且大小为5
    iaWorld.drawPoints(5,0,1);

    // 再绘制第2、3个点，并且大小为10
    iaWorld.drawPoints(10,2,2);

}

