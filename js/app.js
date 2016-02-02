//this stores our user session
angular.module('sampleApp', ['ui.router'])
    .run(['Auth', function (Auth) {

      //check server for if the current user is already authenticated
      Auth.isAuthenticated();

    }]);