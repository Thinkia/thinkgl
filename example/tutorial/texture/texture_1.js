/**
 * 2019.6.14
 *
 * 这里演示如何贴纹理
 *
 * */

let ia = Ia();

let iaWorld = ia.world;

// 平移
ia.action.view.jump([-0.5,-0.5,2]);


let square = {

    //顶点坐标
    positions:[

        0.0,  1.0, 0.0,
        1.0,  1.0, 0.0,
        1.0,  0.0, 0.0,
        0.0,  0.0, 0.0,
    ],

    // 纹理坐标
    coord:[

        0.0,  1.0,
        1.0,  1.0,
        1.0,  0.0,
        0.0,  0.0,

    ],
    // 顶点索引
    indices:[
        0,  1,  2,      0,  2,  3,
    ]

};


main();

function main() {

    // 使用texture着色
    ia.colorful.useTexture() ;

    iaWorld.initIaWorld();

    let buffers = iaWorld.buffer.textureBuffer.initBuffer( square.positions ,square.coord,square.indices );

    iaWorld.texture.loadTexure( './img/texture1.png',(texture)=>{
            iaWorld.helloIaWorld(buffers,true,texture);
            iaWorld.drawElements();
        });

}