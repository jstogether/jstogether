

var HomeController = function($state){
    var homeCtrl = this;

    homeCtrl.state = $state;
};

angular.module('app.home', [])
    .controller("HomeController", HomeController);

module.exports = HomeController;