var Store = function() {
    var db = 0;
    var scope = this;

    this.SetDb = function(data, name) {


        if (data) {


            localforage.setItem(name, data).then(function(value) {
                console.log(value);
            }).catch(function(err) {
                console.error(err);
            });
        }
        db++;



    }

    this.GetDb = function() {
        localforage.getItem('MyFile').then(function(value) {
            console.log(value);
            editor.loader.createALL(value);
        }).catch(function(err) {
            console.error(err);
        });

    }




}