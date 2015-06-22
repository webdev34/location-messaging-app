(function() {
	'use strict';

	angular.module('messages.new', [])
	
	.controller('NewMessageCtrl', [
		'$rootScope',
		'$scope',
		'$state',
		'MessageListModel',
		
		function(
			$rootScope,
			$scope,
			$state,
			MessageListModel
		) {
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
			
			$scope.$watch("newMessageCtrl.newMessage.range", function(newValue, oldValue){
				$rootScope.map_range = newValue;
			});
			
			$scope.checkRange = function(stuff){
				var range = parseInt(newMessageCtrl.newMessage.range);
				range = range > 100 ? 100 : (range < 0 || !range ? 0 : range);
				console.log(range, newMessageCtrl.newMessage.range);
				newMessageCtrl.newMessage.range = range;
			};

			$scope.doSearch = function(){
				console.log("newMessageCtrl.search");
				$rootScope.map_search = newMessageCtrl.search;
			};

			newMessageCtrl.createNewMessage = createNewMessage;
			newMessageCtrl.cancelCreating = cancelCreating;

			resetForm();
		}
	]);

})();