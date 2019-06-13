/**
 * 2019.6.12
 *
 *  这里演示用三角画一个桃心; 原理同画圆
 *  桃心填充    增加视角控制
 *
 */

let ia = Ia();

let iaWorld = ia.world;

let heart ={
    positions:[0.0,0.0],
    colors:[ 1.0,0.0,0.0,1.0 ]
}


let n =99;

let a = 0.1;

// 桃心方程

for ( let i =1;i<n;i++)
{
    let theta = i *2.0 * Math.PI /n;

    let x = 16*Math.pow(Math.sin(theta),3);

    let y = 13*Math.cos(theta) - 5*Math.cos(2*theta)-2*Math.cos(3*theta) -Math.cos(4*theta);

    heart.positions.push(a*x,a*y);

    heart.colors.push(1.0,0.0,0.0,1.0);

}


main();

function main() {

    iaWorld.initIaWorld( );

    let buffers = iaWorld.buffer.positionBuffer.initBuffer( heart.positions ,heart.colors );


    // 增加视角控制
    lookControlIa(iaWorld.canvas,ia,);


    render()

    function render() {
        iaWorld.helloIaWorld( buffers );

        iaWorld.drawTriangle(3);
        requestAnimationFrame( render );
    }


}