/**
 * 2019.6.13
 *
 * 这里演示  单面渲染;
 *
 *
 */

let ia = Ia();

let iaWorld = ia.world;

ia.action.view.jump([0,0,-5]);


iaWorld.vAttrib.numComponents =3;

let cube={

    //顶点坐标
    positions:[
        // Front face
        -1.0, -1.0,  1.0,
        1.0, -1.0,  1.0,
        1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,

        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
        1.0,  1.0, -1.0,
        1.0, -1.0, -1.0,

        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
        1.0,  1.0,  1.0,
        1.0,  1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,

        // Right face
        1.0, -1.0, -1.0,
        1.0,  1.0, -1.0,
        1.0,  1.0,  1.0,
        1.0, -1.0,  1.0,

        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,

    ],

    // 纹理坐标
    coord:[

        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,

        // Back
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Top
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Bottom
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Right
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Left
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
    ],
    // 三角面片顶点索引
    indices:[
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // back
        8,  9,  10,     8,  10, 11,   // top
        12, 13, 14,     12, 14, 15,   // bottom
        16, 17, 18,     16, 18, 19,   // right
        20, 21, 22,     20, 22, 23,   // left
    ],

    normals:[
        // front
        0,0,1,

        // back
        0,0,-1,

        //top
        0,1,0,

        //bot
        0,-1,0,

        //right
        1,0,0,

        //left
        -1,0,0

    ],

}

let baseNormal=[0,0,1];

let rotateAngle = 0;

let normalAngele = 90;

main();

function main() {


    // 使用texture着色
    ia.colorful.useTexture() ;

    iaWorld.initIaWorld();

    // 增加视角控制
    lookControlIa(iaWorld.canvas,ia,);

    let buffers = iaWorld.buffer.textureBuffer.initBuffer( cube.positions ,cube.coord,cube.indices );

    // 纹理加载完毕之后渲染

    iaWorld.texture.loadTexure( '../src/monster.jpg',()=>{

        render();
        function render( ) {

            iaWorld.helloIaWorld(buffers,true);

            for( let i=0;i<6;i++)
            {
                // 原始法向量
                let faceNormal = [ cube.normals[3*i],cube.normals[3*i+1],cube.normals[3*i+2] ];

                // 当前法向量
                let dir = ia.thinkMath.vec3.applyMat4( faceNormal,ia.view.mat4 );
                let ori = ia.thinkMath.vec3.applyMat4( [0,0,0],ia.view.mat4 );

                let curNormal = [ dir[0]-ori[0],dir[1]-ori[1],dir[2]-ori[2]];

                rotateAngle = ia.thinkMath.vec3.applyVec3( baseNormal,curNormal );

                if( rotateAngle >normalAngele )
                iaWorld.drawTexture(i*12,6 );


            }


            requestAnimationFrame(render)

        }

    });



}