/**
 * 2019.6.25
 *
 *
 * 资源为 历史卷宗，涉密文件
 *
 */

let ia = Ia();

let iaWorld = ia.world;


ia.action.view.jump([-4,-0,-15]);


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



        // C Left face
        -0.0, -1.0, -6.0,
        -0.0, -1.0,  -1.0,
        -0.0,  1.0,  -1.0,
        -0.0,  1.0, -6.0,

        // C Front face
        -0.0, -1.0,  -1.0,
         5.0, -1.0,  -1.0,
         5.0,  1.0,  -1.0,
        -0.0,  1.0,  -1.0,

        //C  Back face
        0.0, -1.0, -4.0,
        0.0,  1.0, -4.0,
        5.0,  1.0,  -4.0,
        5.0, -1.0,  -4.0,

        //C Bottom face
        -0.0, -1.0, -4.0,
        5.0, -1.0, -4.0,
        5.0, -1.0,  -1.0,
        -0.0, -1.0,  -1.0,

        // C Right face
        5.0, -1.0, -4.0,
        5.0,  1.0, -4.0,
        5.0,  1.0,  -1.0,
        5.0, -1.0,  -1.0,
    ],

    // 纹理坐标
    coord:[

        0.0,  0.0,
        0.5,  0.0,
        0.5,  0.5,
        0.0,  0.5,

        // Back
        0.5,  0.5,
        1.0,  0.5,
        1.0,  1.0,
        0.5,  1.0,
        // Top
        0.3,  0.3,
        0.8,  0.3,
        0.8,  0.8,
        0.3,  0.8,
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

        // C Left
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,

        // C Front
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,

        // C Back
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,

        // C Bottom
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,

        // C Right
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

        24, 25, 26,     24, 26, 27,   // Cleft

        28, 29, 30,     28, 30, 31,   // C front
        32, 33, 34,     32, 34, 35,   // C Back
        36, 37, 38,     36, 38, 39,   // C Bot
        40, 41, 42,     40, 42, 43,   // C Right

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
        -1,0,0,

        //C  left
        -1,0,0,

        // C front
        0,0,1,

        //C back
        0,0,-1,

        //C bot
        0,-1,0,

        //C right
        1,0,0,
    ],

}


let baseNormal=[0,0,1];

let rotateAngle = 0;

let normalAngele = 90;

let uvMapUrl = './src/localData/1.jpg';

let faceNum = cube.normals.length/3;

main();

function main() {


    // 使用texture着色
    ia.colorful.useTexture();


    iaWorld.initIaWorld(false);


    // 增加视角控制
    lookControlIa(iaWorld.canvas, ia,);



    let buffers = iaWorld.buffer.textureBuffer.initBuffer(cube.positions, cube.coord, cube.indices);


    // 纹理加载完毕之后渲染

    iaWorld.texture.loadTexure( uvMapUrl, () => {

        render();

        function render() {

            iaWorld.helloIaWorld(buffers, false);


            // 绘制6个面
            for (let i = 0; i < faceNum; i++) {
                // 原始法向量
                let faceNormal = [cube.normals[3 * i], cube.normals[3 * i + 1], cube.normals[3 * i + 2]];

                // 当前法向量
                let dir = ia.thinkMath.vec3.applyMat4(faceNormal, ia.view.mat4);
                let ori = ia.thinkMath.vec3.applyMat4([0, 0, 0], ia.view.mat4);

                let curNormal = [dir[0] - ori[0], dir[1] - ori[1], dir[2] - ori[2]];

                rotateAngle = ia.thinkMath.vec3.applyVec3(baseNormal, curNormal);

                if (rotateAngle > normalAngele)
                {
                    iaWorld.drawTexture(i * 12, 6);

                }

            }
           // iaWorld.drawTexture(10 * 12, 6);
            requestAnimationFrame(render)

        }

    });


}