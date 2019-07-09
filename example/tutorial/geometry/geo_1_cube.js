/**
 * 2019.6.13
 *
 * 这里演示  分别用线和三角形绘制一个立方体   每隔2秒切换绘制方式
 *
 * 值得注意的是 我们的顶点组成要设置为3   iaWorld.vAttrib.numComponents=3
 *
 *
 */

let ia = Ia();

let iaWorld = ia.world;

ia.action.view.jump([0,0,-5]);


iaWorld.vAttrib.numComponents =3;

let positions = [

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

let colors = [

];

for(let i=0;i<=positions.length/iaWorld.vAttrib.numComponents;i++)
{
    colors.push(1.0,0.0,0.0,1.0);
}


let times = 0;

let maxTimes = 240;

let halfTimes = maxTimes/2;

main();

function main() {

    iaWorld.initIaWorld( );

    let buffers = iaWorld.buffer.positionBuffer.initBuffer( positions ,colors );

    render()

    function render() {

        ia.action.view.rotate([0,1,1],1*Math.PI/180);

        iaWorld.helloIaWorld( buffers );
        times++;
        if( times<halfTimes )
            iaWorld.drawLines(3);
        else
            iaWorld.drawTriangle(3);

        if(times>maxTimes) times=0;

        requestAnimationFrame( render );

    }


}