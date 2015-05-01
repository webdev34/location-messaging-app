(function() {
  'use strict';

  angular.module('messages.detail', [])
  	.config(['$stateProvider', function ($stateProvider) {
				$stateProvider
					.state('messages.detail', {
						url: '/:_id',
						templateUrl: '/app/messages/detail/messages-detail.tmpl.html',
						controller: 'MessageDetailCtrl as messageDetailCtrl'
					});

			}])

		.controller('MessageDetailCtrl', [
	  	'$stateParams', 'MessageDetailModel', 
	  	function($stateParams, MessageDetailModel) {
	  		var messageDetailCtrl = this;

	  		messageDetailCtrl.currentMessageId = $stateParams._id;

		  	MessageDetailModel.getMessageDetail()
		  		.then(function(result) {
		  			messageDetailCtrl.message = result;
		  		});

	  }])
  ;


})();