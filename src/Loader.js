var Loader = function() {

    var scope = this

    this.loadFile = function(file) {

        var filename = file.name;

        var extension = filename.split('.').pop().toLowerCase();

        var reader = new FileReader();
        var data;

        switch (extension) {

            case 'json':

            case 'txt':
                reader.addEventListener('load', function(event) {

                    data = event.target.result;
                    var original = JSON.parse(data);
                    scope.createALL(original);
                    // var l=original.scene.children.length;
                    // var x=original.scene;
                    //
                    // while (l>0){
                    //
                    //     var obj=original.scene.children[--l];
                    //     var p=obj.position;
                    //
                    //         switch (obj.name){
                    //             case 'cube':editor.signals.cube.dispatch(p[0],p[1],p[2],obj.color);break;
                    //             case 'circle':editor.signals.circle.dispatch(p[0],p[1],p[2],obj.color);break;
                    //             case 'square':editor.signals.square.dispatch(p[0],p[1],p[2],obj.color);break;
                    //             default:console.log("object not found")
                    //         }
                    //
                    // }

                });
                reader.readAsText(file);


                break;
            default:
                return "cannot read data dude";







        }
    }


    this.createALL = function(original) {
        editor.signals.outliner.dispatch();


        if (original) {

            // var original=JSON.parse(data);
            console.log(original, "org");
            var l = original.scene.children.length;


            var x = original.scene;

            while (l > 0) {

                var obj = original.scene.children[--l];
                var p = obj.position;
                console.log(obj.name);

                switch (obj.name[1]) {

                    case 'u':
                        editor.signals.cube.dispatch(p[0], p[1], p[2], obj.color, obj.map);
                        break;
                    case 'i':
                        editor.signals.circle.dispatch(p[0], p[1], p[2], obj.color, obj.map);
                        break;
                    case 'q':
                        editor.signals.square.dispatch(p[0], p[1], p[2], obj.color, obj.map);
                        break;
                    default:
                        console.log("object not found")
                }

            }
        }
    }

}