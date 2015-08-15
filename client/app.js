var angular = require('angular');
var angularUiRouter = require('ui-router');

var homeView = require('./components/home/home');

var AppController = function() {
    console.log("AppCtrl instantiated");
    var appCtrl = this;
    
    this.title = "jstogether";
};


angular.module('app', [
    'ui.router',
    'app.home',
    'app.projectview'
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
                templateUrl:'components/projectView/projectView.html'
        })
            .state('projectview.soloView', {
                url: '/solo',
                templateUrl: 'components/projectView/soloView/soloView.js'
            });
        $urlRouterProvider.otherwise('/home')
            
            
            
    });