
var ProjectViewController = function (){

};

angular.module('app.projectView', [
    'app.projectView.groupView',
    'app.projectView.soloView'])
    .controller('ProjectViewController', ProjectViewController);