#### draw points  

    画点，是webgl中最基本的一种绘制;理论上所有的三维图像都是可以用画点解决的；
    
    如果绘制一个点， 那么很多个点就可以组成一条线；很多条线和又可以组成 一个面；
    
    很多个面可以组成几何体；
   
   
#### 1.使用thinkgl画点： 绘制一个点

 demo1：  https://thinkia.github.io/thinkgl/example/tutorial/point/point_1.html  

    
    点击屏幕 code 链接即可跳转到源码处

    我看了看自己的源码，静坐在电脑前思考了很久…… 我该如何来解释我的代码？能让更多读者通俗易懂
    
    的明白，又不能浪费读者宝贵的时间。代码里的ia ,iaWorld可当作thinkgl中调用三维函数的媒介，后
    
    面的exmple会反复出现；就像吃饭一样，不必深究为什么吃饭， 吃的多了，自然明白为什么要吃饭；
    
    值得注意的是 positions数组和colors数组：
    
    let positions = [
    
        0.0,0.0,
        
    ];
    
    let colors = [
    
        1.0,0.0,0.0,1.0,   // 红              [255,0,0]
        
    ]
    
    代表的是点的坐标（0，0）和颜色（255，0，0）：  
    
#### 2.使用thinkgl画点：绘制多个不同位置不同颜色的点

demo2:  https://thinkia.github.io/thinkgl/example/tutorial/point/point_2.html


    点击屏幕 code 链接即可跳转到源码处   
     
    与绘制一个点相比，变化在于positions顶点坐标数组和colors颜色数组；
    
    let positions = [
    
        -1.0,0.0,
        
        0.0,1.0,
        
        1.0,0.0,
        
        2.0,1.0
        
    ];
    
    let colors = [
    
        1.0,0.0,0.0,1.0,   // 红
        
        0.0,1.0,0.0,1.0,   // 绿
        
        0.0,0.0,1.0,1.0,   // 蓝
        
        1.0,0.0,0.0,1.0,   // 红
        
    ]
    
    我们只需要对demo1改变顶点数组和颜色数组的值就可以绘制多个不同位置不同颜色的点；
    

#### 3.使用thinkgl画点：在n个点中自由选择任意个点绘制并设置其大小    
 demo3: https://thinkia.github.io/thinkgl/example/tutorial/point/point_3.html


     与demo2相比第一个点更小了，第二个点未绘制
      
     这里介绍下drawPoints参数
     
     iaWorld.drawPoints( size,offset,count)
     
     size: 点的大小  默认为10
     
     offset: 从第几个点开始绘制  默认为0
     
     count : 绘制几个点 ，  默认全部绘制
     
     连在一起就是我要从第offset个点开始一共绘制count个点，其大小为size;
     
     封装的是webgl的gl.drawArrays( gl.POINTS, offset, count ) 函数以及
     
     顶点着色中gl_PointSize 的传值参数；
     
#### 4.画点能做些什么有趣的事情呢？

我做了三个简单点模型动画示例，主要使用drawPoints（）函数，绘制monster;

+ 旋转的monster:  

   https://thinkia.github.io/thinkgl/example/tutorial/point/point_4_monster.html

+ 原地爬行的monster:
 
   https://thinkia.github.io/thinkgl/example/tutorial/point/point_5_monster-animate.html

+ 随机爬行的monster:  

   https://thinkia.github.io/thinkgl/example/tutorial/point/point_6_monster-animateBeta.html 