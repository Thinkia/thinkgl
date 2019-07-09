#### 使用thinkgl画三角形，drawTriangle 方法介绍

    iaWorld.drawTriangle(way,offset,vertexCount)
    
    默认参数way == 2，offset==0,vertexCount==n( 顶点总数 )
    
    way的可传参数有 1 ，2，3分别表示
     
    way==1 --> TRIANGLES        绘制三角形 三个一组        n/2
  
    比如6个顶点 有两个三角形 012 和345 ; 这里的数字为顶点序号
  
    way==2 --> TRIANGLE_STRIP   绘制三角形 依次组成三角形  n-2    （顶点中心顺序替换  ）
  
    比如6个顶点 有四个三角形 102 213 324 435               (n+1)n(n+2)  
  
    way==3 --> TRIANGLE_FAN     以第一个顶点为中心点，其他顶点作为边缘点依次绘制 n-2    （ 顶点中心始终为第一个点）
  
    比如6个顶点 有四个三角形 102  203  304 405             (n+1)0(n+2)  
    
    offset表示从第几个点开始绘制图像
    
    vertexCount表示要绘制图像的顶点数量    
    
    
####example

    demo:    