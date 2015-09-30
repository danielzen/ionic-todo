// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

  .controller('TodoCtrl', function($scope, $ionicPopup, $ionicListDelegate) {
    $scope.tasks =
      [
        {title: "First", completed: true},
        {title: "Second", completed: false},
        {title: "Third", completed: false},
      ];

    $scope.newTask = function() {
      $ionicPopup.prompt({
        title: "New Task",
        template: "Enter task:",
        inputPlaceholder: "What do you need to do?",
        okText: 'Create task'
      }).then(function(res) {    // promise
        if (res) $scope.tasks.push({title: res, completed: false});
      })
    };

    $scope.edit = function(task) {
      $scope.data = { response: task.title };
      $ionicPopup.prompt({
        title: "Edit Task",
        scope: $scope
      }).then(function(res) {    // promise
        if (res !== undefined) task.title = $scope.data.response;
        $ionicListDelegate.closeOptionButtons()
      })
    };
  })

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
