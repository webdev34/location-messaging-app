(function() {
	'use strict';

	angular.module('messages.edit', [])
	
	.controller('EditMessageCtrl', [
		'MessageDetailModel',
		'$stateParams',
		'$state',
		
		function(
			MessageDetailModel,
			$stateParams,
			$state
		) {
			var editMessageCtrl = this;

			editMessageCtrl.currentMessageId = $stateParams._id;

			MessageDetailModel.getMessageDetail()
				.then(function(result) {
					if (result) {
						editMessageCtrl.message = result;
						editMessageCtrl.editedMessage = angular.copy(editMessageCtrl.message);
					} else {
						cancelEdit();
					}
				});

			function returnToMessageDetail() {
				$state.go('messages.detail', {
					_id: editMessageCtrl.currentMessageId
				});
			}

			function cancelEdit() {
				returnToMessageDetail();
			}

			function updateMessage() {
				editMessageCtrl.message = angular.copy(editMessageCtrl.editedMessage);
				MessageDetailModel.updateMessage(editMessageCtrl.message);

				returnToMessageDetail();
			}

			editMessageCtrl.cancelEdit = cancelEdit;
			editMessageCtrl.updateMessage = updateMessage;
		}
	]);

})();