//this stores our user session
angular.module('sampleApp', ['ui.router'])
    .run(['Auth', '$rootScope', '$urlRouter', 'Session', '$state', 'USER_ROLES', '$stateParams',
      function (Auth, $rootScope, $urlRouter, Session, $state, USER_ROLES, $stateParams) {



        //we want to watch on state change and check if the session exists, if not, wait for our auth to resolve and continue the route
        //We do not need to clean this up because it the .run block only gets called once
        $rootScope.$on('$stateChangeStart', function (e, nextState, nextParams, fromState, fromParams) {
          var currentRoute = Session.getCurrentRoute(),
              defaultStateName = "root.main",
              defaultParams = {};

          if(currentRoute.name === "") {

            if(nextState.name !== "login.sso") {
              e.preventDefault();
              Auth.waitForAuth().then(function () {

                Session.setCurrentRoute(defaultStateName, defaultParams);
                $state.transitionTo(defaultStateName, defaultParams);
              });

              //go to loading page
              $state.go("login.sso");
            }

          }else {
            if (Session.id === undefined) {
              //prevents route change
              e.preventDefault();
              Auth.waitForAuth().then(function () {
                //continues routing
                // $urlRouter.sync();
                $state.transitionTo(currentRoute.name, currentRoute.params);

              });

              // on state change, check data.role to gate the page
              // if session role doesn't match data.role, prevent page nav
              // send to default route with default params
              //
            }else if (nextState.data && nextState.data.role !== Session.role && nextState.data.role !== USER_ROLES.all) {
              e.preventDefault();

              $state.transitionTo(defaultStateName, defaultParams);
            }
          }

        });

        //caches our current page on state change success so we can reload properly
        $rootScope.$on("$stateChangeSuccess", function(e, currentState) {
          var currentRoute = Session.getCurrentRoute();

          if(currentRoute.name.length > 0 && currentState.name !== "login.sso") {
            Session.setCurrentRoute(currentState.name, $stateParams);
          }
        });


        //check server for if the current user is already authenticated
        Auth.isAuthenticated();


      }]);
