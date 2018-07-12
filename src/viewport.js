var Viewport= function(){

    var container = new UI.Panel()
    container.setId('viewport');
    container.setPosition('absolute');

    var send=false;
    var imageFiles={};

    this.dom=container.dom;

    this.renderer=new THREE.WebGLRenderer();
    this.renderer.setClearColor(0x00ffEE);
    this.renderer.setSize(this.dom.offsetWidth,this.dom.offsetHeight);
    container.dom.appendChild(this.renderer.domElement);
    this.scene=new THREE.Scene();
    this.scene.name="scene"
    this.camera =new THREE.PerspectiveCamera(55,this.dom.offsetWidth/this.dom.offsetHeight,.1,1000);
    this.camera.position.z=50;
    this.camera.position.x=20;
    this.camera.position.y=20;
    this.camera.name="camera";
    this.camera.lookAt(this.scene.position);
    var link = document.createElement( 'a' );
    link.style.display = 'none';
    document.body.appendChild(link);

    var camControl=new THREE.OrbitControls(this.camera,this.dom);

    var x=this;
    var rotations=false;
    var delObj=false;

    var raycaster = new THREE.Raycaster();


    var mouse = new THREE.Vector2();
    var transformControls=new THREE.TransformControls(this.camera,this.dom);
    transformControls.name="trans";
    this.scene.add(transformControls);



    this.getRaycaster=function () {

        mouse.x = (event.clientX / x.dom.offsetWidth ) * 2 - 1;
        mouse.y = -(event.clientY /  x.dom.offsetHeight) * 2 + 1;


        raycaster.setFromCamera( mouse, x.camera );



        var r=raycaster.intersectObjects( x.scene.children );

        if(x!==null){
            return r;
        }
        else{
            return null;
        }

    }




    this.renderer.render(this.scene,this.camera);

    this.addCube=function(X,Y,Z,clr,img){
        var size=2;

    var cubeGeo=new THREE.BoxGeometry(size,size,size);
    var cubeMat=new THREE.MeshBasicMaterial();
    var cube=new THREE.Mesh(cubeGeo,cubeMat);
    cube.rotation.x=Math.PI*.2;
    cube.name="cube"+x.scene.children.length;
    cube.material.color.setHex(clr);
    cube.position.x=X;
    cube.position.y=Y;
    cube.position.z=Z;




    if(img){
        if(editor.imageFile[img]){
            apply(cube,editor.imageFile[img])
        }
        else
            applyTexture(cube,img);
    }




    editor.History.execute(new AddObjectCommand(cube));

    // x.scene.add(cube);
    x.renderer.render(x.scene,x.camera);

        editor.signals.outliner.dispatch();

    };

    this.group=function () {
        var group = new THREE.Group();
        group.name="group"+x.scene.children.length;
        x.scene.add(group);
        x.renderer.render(x.scene,x.camera);
        editor.signals.outliner.dispatch();
    }


    function applyTexture(obje,fileName) {

        console.log(fileName,"filenameeeeeeeeees");
        obje.imgSrc=fileName;

        if(editor.imageFile[fileName]){

            console.log("using from existed image array");
            apply(obje,editor.imageFile[fileName]);

        }
        else {



            localforage.getItem(fileName).then(function (value) {
                console.log(value);
                console.log(editor.imageFile[fileName],"checking array store")


                obje.imgFile = value;
                editor.imageFile[fileName]=value;

                if(value) {


                    apply(obje, value);
                }

            }).catch(function (err) {
                console.error(err);
            });
        }
    }

        function apply(objec,file) {





            var reader = new FileReader();
        reader.onload = function (event) {
            console.log(event.target,"tagerttttttttt");

            var image = document.createElement('img');
            image.src = event.target.result;

            var dimensions= event.target.result;

            // console.log(dimensions,"dimenssssssssssssssssss")
            var texture = new THREE.Texture(image);
            texture.needsUpdate = true;
            var height=texture.image.naturalHeight;
            var width=texture.image.naturalWidth;



            console.log(texture,"hiiii");
            console.log(texture.image.naturalHeight,"dssssssssssssss")
            console.log(height,"dssssssssssssssdddddddddddddddddddd")
            var cord=0;


            if(objec.name[1]=='ik'){


                console.log(objec,"iiiiiiiiiiiii")
                var uvArray=[];

                var h=height/25;
                var w=width/25;
                console.log(h,w);

                cord=-1;
                var incrX=0;
                var incrY=0;

                var numberOfSegments=100;

                for(var k=0;k<=numberOfSegments;k++){

                    if(k<(numberOfSegments/4)) {
                        uvArray.push(1-incrX / width);
                        uvArray.push((height - incrY) / height)
                        incrX += w;

                        console.log(incrX);
                    }
                    if((k>=(numberOfSegments/4))&&(k<(numberOfSegments/2))) {
                        uvArray.push(1-incrX / width);
                        uvArray.push((height - incrY) / height)
                        incrY += h;
                    }
                    console.log(k);
                    if((k<((3*numberOfSegments)/4))&&(k>=(numberOfSegments/2))) {
                        uvArray.push(1-incrX / width);
                        uvArray.push((height - incrY) / height)
                        incrX -= w;
                    }
                    if((k>=((3*numberOfSegments)/4))&&(k<=(numberOfSegments))) {
                        uvArray.push(1-incrX / width);
                        uvArray.push((height - incrY) / height)
                        incrY -= h;
                    }




                }
                // uvArray.push(0)
                // uvArray.push(0)
                console.log(uvArray);

                var vertex=new Float32Array(uvArray);
                uvArray=[0,0];
                objec.geometry.addAttribute( 'uv', new THREE.BufferAttribute( vertex, 2 ) );
                objec.material.map = texture;
                objec.material.needsUpdate = true;


                console.log(objec)




            }
            else {


                objec.material.map = texture;

                objec.material.needsUpdate = true;
            }

        };
            console.log(file.naturalHeight,"dimenssssssssssssssssss")

            reader.readAsDataURL(file);


    }




    this.addCircle=function(X,Y,Z,clr,img) {



        // var noOfSegments = 100;
        // var radius = 5;
        // var segmentSize = 360 / noOfSegments;
        //
        // var geom = new THREE.BufferGeometry();
        // var material = new THREE.MeshBasicMaterial( { color: 0xff0000*Math.random(),side:THREE.DoubleSide} );
        // var vert=[];
        // // var UVarray=[.5,.5];
        //
        //
        // for(var i = 0; i <= noOfSegments; i++) {
        //     var segment = ( i * segmentSize ) * Math.PI / 180;
        //     var a=Math.cos( segment ) * radius;
        //     var y=Math.sin( segment ) * radius;
        //     vert.push(a);
        //     vert.push( 0);
        //     vert.push( y);
        //     console.log(i)
        //
        // }
        // console.log(vert)
        // var vertex=new Float32Array(vert);
        //
        //
        // geom.addAttribute( 'position', new THREE.BufferAttribute( vertex, 3 ) );
        // var fac=[]
        // for(var i = 0; i <noOfSegments-1; i++) {
        //     fac.push(0);
        //     fac.push(i+1);
        //     fac.push(i+2);
        // }
        //
        //
        // var face=new Float32Array(fac);
        // geom.setIndex(new THREE.BufferAttribute(new Uint16Array(face),1));
        // //
        //
        //
        // var circle = new THREE.Mesh( geom, material );






        //
        //
        var geometry = new THREE.CircleGeometry( 5, 32 );
        var material = new THREE.MeshBasicMaterial( {side:THREE.DoubleSide}  );
        var circle = new THREE.Mesh( geometry, material );

        circle.material.color.setHex(clr);
        circle.name="circle"+x.scene.children.length;
        circle.position.x=X
        circle.position.y=Y;
        circle.position.z=Z;
        circle.rotation.x=10*Math.random();

        if(img){
            if(editor.imageFile[img]){
                apply(circle,editor.imageFile[img])
            }
            else
                applyTexture(circle,img);
        }

        editor.History.execute(new AddObjectCommand(circle));

        // x.scene.add(circle);
        x.renderer.render(x.scene,x.camera);
        editor.signals.outliner.dispatch();
        // dataPreparation();



    }



    this.addSquare=function(X,Y,Z,colr,img ){


            var size=2
            var geom = new THREE.BufferGeometry();
            var vertex=new Float32Array([
                -size,size,0,
                -size,-size,0,
                size,-size,0,
                size,size,0
            ]);
            geom.addAttribute( 'position', new THREE.BufferAttribute( vertex, 3 ) );
            var face=new Float32Array([
                0,1,2,
                2,3,0
            ]);
            var uvs = new Float32Array([
                0,1,
                0,0,
                1,0,
                1,1
            ]);
            geom.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
            geom.setIndex(new THREE.BufferAttribute(new Uint16Array(face),1));
            var square=new THREE.Mesh(geom,new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));
            square.position.set(X,Y,Z)
            square.material.color.setHex(colr);

            square.name="square"+x.scene.children.length;

            if(img){
                if(editor.imageFile[img]){
                    apply(square,editor.imageFile[img])
                }
                else
                    applyTexture(square,img);
            }
        editor.History.execute(new AddObjectCommand(square));

            // x.scene.add(square);
            x.renderer.render(x.scene,x.camera);

        editor.signals.outliner.dispatch();
        // dataPreparation();





    }


    var delOne=false;

    this.deleteObject=function (object) {
        x.scene.remove(object);
        transformControls.detach();
    }




    this.Remover=function(){

        var allobjects=x.scene.children;
        var length=allobjects.length;


        while(length>0){
            var last=allobjects[--length];
            if(last.name!=="trans") {
                x.scene.remove(last);
                if (delOne) {
                    delOne = false;
                    break;
                }

            }
            else {
                transformControls.detach();
            }
        }
        x.renders();
        editor.signals.outliner.dispatch();

    }


    this.addToScene=function (oBJECT) {
        x.scene.add(oBJECT)
    }



    this.clearScene=function () {


        console.log(x.scene.children,x.scene.children.length);

        if ( confirm( 'Any unsaved data will be lost. Are you sure?' ) ) {

            //sceneExport();

            x.Remover();


        }
        else {
            send=true;
            dataPreparation();
        }

    }

    this.importSceneContent=function(){

        var fileSelector = document.createElement('input');
        fileSelector.setAttribute('type', 'file');

        var selectDialogueLink = document.createElement('a');
        selectDialogueLink.setAttribute('href', '');
        selectDialogueLink.innerText = "Select File";

        selectDialogueLink.onclick = function () {
            fileSelector.click();
            return false;
        }

        document.body.appendChild(selectDialogueLink);






    }





    editor.signals.clearALL.add(function () {
        x.clearScene();
        x.renderer.render(x.scene,x.camera);
    })

    editor.signals.deleteObj.add(function () {

        delOne=!delOne;
        x.Remover();


        x.renderer.render(x.scene,x.camera);
    })

    editor.signals.cube.add(function (p0,p1,p2,c,img) {
         //alert("cube");
         x.addCube(p0,p1,p2,c,img);

        x.renderer.render(x.scene,x.camera);
    })

    editor.signals.square.add(function (p0,p1,p2,cl,img) {
         //alert("cube");

         x.addSquare(p0,p1,p2,cl,img);

        x.renderer.render(x.scene,x.camera);
    });
    editor.signals.group.add(function () {
         //alert("cube");

         x.group();

        x.renderer.render(x.scene,x.camera);
    })

    editor.signals.resizes.add(function () {
        x.camera.aspect = x.dom.offsetWidth/x.dom.offsetHeight;
        x.camera.updateProjectionMatrix();
        x.renderer.setSize(x.dom.offsetWidth,x.dom.offsetHeight);
    })

    editor.signals.circle.add(function (p0,p1,p2,c,img) {
        //alert("cube");
        x.addCircle(p0,p1,p2,c,img);


        x.renderer.render(x.scene,x.camera);
    })

    editor.signals.importScene.add(function () {
        x.importSceneContent();
        x.renderer.render(x.scene,x.camera);
    });

    editor.signals.emportScene.add(function () {
        sceneExport();
        x.renderer.render(x.scene,x.camera);
    });
    editor.signals.sceneBackgroundChanged.add( function (clr) {
        x.renderer.setClearColor(clr);
        x.renderer.render(x.scene,x.camera);

    } );


    editor.signals.transControl.add(function (obj) {


        transformControls.attach(obj);
        editor.prev=editor.selected;


        console.log("controls")

        x.renderer.render(x.scene,x.camera);

    });






    editor.signals.rotation.add(function () {
        rotations=(!rotations);
        sceneRender();


    })

    sceneRender();

    function sceneRender() {

        if(rotations){

            x.scene.traverse((obj)=>{
                if(obj instanceof THREE.Mesh){
                obj.rotation.x+=.01;
                obj.rotation.y+=.01;
                }
            })
        }

        // console.log("call")

        requestAnimationFrame(sceneRender);
        camControl.update();
        x.renderer.render(x.scene,x.camera);

    }
    this.renders=function () {



        x.renderer.render(x.scene,x.camera);
        console.log("call")
        // sceneRender()

    }




    function dataPreparation() {
        var array=[];
        var set;

        var output ={
            scene : {
                children : [],
                texture:[]
            }
        };
        console.log(x.scene.children);

        for(var i=0; i<x.scene.children.length; i++) {

            if(x.scene.children[i].name!=="trans") {
                var child = x.scene.children[i];
                console.log(child);
                var childoutput = {

                    type: child.geometry.type,
                    color: child.material.color.getHex(),
                    position: child.position.toArray(),
                    rotation: child.rotation.toArray(),
                    name: child.name,
                    map: child.imgSrc,
                    // File:child.imgFile
                };
                if(child.imgSrc)
                    array.push(child.imgSrc);

                if(child.imgFile) {
                    editor.imageFile[child.imgSrc] = child.imgFile;
                    editor.Storage.SetDb(child.imgFile,child.imgSrc);
                }
                if(editor.imageFile[child.imgSrc]) {
                    editor.Storage.SetDb(editor.imageFile[child.imgSrc],child.imgSrc);
                }
                output.scene.children.push(childoutput);
            }
            set=new Set(array);
            console.log(set)

        }
        set.forEach(function(el){
            output.scene.texture.push(el)
        })
        editor.data = output;


            editor.Storage.SetDb(output,'MyFile');
            console.log(output, "dataprep");

        return output;
    }


    function sceneExport() {

        var output=dataPreparation();
        var text = JSON.stringify(output,null,2);
        editor.data=output;


        console.log(output);
        // var zip=new JSZip();

        editor.zip.file("MyFile.JSON", text);
        //
        // for(var key in editor.imageFile){
        //     imageFiles[key]=editor.imageFile[key];
        // }


        for (var key in editor.imageFile){
            editor.zip.file(key, editor.imageFile[key]);
        }





        link.addEventListener("click", function () {
            editor.zip.generateAsync({type:"base64"}).then(function (base64) {
                window.location = "data:application/zip;base64," + base64;
            }, function (err) {
               console.log(err)
            });
        })
        link.click();




    }



    var objectPositionOnDown = null;
    transformControls.addEventListener( 'mouseDown', function () {

        var object = transformControls.object;

        objectPositionOnDown = object.position.clone();


    } );


    transformControls.addEventListener( 'mouseUp', function () {

            var object = transformControls.object;

            if (object !== undefined) {
                if (!objectPositionOnDown.equals(object.position)) {

                    editor.History.execute(new SetPositionCommand(object, object.position, objectPositionOnDown));

                }
            }
        }
    )


    transformControls.addEventListener( 'change', function () {


        editor.signals.rayRotation.dispatch(transformControls.object)


        // editor.signals.transControl.dispatch(transformControls.object);

        x.renders();
    });


    function  onMouseDown() {

        var intersects=x.getRaycaster();

            if (intersects[0]) {
                if (intersects[0].name!=="trans") {

                    editor.selected = intersects[0].object;
                    console.log(editor.selected,"selectedddddddddddddddddddd objjjjjjjjj")

                    // transformControls.attach(intersects[0].object);

                    editor.signals.transControl.dispatch(intersects[0].object);

                    console.log("Cought")
                    editor.signals.rayRotation.dispatch(intersects[0].object);



                    x.renders()
                }

            }
            if(editor.prev!==editor.selected){
                editor.signals.cancel.dispatch();
                transformControls.detach();
                x.renders();


            }

    }

    editor.Storage.GetDb();


    function dblClick(){
        transformControls.detach();


    }


    this.dom.addEventListener("click", onMouseDown, false);
    this.dom.addEventListener("dblclick", dblClick, false);
    // this.dom.addEventListener("mousemove", onMouseMove, false);

};

