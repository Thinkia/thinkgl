#### 三维坐标如何转换成二维坐标？

  demo: https://thinkia.github.io/thinkgl/example/tutorial/text/text_1.html
  
    1.首先在buffers中设置存好顶点三维坐标positions（[1.0,1.0,0.0]）;
    
    2.再将三维坐标做mv矩阵变换
    
    ia.thinkMath.vec3.applyMat4([1.0,1.0,0.0],ia.view.mat4 )
    
    ia.view.mat4为mv矩阵
    
    3.计算投影变换后的坐标
    
    vec3 = ia.thinkMath.vec3.applyMat4(vec3,ia.eyes.mat4 )
    
    4.屏幕看成x(-1,1)  y(-1,1)的平面
    
    那么有
            screen.x = window.innerWidth*(vec3[0] +1)/2;
    
            screen.y =  window.innerHeight*( 1-vec3[1] )/2;
            
            