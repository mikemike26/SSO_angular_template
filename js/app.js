//this stores our user session
angular.module('sampleApp', ['ui.router'])
    .run(['Auth', 'Session', '$http', '$rootScope', 'USER_ROLES', function (Auth, Session, $http, $rootScope, USER_ROLES) {
      var setSession = function (session) {

            //sets our client side session with our user info
            Session.create(session.user.id, session.user.name, session.user.role);

            //sets csrf token to header so it's included in all out going requests
            $http.defaults.headers.common['X-CSRF-Token'] = session.csrf;

            //we don't need to clean this up because we will only ever instantiate this once
            $rootScope.$on("$stateChangeStart", function (e, nextState) {
              console.log(nextState);
              // on state change, check data.role to gate the page
              // if session role doesn't match data.role, prevent page nav
              if (nextState.data && nextState.data.role !== Session.role && nextState.data.role !== USER_ROLES.all) {
                e.preventDefault();
              }
            });
          },
          destroySession = function () {

            //if both calls to check the session fail, clear anything set in session
            Session.destroy();

            Auth.returnToSSO();
          };

      //check server for if the current user is already authenticated
      Auth.isAuthenticated().then(
          function success(session) {

            setSession(session);

          },

          //if initial session check fails - the user is not logged in
          function error() {

            //check the url for a SSO token
            if (Auth.hasToken() !== undefined) {

              Auth.processAuth().then(
                  function success(session) {

                    setSession(session);
                    console.log(Session);
                    console.log($http.defaults);
                  },
                  function error() {

                    destroySession();
                  }
              );
            } else {

              destroySession();
            }
          }
      );
    }]);