History = function (  ) {

    this.undos = [];
    this.redos = [];
    this.lastCmdTime = new Date();
    this.idCounter = 0;

    this.historyDisabled = false;

    //Set editor-reference in Command

    Command(editor);
};


History.prototype = {

    execute: function (cmd) {

        // var lastCmd = this.undos[this.undos.length - 1];
        // var timeDifference = new Date().getTime() - this.lastCmdTime.getTime();


        this.undos.push(cmd);
        cmd.id = ++this.idCounter;


        cmd.execute();
        cmd.inMemory = true;



        // clearing all the redo-commands

        this.redos = [];
        editor.signals.historyChanged.dispatch();

    },

    undo: function () {



        var cmd = undefined;

        if (this.undos.length > 0) {

            cmd = this.undos.pop();

        }

        if (cmd !== undefined) {

            cmd.undo();
            this.redos.push(cmd);
            // this.editor.signals.historyChanged.dispatch(cmd);

        }
        editor.signals.historyChanged.dispatch();


        return cmd;

    },

    redo: function () {



        var cmd = undefined;

        if (this.redos.length > 0) {

            cmd = this.redos.pop();

        }

        if (cmd !== undefined) {

            cmd.execute();
            this.undos.push(cmd);
            // this.editor.signals.historyChanged.dispatch(cmd);

        }
        editor.signals.historyChanged.dispatch();


        return cmd;

    }


}