angular.module('sampleApp').config(['$urlRouterProvider', '$stateProvider',
  function ($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise(function($injector) {
      var $state = $injector.get('$state');

      $state.transitionTo("root.main", {});
    });

    $stateProvider

        .state("root", {
          url: "",
          templateUrl: "templates/layout/layout.html",
          abstract: true
        })
        .state("root.main", {
          url: "/main",
          data: {
            role: "*"
          },
          templateUrl: "templates/pages/main.html"
        })
        .state("root.admin", {
          url: "/main",
          data: {
            role: "admin"
          },
          templateUrl: "templates/pages/admin.html"
        });

  }]);



