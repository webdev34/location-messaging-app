(function() {
  'use strict';

  angular.module('enterprise-portal').controller('MessageListController', ['$scope', function($scope){
    $scope.messages ={
      "messages": [
        {
          "_id": "<hex>",
          "messageTitle": "Message 1",
          "content": "This is the content of the message",
          "status": "Active"
        },
        {
          "_id": "<hex>",
          "messageTitle": "Message 2",
          "content": "This is the content of the message",
          "status": "Active"
        },
        {
          "_id": "<hex>",
          "messageTitle": "Message 3",
          "content": "This is the content of the message",
          "status": "Setup"
        },
       
        
      ]
    };
  }]);

 

})();
