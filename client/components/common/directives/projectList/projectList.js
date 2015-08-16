
var ProjectViewController = function ($state){
    var pvCtrl = this;
    pvCtrl.state = $state;
};

angular.module('app.directives.projectlist', [])
    .controller('ProjectViewController', ProjectViewController)
    .directive('projectsList', function ProjectsList(){
    return {
        restrict: 'A',
        templateUrl: 'components/common/directives/projectList/projectList.html',
        controller: ProjectViewController
    }
});

module.exports = ProjectViewController;