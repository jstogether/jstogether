
var ProjectViewController = function ($state){
    var pvCtrl = this;

    pvCtrl.state = $state;
};

angular.module('app.projectview', [])
    .controller('ProjectViewController', ProjectViewController);

module.exports = ProjectViewController;