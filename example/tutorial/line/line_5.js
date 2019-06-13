/**
 * 2019.6.12
 *
 *  画一个胖胖的爱心吧          x^2 + ( y - x^3/2)^2 = 1
 *
 */

let ia = Ia();

let iaWorld = ia.world;

let heart ={
   positions:[],
   colors:[]
}

// 爱心顶点数   越多越饱满
let n = 999;

// 爱心缩放系数
let a = 0.5;

// 心尖系数

let b =1.2;

for ( let i =1;i<n;i++)
{
    let theta = i *2.0 * Math.PI /n;

    let x = a *( 2*Math.sin( theta ) - Math.sin(2*theta ));

    let y= a *( 2*Math.cos( theta ) - b*Math.cos(2*theta ));

    heart.positions.push(x,y);

    heart.colors.push(1.0,0.0,0.0,1.0);

}


main();

function main() {

    iaWorld.initIaWorld( );

    let buffers = iaWorld.buffer.positionBuffer.initBuffer( heart.positions ,heart.colors );

    iaWorld.helloIaWorld( buffers );

    iaWorld.drawLines(3);


}