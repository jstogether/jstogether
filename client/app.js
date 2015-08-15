var AppController = function() {
    console.log("AppCtrl instantiated");
    var appCtrl = this;
    
    this.title = "jstogether";
};
// pie

angular.module('app', [
    'ui.router',
    ])
    .controller("AppController", AppController)
    .config(function routeConfiguration($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl:'components/home/home.html'
            });
            
        $urlRouterProvider.otherwise('/home')
            
            
            
    });