angular.module('sampleApp', ['ui.router']).run(['Auth', '$window', function (Auth, $window) {


  Auth.isAuthenticated().then(
      function success(user) {

      },
      function error() {

        Auth.processAuth().then(
            function success() {

            },
            function error() {

            }
        );
      }
  );
}]);