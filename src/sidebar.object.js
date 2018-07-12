Sidebar.Object = function() {



    var container = new UI.Panel();
    container.setBorderTop('0');
    container.setPaddingTop('20px');
    //container.setDisplay( 'none' );


    var objectRotationRow = new UI.Row();
    var objectRotationX = new UI.Number().setStep(10).setUnit('°').setWidth('50px').onChange(update);
    var objectRotationY = new UI.Number().setStep(10).setUnit('°').setWidth('50px').onChange(update);
    var objectRotationZ = new UI.Number().setStep(10).setUnit('°').setWidth('50px').onChange(update);

    objectRotationRow.add(new UI.Text('Rotation').setWidth('90px'));
    objectRotationRow.add(objectRotationX, objectRotationY, objectRotationZ);

    container.add(objectRotationRow);
    var obj;
    var viewport = editor.viewport;

    function update() {

        // var intersects=v.getRaycaster();
        //console.log(intersects)
        // obj=intersects[0];
        obj = editor.selected;
        if (obj) {
            var degX = THREE.Math.degToRad(objectRotationX.getValue());
            var degY = THREE.Math.degToRad(objectRotationY.getValue());
            var degZ = THREE.Math.degToRad(objectRotationZ.getValue());
            obj.rotation.set(degX, degY, degZ);
            viewport.renders();


            // obj.position.set(objectPositionX.getValue(), objectPositionY.getValue(), objectPositionZ.getValue())
            var posX=objectPositionX.getValue();
            var posY=objectPositionY.getValue();
            var posz=objectPositionZ.getValue();

            editor.History.execute( new SetPositionCommand( obj, new THREE.Vector3( posX,posY,posz) ) );


            console.log("update")
            viewport.renders();
        }
    }

    editor.signals.transControl.add(function(msg) {
        editor.selected = msg;
        // update();
        editor.signals.rayRotation.dispatch(msg)
    })




    editor.signals.rayRotation.add(function(ob) {

        obj = ob;
        // obj.material.color.setHex(0xff0000);
        console.log(ob);
        objectRotationX.setValue(obj.rotation._x);
        objectRotationY.setValue(obj.rotation._y);
        objectRotationZ.setValue(obj.rotation._z);


        objectScaleX.setValue(obj.scale._x);
        objectScaleY.setValue(obj.scale._y);
        objectScaleZ.setValue(obj.scale._z);

        objectPositionX.setValue(obj.position.x);
        objectPositionY.setValue(obj.position.y);
        objectPositionZ.setValue(obj.position.z);

        console.log("in obj")
        console.log(objectRotationX.value)
    });











    var objectScaleRow = new UI.Row();
    var objectScaleLock = new UI.Checkbox(true).setPosition('absolute').setLeft('75px');
    var objectScaleX = new UI.Number(1).setRange(0.01, Infinity).setWidth('50px').onChange(updateScale);
    var objectScaleY = new UI.Number(1).setRange(0.01, Infinity).setWidth('50px').onChange(updateScale);
    var objectScaleZ = new UI.Number(1).setRange(0.01, Infinity).setWidth('50px').onChange(updateScale);

    objectScaleRow.add(new UI.Text('Scale').setWidth('90px'));
    objectScaleRow.add(objectScaleLock);
    objectScaleRow.add(objectScaleX, objectScaleY, objectScaleZ);

    container.add(objectScaleRow);

    function updateScale() {
        // var obj=editor.selected;

        if (obj) {
            var a = objectScaleX.getValue();
            var b = objectScaleY.getValue();
            var c = objectScaleZ.getValue();



            obj.scale.set(a, b, c)
            viewport.renders();
            console.log("mnbc")
        }

    }

    // position

    var objectPositionRow = new UI.Row();
    var objectPositionX = new UI.Number().setWidth('50px').onChange(update);
    var objectPositionY = new UI.Number().setWidth('50px').onChange(update);
    var objectPositionZ = new UI.Number().setWidth('50px').onChange(update);

    objectPositionRow.add(new UI.Text('Position').setWidth('90px'));
    objectPositionRow.add(objectPositionX, objectPositionY, objectPositionZ);

    container.add(objectPositionRow);







    editor.signals.finder.add(function(id) {

        var obj1 = viewport.scene.getObjectById(id, true);
        obj = obj1;

        editor.signals.transControl.dispatch(obj);




        // obj.material.color.setHex(0xff0000);
        console.log(obj1);
        objectRotationX.setValue(obj1.rotation._x);
        objectRotationY.setValue(obj1.rotation._y);
        objectRotationZ.setValue(obj1.rotation._z);


        objectScaleX.setValue(obj1.scale._x);
        objectScaleY.setValue(obj1.scale._y);
        objectScaleZ.setValue(obj1.scale._z);

        objectPositionX.setValue(obj1.position.x);
        objectPositionY.setValue(obj1.position.y);
        objectPositionZ.setValue(obj1.position.z);
        viewport.renders();


    });
    var materialMapRow = new UI.Row();
    var materialMapEnabled = new UI.Checkbox(false).onChange(mapFix);
    var materialMap = new UI.Texture().onChange(mapFix);

    materialMapRow.add(new UI.Text('Map').setWidth('90px'));
    materialMapRow.add(materialMapEnabled);
    materialMapRow.add(materialMap);

    container.add(materialMapRow);

    function mapFix() {

        var mapEnabled = materialMapEnabled.getValue() === true;


        if (mapEnabled) {


            var texture = mapEnabled ? materialMap.getValue() : null;

            console.log(texture)


            var objec=obj;

            var height=texture.image.naturalHeight;
            var width=texture.image.naturalWidth;

            if(objec.name[1]=='ik'){


                console.log(objec,"iiiiiiiiiiiii")
                var uvArray=[];

                var h=(height/25);
                var w=(width/25);
                console.log(height,width);
                console.log(h,w);

                cord=-1;
                var incrX=0;
                var incrY=0;

                var numberOfSegments=100;

                for(var k=0;k<=numberOfSegments;k++){

                    if(k<(numberOfSegments/4)) {
                        uvArray.push(incrX / width);
                        uvArray.push((height - incrY) / height)
                        incrX += w;
                        // console.log(incrX,"qqqqqqqqq",(w*25),k,(incrX/width));

                    }
                    else if((k>=(numberOfSegments/4))&&(k<(numberOfSegments/2))) {
                        uvArray.push(incrX / width);
                        uvArray.push((height - incrY) / height)
                        incrY += h;
                        // console.log(incrY,"qqqqqqqqq",(h*25),k,((height - incrY) / height));

                    }
                    // console.log(k);
                    else if((k<((3*numberOfSegments)/4))&&(k>=(numberOfSegments/2))) {
                        uvArray.push(incrX / width);
                        uvArray.push((height - incrY) / height)
                        incrX -= w;
                        console.log("hi",incrX)
                    }
                    else if((k>=((3*numberOfSegments)/4))&&(k<(numberOfSegments))) {
                        uvArray.push(incrX / width);
                        uvArray.push((height - incrY) / height)
                        incrY -= h;
                        console.log("bye",incrY)
                    }
                    else {
                        console.log("oneeeeeeeeeeeeeeeeeeeeeeeeeee")
                    }




                }
                uvArray.push(0)
                uvArray.push(0.999)
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







            // obj.material.map = texture;
            // obj.material.needsUpdate = true;

            var imgFile = materialMap.getFile();
            var name = imgFile.name;

            obj.imgSrc = imgFile.name;
            obj.imgFile = imgFile;



            console.log(obj.imgSrc, "cecerceffwc");



            if (imgFile) {

                editor.imageFile[obj.imgSrc] = imgFile;

                // console.log(imgFile.image.naturalHeight(),"dimenssssssssssssssssss")




                localforage.getItem(name).then(function(value) {
                    console.log(value, "already present in DB");


                }).catch(function(err) {

                    localforage.setItem(name, imgFile).then(function(value) {
                        console.log(value);
                    }).catch(function(err) {
                        console.error(err);
                    });
                });


                // localforage.setItem(name, imgFile).then(function (value) {
                //     console.log(value);
                // }).catch(function (err) {
                //     console.error(err);
                // });
            }





            //
            // var image = document.createElement('img');
            // image.src = texture.image.currentSrc;
            // var text = new THREE.Texture(image);
            // text.needsUpdate = true;
            // console.log(text,"hiiii");
            //
            //
            // obj.material.map = text;
            //
            // obj.material.needsUpdate=true;
            // console.log(obj)


            viewport.renders();
        }

    }

    editor.signals.cancel.add(function() {
        materialMap.setValue(null);
        materialMapEnabled.setValue(false);

        viewport.renders();

    })











    return container;


}