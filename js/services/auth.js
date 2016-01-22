angular.module('sampleApp').factory('Auth', ['$q', '$http', 'AUTH_CONFIG', '$window', function ($q, $http, AUTH_CONFIG, $window) {
  var Auth = {},
      dummySession = {
        csrf: "2kjn2kj42l4h2h42kj34kj24",
        user: {
          id: 0,
          name: "Mike Rensel",
          role: "guest"
        }

      };


  //combines our return url with any params that need to be sent with it.
  var buildReturnUrl = function () {
        var loginConfig = AUTH_CONFIG.loginRedirect,
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
      };

  Auth.isAuthenticated = function () {
    var deferred = $q.defer();

    if (AUTH_CONFIG.authEnabled) {
      $http({
        method: 'GET',
        url: '/opcos/getAll',
        dataType: 'json',
        contentType: 'application/json'
      }).success(function (data, status, headers, config) {

        deferred.resolve(data);

      }).error(function (data, status, headers, config) {
        deferred.reject(data);
      });
    } else {

      //deferred.resolve(dummySession);
      deferred.reject(dummySession);
    }

    return deferred.promise;
  };

  Auth.processAuth = function () {
    var deferred = $q.defer(),
        payload = {
          token: getQueryParams().sso
        };

    if (AUTH_CONFIG.authEnabled) {
      $http({
        method: 'POST',
        url: '/opcos/getAll',
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

  Auth.returnToSSO = function () {

    $window.location.href = buildReturnUrl();
  };

  Auth.hasToken = function() {

    return $window.document.location.search ? getQueryParams().sso : undefined;
  };

  return Auth;
}]);
