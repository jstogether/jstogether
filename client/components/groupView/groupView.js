var createGroup = require('./createGroup/createGroup');
var joinGroup = require('./joinGroup/joinGroup');

var GroupViewController = function(){
    var gvCtrl = this;

};

angular.module('app.groupview', [])
    .controller('GroupViewController', GroupViewController);

module.exports = GroupViewController;