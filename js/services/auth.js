angular.module('sampleApp').factory('Auth', ['$q', '$http', 'AUTH_SETTINGS', '$window', '$rootScope', '$timeout', 'Session', 'USER_ROLES',
  function ($q, $http, AUTH_SETTINGS, $window, $rootScope, $timeout, Session, USER_ROLES) {
    var Auth = {},
        dummySession = {
          csrf: "2kjn2kj42l4h2h42kj34kj24",
          user: {
            id: 0,
            name: "Mike Rensel",
            role: "admin"
          }

        };


    var

    //combines our return url with any params that need to be sent with it.
        buildReturnUrl = function () {
          var loginConfig = Session,
              url = loginConfig.url,
              params = loginConfig.params,
              query = "?",
              count = 0;

          for (var param in params) {
            if (params.hasOwnProperty(param)) {
              if (count > 0) {
                query = query + "&";
              }
              query = query + (param + "=" + params[param]);

              count++;
            }
          }

          if (query.length > 1) {
            url = url + query;
          }

          return url;

        },

    //pulls out all params from location.search and returns contents as an object
        getQueryParams = function () {
          var query, queriesObject = {},
              queries = $window.document.location.search.split("?")[1].split("&");

          for (var a = 0, b = queries.length; a < b; a++) {
            query = queries[a].split("=");

            queriesObject[query[0]] = query[1];
          }

          return queriesObject;
        },
        setSession = function (session) {

          //sets our client side session with our user info
          Session.create(session.user.id, session.user.name, session.user.role);

          //sets csrf token to header so it's included in all out going requests
          $http.defaults.headers.common['X-CSRF-Token'] = session.csrf;

          Auth.resolveAuth();

          //we don't need to clean this up because we will only ever instantiate this once
          $rootScope.$on("$stateChangeStart", function (e, nextState) {

            // on state change, check data.role to gate the page
            // if session role doesn't match data.role, prevent page nav
            if (nextState.data && nextState.data.role !== Session.role && nextState.data.role !== USER_ROLES.all) {
              e.preventDefault();
            }
          });
        },
        destroySession = function (status) {

          //if both calls to check the session fail, clear anything set in session
          returnToSSO(status);
          Session.destroy();
        },
        returnToSSO = function (status) {
          var errorMsg = AUTH_SETTINGS.authErrorCodes[status];

          $rootScope.$emit("Auth:errorStatus", errorMsg);

          //does not need to be cleaned up, we are redirecting away from our app
          $timeout(function () {
            //console.log(buildReturnUrl());
            $window.location.href = buildReturnUrl();

          }, AUTH_SETTINGS.authErrorDuration);
        },

        hasToken = function () {

          return $window.document.location.search ? getQueryParams().sso : undefined;
        },

        //Enter your auth web service here =================================================================================
        getAuthStatus = function () {
          var deferred = $q.defer();

          //sets our redirect information from our auth settings so it's available in case auth fails
          Session.setRedirect();

          if (AUTH_SETTINGS.authEnabled) {
            $http({
              method: 'GET',
              url: '/auth/status',
              dataType: 'json',
              contentType: 'application/json'
            }).success(function (data, status, headers, config) {

              deferred.resolve(data);

            }).error(function (data, status, headers, config) {
              deferred.reject(status);
            });
          } else {
            deferred.resolve(dummySession);
          }

          return deferred.promise;
        },

        //enter your token processing web service here ======================================================================
        processAuthToken = function () {
          var deferred = $q.defer(),
              payload = {
                token: getQueryParams().sso
              };

          if (AUTH_SETTINGS.authEnabled) {
            $http({
              method: 'POST',
              url: '/auth/token',
              data: angular.toJson(payload),
              dataType: 'json',
              contentType: 'application/json'
            }).success(function (data, status, headers, config) {

              deferred.resolve(angular.fromJson(data));

            }).error(function (data, status, headers, config) {
              deferred.reject(data);
            });
          } else {

            deferred.resolve(dummySession);
          }

          return deferred.promise;
        };


    //exposes a promise for all models==============================================================================
    var deferred = $q.defer(),
        getPromise = function() {
          return deferred.promise;
        };

    Auth.waitForAuth = function(callback) {

      return getPromise().then(callback);

    };

    Auth.resolveAuth = function() {
      deferred.resolve();
    };


//=======================================================================================================

    Auth.isAuthenticated = function () {
      //check server for if the current user is already authenticated
      getAuthStatus().then(
          function success(session) {

            setSession(session);

          },

          //if initial session check fails - the user is not logged in
          function error(status) {

            //check the url for a SSO token
            if (hasToken() !== undefined) {

              processAuthToken().then(
                  function success(session) {

                    setSession(session);
                  },
                  function error(status) {

                    destroySession(status);
                  }
              );
            } else {

              destroySession(status);
            }
          }
      );
    };

    return Auth;
  }]);
