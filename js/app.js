//this stores our user session
angular.module('sampleApp', ['ui.router'])
    .run(['Auth','$rootScope','$urlRouter','Session', function (Auth, $rootScope, $urlRouter, Session) {

      //we want to watch on state change and check if the session exists, if not, wait for our auth to resolve and continue the route
      //We do not need to clean this up because it the .run block only gets called once
      $rootScope.$on('$stateChangeStart', function(e) {

        if(Session.id === undefined) {
          //prevents route change
          e.preventDefault();

          Auth.waitForAuth().then(function() {
            //continues routing
            $urlRouter.sync();

          });
        }

      });

      //check server for if the current user is already authenticated
      Auth.isAuthenticated();

    }]);