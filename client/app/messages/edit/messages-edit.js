(function() {
  'use strict';

  angular.module('messages.edit', [])
  	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('messages.edit', {
				url: '/:_id/edit',
				templateUrl: '/app/messages/edit/messages-edit.tmpl.html',
				controller: 'EditMessageCtrl as editMessageCtrl'
			});

	}])
	.controller('EditMessageCtrl', [
		'MessageDetailModel', '$stateParams', '$state',
		function (MessageDetailModel, $stateParams, $state) {

			var editMessageCtrl = this;

			editMessageCtrl.currentMessageId = $stateParams._id;

		  	MessageDetailModel.getMessageDetail()
		  		.then(function(result) {
		  			if(result) {
		  				editMessageCtrl.message = result;
		  				editMessageCtrl.editedMessage = angular.copy(editMessageCtrl.message);
		  			} else {
		  				cancelEdit();
		  			}
		  		});


		  	function returnToMessageDetail() {
		  		$state.go('messages.detail', { _id : editMessageCtrl.currentMessageId });
		  	}

		  	function cancelEdit() {
		  		returnToMessageDetail();
		  	}

		  	function updateMessage() {
		  		//console.log('updating');
		  		editMessageCtrl.message = angular.copy(editMessageCtrl.editedMessage);
		  		MessageDetailModel.updateMessage(editMessageCtrl.message);

		  		returnToMessageDetail();
		  	}

		  	editMessageCtrl.cancelEdit = cancelEdit;
		  	editMessageCtrl.updateMessage = updateMessage;
			
	}])
  ;


})();