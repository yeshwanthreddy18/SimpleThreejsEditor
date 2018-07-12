
var Sidebar = function () {

    var container = new UI.Panel();
    container.setId( 'sidebar' );
    this.dom=container.dom;



    var sceneTab = new UI.Text( 'SCENE' ).onClick( selected );


    var tabs = new UI.Div();
    tabs.setId( 'tabs' );
    tabs.add( sceneTab );
    container.add( tabs );

    function selected() {

        sceneTab.setClass( 'selected' );
        scene.setDisplay( '' );

    }


    var scene = new UI.Span().add(
        new Sidebar.Scene(),
        new Sidebar.Properties(),
        // new Sidebar.Animation(),
        // new Sidebar.Script()
    );
    container.add( scene );



};
