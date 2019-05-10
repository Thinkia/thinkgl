/**
 *  Ia's  walk
 *
 *  thinkia 2019.5.10
 *
 *  该Js 主要演示 view 平移动画
 *
 * */

main();

function main() {

    const canvas = document.querySelector('#glcanvas');
    const gl = canvas.getContext( 'webgl2');

    if( !gl ){
        console.error('Not support webgl2');

        return ;
    }

    // Vertex shader

    const vSrc =`
        
        attribute vec4 avPos;
        attribute vec4 avColor;
        
        uniform mat4 umvMat;
        uniform mat4 upMat;
        
        varying vec4 vColor;
        
        void main(void) {
        
            gl_Position = upMat * umvMat * avPos;
            vColor = avColor;
        
        }
   
    `

    // Fragment shader

    const fSrc = `
        
        varying lowp vec4 vColor;
        
        void main( void ) {
        
                gl_FragColor = vColor;
        
        }
    
    `

    // init Ia world

    const shaderProgram = initIaWorld( gl, vSrc , fSrc );

    const programInfo = {

            program : shaderProgram,
            attribLocations : {

                vertexPosition : gl.getAttribLocation( shaderProgram, 'avPos' ),
                vertexColor  : gl.getAttribLocation( shaderProgram , 'avColor'),

            },

            uniformLocations : {

                projectionMatrix : gl.getUniformLocation( shaderProgram, 'upMat' ),
                modelViewMatrix :  gl.getUniformLocation( shaderProgram , 'umvMat' ),

            },

    };

    // init Buffers
    const  buffers = initBuffers( gl );

    // Ia

    let ia = Ia();

    // 初始化 透视矩阵
    ia.action.eyes.openEyes();

    ia.action.view.jump( [ 0,0,-5 ]);

    function render() {

        // walk [ -3,0,0 ]  120 frame  = 2s
        ia.action.view.walk( [ -3,0,0 ] , 120 );
        helloIaWorld( gl , programInfo , buffers, ia );

        requestAnimationFrame( render );
    }

    render () ;

}

    function initBuffers( gl ) {

        // position Buffer

        const posBuffer = gl.createBuffer( );

        gl.bindBuffer( gl.ARRAY_BUFFER , posBuffer );

        const positions = [

            1.0,  1.0,
            -1.0,  1.0,
            1.0, -1.0,
            -1.0, -1.0,

        ]

        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(positions) , gl.STATIC_DRAW );

        const colors = [
            1.0,  1.0,  1.0,  1.0,    // white
            1.0,  0.0,  0.0,  1.0,    // red
            0.0,  1.0,  0.0,  1.0,    // green
            0.0,  0.0,  1.0,  1.0,    // blue
        ]

        const  colorBuffer = gl.createBuffer( );

        gl.bindBuffer( gl.ARRAY_BUFFER, colorBuffer );

        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(colors) , gl.STATIC_DRAW );

        return {
            position: posBuffer,
            color : colorBuffer
        };
    }

    // hello Ia world

    function helloIaWorld( gl,programInfo,buffers,ia ) {

        // clear
        gl.clearColor( 0.0,0.0,0.0,1.0 );
        gl.clearDepth( 1.0 );
        gl.enable ( gl.DEPTH_TEST );
        gl.depthFunc( gl.LEQUAL );

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

        // ia  mat4

        const upMat = ia.eyes.mat4;
        const umvMat = ia.view.mat4;


        // buffer avPos

        {
            const numComponents = 2 ;
            const type = gl.FLOAT ;
            const normalize = false ;
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

            gl.enableVertexAttribArray ( programInfo.attribLocations.vertexPosition );

        }

        // avColor

        {
            const numComponents = 4 ;
            const type = gl.FLOAT ;
            const normalize = false;
            const stride = 0;
            const offset = 0;

            gl.bindBuffer( gl.ARRAY_BUFFER, buffers.color );

            gl.vertexAttribPointer (
                programInfo.attribLocations.vertexColor ,
                numComponents,
                type,
                normalize,
                stride,
                offset
            );

            gl.enableVertexAttribArray ( programInfo.attribLocations.vertexColor );

            // use Program

            gl.useProgram( programInfo.program );

            //  set the shader uniforms

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
                const vertexCount = 4 ;
                gl.drawArrays( gl.TRIANGLE_STRIP, offset , vertexCount );

            }

        }

    }


    //  init shader program   ia world

    function initIaWorld( gl,vSrc,fSrc ) {

        const vShader = loadShader( gl, gl.VERTEX_SHADER,vSrc );
        const fShader = loadShader( gl, gl.FRAGMENT_SHADER, fSrc );

        const shaderProgram = gl.createProgram();
        gl.attachShader( shaderProgram, vShader );
        gl.attachShader( shaderProgram, fShader );
        gl.linkProgram( shaderProgram );

        // check

        if( ! gl.getProgramParameter( shaderProgram, gl.LINK_STATUS)){

            console.error(`error: ${gl.getProgramInfoLog( shaderProgram ) }`);
            return null;
        }

        return shaderProgram;
    }


    // loadShader

    function loadShader( gl, type , src ) {

        const shader = gl.createShader( type ) ;

        gl.shaderSource( shader , src );

        gl.compileShader( shader );

        if( !gl.getShaderParameter( shader , gl.COMPILE_STATUS ))
        {

            console.error( ` error: ${gl.getShaderInfoLog( shader )}`);
            gl.deleteShader( shader );
            return null;

        }
        return shader ;

    }
