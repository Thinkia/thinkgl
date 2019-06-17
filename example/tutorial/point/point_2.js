/**
 *
 * 2019.6.17
 *
 * 这里演示绘制多个不同颜色的点
 *
 * 与绘制一个点的区别在于初始化了更多的 顶点坐标和对应的顶点颜色;
 *
 * */


let ia = Ia();

let iaWorld = ia.world;

let positions = [
    -1.0,0.0,
    0.0,1.0,
    1.0,0.0,
    2.0,1.0
];

let colors = [
    1.0,0.0,0.0,1.0,   // 红
    1.0,0.0,0.0,1.0,   // 红
    1.0,0.0,0.0,1.0,   // 红
    1.0,0.0,0.0,1.0,   // 红
]

main();

function main() {

    iaWorld.initIaWorld( );

    let buffers = iaWorld.buffer.positionBuffer.initBuffer( positions ,colors );

    iaWorld.helloIaWorld( buffers );

    iaWorld.drawPoints();

}

