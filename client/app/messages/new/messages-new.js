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
  	.controller('NewMessageCtrl',[
  		'$state', '$stateParams', 'MessageListModel',
  		function($state, $stateParams, MessageListModel) {
    		var newMessageCtrl = this;

    		function cancelCreating() {
    			$state.go('messages.dashboard');
    		}

		    function createNewMessage(newMessage) {
		    	alert(newMessage.content);
          MessageListModel.createNewMessage(newMessage);
		    }

        function resetForm() {
          newMessageCtrl.newMessage = {
            "_id": "",
            "messageTitle": "",
            "content": "",
            "status": ""
          };
        }

		    newMessageCtrl.createNewMessage = createNewMessage;
		    newMessageCtrl.cancelCreating = cancelCreating;

        resetForm() 

  		}
	]);
 

})();