var AppController = function() {
    console.log("AppCtrl instantiated");
    var appCtrl = this;
    
    this.title = "jstogether";
};


angular.module('app', [
    'ui.router',
    ])
    .controller("AppController", AppController);