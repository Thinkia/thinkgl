/**
 *
 *  这里演示加载一个怪兽点云模型    2019.6.19
 *
 *  两年前使用three.js的时候曾用过该数据  https://thinkia.github.io/ThreeJs/demos/monster_lv1.html
 *
 *  资源来自 http://www.3drt.com/downloads.htm
 *
 *  后续会演示如何给怪兽贴纹理和动画
 *
 */


let ia = Ia();

let iaWorld = ia.world;

ia.action.view.jump([0,0,-100])

let monster = {

    positions:[],
    colors:[],

}

let monster_url = '../src/monster.json'

iaWorld.jsonObj.loadJson(monster_url,( data )=>
{

    monster.positions = data.vertices;

    // 坐标缩小100
    for (let i= 0;i<monster.positions.length;i++)
    {
        monster.positions[i]/=100.0;
    }

    // 初始化颜色值  均为红色
    for(let i=0;i<monster.positions.length/3;i++)
    {

        monster.colors.push(1.0,0.0,0.0,1.0 );
    }

    // 使用三维坐标点
    ia.colorful.useSimplePoint(3 );

    iaWorld.initIaWorld( );

    let buffers = iaWorld.buffer.positionBuffer.initBuffer( monster.positions ,monster.colors );


    render();

    function render() {

        // 绕向量旋转1度
        ia.action.view.rotate([0,1,0],1*Math.PI/180);

        iaWorld.helloIaWorld( buffers );

        iaWorld.drawPoints(2);

        requestAnimationFrame(render);
    }


})


