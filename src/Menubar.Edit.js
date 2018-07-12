Menubar.Edit = function (  ) {

    var container = new UI.Panel();
    container.setClass( 'menu' );

    var title = new UI.Panel();
    title.setClass( 'title' );
    title.setTextContent( 'Edit' );
    container.add( title );

    var options = new UI.Panel();
    options.setClass( 'options' );
    container.add( options );

    // Undo

    var undo = new UI.Row();
    undo.setClass( 'option' );
    undo.setTextContent( 'Undo (Ctrl+Z)' );
    undo.onClick( function () {

        editor.History.undo();

    } );
    options.add( undo );

    // Redo

    var redo = new UI.Row();
    redo.setClass( 'option' );
    redo.setTextContent( 'Redo (Ctrl+Shift+Z)' );
    redo.onClick( function () {

        editor.History.redo();

    } );
    options.add( redo );

    // Clear History

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( 'Clear History' );
    option.onClick( function () {

        if ( confirm( 'The Undo/Redo History will be cleared. Are you sure?' ) ) {

            // editor.history.clear();

        }

    } );
    // options.add( option );


    editor.signals.historyChanged.add( function () {

        var history = editor.History;

        undo.setClass( 'option' );
        redo.setClass( 'option' );

        if ( history.undos.length == 0 ) {

            undo.setClass( 'inactive' );

        }

        if ( history.redos.length == 0 ) {

            redo.setClass( 'inactive' );

        }

    } );

    // ---

    options.add( new UI.HorizontalRule() );

    // Clone

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( 'Clone' );
    option.onClick( function () {

        var object = editor.selected;


        if ( object.parent === null ) return; // avoid cloning the camera or scene

        object = object.clone();
        console.log(object)

        editor.History.execute( new AddObjectCommand( object ) );

    } );
    options.add( option );

    // Delete

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( 'Delete (Del)' );
    option.onClick( function () {

        var object = editor.selected;

        var parent = object.parent;
        if ( parent === undefined ) return; // avoid deleting the camera or scene

        editor.History.execute( new RemoveObjectCommand( object ) );
        console.log(object);

    } );
    options.add( option );



    return container;
};