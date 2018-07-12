Menubar.File = function() {
    var container = new UI.Panel();
    container.setClass('menu');

    var title = new UI.Panel();
    title.setClass('title');
    title.setTextContent("File");
    container.add(title);

    var options = new UI.Panel();
    options.setClass("options");
    container.add(options);

    var option = new UI.Row()
    option.setClass('option');
    option.setTextContent('New');
    option.onClick(function() {
        editor.signals.clearALL.dispatch();
    });

    options.add(option);


    options.add(new UI.HorizontalRule());




    var fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');


    fileSelector.addEventListener('change', function(event) {

        console.log(event.target.files[0]);
        var FIle;
        var total = event.target.files[0];
        var array = [];
        var len, set;
        var promises = []


        console.log(total)


        editor.zip.loadAsync(total)
            .then(function(zip) {
                // you now have every files contained in the loaded zip
                console.log(zip);
                return editor.zip.file("MyFile.JSON").async("string"); // a promise of "Hello World\n"
            }).then(function(imgFILE) {
            console.log(imgFILE)

            total = JSON.parse(imgFILE)

            console.log(total.scene.children[0].map);
            len = total.scene.children.length;

            set = total.scene.texture;
            console.log(set)
            set.forEach(function(ele) {
                promises.push(

                    editor.zip.file(ele).async("uint8array").then(function(iMg) {
                        console.log(iMg);
                        var blob = new Blob([iMg], { type: "image/jpeg" });

                        console.log(blob)
                        
                        editor.imageFile[ele] = blob;
                    })

                );

            })


            array = [];
            set.forEach(v => array.push(v));


            for (var key in editor.imageFile) {
                console.log(editor.imageFile[key]);
            }

            // editor.loader.createALL( total );


            // return editor.zip.file(total.scene.children[1].map).async("uint8array");


        }).then(function(e) {
            // editor.loader.createALL( total );

            Promise.all(promises).then(function(values) {
                console.log("promises")
                for (var key in editor.imageFile) {
                    console.log(editor.imageFile[key]);
                }
                editor.loader.createALL(total);
            })
            console.log("hiiiiiiiiiiiiiiii")
        })











        // for(var z=0;z<total.length;z++){
        //
        //
        //     console.log(total[z],"hello",total.length)
        //
        //     if(total[z].name==="MyFile.JSON")
        //         FIle=total[z];
        //     else {
        //         editor.imageFile[total[z].name] = total[z];
        //
        //     }
        // }
        // if(FIle)
        //     editor.loader.loadFile( FIle );
    });


    var option = new UI.Row();
    option.setClass('option');
    option.setTextContent('Import');
    option.onClick(function() {
        // selectDialogueLink.click();
        fileSelector.click();
    })

    options.add(option);



    var option = new UI.Row();
    option.setClass('option');
    option.setTextContent('Export');
    option.onClick(function() {

        editor.signals.emportScene.dispatch();
    })

    options.add(option);

    return container;



}