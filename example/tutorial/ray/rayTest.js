/**
 * 2019.10.20
 *
 * rayTest
 *
 */


let ia = Ia();

let iaWorld = ia.world;

ia.action.view.jump([0,0,-1]);

let positions = [

  1.0 , 1.0 , 0.0,
  0.0 , 0.0 , 0.0,
  1.0 , 0.0 , 0.0 ,

];

iaWorld.vAttrib.numComponents =3;

let colors = [

  1.0,0.0,0.0,1.0,   // 红 red
  1.0,0.0,0.0,1.0,   // 红 red
  1.0,0.0,0.0,1.0,   // 红 red

];

main();

function main() {

  iaWorld.initIaWorld( );

  let buffers = iaWorld.buffer.positionBuffer.initBuffer( positions ,colors );

  window.addEventListener( 'click' , onClick , false);

  render();

  function onClick(event) {

    let x =( event.clientX / window.innerWidth ) * 2 - 1;
    let y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    let vec = [ x,y,0.5 ];

    let pMat = ia.eyes.mat4;
    let mvMat = ia.view.mat4;

    let origin = [0,0,0 ];
    // 投影矩阵的逆
    let inversePMat = ia.thinkMath.mat4.getInverse( pMat );

    //获取三维的映射向量
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
    let flag =  ia.thinkMath.vec3.intersectionLinePlane(origin,vec,pointA,pointB,pointC) ;

    if(flag) {
      let colorG = 0
      colors[1] === colorG ? colorG = 1 : colorG = 0;
      for (let i = 1; i< colors.length / 4 +1 ; i ++) {
        colors[4*i - 3] = colorG
      }

      // clear buffer
      iaWorld.gl.deleteBuffer(buffers.color)
      iaWorld.gl.deleteBuffer(buffers.position)

      // new buffer
      buffers = iaWorld.buffer.positionBuffer.initBuffer( positions ,colors )
    }

  }

  function render() {

    ia.action.view.rotate([0,1,0],Math.PI/180);

    iaWorld.helloIaWorld( buffers );

    iaWorld.drawTriangle(2);

    requestAnimationFrame(render)

  }

}
