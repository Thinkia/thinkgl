/**
 * 2019.10.20
 *
 * 这里演示通过uv播放雪碧图  实现gif效果
 *
 * */

let ia = Ia();

let iaWorld = ia.world;

// 平移
ia.action.view.jump([-0.5,-0.5,2]);

let lv = 2.0;

let square = {

  //顶点坐标
  positions:[

    0.0,  1.0, 0.0,
    1.0,  1.0, 0.0,
    1.0,  0.0, 0.0,
    0.0,  0.0, 0.0,

  ],

  // 三角面片顶点索引
  indices:[
    0,  1,  2,      0,  2,  3,
  ]

};

let buffers;

let times = 0 , maxTimes = 60 * 0.5
let count =0, maxCount = lv*lv;
let uvArray = []

main();

function main() {


  // 使用texture着色
  ia.colorful.useTexture() ;

  iaWorld.initIaWorld();

  initUVArray()

  buffers = iaWorld.buffer.textureBuffer.initBuffer( square.positions ,uvArray[0],square.indices );

  // 纹理加载完毕之后渲染

  iaWorld.texture.loadTexure( './img/texture1.png',(texture)=>{

    render();
    function render( ) {
      iaWorld.helloIaWorld(buffers);
      iaWorld.drawTexture();
      gifAni()
      requestAnimationFrame(render)
    }

    // gif效果
    function gifAni() {
      if(times === maxTimes) {
        times = 0;
        // clear buffer
        iaWorld.gl.deleteBuffer(buffers.color)
        iaWorld.gl.deleteBuffer(buffers.textureCoord)
        iaWorld.gl.deleteBuffer(buffers.indices)
        buffers = iaWorld.buffer.textureBuffer.initBuffer( square.positions ,uvArray[count],square.indices );
        count++;
        if (count ===maxCount ) count = 0
      }
      times++;

    }

  });

  // 根据UV级别返回uv数组
  function initUVArray(num = lv ) {
    for(let i=0;i<num; i++) {
      for(let j=0;j<num;j++) {
        uvArray.push([
          j/num,(i+1)/num,
          (j+1)/num,(i+1)/num,
          (j+1)/num,i/num,
          j/num,i/num
        ])
      }
    }
  }

}
