# holle3D 代码详解 (zh)

####   顶点着色

        // Vertex shader   顶点着色
        const vSrc = `
            attribute vec4 avPos;
    
            uniform mat4 umvMat;
            uniform mat4 upMat;
    
            void main() {
              gl_Position = upMat * umvMat * avPos;
            }
    
            `;
+ umvMat ,upMat  分别为uniform类型的 投影矩阵  和  mv矩阵；
+ 这种简化命名的风格突然想起了五年前学习MFC,吕鑫老师说过的一段话：程序是简单而美好的，命名上没必要写完整的英文;        

#####  片元着色

     // Fragment shader  片元着色
        const fSrc = `
            void main() {
              gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
            }
        `;
        
+ 这里的vec4  可以看作rbga  也就是默认为紫色

#### 顶点绘制


    const positions = [
                1.0,  1.0,
                -1.0,  1.0,
                1.0, -1.0,
                -1.0, -1.0,
            ];
            
+ 这里一共有四个顶点假设分别为A（1.0,  1.0），B（-1.0,  1.0），C（1.0, -1.0），D（-1.0, -1.0）
+ 平面最小单位是三角形，程序中绘制两个三角形分别为ABC和BCD;两个三角形组成正方形;
+ 尝试改变四个顶点的坐标值即可理解（三个点要满足三角形基本坐标要求）


#### ia 代码

                let ia = Ia();
                // 初始化透视矩阵
                ia.action.eyes.openEyes();
                // 观察的矩形 向 z轴的反方向跳跃了5个距离;
                ia.action.view.jump([0,0,-5]);
                const pMat = ia.eyes.mat4;
                const mvMat = ia.view.mat4;  
                
+ ia是一个想象中的三维异世界，我们张开眼睛观察着这里的一切
+ 目前正在逐步完善，为thinkgl核心js 

                
                 