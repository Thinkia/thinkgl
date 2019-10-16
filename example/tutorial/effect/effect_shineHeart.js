/**
 * 2019.10.15
 *
 *  这里用thinkgl 绘制shineHeart 效果
 *  参考：https://thinkia.github.io/three-Effect/examples/shineHeart.html
 *
 */

let ia = Ia();
let effect_ia = Ia();

let iaWorld = ia.world;

let effect_iaWorld = effect_ia.world;

let heart ={
  positions:[ ],
  colors:[ ]
}

let shinePoint = {
  positions:[],
  colors:[]
}

let n =500;

let a = 0.08;

// 桃心方程

for ( let i =1;i<n;i++)
{
  let theta = i *2.0 * Math.PI /n;

  let x = 16*Math.pow(Math.sin(theta),3);

  let y = 13*Math.cos(theta) - 5*Math.cos(2*theta)-2*Math.cos(3*theta) -Math.cos(4*theta);

  heart.positions.push(a*x,a*y);

  heart.colors.push(1.0,0.0,0.0,0.65);

}
let times = 0;
let maxTimes = heart.positions.length/2 -1


main();

function main() {

  iaWorld.initIaWorld();
  // 开启混合，透明模式
  iaWorld.blend2opacity()
  effect_iaWorld.initIaWorld();
  effect_iaWorld.blend2opacity()
  let buffers = iaWorld.buffer.positionBuffer.initBuffer( heart.positions ,heart.colors );
  let effect_buffers = effect_iaWorld.buffer.positionBuffer.initBuffer( shinePoint.positions ,shinePoint.colors );
  render()

  function render() {
    times++
    iaWorld.helloIaWorld( buffers,false );
    iaWorld.drawLines(2);
    shinePoint.positions.push(heart.positions[2*times ],heart.positions[2*times -1 ])
    shinePoint.colors.push(1.0,0.0,0.0,1.0)
    // 衰减效果
    for (let i =1;i<times;i++) {
      shinePoint.colors[ i*4 - 1] -=0.008
    }
    let size = Math.abs(shinePoint.positions[0]) + 4
    // 清除buffer
    effect_iaWorld.gl.deleteBuffer(effect_buffers.color)
    effect_iaWorld.gl.deleteBuffer(effect_buffers.position)
    // 创建新buffer
    effect_buffers = effect_iaWorld.buffer.positionBuffer.initBuffer( shinePoint.positions ,shinePoint.colors );
    effect_iaWorld.helloIaWorld( effect_buffers,false );
    effect_iaWorld.drawPoints(size);

    if(times == maxTimes) {
      times = 0
      shinePoint.positions = []
      shinePoint.colors = []
    }
    requestAnimationFrame( render );
  }
}
