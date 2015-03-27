(function() {
  'use strict';

  angular.module('enterprise-portal').controller('LiveFeedController', ['$scope', function($scope){
    $scope.feed ={
      "updates": [
        {
          "_id": "<hex>",
          "messageTitle": "Message 1",
          "content": "This is the content of the message",
          "discoveryLocation": "CN Tower, Toronto, ON",
          "discoveryTime": "12:35",
          "discoveryUser": {
            "_id": "<hex key>",
            "username": "elonmusk",
            "fullName": "Elon Musk"
          }
        },
         {
          "_id": "<hex>",
          "messageTitle": "Message 2",
          "content": "This is the content of the message",
          "discoveryLocation": "Metro Convention Center, Toronto, ON",
          "discoveryTime": "12:35",
          "discoveryUser": {
            "_id": "<hex key>",
            "username": "Nokila",
            "fullName": "Nikola Tesla"
          }
        },
         {
          "_id": "<hex>",
          "messageTitle": "Message 3",
          "content": "This is the content of the message",
          "discoveryLocation": "CN Tower, Toronto",
          "discoveryTime": "12:35",
          "discoveryUser": {
            "_id": "<hex key>",
            "username": "elonmusk",
            "fullName": "Elon Musk"
          }
        }
        
      ]
    };
  }]);

 

})();
