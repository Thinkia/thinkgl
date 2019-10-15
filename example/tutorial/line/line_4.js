    /**
 * 2019.6.12
 *
 * 这里演示  多条线的运动   时钟动画
 *
 *
 */


// 圆
let ia_circle = Ia();

// 时针
let ia_line1 = Ia();

// 分针
let ia_line2 = Ia();

// 秒针
let ia_line3 = Ia();


let circle = {
    positions:[],
    colors:[],
}

let line1 = {
    positions:[

      0.0,0.0,
      0.0,1.0

    ],
    colors:[
        1.0,0.0,0.0,1.0,   //  red
        1.0,0.0,0.0,1.0,   //  red

    ],
}

let line2 = {

    positions:[

        0.0,0.0,
        0.0,1.5

    ],
    colors:[

        0.0,0.0,1.0,1.0,
        0.0,0.0,1.0,1.0,

    ],

}

let line3 = {

    positions:[

        0.0,0.0,
        0.0,2.0

    ],
    colors:[

        0.0,1.0,0.0,1.0,
        0.0,1.0,0.0,1.0,

    ],

}

// 圆的份数
let n = 64;
// 半径
let r = 2.0;

for (let i = 0; i <= n; i++) {

    let theta = i * 2 * Math.PI /n;
    let x = r * Math.sin(theta) ;
    let y = r * Math.cos(theta) ;

    circle.positions.push(x, y);

    circle.colors.push( 1.0,0.0,0.0,1.0 )

}


main();

function main() {

    // 圆
    ia_circle.world.initIaWorld();

    let buffers = ia_circle.world.buffer.positionBuffer.initBuffer( circle.positions ,circle.colors );

    // 时针

    ia_line1.world.initIaWorld( false);
    let buffers1 = ia_line1.world.buffer.positionBuffer.initBuffer( line1.positions,line1.colors);

    // 分针

    ia_line2.world.initIaWorld( false);
    let buffers2= ia_line2.world.buffer.positionBuffer.initBuffer( line2.positions,line2.colors);

    // 秒针

    ia_line3.world.initIaWorld( false);
    let buffers3= ia_line3.world.buffer.positionBuffer.initBuffer( line3.positions,line3.colors);

    render();

    function render() {

        // 时间比实际快了十倍

        // 圆
        ia_circle.world.helloIaWorld( buffers);
        ia_circle.world.drawLines( );

        // 时针     正常值应该为3600秒  这里取的是360秒
        ia_line1.action.view.rotate([0,0,-1],Math.PI/(3 * 60 *360));

        ia_line1.world.helloIaWorld( buffers1, false);
        ia_line1.world.drawLines( 3);


        // 分针
        ia_line2.action.view.rotate([0,0,-1],Math.PI/(3 * 60 *60));

        ia_line2.world.helloIaWorld( buffers2, false);
        ia_line2.world.drawLines( 3);


        // 秒针
        ia_line3.action.view.rotate([0,0,-1],Math.PI/(3 * 60 ));

        ia_line3.world.helloIaWorld( buffers3, false);
        ia_line3.world.drawLines( 3);


        requestAnimationFrame(render)

    }



}
