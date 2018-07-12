var Menubar=function () {

    var container=new UI.Panel();
    container.setId('menubar')

    this.dom=container.dom;

    container.add(new Menubar.File());
    container.add(new Menubar.Add());
    container.add(new Menubar.Edit());



}