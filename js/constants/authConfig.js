//Settings for our SSO auth framework

angular.module('sampleApp').constant('AUTH_CONFIG', {

  //if false, disable all auth
  //This is mainly only useful in the beginning of dev before you have a backend in place
  //once a backend is in place, you most likely are going to need auth to provide a csrf token
  //for any following requests
  //
  //For this to continue to work after backend implementation, you would need to build this flag into your models
  //to disable all web calls and just use dummy data.
  authEnabled: false,

  //redirect for when user is not logged in
  loginRedirect: {
    url: 'https://gateway.mktec.com/ManagedUsers/home.xhtml',

    //additional information sent along with the redirect
    //just keep adding any needed keys and values
    params: {
      appId: 0,
      userId: "barf"
    }
  }
});
