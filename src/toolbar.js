var Toolbar=function () {
    var container=new UI.Panel();
    container.setId('toolbar');
    this.dom=container.dom;


    var button=new UI.Panel();
    container.add(button);


    var redbutton=new UI.Button('red');
    redbutton.onClick(()=>{
        editor.signals.redbutton.dispatch();
    })
    //button.add(redbutton);

    var button1=new UI.Panel();
   // container.add(button1);


    var delBut=new UI.Button("delete");

    delBut.onClick(()=>{
        editor.signals.deleteObj.dispatch();
    })
   // button1.add(delBut);



    var cubeCreate=new UI.Panel();
   // container.add(cubeCreate);


    var addCube=new UI.Button("addCube");

    addCube.onClick(()=>{
        editor.signals.cube.dispatch();
    })
    //button1.add(addCube);

    var rotations=new UI.Panel();
    container.add(rotations);

    var rotButton=new UI.Button('rotate');
    rotButton.onClick(()=>{
        editor.signals.rotation.dispatch();
    })
    rotations.add(rotButton);




}