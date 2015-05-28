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
  		'$state', 'MessageListModel',
  		function($state, MessageListModel) {
    		var newMessageCtrl = this;

        function returnToDashboard() {
          $state.go('messages.dashboard');
        }

    		function cancelCreating() {
          returnToDashboard();
    		}

		    function createNewMessage() {
          MessageListModel.createNewMessage(newMessageCtrl.newMessage);
          returnToDashboard();
		    }

        function resetForm() {
          newMessageCtrl.newMessage = {
            "_id": "",
            "messageTitle": "",
            "content": "",
            "status": "Inactive",
            "range": 5,
            "sentTo": "All Followers",
            "discoverOn": "enter"
          };
        }

		    newMessageCtrl.createNewMessage = createNewMessage;
		    newMessageCtrl.cancelCreating = cancelCreating;

        resetForm();

  		}
	]);
 

})();