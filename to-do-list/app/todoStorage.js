angular.module('app').service('todoStorage', function ($q) {
    var _this = this;
    this.data = [];


//To store user data for your app, you can use either storage.sync or storage.local. 
//When using storage.sync, the stored data will automatically be synced to any Chrome browser that the user is logged into, 
//provided the user has sync enabled.


    this.findAll = function(callback) {
        chrome.storage.sync.get('todo', function(keys) {           //StorageArea.get(string or array of string or object keys, function callback)
            if (keys.todo != null) {
                _this.data = keys.todo;
                for (var i=0; i<_this.data.length; i++) {
                    _this.data[i]['id'] = i + 1;
                }
                console.log(_this.data);
                callback(_this.data);
            }
        });
    }

    this.sync = function() {
        chrome.storage.sync.set({todo: this.data}, function() {
            console.log('Data is stored in Chrome storage');
        });
    }

    this.add = function (newContent) {
        var id = this.data.length + 1;
        var todo = {
            id: id,
            content: newContent,
            completed: false,
            createdAt: new Date()
        };
        this.data.push(todo);
        this.sync();
    }

    this.remove = function(todo) {
        this.data.splice(this.data.indexOf(todo), 1);
        this.sync();
    }

    this.removeAll = function() {
        this.data = [];
        this.sync();
    }

});