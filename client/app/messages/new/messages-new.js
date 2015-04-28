(function() {
  'use strict';

  angular.module('messages.new', [])
  	.controller('NewMessageCtrl', ['$scope', function($scope){
    
	    $scope.createNewMessage = function(newMessage) {
	    	alert(newMessage.content);

	    };

  	}]);
 

})();