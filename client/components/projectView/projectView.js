
var ProjectViewController = function ($state){
    var pvCtrl = this;

    pvCtrl.state = $state;
};

angular.module('app.projectview', [
    'app.projectview.groupview',
    'app.projectview.soloview'])
    .controller('ProjectViewController', ProjectViewController);