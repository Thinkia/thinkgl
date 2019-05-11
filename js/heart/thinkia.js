/**
 *  thinkia
 *  2019.5.8
 *
 **/

   //  what's ia ?

    function Ia() {

        let ia = new Object();

        // eyes
        ia.eyes ={
            mat4:[
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ],
            euler : {

                order:'ZYX',

                cell:[1,0,0],

            },
            isOpen : false,

        }


        // view
        ia.view = {
            // mvMat
             mat4:[
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ],

        }



        // ia's soul

        ia.soul = {

            // tween
            time:{

                oriTimer:0,
                oriStart:'',
                oriEnd:'',
                go:function (  start , end, timer = 120, way =1    ) {

                    switch ( way ){

                        // line
                        case 1: {

                            if( ia.soul.time.oriTimer > timer ) return ;

                            if( ia.soul.time.oriTimer < 1 )
                            {
                                ia.soul.time.oriStart = start ;
                                ia.soul.time.oriEnd = end;
                            }

                            for( let i = 0 ;i< start.length;i++ )
                            {
                                let startBeta = ia.soul.time.oriStart;
                                let endBeta = ia.soul.time.oriEnd;
                                start[i] = startBeta[ i ]  + ia.soul.time.oriTimer * ( endBeta[i] - startBeta[i] ) / timer ;
                            }

                            ia.soul.time.oriTimer++;

                            break;
                        }

                        default : console.log( ' dev   ing  ' )

                    }


                },
                reTime:function () {
                    ia.soul.oriTimer = 0;
                }
            },

        };

        // thinkMath

        ia.thinkMath = {

            mat4:{
                 // translation
                 jump: function ( mat4,vec ) {
                         for(let i =0 ;i<4;i++)
                             mat4[12+i] = mat4[i] * vec[0] + mat4[i+4] * vec[1] + mat4[i+8] * vec[2] + mat4[i+12]
                 } ,

                rotate:function ( mat4, vec , rad ,needNor = true ) {

                    let  normaVec3 = vec;

                    // vec is normalized?

                    if( needNor )
                    {

                        let length = Math.sqrt(vec[0] * vec [0] + vec[1] * vec[1] + vec[2] * vec[2] );

                        if( length < 0.000001 ) return null;

                        normaVec3[0] = vec[0] /  length;
                        normaVec3[1] = vec[1] /  length;
                        normaVec3[2] = vec[2] /  length;

                    }

                    // rotate

                    let  s = Math.sin( rad );
                    let  c = Math.cos( rad );
                    let  t  = 1 - c ;

                    let a00 = mat4[0] , a01 = mat4[1] , a02 = mat4[2]  , a03 = mat4[3] ,
                        a10 = mat4[4] , a11 = mat4[5] , a12 = mat4[6]  , a13 = mat4[7] ,
                        a20 = mat4[8] , a21 = mat4[9] , a22 = mat4[10] , a23 = mat4[11];

                    let b00 = normaVec3[0] * normaVec3[0] * t + c ,               b01 = normaVec3[1] * normaVec3[0] * t + normaVec3[2] *s ,      b02 = normaVec3[2] *normaVec3[0] *t - normaVec3[1] * s ,
                        b10 = normaVec3[0] * normaVec3[1] * t - normaVec3[2] *s , b11 = normaVec3[1] * normaVec3[1] * t + c,                     b12 = normaVec3[2] *normaVec3[1] *t + normaVec3[0] * s ,
                        b20 = normaVec3[0] * normaVec3[2] * t + normaVec3[1] *s , b21 = normaVec3[1] * normaVec3[2] * t - normaVec3[0] *s,       b22 = normaVec3[2] *normaVec3[2] *t  + c;

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


                },

                multiply:function ( lMat4,rMat4  ) {

                    let a11 = lMat4[ 0 ], a12 = lMat4[ 4 ], a13 = lMat4[ 8 ], a14 = lMat4[ 12 ];
                    let a21 = lMat4[ 1 ], a22 = lMat4[ 5 ], a23 = lMat4[ 9 ], a24 = lMat4[ 13 ];
                    let a31 = lMat4[ 2 ], a32 = lMat4[ 6 ], a33 = lMat4[ 10 ], a34 = lMat4[ 14 ];
                    let a41 = lMat4[ 3 ], a42 = lMat4[ 7 ], a43 = lMat4[ 11 ], a44 = lMat4[ 15 ];

                    let b11 = rMat4[ 0 ], b12 = rMat4[ 4 ], b13 = rMat4[ 8 ], b14 = rMat4[ 12 ];
                    let b21 = rMat4[ 1 ], b22 = rMat4[ 5 ], b23 = rMat4[ 9 ], b24 = rMat4[ 13 ];
                    let b31 = rMat4[ 2 ], b32 = rMat4[ 6 ], b33 = rMat4[ 10 ], b34 = rMat4[ 14 ];
                    let b41 = rMat4[ 3 ], b42 = rMat4[ 7 ], b43 = rMat4[ 11 ], b44 = rMat4[ 15 ];

                    lMat4[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
                    lMat4[ 4 ] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
                    lMat4[ 8 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
                    lMat4[ 12 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

                    lMat4[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
                    lMat4[ 5 ] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
                    lMat4[ 9 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
                    lMat4[ 13 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

                    lMat4[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
                    lMat4[ 6 ] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
                    lMat4[ 10 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
                    lMat4[ 14 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

                    lMat4[ 3 ] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
                    lMat4[ 7 ] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
                    lMat4[ 11 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
                    lMat4[ 15 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;


                }


            },

            euler:{

                toMat4:function ( euler ) {

                    let mat4 = [
                        1, 0, 0, 0,
                        0, 1, 0, 0,
                        0, 0, 1, 0,
                        0, 0, 0, 1
                    ];
                    let x = euler.cell[0], y = euler.cell[1], z = euler.cell[2];
                    let a = Math.cos( x ), b = Math.sin( x );
                    let c = Math.cos( y ), d = Math.sin( y );
                    let e = Math.cos( z ), f = Math.sin( z );


                    if( euler.order === 'ZYX')
                    {
                        let ae = a * e, af = a * f, be = b * e, bf = b * f;

                        mat4[ 0 ] = c * e;
                        mat4[ 4 ] = be * d - af;
                        mat4[ 8 ] = ae * d + bf;

                        mat4[ 1 ] = c * f;
                        mat4[ 5 ] = bf * d + ae;
                        mat4[ 9 ] = af * d - be;

                        mat4[ 2 ] = - d;
                        mat4[ 6 ] = b * c;
                        mat4[ 10 ] = a * c;
                    }

                   return mat4;
                }


            }


        };



        // action
        ia.action = {

                eyes:{
                    // https://stackoverflow.com/questions/28286057/trying-to-understand-the-math-behind-the-perspective-matrix-in-webgl/28301213#28301213
                    // http://www.songho.ca/opengl/gl_projectionmatrix.html
                    openEyes:function(
                                            fov = 50 * Math.PI/180,
                                            near = 0.1 ,
                                            far  = 1000.0,
                                            aspect = window.innerHeight/window.innerWidth
                                        ) {

                        if( ia.eyes.isOpen || !fov || near === far ) return ;

                        let mat4 = ia.eyes.mat4;
                        mat4[0] = aspect/Math.tan(fov/2) ;
                        mat4[5] = mat4[0] / aspect ;
                        mat4[10] = ( far + near ) / ( near - far ) ;
                        mat4[11] = -1;
                        mat4[14] = 2 * far * near /( near - far)
                        mat4[15] = 0;

                        ia.eyes.isOpen = true;

                },
                    blink:function (  fov = 50 * Math.PI/180,
                                       near = 0.1 ,
                                       far  = 1000.0,
                                       aspect = window.innerHeight/window.innerWidth ) {
                        ia.eyes.isOpen =false;
                        ia.action.eyes.openEyes( fov,near,far,aspect );
                    },

                    rotate:function ( vec , rad ) {

                        let mat4 = ia.eyes.mat4;

                        return ia.thinkMath.mat4.rotate( mat4 , vec , rad );

                    },
                    lookAbout:function (  rMat4  ) {

                        let lMat4 = ia.eyes.mat4;

                        return ia.thinkMath.mat4.multiply( lMat4,rMat4 );

                    }

            },

                view:{

                    jump:function ( vec ) {

                        let mat4 = ia.view.mat4;

                        return  ia.thinkMath.mat4.jump( mat4 , vec );

                    },

                    walk:function ( vec , timer ) {

                        let  finalMat4 = [];

                        for( let i =0;i<ia.view.mat4.length;i++)
                        {
                            finalMat4[i] = ia.view.mat4[i]
                        }

                        ia.thinkMath.mat4.jump( finalMat4 , vec );

                        ia.soul.time.go( ia.view.mat4, finalMat4 , timer  ) ;

                    },

                    rotate:function ( vec , rad ) {

                       let mat4 = ia.view.mat4;

                       return ia.thinkMath.mat4.rotate( mat4 , vec , rad );

                    },

            },



        };

        return ia;

    }









