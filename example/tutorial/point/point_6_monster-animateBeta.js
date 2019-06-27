/**
 *
 *    如果不原地踏步，让它看起来更像在行走
 *
 *
 *    连我也不知道它会走向哪里，有点儿像养了一只智商不太够电子宠物； 我竟然无聊的观察了它十多分钟…………      2019.6.19   thinkia
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
let maxTimes = 3;


// 资源路径
let monster_url = '../src/monster.json'
let buffers;

let dir = 1;

iaWorld.jsonObj.loadJson( monster_url,( data )=>
{

    maxFrame = data.morphTargets.length;

    // 使用三维坐标点
    ia.colorful.useSimplePoint(3 );

    iaWorld.initIaWorld( );


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

        if( curFrame == maxFrame ) return;

        times++;
        if(times>maxTimes)
        {
            times=0;

            // 释放buffer;
            iaWorld.gl.deleteBuffer(buffers.colors);
            iaWorld.gl.deleteBuffer(buffers.position);

            // 下一帧数据
            curFrame++;

            ia.action.view.jump([ dir,0,0]);

          //  ia.action.view.rotate([0,-1,0], Math.PI / maxFrame);

            curMonster();
            if(curFrame==maxFrame-1)
            {
                //循环
                curFrame=0;
                // 随机方向移动
                if(Math.random()>0.5)
                    ia.action.view.rotate([0,1,0],Math.PI)

            }
        }

        iaWorld.helloIaWorld( buffers, );

        iaWorld.drawPoints(2);

        requestAnimationFrame(render);
    }

})


