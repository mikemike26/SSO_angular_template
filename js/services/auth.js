angular.module('sampleApp').factory('Auth',['$q','$http', 'AUTH_CONFIG', function($q, $http, AUTH_CONFIG){
  var Auth = {},
      dummyUser = {
        csrf: "2kjn2kj42l4h2h42kj34kj24",
        user: {
          id: 0,
          name: "Mike Rensel",
          level: "admin"
        }

      };

  Auth.isAuthenticated = function() {
    var deferred = $q.defer();

    if(AUTH_CONFIG.authEnabled) {
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
    }else {
      deferred.resolve(dummyUser);
    }

    return deferred.promise;
  };

  Auth.processAuth = function(loginToken) {
    var deferred = $q.defer(),
        payload = {
          token: loginToken
        };

    if(AUTH_CONFIG.authEnabled) {
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
    }else {
      deferred.resolve(dummyUser);
    }

    return deferred.promise;
  };


  return Auth;
}]);
