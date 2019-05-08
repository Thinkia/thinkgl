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



            }

        };

        return ia;
    }









