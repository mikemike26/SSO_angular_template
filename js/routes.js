angular.module('myApp').config(['$urlRouterProvider', '$stateProvider',
  function($urlRouterProvider, $stateProvider, Auth){
    $urlRouterProvider.otherwise("/dashboard/projects/list/current/All");
    $stateProvider
        .state("main",{
          url:"/main",
          templateUrl: "templates/layout/main.html",
          abstract: true
        })

  }]);



