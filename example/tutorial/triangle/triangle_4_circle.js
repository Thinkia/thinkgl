/**
 * 2019.6.10
 *
 * 这里演示用 drawTriangle( 3 ) 方法绘制多个三角形组成圆
 *
 */


let ia = Ia();

let iaWorld = ia.world;

ia.action.view.jump([0,0,-5]);


let n = 100;

let positions =[0.0,0.0];

let colors = [ 1.0,0.0,0.0,1.0];   //  red

let r = 1.0;

// 把圆分成n份

for (let i = 0; i <= n; i++) {

    let theta = i * 2 * Math.PI /n;
    let x = r * Math.sin(theta) ;
    let y = r * Math.cos(theta) ;

    positions.push(x, y);

    i%2==0?colors.push( 1.0,0.0,0.0,1.0 ):colors.push( 0.0,0.0,0.0,1.0 );

}


main();

function main() {

    iaWorld.initIaWorld( );

    let buffers = iaWorld.buffer.positionBuffer.initBuffer( positions ,colors );

    iaWorld.helloIaWorld( buffers );

    iaWorld.drawTriangle( 3 );


}