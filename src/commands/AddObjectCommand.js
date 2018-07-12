var AddObjectCommand = function ( object ) {

    Command.call( this );

    this.type = 'AddObjectCommand';

    this.object = object;
    if ( object !== undefined ) {

        this.name = 'Add Object: ' + object.name;

    }

};

AddObjectCommand.prototype = {

    execute: function () {

        editor.viewport.addToScene(this.object)

        // this.editor.addObject(this.object);
        // this.editor.select(this.object);

    },

    undo: function () {

        editor.viewport.deleteObject(this.object)

        // this.editor.removeObject(this.object);
        // this.editor.deselect();

    }
}