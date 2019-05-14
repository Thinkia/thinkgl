/**
 *  Ia's  ray
 *
 *  thinkia 2019.5.14
 *
 *  该js 主要演示射线
 *
 * */

main ()


function main() {

    let pointA = [ 1,1,0 ];
    let pointB = [ 0,0,0 ];
    let pointC = [ 1,0,0 ];
    let ori  = [ 0.5,0.5,0  ];
    let target = [ 0.5,0.5, 1 ];
    let ia = Ia();
    // 面积计算测试
    console.log( ia.thinkMath.vec3.triangleArea( pointA,pointB,pointC ) );

    // 平面方程测试
    console.log( ia.thinkMath.vec3.planeEquation( pointA,pointB,pointC )) ;

    // 交点测试

    console.log( ia.thinkMath.vec3.intersectionLinePlane( ori,target,pointA,pointB,pointC ))

}
