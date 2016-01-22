angular.module('sampleApp').service('Session', ['USER_ROLES',function(USER_ROLES) {

  this.create = function(id, name, level) {
    this.id = id;
    this.name = name;
    this.role = USER_ROLES[level];
  };

  this.destroy = function() {
    this.id = null;
    this.name = null;
    this.role = null;
  };
}]);