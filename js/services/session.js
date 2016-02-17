angular.module('sampleApp').service('Session', ['USER_ROLES', 'AUTH_SETTINGS', '$window',
  function (USER_ROLES, AUTH_SETTINGS, $window) {
    var
    //add any methods here for required params that need formatting
        createParams = function (params) {
          var output = params,
              location = $window.location;

          if (output.origin === "current") {
            output.origin = location.protocol + "//" + location.host + location.pathname + location.hash;
          } else {
            output.origin = location.protocol + "//" + location.host + output.origin;
          }

          return output;
        };

    //stores the redirect and formats any params
    this.setRedirect = function () {
      //make a copy of our auth settings login redirect to prevent polluting our constants
      //we do this because you can add more params in the auth config to set in the return url
      var authConfig = angular.fromJson(angular.toJson(AUTH_SETTINGS.loginRedirect));

      this.url = authConfig.url;
      this.params = createParams(authConfig.params);
    };

    this.create = function (id, name, level) {
      this.id = id;
      this.name = name;
      this.role = USER_ROLES[level];

    };

    this.destroy = function () {
      this.id = null;
      this.name = null;
      this.role = null;
    };
  }]);