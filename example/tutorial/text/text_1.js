/**
 *
 *   文字标签示例  2019.6.26  thinkia
 *   根据三维坐标，计算屏幕坐标    将文字设置到屏幕坐标中
 *
 *   其实刚好与射线的原理相反：
 *
 *   射线是点击屏幕生成射线，已知二维坐标通过投影的逆矩阵  把而维坐标换算成三维坐标；
 *   本示例：已知三维坐标通过投影矩阵  将三维坐标转换成二维坐标
 *
 * */

let ia = Ia();

let iaWorld = ia.world;

let triangle ={
    positions : [
        0.0,0.0,
        0.0,1.0,
        1.0,1.0,
    ],
    colors:[],
}

for( let i=0;i<triangle.positions.length/2;i++)
{
    triangle.colors.push(1.0,0.0,0.0,1.0);
}


main();

function main() {

    let font = document.getElementById('testFont');

    let screen={
        x:0,
        y:0,
    }


    iaWorld.initIaWorld( );

    let buffers = iaWorld.buffer.positionBuffer.initBuffer( triangle.positions ,triangle.colors );

    render();
    function render(){

        ia.action.view.rotate([1,1,1], Math.PI/180);
        setFont();
        iaWorld.helloIaWorld( buffers );
        iaWorld.drawTriangle();
        requestAnimationFrame( render)

    }

    function setFont() {

        // 获取[1.0,1.0,0.0]  的三维坐标   mv变换后的坐标
        let vec3 = ia.thinkMath.vec3.applyMat4([1.0,1.0,0.0],ia.view.mat4 );

        // 获取 投影变换后坐标
        ia.thinkMath.vec3.applyMat4(vec3,ia.eyes.mat4 );

        // 坐标换算(  -1 , 1)   因为 window 的宽高 刚好等于 canvas的宽高  ； 实际上要使用canvas的宽高才更合适;
        screen.x = window.innerWidth*(vec3[0] +1)/2;

        screen.y =  window.innerHeight*( 1-vec3[1] )/2;

        // 设置文字位置
        font.style=`left:${screen.x}px;top:${screen.y}px;`;

    }


}
