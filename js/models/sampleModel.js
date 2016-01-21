angular.module('sampleApp').factory('SampleModel',['$q','$http', 'AUTH_CONFIG', function($q, $http, AUTH_CONFIG){
  var SampleModel = {},

      //create dummy data for this model based on what the server will return
      dummyData = [
        {
          id: 0,
          name: "Project 1",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in fringilla arcu. Ut suscipit et metus et commodo. In pellentesque nisi diam, ac facilisis ex malesuada in. Mauris at fringilla neque. Maecenas tempus aliquam turpis, ac sagittis neque consectetur aliquam. Vestibulum pretium rutrum risus, sed finibus massa varius vitae. Duis placerat nulla ut sodales blandit. Etiam ornare tortor at dictum fermentum. Mauris convallis posuere iaculis. Nullam et sem orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          comments: ["thats awesome!!", "you suck", "how insightful"]
        },
        {
          id: 1,
          name: "Project 2",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in fringilla arcu. Ut suscipit et metus et commodo. In pellentesque nisi diam, ac facilisis ex malesuada in. Mauris at fringilla neque. Maecenas tempus aliquam turpis, ac sagittis neque consectetur aliquam. Vestibulum pretium rutrum risus, sed finibus massa varius vitae. Duis placerat nulla ut sodales blandit. Etiam ornare tortor at dictum fermentum. Mauris convallis posuere iaculis. Nullam et sem orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          comments: ["thats awesome!!", "you suck", "how insightful"]
        },
        {
          id: 2,
          name: "Project 3",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in fringilla arcu. Ut suscipit et metus et commodo. In pellentesque nisi diam, ac facilisis ex malesuada in. Mauris at fringilla neque. Maecenas tempus aliquam turpis, ac sagittis neque consectetur aliquam. Vestibulum pretium rutrum risus, sed finibus massa varius vitae. Duis placerat nulla ut sodales blandit. Etiam ornare tortor at dictum fermentum. Mauris convallis posuere iaculis. Nullam et sem orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          comments: ["thats awesome!!", "you suck", "how insightful"]
        }
      ];

  SampleModel.getAll = function() {
    var //abstracted this out to a variable so you could turn this single web call on to test if needed
        //set true to enable
        //
        //useWebCall = true,
        useWebCall = AUTH_CONFIG.authEnabled,
        deferred = $q.defer();

    //if auth is enabled, use web service
    if(useWebCall) {
      $http({
        method: 'GET',
        url: '/projects/getAll',
        dataType: 'json',
        contentType: 'application/json'
      }).success(function (data, status, headers, config) {
        deferred.resolve(data);
      }).error(function (data, status, headers, config) {
        deferred.reject(data);
      });

      //if auth disabled, return dummy data
    }else {
      deferred.resolve(dummyData);
    }

    return deferred.promise;
  };


  return SampleModel;
}]);
