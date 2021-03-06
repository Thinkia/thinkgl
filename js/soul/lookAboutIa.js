/**
 *  2019.5.11
 *  thinkia
 *  simple   OrbitControls  PC
 *
 * */

 function lookControlIa( canvas , ia , control =1 ) {

        //  control =1  --> view       control = 2 --> eyes

        let  lookAbout = new Object( );

        lookAbout = {

            mouseInfo:{

                startX: 0,
                startY: 0,
                isDown: false,

            },

            lock:{

                isEnabled:false,

            },

            rotate:{

                speed:1.0

            },

            bindEvent:{

                mouseDown:function onMouseDown() {

                    canvas.addEventListener( 'mousedown',( evt )=>{

                        lookAbout.mouseInfo.isDown = true;
                        lookAbout.mouseInfo.startX = evt.clientX;
                        lookAbout.mouseInfo.startY = evt.clientY;


                    })

                },

                mouseMove:function onMouseMove() {

                    canvas.addEventListener('mousemove',( evt )=>{

                        if( !lookAbout.mouseInfo.isDown )  return ;


                        evt.preventDefault();

                        let distanceX = evt.clientX - lookAbout.mouseInfo.startX;
                        let distanceY = evt.clientY - lookAbout.mouseInfo.startY;

                        if( !distanceX && !distanceY  ) return;

                        lookAbout.mouseInfo.startX = evt.clientX ;
                        lookAbout.mouseInfo.startY = evt.clientY ;

                        let x = lookAbout.rotate.speed * distanceX / 200.0 ;
                        let y = lookAbout.rotate.speed * distanceY / 200.0 ;


                        ia.eyes.euler.cell = [ y, x,0 ]

                        let rMat4 =  ia.thinkMath.euler.toMat4( ia.eyes.euler );

                        switch (control){

                            case 1: {ia.action.view.lookAbout( rMat4 ); break;}
                            case 2: {ia.action.eyes.lookAbout( rMat4 ); break;}

                            default :  console.log( ' dev ing ');
                        }



                    })

                },

                mouseUp: function onMouseUp( ) {

                    canvas.addEventListener( 'mouseup', ()=>{

                        lookAbout.mouseInfo.isDown = false;

                    } )
                }
            }
        };

        if( !lookAbout.lock.isEnabled )
        {
            lookAbout.bindEvent.mouseDown();
            lookAbout.bindEvent.mouseMove();
            lookAbout.bindEvent.mouseUp();
        }

        return lookAbout;

 }