/**
 *
 *  演示加载一个怪兽点云模型 循环动画    2019.6.19

 *  关于 动画函数这里只做了浅封装， 这里只是为了演示功能，暂时未加入  thinkia.js
 *
 *
 *
 */


let ia = Ia();

let iaWorld = ia.world;

ia.action.view.jump([0,0,-100])

let monster = {

    positions:[],
    colors:[],

}

// 最大帧
let maxFrame;

//当前帧
let curFrame = 0;

// 循环计时
let times = 0;

let maxTimes = 2;

// 资源路径
let monster_url = '../src/monster.json'
let buffers;

iaWorld.jsonObj.loadJson( monster_url,( data )=>
{

    maxFrame = data.morphTargets.length;

    // 使用三维坐标点
    ia.colorful.useSimplePoint(3 );

    iaWorld.initIaWorld();

    // 增加视角控制
    lookControlIa(iaWorld.canvas,ia);


    curMonster();
    render();

    function curMonster( )
    {

        //初始化点云坐标
        for(let i=0;i<data.morphTargets[curFrame].vertices.length;i++)
        {
            monster.positions[i] = data.morphTargets[curFrame].vertices[i];
        }

        // 坐标缩小100
        for (let i= 0;i<monster.positions.length;i++) {

            monster.positions[i]/=100.0;

        }

        // 清空颜色数组
        monster.colors=[];

        // 初始化颜色值  均为红色
        for(let i=0;i<monster.positions.length/3;i++) {

            monster.colors.push( 1.0,0.0,0.0,1.0 );

        }

        buffers = iaWorld.buffer.positionBuffer.initBuffer( monster.positions ,monster.colors );

    }

    function render() {

        times++;
        if(times>maxTimes)
        {
            times=0;

            // 释放buffer;
            iaWorld.gl.deleteBuffer(buffers.colors);
            iaWorld.gl.deleteBuffer(buffers.position);

            // 下一帧数据
            curFrame++;
            curMonster();
            if(curFrame==maxFrame-1)
            {
                //循环
                curFrame=0;
            }

        }

        iaWorld.helloIaWorld( buffers, );

        iaWorld.drawPoints(2);

        requestAnimationFrame(render);
    }

})


