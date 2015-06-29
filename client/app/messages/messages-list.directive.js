(function() {
	'use strict';

	angular.module('enterprise-portal')

	.directive('messagesList',
		function () {
			return {
				restrict: "E",
				templateUrl: 'app/messages/messages-list.directive.html'
			};
		}
	);
	  
})();