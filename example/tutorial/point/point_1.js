/**
 *  2019.6.6
 *
 *  这里将使用ia 绘制工具类  ia.world 演示如何绘制一个点
 *
 *
 **/

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

 main();

 function main() {

     // Vertex shader   顶点着色    顶点三维坐标以及大小
     const vSrc = `
        attribute vec4 avPos;

        uniform mat4 umvMat;
        uniform mat4 upMat;

        void main() {
          gl_Position = upMat * umvMat * avPos;
          gl_PointSize = 10.0;
        }
        `;

     // Fragment shader  片元着色
     const fSrc = `
            void main() {
              gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
            }
        `;

     const canvasId = '#glcanvas';

     //  初始化着色程序

     const shaderProgram = ia.world.initIaWorld( canvasId, vSrc, fSrc );

     let gl = ia.world.getGL();

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

     let positions = [
         1.0,0.0,
         -1.0,0.0,
     ];

     const buffers = ia.world.buffer.positionBuffer.initBuffer( positions );

     // 绘制并显示图像

     ia.world.helloIaWorld( programInfo,buffers );

     const offset = 0;
     // 顶点数量
     const vertexCount = 2;

     gl.drawArrays( gl.POINTS, offset, vertexCount );

 }

