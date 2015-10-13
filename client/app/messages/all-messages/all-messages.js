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
			MessageListModel
		) {
			var allMessagesCtrl = this;

			function init() {
				getMessageList();
			}
			
			// $http.get('assets/data/campaign-messages.json').success(function(data) {
			// 	manageCampaignCtrl.campaignMessages = data.campaignMessages;	
			// 	$scope.totalItems = data.campaignMessages.length;
			// 	$scope.currentPage = 1;
			// 	$scope.entryLimit = 10; // items per page
			// 	$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
			// 	$scope.reverse = false;
			// 	$scope.sortOrderBy = 'id';
			// 	$scope.startAt = 0;
			// 	$scope.endAt = 9;
			// 	$scope.selectAll = false;
			// 	$scope.isAnyInputsSelected = false;

			// 	$scope.goToPage = function(direction) {

			// 		if(direction == 'up')
			// 		{
			// 			$scope.currentPage++;
			// 		}else if(direction == 'down'){
			// 			$scope.currentPage--;
			// 		}
			// 		else if(direction == 'beginning'){
			// 			$scope.currentPage = 1;
			// 		}
			// 		else if(direction == 'end'){
			// 			$scope.currentPage = $scope.noOfPages;
			// 		}

			// 		$scope.startAt = ($scope.currentPage - 1) * $scope.entryLimit;
			// 		$scope.endAt = $scope.entryLimit * $scope.currentPage;

			// 	};

			// 	$scope.sortByFunc = function(sortBy, reverse) {
			// 		$scope.sortOrderBy = sortBy;
			// 		$scope.reverse = reverse;
			// 		$scope.currentPage = 1;
			// 		$scope.goToPage(1);
			// 	};

			// 	$scope.resetCurrentPage = function() {
			// 		$scope.currentPage = 1;
			// 	};

			// 	$scope.toggleSelected = function() {
			// 		angular.forEach(manageCampaignCtrl.campaignMessages, function(message) {
			// 	      message.isSelected = $scope.selectAll;
			// 	    });
			// 	};

			// 	$scope.bulkActions = function() {
			// 		var actionDropDown = document.getElementById("bulk-actions");
			// 		var action = actionDropDown.options[actionDropDown.selectedIndex].value;
			// 		angular.forEach(manageCampaignCtrl.campaignMessages, function(campaign, i) {
			// 			if(campaign.isSelected && action != 'Delete'){
			// 				campaign.status = action;
			// 				campaign.isSelected = false;
			// 			}
			// 			else if(campaign.isSelected && action == 'Delete' && $scope.selectAll == false){
			// 				manageCampaignCtrl.campaignMessages.splice(i, 1);  
			// 			}
			// 			else if(action == 'Delete' && $scope.selectAll == true){
			// 				manageCampaignCtrl.campaignMessages = []; 
			// 			}
			// 	    });
			// 	    $scope.selectAll = false;
			// 	};

			// 	$scope.cloneMessages = function() {
			// 		manageCampaignCtrl.clonedMessage = [] ;
			// 		var cleanCopyOfMessages = angular.copy(manageCampaignCtrl.campaignMessages);
			// 		angular.forEach(cleanCopyOfMessages, function(campaign, i) {
			// 			if(campaign.isSelected){
			// 				//campaign.isSelected = false;
			// 				manageCampaignCtrl.clonedMessage.push(campaign);
			// 			}
			// 	    });
			// 	    // $scope.selectAll = false;
			// 	};

			// 	$scope.deleteClonedMessage = function(id) {
			// 		angular.forEach(manageCampaignCtrl.clonedMessage, function(campaign, i) {
			// 			if(campaign.id == id){
			// 				manageCampaignCtrl.clonedMessage.splice(i, 1);  
			// 			}
			// 	    });
			// 	};

			// 	$scope.anyInputsSelected = function() {
			// 		$scope.isAnyInputsSelected = false;
			// 		$scope.selectAll = true;
			// 		angular.forEach(manageCampaignCtrl.campaignMessages, function(campaign, i) {
			// 			if(campaign.isSelected){
			// 				$scope.isAnyInputsSelected  = true;
			// 			}
			// 			else{
			// 				$scope.selectAll = false;
			// 			}
			// 	    });
			// 	};

			// });
			
			function getMessageList() {
				console.log('getting the list');
			}


			function paginationValidation(){
				if($scope.currentPage > $scope.noOfPages ){
					$scope.currentPage = $scope.noOfPages
				}
				else if(typeof $scope.currentPage === "undefined"){
					$scope.currentPage = 1;
				}
			}
			
			init();

		}
	]);

})();