(function() {
  'use strict';

  angular.module('enterprise-portal').controller('MessageDetailController', ['$scope', function($scope){
    $scope.message = {
      "_id": "54a2be5cae5fc8347d356729",
      "messageTitle": "Message 1",
      "sentTo": "group",
      "sentCount": 150,
      "likeCount": 100,
      "commentCount": 7,
      "recipientCount": 100,
      "forwardCount": 3,
      "saveCount": 15,
      "content": "This is the content of the message",
      "status": "Active",
      "author" : {
        "_id": "<hex key>",
        "username": "elonmusk",
        "type": "enterprise-user",  
        "email": "elon@teslamotors.com",
        "fullName": "Elon Musk",
        "description": "The real Iron Man. This is the user description. Up to 140 characters",
        "company": "Tesla Motors, Inc.",
        "companyLogo": "images/logo.jpg",
        "companyUsername": "teslamotors",
        "title": "Iron Man",
        "department": "The Avengers",
        "phone": "555-123-1122",
        "avatar": "images/avatar.jpg"
      }
    };
  }]);

 

})();
