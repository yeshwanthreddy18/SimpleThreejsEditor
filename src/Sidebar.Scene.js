Sidebar.Scene=function () {


    var container = new UI.Panel();
    container.setBorderTop( '0' );
    container.setPaddingTop( '20px' );



    function buildOption( object, draggable ) {

        var option = document.createElement( 'div' );
        option.draggable = draggable;
        option.innerHTML = '<span class="type ' + object.type + '"></span> '+object.name ;
        option.value = object.id;
        option.onclick=find;


        return option;

    }
    function find(event) {
        console.log(event.target.value);
        editor.signals.finder.dispatch(event.target.value);

    }





    var viewport=editor.viewport;
    var scene=viewport.scene;
    var camera=viewport.camera;


    var outliner = new UI.Outliner(viewport);
    outliner.setId( 'outliner' );
    container.add(outliner);


    function refreshUI(){

        var options=[];

        options.push( buildOption( camera, false ) );
        options.push( buildOption( scene, false ) );

        ( function addObjects( objects, pad ) {

            for (var i=0, l = objects.length; i < l; i ++ ) {
                if(objects[i].name!=="trans") {

                    var object = objects[i];

                    var option = buildOption(object, true);
                    option.style.paddingLeft = (pad * 10) + 'px';
                    options.push(option);

                    addObjects(object.children, pad + 1);
                }

            }

        } )( scene.children, 1 );

        outliner.setOptions( options );

    }
    refreshUI();


    editor.signals.outliner.add(function () {
        // var obj=scene.children
        // addObjects(obj,1);
        refreshUI();
    });

    // outliner.setOptions( options );







    function onBackgroundChanged() {

        editor.signals.sceneBackgroundChanged.dispatch( backgroundColor.getHexValue() );

    }

    var backgroundRow = new UI.Row();

    var backgroundColor = new UI.Color().setValue( '#aaaaaa' ).onChange( onBackgroundChanged );

    backgroundRow.add( new UI.Text( 'Background' ).setWidth( '110px' ) );
    backgroundRow.add( backgroundColor );

    container.add( backgroundRow );










    return container;
}