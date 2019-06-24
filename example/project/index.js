/**
 * 2019.6.24
 *
 * 房屋绘制
 *
 *
 */

let ia = Ia();

let iaWorld = ia.world;

ia.action.view.jump([-5,0,-15]);


iaWorld.vAttrib.numComponents =3;

let positions = [

    //front face
    -1.0, -1.0,  2.0,
     1.0, -1.0,  2.0,
     1.0,  1.0,  2.0,

    -1.0, -1.0,  2.0,
     1.0,  1.0,  2.0,
    -1.0,  1.0,  2.0,


];

let colors = [

];

let normal = [

    0,0,1,

]


for(let i=0;i<=positions.length/iaWorld.vAttrib.numComponents;i++)
{
    colors.push(1.0,0.0,0.0,0.3);
}

let rotateAngle =0;

main();

function main() {

    document.getElementById('glcanvas').addEventListener('click',()=>{

        let ori =[0,0,0];

        let dir=[0,0,1];

        let result=[];

        let rotateAngle;

        ia.thinkMath.vec3.applyMat4( ori,ia.view.mat4 );
        ia.thinkMath.vec3.applyMat4( dir,ia.view.mat4 );

        for(let i=0;i<3;i++)
        {
            result[i] = dir[i] - ori[i];
        }

        rotateAngle = ia.thinkMath.vec3.applyVec3(result,[0,0,1]  );

        console.log( result);

        console.log(`转角为：${ rotateAngle }`);

    })

    iaWorld.initIaWorld( );

    let buffers = iaWorld.buffer.positionBuffer.initBuffer( positions ,colors );

    // 增加视角控制
    lookControlIa(iaWorld.canvas,ia,);

    render()

    function render() {

        iaWorld.helloIaWorld( buffers );
        iaWorld.drawTriangle(1,3,3);
        iaWorld.drawTriangle(1,0,3);

        requestAnimationFrame( render );

    }


}