####   使用thinkgl画一条线，drawLines方法介绍

     iaWorld.drawLines( way，offset,count ) 
     
     默认参数way == 1，offset==0,count==n( 顶点总数 )
     
     way的可传参数有 1 ，2，3分别表示
     
        way==1  --> LINES  绘制线段 两个一组
     
        比如有4个顶点就有两组线    01  23
     
        way==2  --> LINE_STRIP 绘制线段 依次连接
      
        比如有4个顶点就有三组线   01  12  23
     
        way==3  --> LINE_LOOP 绘制线段 依次连接 首尾相连
     
        比如有4个顶点就有四组线   01  12  23  30
     
     offset表示从第几个点开始绘制图像
     
     count表示要绘制图像的顶点数量 
     
#### example

   demo: https://thinkia.github.io/thinkgl/example/tutorial/line/line_2.html  
   
   
    源码和画点区别不大。第一步都是设置顶点坐标和颜色，然后初始化initIaliaWorld()，
    
    把顶点存到buffers里面传递到iaWorld; helloIaWorld(buffers),
    
    最后调用drawLines( 3 ) 方法绘制图像
     
  仅仅画线能做什么有趣事情呢？
  
    在工作中单使用画线功能是比较少的，只是在房屋测量画标尺线的时候有用到过。
    
    我能联想到就是不停转动的时钟，时针分针秒针是长短不一的线条，而且转速不一样；
    
    于是做了一个简单的时钟动画demo;
     
   demo : https://thinkia.github.io/thinkgl/example/tutorial/line/line_4.html   