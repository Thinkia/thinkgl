/**
 * Ia's jump
 *
 * thikia  2019.5.9
 *
 * 该js主要演示webgl基本片元着色，顶点绘制;
 *
 * 如何使用thinkia.js , 做简单mat4的平移旋转变换;
 *
 */

main();

function main() {

    let canvas = document.querySelector('#glcanvas');

    // 获取webgl 上下文
    let gl = canvas.getContext('webgl2');

    if (!gl) {
        console.error(' not support webgl2.');
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    // Vertex shader   顶点着色
    const vSrc = `
        attribute vec4 avPos;

        uniform mat4 umvMat;
        uniform mat4 upMat;

        void main() {
          gl_Position = upMat * umvMat * avPos;
        }

        `;

    // Fragment shader  片元着色
    const fSrc = `
            void main() {
              gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
            }
        `;

    //  初始化着色程序，以及建立顶点等等

    const shaderProgram = initIaWorld( gl, vSrc, fSrc );

    // 着色程序基本属性

    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation( shaderProgram, 'avPos' ),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation( shaderProgram, 'upMat' ),
            modelViewMatrix: gl.getUniformLocation( shaderProgram, 'umvMat' ),
        },
    };

    // 绘制图像缓存区

    const buffers = initBuffers ( gl );

    // 绘制并显示图像

    helloIaWorld( gl, programInfo, buffers )

}

function initBuffers( gl ) {

    // 方块位置缓冲区 .

    const positionBuffer = gl.createBuffer();

    // 使用positionBuffer 作为应用缓冲区

    gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );

    // 顶点数组. 绘制顺序为 [0,1,2]  [1,2,3]  两个三角形 组成正方形

    const positions = [
        1.0,  1.0,
        -1.0,  1.0,
        1.0, -1.0,
        -1.0, -1.0,
    ];

    // 创建Float32 ，填充当前缓冲区


    gl.bufferData( gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW );

    return {
        position: positionBuffer,
    };
}

// 绘制并显示三维世界

function helloIaWorld( gl , programInfo, buffers ) {

    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // rgba 值
    gl.clearDepth(1.0);                 // 清除所有图层
    gl.enable(gl.DEPTH_TEST);           // 开启深度测试
    gl.depthFunc(gl.LEQUAL);            // 遮挡效果

    // 清理canvas.

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    /*

         想象自己处在一个叫做ia 的三维空间，张开眼睛观察着这个世界；

         eyes.mat4 是一个透视矩阵；

         view 是我们眼睛所观察的物体；

     */

    let ia = Ia();

    // 初始化透视矩阵
    ia.action.eyes.openEyes();

    // 观察的矩形 向 z轴的反方向跳跃了5个距离;

    ia.action.view.jump( [0,0,-5] );

    // 绕向量[0,1,0] 自转45度
    ia.action.view.rotate( [0,1,0],45*Math.PI/180 );

    // u :uniform   pMat: 投影矩阵
    const upMat = ia.eyes.mat4;

    // u:uniform  mvMat : mv矩阵
    const umvMat = ia.view.mat4;


    // 顶点属性.
    {
        const numComponents = 2;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer( gl.ARRAY_BUFFER, buffers.position );
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
            programInfo.attribLocations.vertexPosition);
    }

    // 使用我们自定义的着色属性

    gl.useProgram( programInfo.program );

    // 设置 uniforms

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        upMat);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        umvMat);

    {
        const offset = 0;
        // 顶点数量
        const vertexCount = 4;
        gl.drawArrays( gl.TRIANGLE_STRIP, offset, vertexCount );
    }

}

// 准备着色
function initIaWorld( gl, vSrc, fSrc  ) {

    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vSrc);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fSrc);

    // 创建着色程序

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // 异常处理

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;


}

// 载入着色资源
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // 将源发送给 shader object

    gl.shaderSource(shader, source);

    // 编译 shader program

    gl.compileShader(shader);

    // 异常处理

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;

}