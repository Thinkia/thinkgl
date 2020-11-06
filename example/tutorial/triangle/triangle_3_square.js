/**
 * 2019.6.10
 *
 * 这里演示用 drawTriangle() 方法绘制两个三角形组成正方形
 *
 */


let ia = Ia();

let ia2 = Ia();

let iaWorld = ia.world;
let iaWorld2 = ia2.world;

ia.action.view.jump([-1,0,-5])


ia2.action.view.jump([-2,-1,-4])

let positions = [

    0.0,0.0,
    0.0,2.0,

    4.0,0.0,
    0.0,2.0,

    4.0,0.0,
    4.0,2.0,

    1.0,1.0,
    0.0,1.0,
    1.0,0.0,
];

let colors = [


    1.0,0.0,0.0,1.0,
    1.0,0.0,0.0,1.0,
    1.0,0.0,0.0,1.0,

    1.0,0.0,0.0,1.0,
    1.0,0.0,0.0,1.0,
    1.0,0.0,0.0,1.0,

    0.0,0.0,0.0,1.0,   //  blue
    0.0,0.0,0.0,1.0,   //  blue
    0.0,0.0,0.0,1.0,   //  blue

]

main();

function main() {



    iaWorld.initIaWorld();
    // 开启混合  透明模式
    iaWorld.gl.enable(iaWorld.gl.BLEND)
    iaWorld.gl.blendFunc(iaWorld.gl.SRC_ALPHA, iaWorld.gl.ONE_MINUS_SRC_ALPHA);

    let buffers = iaWorld.buffer.positionBuffer.initBuffer(positions, colors);


    iaWorld.helloIaWorld(buffers);

    iaWorld.drawTriangle(1);



    // iaWorld2.initIaWorld(false);
    // let buffers2 = iaWorld2.buffer.positionBuffer.initBuffer(positions, colors);
    //
    //
    // iaWorld2.helloIaWorld(buffers2,false);
    //
    // iaWorld2.drawTriangle();

}
