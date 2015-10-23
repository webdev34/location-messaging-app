(function() {
	'use strict';

	angular.module('messages.communications', [])
	
	.controller('MessagesCommunicationsCtrl', [
		'$rootScope',
		'$scope',
		'$state',
		'$http',
		'$document',
		'FoundationApi',
		
		
		function(
			$rootScope,
			$scope,
			$state,
			$http,
			$document,
			FoundationApi
		) {
			
			var messagesCommunicationsCtrl = this;

			messagesCommunicationsCtrl.campaignFilters = [];

			messagesCommunicationsCtrl.messageFilters = [];

			messagesCommunicationsCtrl.messageAssets = [];

			$scope.campaignSelectedFilters = [];
			$scope.messageSelectedFilters = [];

			messagesCommunicationsCtrl.uploader = {};

			messagesCommunicationsCtrl.processFiles = function(files){
		    	angular.forEach(files, function(flowFile, i){
		       	var fileReader = new FileReader();
		          	fileReader.onload = function (event) {
		            	var uri = event.target.result;
		              	messagesCommunicationsCtrl.messageAssets.push(uri);
		          	};
		          	fileReader.readAsDataURL(flowFile.file);
		    	});
		  	};

		  	messagesCommunicationsCtrl.removeFile = function(index){
		        newMessageCtrl.newMessage.assets.splice(index, 1);  
		        messagesCommunicationsCtrl.uploader.flow.files.splice(index, 1);
		  	};

		  	
			$scope.$watch('campaignSelectedFilters', function(newVal, oldVal) {
	         	refreshActivityFeedData();
	        }, true);


			function refreshActivityFeedData(){
		       
			  	$http.get('assets/data/campaigns.json').success(function(data) {
					messagesCommunicationsCtrl.campaignData = data.campaigns;
					
					angular.forEach(messagesCommunicationsCtrl.campaignData, function(data, i){

						var thisCampaignId = data.id;
						var thisCampaignName = data.campaignName;
						
						messagesCommunicationsCtrl.campaignFilters.push({name: thisCampaignName, id: thisCampaignId, ticked: false});

						angular.forEach(data.messages, function(msg, i){
							messagesCommunicationsCtrl.messageFilters.push({name: thisCampaignName+' - Message #'+(msg.id+1), id: msg.id, campaignId: thisCampaignId, ticked: false});
				    	});
			       
			    	});
					
				});

				if($scope.campaignSelectedFilters.length > 0){
					var campaignHolder = [];
					var messageHolder = [];
				
					angular.forEach($scope.campaignSelectedFilters, function(selectedFilter, i){
						angular.forEach(messagesCommunicationsCtrl.campaignData, function(campaign, i){
							if(selectedFilter.id == campaign.id){
								var thisCampaignId = campaign.id;
								var thisCampaignName = campaign.campaignName;
								campaignHolder.push(angular.copy(campaign));
								angular.forEach(campaign.messages, function(msg, i){
									messageHolder.push({name: thisCampaignName+' - Message #'+(msg.id+1), id: msg.id, campaignId: thisCampaignId, ticked: false});
						    	});
								
							}
				    	});
			    	});

                    // Refreshes Messages based on selected Campaigns
					messagesCommunicationsCtrl.messageFilters = [];
					messagesCommunicationsCtrl.messageFilters = angular.copy(messageHolder);
				}

		  	};


	        //messagesCommunicationsCtrl.refreshActivityFeedData();

		}
	]);

})();