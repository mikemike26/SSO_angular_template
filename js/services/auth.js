angular.module('sampleApp').factory('Auth',['$q','$http', function($q, $http){
  var Auth = {};

  Auth.isAuthenticated = function() {
    var deferred = $q.defer();
    //$http({
    //  method: 'GET',
    //  url: '/opcos/getAll',
    //  dataType: 'json',
    //  contentType: 'application/json'
    //}).success(function (data, status, headers, config) {
    //  deferred.resolve(data);
    //}).error(function (data, status, headers, config) {
    //  deferred.reject(data);
    //});


    return deferred.promise;
  };

  Auth.processAuth = function() {

  };


  return Auth;
}]);
