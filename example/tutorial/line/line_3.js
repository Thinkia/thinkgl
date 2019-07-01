/**
 * 2019.6.12
 *
 * 这里演示  线的基本旋转动画
 *
 */

let ia = Ia();

let iaWorld = ia.world;

ia.action.view.jump([0,0,-5])

let positions = [
    0.0,0.0,
    3.0, 0.0,

];

let colors = [

    1.0,0.0,0.0,1.0,   //  red
    1.0,0.0,0.0,1.0,   //  red

];

main();

function main() {

    iaWorld.initIaWorld( );

    let buffers = iaWorld.buffer.positionBuffer.initBuffer( positions ,colors );

    render();

    function render() {

        // 绕向量[0,0,-1] 每帧旋转 2度     60f/s

        ia.action.view.rotate([0,0,-1],2*Math.PI/180);

        iaWorld.helloIaWorld( buffers );


        iaWorld.drawLines();

        requestAnimationFrame(render)

    }


}