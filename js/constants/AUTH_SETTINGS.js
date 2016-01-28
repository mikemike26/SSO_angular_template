//Settings for our SSO auth framework

angular.module('sampleApp').constant('AUTH_SETTINGS', {

  //if false, disable all auth
  //This is mainly only useful in the beginning of dev before you have a backend in place
  //once a backend is in place, you most likely are going to need auth to provide a csrf token
  //for any following requests
  //
  //For this to continue to work after backend implementation, you would need to build this flag into your models
  //to disable all web calls and just use dummy data.
  authEnabled: false,

  //redirect options
  loginRedirect: {
    //redirect back to SSO url
    url: 'https://yourSSOGateway.com',

    //additional information sent along with the redirect
    //just keep adding any needed keys and values
    //
    //appId and origin are required
    params: {
      //application id to identify to login portal
      appId: 0,
      //this is the origin of the redirect, the SSO will nav back to this page after it validates
      //specify a relative url path or 'current' to use the current page the redirect started from
      origin: "current"
    }
  },

  //possible error codes that can be returned from the auth service
  //code: error message
  authErrorCodes: {
    //Not authenticated
    401: "Not authenticated",
    //Not authorized
    403: "Not authorized",
    //Session timeout
    419: "Session timeout",
    //Session timeout
    440: "Session timeout"
  },

  //how long to display auth errors before redirect in ms
  //logging out fires event: "Auth:errorStatus" on the $rootScope that passes
  //the error message from authErrorCodes
  authErrorDuration: 3000
});
