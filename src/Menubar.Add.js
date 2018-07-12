Menubar.Add = function (  ) {

    var container = new UI.Panel();
    container.setClass( 'menu' );

    var title = new UI.Panel();
    title.setClass( 'title' );
    title.setTextContent( 'Add' );
    container.add( title );

    var options = new UI.Panel();
    options.setClass( 'options' );
    container.add( options );


    // Group
    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( 'Group' );
    option.onClick( function () {
        editor.signals.outliner.dispatch();
        editor.signals.group.dispatch();

    } );
    options.add( option );

    options.add( new UI.HorizontalRule() );






    var option =new UI.Row();

    option.setClass('option');
    option.setTextContent('Circle');
    option.onClick(function(){
        editor.signals.outliner.dispatch();
        editor.signals.circle.dispatch(5+10*Math.random(),5+10*Math.random(),5+10*Math.random(),0xff0000*Math.random());

    });

    options.add(option);


    options.add( new UI.HorizontalRule() );



    var option =new UI.Row();

    option.setClass('option');
    option.setTextContent('Cube');
    option.onClick(function(){
        editor.signals.outliner.dispatch();

        editor.signals.cube.dispatch(-20-10*Math.random()+40*Math.ceil(Math.random()),-1+20*Math.random(),3+30*Math.random(),0xffffff*Math.random());
    });

    options.add(option);

    options.add( new UI.HorizontalRule() );




    var option =new UI.Row();

    option.setClass('option');
    option.setTextContent('Square');
    option.onClick(function(){
        editor.signals.outliner.dispatch();

        editor.signals.square.dispatch(1+10*Math.random(),2+10*Math.random(),3+10*Math.random(),0xfff000*Math.random());


    });

    options.add(option);

    options.add( new UI.HorizontalRule() );






    return container;






}
