angular.module('sampleApp').config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
    $urlRouterProvider.otherwise("/main");
    $stateProvider
        .state("root",{
          url:"",
          templateUrl: "templates/layout/layout.html",
          abstract: true
        })
        .state("root.main",{
          url:"/main",
          templateUrl: "templates/pages/main.html"
        })

  }]);



