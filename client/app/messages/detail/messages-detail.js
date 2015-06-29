(function() {
	'use strict';

	angular.module('messages.detail', [])
	
	.controller('MessageDetailCtrl', [
		'$stateParams',
		'MessageDetailModel',
		
		function(
			$stateParams,
			MessageDetailModel
		) {
			var messageDetailCtrl = this;

			messageDetailCtrl.currentMessageId = $stateParams._id;

			MessageDetailModel.getMessageDetail(messageDetailCtrl.currentMessageId)
				.then(function(result) {
					messageDetailCtrl.message = result;
				});
		}
	]);


})();