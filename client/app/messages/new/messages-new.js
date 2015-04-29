(function() {
  'use strict';

  angular.module('messages.new', [])
  	.config(['$stateProvider', function ($stateProvider) {
  		$stateProvider
  			.state('messages.new', {
				url: '/new',
				templateUrl: '/app/messages/new/messages-new.tmpl.html',
				controller: 'NewMessageCtrl as newMessageCtrl'
  			});
  	}])
  	.controller('NewMessageCtrl', function(){
    	var newMessageCtrl = this
	    
	    newMessageCtrl.createNewMessage = function(newMessage) {
	    	alert(newMessage.content);
	    };

  	});
 

})();