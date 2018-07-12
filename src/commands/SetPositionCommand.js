var SetPositionCommand = function ( object, newPosition, optionalOldPosition ) {

    Command.call( this );

    this.type = 'SetPositionCommand';
    this.name = 'Set Position';
    this.updatable = true;

    this.object = object;

    if ( object !== undefined && newPosition !== undefined ) {

        this.oldPosition = object.position.clone();
        this.newPosition = newPosition.clone();

    }

    if ( optionalOldPosition !== undefined ) {

        this.oldPosition = optionalOldPosition.clone();

    }

};
SetPositionCommand.prototype = {

    execute: function () {

        this.object.position.copy(this.newPosition);
        this.object.updateMatrixWorld(true);

    },

    undo: function () {

        this.object.position.copy(this.oldPosition);
        this.object.updateMatrixWorld(true);

    },
}