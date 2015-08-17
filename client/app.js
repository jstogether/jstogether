var angular = require('angular');
var angularUiRouter = require('ui-router');

var homeView = require('./components/home/home');
var groupView = require('./components/groupView/groupView');
var soloView = require('./components/soloView/soloView');
var projectView = require('./components/common/directives/projectList/projectList');
var joinGroup = require('./components/groupView/joinGroup/joinGroup');
var createGroup = require('./components/groupView/createGroup/createGroup');


var AppController = function() {
    console.log("AppCtrl instantiated");
    var appCtrl = this;
    
    this.title = "jstogether";
};

angular.module('app', [
    'ui.router',
    'app.home',
    'app.soloview',
    'app.groupview',
    'app.groupview.joingroup',
    'app.groupview.creategroup',
    'app.directives.projectlist'
])
.controller("AppController", AppController)
.config(function routeConfiguration ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl:'components/home/home.html'
    })
    .state('groupview', {
        url: '/group',
        templateUrl:'components/groupView/groupView.html'
    })
    .state('groupview.creategroup', {
        url: '/create',
        templateUrl:'components/groupView/createGroup/createGroup.html'
    })
    .state('groupview.joingroup', {
        url: '/join',
        templateUrl:'components/groupView/joinGroup/joinGroup.html'
    })
    .state('soloview', {
        url: '/solo',
        templateUrl: 'components/soloView/soloView.html'
    });

    $urlRouterProvider.otherwise('/home')
});
