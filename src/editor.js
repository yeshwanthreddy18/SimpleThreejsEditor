var Editor = function() {

    var Signal = signals.Signal;
    var scope = this
    this.viewport = null;
    this.selected=null;
    this.prev;
    this.data;
    this.imageFile = {};

    this.Storage = new Store();
    // this.Storage.Set();
    this.loader = new Loader();

    this.zip = new JSZip();
    this.History=new History();





    this.signals = {
        redbutton: new Signal(),
        green: new Signal(),
        cube: new Signal(),
        square: new Signal(),
        circle: new Signal(),
        rotation: new Signal(),
        deleteObj: new Signal(),
        clearALL: new Signal(),
        importScene: new Signal(),
        emportScene: new Signal(),
        sceneBackgroundChanged: new Signal(),
        outliner: new Signal(),
        rayRotation: new Signal(),
        resizes: new Signal(),
        finder: new Signal(),
        transControl: new Signal(),
        group: new Signal(),
        cancel: new Signal(),
        store: new Signal(),
        historyChanged: new Signal(),

    }

}
Editor.prototype = {
    init: function() {
        var viewport = new Viewport();
        document.body.appendChild(viewport.dom);
        this.viewport = viewport;
        var toolbar = new Toolbar();
        document.body.appendChild(toolbar.dom);
        var menubar = new Menubar();
        document.body.appendChild(menubar.dom);
        var sidebar = new Sidebar();
        document.body.appendChild(sidebar.dom);

    }
}