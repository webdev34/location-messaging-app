(function() {
  'use strict';

  angular.module('messages.new', [])
  	.controller('NewMessageCtrl', ['$scope', '$http', function($scope, $http){
    

	    $scope.createNewMessage = function(newMessage) {
	    	alert(newMessage.content);

	    }
  	}]);
 

})();