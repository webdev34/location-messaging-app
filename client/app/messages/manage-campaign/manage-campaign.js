(function() {
	'use strict';

	angular.module('messages.manage-campaign', [])
	
	.controller('ManageCampaignCtrl', [
		'MessageListModel', 
		function (MessageListModel) {
		
		var ManageCampaignCtrl = this;


		function getMessageList() {
			console.log('getting the list');

				MessageListModel.getMessageList()
				.then(function(result) {
					if (result) {
						console.log(result);
					} else {
					 console.log('error');
					}
				});

		}

		ManageCampaignCtrl.getMessageList = getMessageList;

	}])

})();