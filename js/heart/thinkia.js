/**
 *  thinkia
 *  2019.5.8
 *
 **/

   //  what's ia ?

    function Ia() {

        let ia = new Object();

        ia.eyes = new Object();

        ia.eyes.mat4=[
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];

        ia.eyes.isOpen = false;

        ia.view = new Object();

        ia.view.mat4=[

            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1

        ];

        ia.view.normaVec3 = [ 1,0,0 ];


        ia.action = {

                eyes:{

                    openEyes:function(
                                            fov = 50 * Math.PI/180,
                                            near = 0.1 ,
                                            far  = 1000.0,
                                            aspect = window.innerHeight/window.innerWidth
                                        ) {

                        if(ia.eyes.isOpen) return ;

                        let mat4 = ia.eyes.mat4;
                        mat4[0] = aspect/Math.tan(fov/2) ;
                        mat4[5] = mat4[0] / aspect ;
                        mat4[10] = ( far + near ) / ( near - far ) ;
                        mat4[11] = -1;
                        mat4[14] = 2 * far * near /( near - far)
                        mat4[15] = 0;

                        ia.eyes.isOpen = true;

                },

            },

                view:{
                    jump:function ( vec ) {

                        let mat4 = ia.view.mat4;

                        for(let i =0 ;i<4;i++)
                            mat4[12+i] = mat4[i] * vec[0] + mat4[i+4] * vec[1] + mat4[i+8] * vec[2] + mat4[i+12]

                },
                    rotate:function ( vec , rad ) {

                         let  normaVec3 = ia.view.normaVec3;

                         // 是否已经为历史单位向量

                         if( normaVec3[0] !== vec[0] || normaVec3[1] !== vec[1] || normaVec3[2] !== vec[2] )
                         {

                             let length = Math.sqrt(vec[0] * vec [0] + vec[1] * vec[1] + vec[2] * vec[2] );

                             if( length < 0.000001 ) return null;

                             normaVec3[0] = vec[0] /  length;
                             normaVec3[1] = vec[1] /  length;
                             normaVec3[2] = vec[2] /  length;

                         }

                        // 矩阵变换

                        let  s = Math.sin( rad );
                        let  c = Math.cos( rad );
                        let  t  = 1 - c ;
                        let mat4 = ia.view.mat4;

                        let a00 = mat4[0] , a01 = mat4[1] , a02 = mat4[2]  , a03 = mat4[3] ,
                            a10 = mat4[4] , a11 = mat4[5] , a12 = mat4[6]  , a13 = mat4[7] ,
                            a20 = mat4[8] , a21 = mat4[9] , a22 = mat4[10] , a23 = mat4[11];

                        let b00 = normaVec3[0] * normaVec3[0] * t + c ,               b01 = normaVec3[1] * normaVec3[0] * t + normaVec3[2] *s ,      b02 = normaVec3[2] *normaVec3[0] *t - normaVec3[1] * s ,
                            b10 = normaVec3[0] * normaVec3[1] * t - normaVec3[2] *s , b11 = normaVec3[1] * normaVec3[1] * t + c,                     b12 = normaVec3[2] *normaVec3[1] *t + normaVec3[0] * s ,
                            b20 = normaVec3[0] * normaVec3[2] * t  ,                  b21 = normaVec3[1] * normaVec3[2] * t - normaVec3[0] *s,       b22 = normaVec3[2] *normaVec3[2] *t  + c;

                        mat4[0] = a00 * b00 + a10 * b01 + a20 * b02;
                        mat4[1] = a01 * b00 + a11 * b01 + a21 * b02;
                        mat4[2] = a02 * b00 + a12 * b01 + a22 * b02;
                        mat4[3] = a03 * b00 + a13 * b01 + a23 * b02;
                        mat4[4] = a00 * b10 + a10 * b11 + a20 * b12;
                        mat4[5] = a01 * b10 + a11 * b11 + a21 * b12;
                        mat4[6] = a02 * b10 + a12 * b11 + a22 * b12;
                        mat4[7] = a03 * b10 + a13 * b11 + a23 * b12;
                        mat4[8] = a00 * b20 + a10 * b21 + a20 * b22;
                        mat4[9] = a01 * b20 + a11 * b21 + a21 * b22;
                        mat4[10] = a02 * b20 + a12 * b21 + a22 * b22;
                        mat4[11] = a03 * b20 + a13 * b21 + a23 * b22;


                    }


            }

        };

        return ia;
    }









