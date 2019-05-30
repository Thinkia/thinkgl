### lookAboutIa 开发思路   2019.5.11

+ 初步只考虑PC情况
+ 旋转控制要么转动pMat, 要么转动mvMat;
+ 用户只能在二维屏幕上滑动鼠标

#####封装函数 lookControlIa( canvas , ia , control =1 )

+ canvas : 用户要注册事件的渲染容器     
+ ia : ia对象用于改变 pMat 和 mvMat,以及数学函数调用 
+ control :  目前只提供 1 ， 2 代表 调整 mvMat 和 pMat

##### canvas 事件 目前只提供 mouse  down,move,up 
+ mouseDown: isDown=true，以及设置 startX和startY
+ mouseMove: 立即记录一个不同于上一个时间点的 endX和endY值，求出变化值;
+ mouseUp: isDown=false;

#### 转换   

+ 把很短的mouseMove记录的变化值 看作一个 euler;
+ 把euler 换算成一个旋转矩阵;
+ 根据control的值选择使用pMat或者mvMat 乘这个旋转矩阵，得出矩阵就是新的pMat或者mvMat;

#### 核心思路：比如pc端，按下鼠标并移动对应改变三维视角

+ 按下鼠标移动瞬间

      if( !lookAbout.mouseInfo.isDown )  return ;
   
      evt.preventDefault();
      
      //获取鼠标移动的变换值
      
      let distanceX = evt.clientX - lookAbout.mouseInfo.startX;
      let distanceY = evt.clientY - lookAbout.mouseInfo.startY;
      
      //xy未全变化
      
      if( !distanceX && !distanceY  ) return;
       
      //更新start 
      lookAbout.mouseInfo.startX = evt.clientX ;
      lookAbout.mouseInfo.startY = evt.clientY ;
   
      let x = lookAbout.rotate.speed * distanceX / 200.0 ;
      let y = lookAbout.rotate.speed * distanceY / 200.0 ;
      
      // 把变化值看作一个欧拉值
      ia.eyes.euler.cell = [ y, x,0 ]
      
      // 欧拉值转mat4 
      let rMat4 =  ia.thinkMath.euler.toMat4( ia.eyes.euler );
         
      // 根据control值来选择旋转pMat或者mvMat; 
      // 转pMat的效果为自转，转mvMat效果为公转
       
      switch (control){
         
          case 1: {ia.action.view.lookAbout( rMat4 ); break;}
          case 2: {ia.action.eyes.lookAbout( rMat4 ); break;}
         
          default :  console.log( ' dev ing ');
      }                  
                           