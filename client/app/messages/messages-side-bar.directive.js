(function() {
	'use strict';

	angular.module('enterprise-portal')

	.directive('messagesSideBar', function () {
		return {
			restrict: "E",
			templateUrl: 'app/messages/messages-side-bar.directive.html'
		};
	});
	  
})();