/**
 *  simpleCube
 *
 *  thinkia   2019.5.13
 *
 *  该js 主要演示立方体的绘制
 *
 **/


 main();

 function main() {

     const  canvas = document.querySelector('#glcanvas');
     const gl = canvas.getContext('webgl2');

     if(!gl){

         console.error('not support webgl2');
         return ;

     }

     // Vertex shader
     const vSrc=`
     
        attribute vec4 avPos;
        attribute vec4 avColor;
        
        uniform mat4 umvMat;
        uniform mat4 upMat;
        
        varying lowp vec4 vColor;
        
        void main(void){
            
            gl_Position = upMat * umvMat * avPos;
            vColor = avColor;
            
        } 
     `;

      // Fragment shader

     const fSrc = `
        
        varying lowp  vec4 vColor;
        
        void main(void) {
            gl_FragColor = vColor ;
        }
    
     `;

     // init Ia world

     const sProgram = initIaWorld( gl, vSrc, fSrc );

     const programInfo = {
         program:sProgram,
         attribLocations:{
             vertexPosition:gl.getAttribLocation( sProgram,'avPos'),
             vertexColor:gl.getAttribLocation( sProgram,'avColor'),
         },
         uniformLocations:{
             projectionMatrix:gl.getUniformLocation( sProgram,'upMat'),
             modelViewMatrix:gl.getUniformLocation( sProgram,'umvMat'),

         },
     };

     // init buffers
     const buffers = initBuffers( gl );

     // ia
     let ia = Ia();
     // openEyes
     ia.action.eyes.openEyes();
     // init view
     ia.action.view.jump( [0,0,-5]);
     // add lookIa;   view
     let lookIa = lookControlIa(canvas,ia,1);
     lookIa.rotate.speed = 1.2;


     function render() {

         helloIaWorld( gl,programInfo,buffers,ia );
         requestAnimationFrame( render );

     }

     render();

 }

 function initBuffers( gl ) {

     const posBuffer = gl.createBuffer( );

     gl.bindBuffer( gl.ARRAY_BUFFER,posBuffer );

     // position

     const positions = [

         //front face
         -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
         -1.0,  1.0,  1.0,

         // back
         -1.0, -1.0, -1.0,
         -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0, -1.0,

         //left
         -1.0, -1.0, -1.0,
         -1.0, -1.0,  1.0,
         -1.0,  1.0,  1.0,
         -1.0,  1.0, -1.0,

         // right
         1.0, -1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0,  1.0,  1.0,
         1.0, -1.0,  1.0,

         // top
         -1.0,  1.0, -1.0,
         -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,

         // bot
         -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0, -1.0,  1.0,
         -1.0, -1.0,  1.0,

     ];

     // bufferData

     gl.bufferData( gl.ARRAY_BUFFER,new Float32Array(positions),gl.STATIC_DRAW );

     // faceColors
     const faceColors = [

         [1.0,  1.0,  1.0,  1.0],    // front : white
         [1.0,  0.0,  0.0,  1.0],    // back  : red
         [0.0,  1.0,  0.0,  1.0],    // left  : green
         [0.0,  0.0,  1.0,  1.0],    // right : blue
         [1.0,  1.0,  0.0,  1.0],    // top   : yellow
         [1.0,  0.0,  1.0,  1.0],    // bot   : purple

     ];

     let colors = [];
     // 为每个顶点定义颜色
     for( let i=0; i<faceColors.length; ++i ){

         const c = faceColors[i];
         colors = colors.concat( c,c,c,c );

     }

     console.log( colors );

     const colorBuffer = gl.createBuffer( );
     gl.bindBuffer( gl.ARRAY_BUFFER,colorBuffer );
     gl.bufferData( gl.ARRAY_BUFFER,new Float32Array( colors ),gl.STATIC_DRAW );

     // 顶点索引
     const indexBuffer = gl.createBuffer();
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

     const indices = [
         0,  1,  2,      0,  2,  3,    // front
         4,  5,  6,      4,  6,  7,    // back
         8,  9,  10,     8,  10, 11,   // left
         12, 13, 14,     12, 14, 15,   // right
         16, 17, 18,     16, 18, 19,   // top
         20, 21, 22,     20, 22, 23,   // bot

     ]

     gl.bufferData( gl.ELEMENT_ARRAY_BUFFER , new Uint16Array( indices ),gl.STATIC_DRAW );

     // 返回 顶点 颜色 索引
     return {

        position:posBuffer,
        color:colorBuffer,
        indices:indexBuffer

     };
 }

 // hello  Ia world

function helloIaWorld( gl,programInfo,buffers,ia ) {

     // clear

    gl.clearColor( 0.0,0.0,0.0,1.0 );
    gl.clearDepth( 1.0 );
    gl.enable( gl.DEPTH_TEST );
    gl.depthFunc( gl.LEQUAL );

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    // Ia's eyes and view

    let upMat = ia.eyes.mat4;
    let umvMat = ia.view.mat4;

    // vPos   buffer
    {
        const numComponents = 3;
        const type =gl.FLOAT;
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
            offset
        );
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    }

    // vColor buffer
    {
           const numComponents = 4;
           const type = gl.FLOAT;
           const normalize = false;
           const stride = 0;
           const offset = 0;
           gl.bindBuffer( gl.ARRAY_BUFFER, buffers.color );
           gl.vertexAttribPointer(
               programInfo.attribLocations.vertexColor,
               numComponents,
               type,
               normalize,
               stride,
               offset
           );
           gl.enableVertexAttribArray( programInfo.attribLocations.vertexColor );

    }

    // index
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, buffers.indices );

    // useProgram

    gl.useProgram( programInfo.program );

    // shader uniforms
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        upMat
    );
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        umvMat
    );

    {
        // 6个面  12个三角形  36个顶点
        const vertexCount =36;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        //  索引数组的每个元素都是简单的整数类型
        gl.drawElements( gl.TRIANGLES , vertexCount,type,offset );

    }


}

// init Ia world

function initIaWorld( gl,vSrc,fSrc ) {

     const vShader = loadShader( gl,gl.VERTEX_SHADER,vSrc );
     const fShader = loadShader( gl,gl.FRAGMENT_SHADER,fSrc );

     // shader program

    const sProgram = gl.createProgram();
    gl.attachShader( sProgram,vShader );
    gl.attachShader( sProgram,fShader );
    gl.linkProgram( sProgram );

    // check
    if( !gl.getProgramParameter( sProgram,gl.LINK_STATUS )){

        console.error(`error: ${gl.getProgramInfoLog(sProgram)}`);
        return ;
    }

    return sProgram;

 }

 // loaderShader
function loadShader( gl,type,src ) {

     const shader = gl.createShader( type );

     gl.shaderSource( shader,src );

     // compile
     gl.compileShader( shader );

     // check

    if( !gl.getShaderParameter(shader,gl.COMPILE_STATUS )){

        console.error(`error: ${gl.getShaderInfoLog(shader)}`);
        return null;

    }

    return shader;

 }
