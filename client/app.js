var AppController = function() {
    console.log("AppCtrl instantiated");
    var appCtrl = this;
    
    this.title = "jstogether";
};
// pie

angular.module('app', [
    'ui.router',
    'app.home'
    ])
    .controller("AppController", AppController)
    .config(function routeConfiguration($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl:'components/home/home.html'
            })
            .state('projectview', {
                url: '/projects',
                templateUrl:'components/projectView/projectView.html',
                abstract: true
        })
            .state('projectview.soloView', {
                url: '/solo',
                templateUrl: 'components/projectView/soloView/soloView.js'
            });
        $urlRouterProvider.otherwise('/home')
            
            
            
    });