// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'todoIonic' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('todoIonic', ['ionic', 'LocalStorageModule']);

// Add prefix to stored entities to prevent them from being overwritten
app.config( function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('todoIonic');
});

//Middleman between data (LocalStorage) and view
app.controller('main', function ($scope, $ionicModal, localStorageService) {
  //store the entities name in a variable 
  var taskData = 'task';
// initialize tasks scope with empty array
  $scope.tasks = [];
// initialize task scope with empty object
  $scope.task = {};

  // configure ionic modal before use
  $ionicModal.fromTemplateUrl('new-task-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal){
    $scope.newTaskModal = modal;
  });

//fetch task from local storage (if they exist)
$scope.getTasks = function(){
  if(localStorageService.get(taskData)) {
    $scope.tasks = localStorageService.get(taskData);
  } else {
    $scope.tasks = [];
  }
}

//create new task by pusing task object to task array and updating local storage with tasks
$scope.createTask = function(){
  $scope.tasks.push($scope.task);
  localStorageService.set(taskData, $scope.tasks);
  $scope.task = {};
  // close task modal
  $scope.newTaskModal.hide(); //from line 28
}

//remove a task from tasks array and update local storage
$scope.removeTask = function(){
  $scope.tasks.splice(index, 1);
  localStorageService.set(taskData, $scope.tasks);
}


//update a task as complete
$scope.completeTask = function(){
  if (index!==-1) {
    $scope.tasks[index].completed = true;
  }
  localStorageService.set(taskData, $scope.tasks);
}



});




// .run(function($ionicPlatform) {
//   $ionicPlatform.ready(function() {
//     if(window.cordova && window.cordova.plugins.Keyboard) {
//       // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//       // for form inputs)
//       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

//       // Don't remove this line unless you know what you are doing. It stops the viewport
//       // from snapping when text inputs are focused. Ionic handles this internally for
//       // a much nicer keyboard experience.
//       cordova.plugins.Keyboard.disableScroll(true);
//     }
//     if(window.StatusBar) {
//       StatusBar.styleDefault();
//     }
//   });
// })
