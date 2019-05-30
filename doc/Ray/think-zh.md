###关于射线   2019.5.30

####1.如何点击屏幕获取三维坐标？

 + 首先在我们的屏幕中看到的‘三维’实际上是投影的平面，我们能够点击坐标也只是屏幕坐标。
 
       let x =( event.clientX / window.innerWidth ) * 2 - 1;
       
       let y = - ( event.clientY / window.innerHeight ) * 2 + 1;
       
       let vec = [ x,y,0.5 ];
 
   把屏幕分成x（-1，1） y(-1,1) 区域;
 
 +  然后把屏幕点击的点做投影矩阵的逆变换得到一个三维坐标
 
 +     // 投影矩阵的逆
      
       let inversePMat = ia.thinkMath.mat4.getInverse( pMat ); 
       
       //获取三维的映射坐标
      
       ia.thinkMath.vec3.applyMat4( vec,inversePMat  );

 
 ####2.如何判断点中了三角面片？
 
 + 空间中的三角面片其实就是一个三角形区域，要判断射线是否落与一个三角形区域有交点就要
   先计算与该三角平面的交点;三维空间中向量与平面关系无非是平行和相交;
   
 + 在实例rayIa.js中我们绘制的初始三角形为
 
          pointA=[ 1.0 , 1.0 , 0.0 ],
          pointB=[ 0.0 , 0.0 , 0.0 ],
          pointC=[ 1.0 , 0.0 , 0.0 ];      
   经过mvMat变换后的三角形为  
   
          ia.thinkMath.vec3.applyMat4( pointA,mvMat );
          ia.thinkMath.vec3.applyMat4( pointB,mvMat );
          ia.thinkMath.vec3.applyMat4( pointC,mvMat );  
          
 + 射线，空间三角面片的顶点坐标都已准备好，只需要调用方法
   ia.thinkMath.vec3.intersectionLinePlane(origin,vec,pointA,pointB,pointC)     
   即可计算出有无交点;
 
 #### 3.intersectionLinePlane(origin,vec,pointA,pointB,pointC) 方法简要
 
 + 已知三点坐标求平面方程
 
        planeEquation:function ( pointA,pointB,pointC ) {
                     let PE= {
                             A:1,
                             B:0,
                             C:0,
                             D:0,
                     };
                     // 待定系数法
                     PE.A = ( pointC[1] - pointA[1] )*( pointC[2] - pointA[2] ) - ( pointB[2] - pointA[2])*( pointC[1] - pointA[1] );
                     PE.B = ( pointC[0] - pointA[0] )*( pointB[2] - pointA[2] ) - ( pointB[0] - pointA[0])*( pointC[2] - pointA[2] );
                     PE.C = ( pointB[0] - pointA[0] )*( pointC[1] - pointA[1] ) - ( pointC[0] - pointA[0])*( pointB[1] - pointA[1] );
 
                     PE.D = -( PE.A * pointA[0] + PE.B * pointA[1] + PE.C * pointA[2] );
 
                     return PE ;
                 }
 + 首先要判断射线与平面法向量是否垂直
 
        let p1p2 = [ p2[0]-p1[0],p2[1]-p1[1],p2[2]-p1[2] ];
        let PE = ia.thinkMath.vec3.planeEquation( pointA,pointB,pointC );
        let num = PE.A * p1[0] + PE.B * p1[1] + PE.C * p1[2] + PE.D ;
        let den = PE.A * p1p2[0] + PE.B * p1p2[1] + PE.C*p1p2[2];
        // 平行  与法向量垂直
        if( Math.abs(den) <1e-5 )  return false ;  
 + 若与平面有交点，计算交点坐标；再通过面积法判断点是否在三角区域;  
 
        let n = -num/den ;
        for( let i=0;i<3;i++) pointD[i] = p1[i] + n*p1p2[i]; 
        
        // ABC 面积
        let s0 = ia.thinkMath.vec3.triangleArea( pointA,pointB,pointC );
        // DAB 面积
        let s1 = ia.thinkMath.vec3.triangleArea( pointD,pointB,pointC );
        // DBC 面积
        let s2 = ia.thinkMath.vec3.triangleArea( pointA,pointD,pointC );
        // DCA 面积
        let s3 = ia.thinkMath.vec3.triangleArea( pointA,pointB,pointD);
        if( Math.abs( (s1+s2+s3 -s0)) < 1e-6 )
        {
            console.log(`射线交点坐标：${pointD}` ) ;
            return true;
        }
        else
            return false;   
 + 已知三点坐标求面积triangleArea
 
       // 三角形面积
        triangleArea : function ( pointA,pointB,pointC ) {
    
            let area = 0 ;
            let side = [];
    
            side[0] = Math.sqrt( Math.pow(pointA[0] -pointB[0],2) +Math.pow(pointA[1] -pointB[1],2) +Math.pow(pointA[2] -pointB[2],2) );
            side[1] = Math.sqrt( Math.pow(pointB[0] -pointC[0],2) +Math.pow(pointB[1] -pointC[1],2) +Math.pow(pointB[2] -pointC[2],2) );
            side[2] = Math.sqrt( Math.pow(pointC[0] -pointA[0],2) +Math.pow(pointC[1] -pointA[1],2) +Math.pow(pointC[2] -pointA[2],2) );
            // 不能构成三角形
            if( side[0] +side[1] <= side[2] ||side[1] +side[2] <= side[0] ||side[2] +side[0] <= side[1] )  return area;
    
            // 海伦公式： s =sqr(p*(p-a)(p-b)(p-c));
            
            let p = ( side[0]+side[1]+side[2] )/2.0;
    
            area = Math.sqrt(p*( p - side[0] )*( p-side[1] )* ( p-side[2] ));
    
            return area
    
        }                                