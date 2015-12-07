(function() {
	'use strict';

	angular.module('messages.all-messages', [])
	.filter('startFrom', function () {
		return function (input, start) {
			if (input) {
				start = +start;

				return input;
			}
			return [];
		};
	})
	.controller('AllMessagesCtrl', [
		'$rootScope',
		'$scope',
		'$state',
		'$http',
		'FoundationApi',
		'MessageListModel',

		function(
			$rootScope,
			$scope,
			$state,
			$http,
			FoundationApi,
			MessageListModel,
			MessageDetailModel
		) {
			var allMessagesCtrl = this;

			function init() {
				getMessageList();
			}


			function getMessageList() {
				//console.log('getting the list');
				MessageListModel.getMessageList()
					.then( function(response) {
						allMessagesCtrl.messages = response;
						console.log(allMessagesCtrl.messages);
					});
			}


			init();

		}
	]);

})();
