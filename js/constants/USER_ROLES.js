//Settings for user permissions

angular.module('sampleApp').constant('USER_ROLES', {

  //roleFromServer: roleAppImplements
  //if you want to give all guests admin rights in this app, change the value of guest to 'admin'
  all: '*',
  admin: 'admin',
  guest: 'guest'

});
