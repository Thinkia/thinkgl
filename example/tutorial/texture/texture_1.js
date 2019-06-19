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
    // 三角面片顶点索引
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

    // 纹理加载完毕之后渲染

    iaWorld.texture.loadTexure( './img/texture1.png',(texture)=>{

        render();
        function render( ) {

            // todo  为什么纹理在动画渲染的时候会有  严重缺损效果？   2019.6.14  --thinkia
            // 非掉帧问题 2019.6.19                       问题已解决， 必须指定canvas 的宽高
            ia.action.view.rotate([0,1,0],1*Math.PI/180);

            iaWorld.helloIaWorld(buffers,true);
            iaWorld.drawTexture();

            requestAnimationFrame(render)

        }

    });

}