var angular = require('angular');
var angularUiRouter = require('ui-router');

var homeView = require('./components/home/home');
var groupView = require('./components/groupview/groupview');
var soloView = require('./components/soloview/soloview');

var AppController = function() {
    console.log("AppCtrl instantiated");
    var appCtrl = this;
    
    this.title = "jstogether";
};


angular.module('app', [
    'ui.router',
    'app.home',
    'app.soloview',
    'app.groupview'
    ])
    .controller("AppController", AppController)
    .config(function routeConfiguration($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl:'components/home/home.html'
            })
            .state('groupview', {
                url: '/group',
                templateUrl:'components/groupView/groupView.html'
        })
            .state('soloview', {
                url: '/solo',
                templateUrl: 'components/soloView/soloView.html'
            });
        $urlRouterProvider.otherwise('/home')
            
            
            
    });