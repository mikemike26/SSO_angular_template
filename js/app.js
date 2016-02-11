//this stores our user session
angular.module('sampleApp', ['ui.router'])
    .run(['Auth', '$rootScope', '$urlRouter', 'Session', '$state', 'USER_ROLES', '$window',
      function (Auth, $rootScope, $urlRouter, Session, $state, USER_ROLES, $window) {

        //we want to watch on state change and check if the session exists, if not, wait for our auth to resolve and continue the route
        //We do not need to clean this up because it the .run block only gets called once
        $rootScope.$on('$stateChangeStart', function (e, nextState) {

          if (Session.id === undefined) {
            //prevents route change
            e.preventDefault();

            Auth.waitForAuth().then(function () {
              //continues routing
              $urlRouter.sync();

            });
          } else {
            // on state change, check data.role to gate the page
            // if session role doesn't match data.role, prevent page nav
            // will kick the user back to the default "otherwise" route
            //
            //This should only be tripped if a user is trying to manually fudge the code to get into sections
            //their permission level doesn't allow, so the awkward behavior is fine
            if (nextState.data && nextState.data.role !== Session.role && nextState.data.role !== USER_ROLES.all) {
              var location = $window.location;
              e.preventDefault();

              //will trigger our default "otherwise route"
              $window.location = location.protocol + "//" + location.host + location.pathname + "#/xxxxxxxxxxxxx";
            }
          }

        });

        //check server for if the current user is already authenticated
        Auth.isAuthenticated();

      }]);

