(function() {
  'use strict';

  angular.module('enterprise-portal').controller('ActiveMessageController', ['$scope', function($scope){
    $scope.active = {
      "messages": [
        {
          "_id": "54a2be5cae5fc8347d356729",
          "content": "Message 1",
          "sentTo": "group",
          "sentCount": 150,
          "likeCount": 100,
          "commentCount": 7,
          "recipientCount": 100,
          "forwardCount": 3,
          "saveCount": 15
        },
         {
          "_id": "54a2be5cae5fc8347d356729",
          "content": "Message 2",
          "sentTo": "group",
          "sentCount": 1340,
          "likeCount": 100,
          "commentCount": 7,
          "recipientCount": 100,
          "forwardCount": 3,
          "saveCount": 15
        },
        {
          "_id": "54a2be5cae5fc8347d356729",
          "content": "Message 3",
          "sentTo": "group",
          "sentCount": 1340,
          "likeCount": 100,
          "commentCount": 7,
          "recipientCount": 100,
          "forwardCount": 3,
          "saveCount": 15
        }
      ]
    };
  }]);

 

})();
