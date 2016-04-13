angular.module('sampleApp').config(['$urlRouterProvider', '$stateProvider',
  function ($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise(function($injector) {
      var $state = $injector.get('$state');

      $state.transitionTo("root.main", {});
    });

    $stateProvider

        //login states - can probably make do without the abstract state, but this gives us flexibility
        //this gives the app some place to sit while loading if it directly navigated to
        .state("login", {
          url: "/login",
          template: '<div data-ui-view=""></div>',
          abstract: true
        })
        .state("login.sso", {
          url: "/sso",
          data: {
            role: "*"
          },
          template: '<div>Logging In...</div>'
        })

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



