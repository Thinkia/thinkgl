/**
 *  Ia's  ray
 *
 *  thinkia 2019.5.14
 *
 *  该js 主要演示射线  打开控制台
 *
 * */

main ()


function main() {

    const canvas = document.querySelector('#glcanvas');

    const gl = canvas.getContext('webgl2');

    if(!gl){
        console.error('Unable to initialize WebGL. Your browser or machine may not support webgl2.');
        return ;
    }

    // vertex shader

    const vSrc = `
    
        attribute vec4 avPos;
        
        uniform mat4 umvMat;
        uniform mat4 upMat;
        
        void main(){
        gl_Position = upMat * umvMat * avPos;
        }
    `;

    //  fragment shader

    const fSrc = `
     
        void main() {
        
        gl_FragColor = vec4( 1.0,0.0,0.0,1.0 );
    }
    `;

    // init Ia world

    const sProgram = initIaWorld( gl, vSrc, fSrc );

    // program Info

    const programInfo ={
        program:sProgram,
        attribLocations:{
            vertexPosition: gl.getAttribLocation( sProgram,'avPos' ),
        },
        uniformLocations:{
            projectionMatrix:gl.getUniformLocation( sProgram, 'upMat'),
            modelViewMatrix: gl.getUniformLocation( sProgram, 'umvMat'),
        },
    };

    const buffers = initBuffers(gl);

    let ia = Ia();

    ia.action.eyes.openEyes();

    ia.action.view.jump( [ -1,0,-4 ]);

   // ia.action.view.rotate([0,1,0], 30*Math.PI/180 )

    // render

    function render() {


        ia.action.view.rotate( [ 0,1,0 ],1*Math.PI/180 );

        helloIaWorld( gl , programInfo, buffers ,ia );

        requestAnimationFrame( render );

    }

    // 执行 render
    render() ;

    canvas.addEventListener('click',( event )=>{

        let x =( event.clientX / window.innerWidth ) * 2 - 1;
        let y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        let vec = [ x,y,0.5 ];

        let pMat = ia.eyes.mat4;
        let mvMat = ia.view.mat4;

        let origin = [0,0,0 ];
        // 投影矩阵的逆
        let inversePMat = ia.thinkMath.mat4.getInverse( pMat );

        //获取三维的映射坐标
        ia.thinkMath.vec3.applyMat4( vec,inversePMat  );

        // 初始顶点坐标   绘制三角形的初始坐标
        let pointA=[ 1.0 , 1.0 , 0.0 ],
            pointB=[ 0.0 , 0.0 , 0.0 ],
            pointC=[ 1.0 , 0.0 , 0.0 ];
        // 经过mv变换
        ia.thinkMath.vec3.applyMat4( pointA,mvMat );
        ia.thinkMath.vec3.applyMat4( pointB,mvMat );
        ia.thinkMath.vec3.applyMat4( pointC,mvMat );

        // 返回有无交点      计算以origin为起始点，vec为终点的向量 和 pointABC三点组成的平面交点  ，若交点在三角形区域则返回true ,且打印交点坐标
        console.log( ia.thinkMath.vec3.intersectionLinePlane(origin,vec,pointA,pointB,pointC)  );


    })


}


function initBuffers( gl ){

    const positionBuffer = gl.createBuffer();

    gl.bindBuffer( gl.ARRAY_BUFFER,positionBuffer );

    // 绘制顶点   三角形

    const positions = [
        1.0,  1.0,
        0.0,  0.0,
        1.0,  0.0,

    ]

    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( positions ), gl.STATIC_DRAW );


    return {
        position:positionBuffer,

    };

}

// holle IaWorld.

function helloIaWorld( gl ,programInfo, buffers,ia ) {
    //  init  clear
    gl.clearColor( 0.0,0.0,0.0,1.0 );
    gl.clearDepth( 1.0 );
    gl.enable( gl.DEPTH_TEST );
    gl.depthFunc( gl.LEQUAL );

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );



    const upMat = ia.eyes.mat4;

    let umvMat = ia.view.mat4;

    // avPos

    {
        const numComponents = 2;
        const type = gl.FLOAT;
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
            offset);
        gl.enableVertexAttribArray(
            programInfo.attribLocations.vertexPosition );

    }


    // use Program

    gl.useProgram( programInfo.program );

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        upMat );

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        umvMat
    )

    {
        const offset = 0;
        const vertexCount = 3;
        gl.drawArrays( gl.TRIANGLE_STRIP , offset, vertexCount );
    }

}

// init IaWorld.

function initIaWorld( gl ,vSrc , fSrc ) {

    const vShader = loadShader( gl,gl.VERTEX_SHADER,vSrc );
    const fShader = loadShader( gl,gl.FRAGMENT_SHADER,fSrc );

    const shaderProgram = gl.createProgram();
    gl.attachShader( shaderProgram, vShader );
    gl.attachShader( shaderProgram, fShader );
    gl.linkProgram( shaderProgram );

    if(!gl.getProgramParameter( shaderProgram, gl.LINK_STATUS ))
    {
        console.error(`error: ${gl.getProgramInfoLog( shaderProgram )}` );
        return ;
    }

    return shaderProgram;

}

// loadShader

function loadShader( gl,type,src ) {

    const  shader = gl.createShader( type );

    gl.shaderSource( shader , src );


    // 编译

    gl.compileShader( shader );

    // 异常检测
    if(!gl.getShaderParameter( shader , gl.COMPILE_STATUS ))
    {
        console.error( `error: ${gl.getShaderInfoLog( shader )}`)
        gl.deleteShader( shader );
        return null ;
    }

    return shader ;
}