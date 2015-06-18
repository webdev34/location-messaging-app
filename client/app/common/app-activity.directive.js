(function() {
	'use strict';

	angular.module('enterprise-portal')
	
	.directive('appActivity',
		function () {
			return {
				restrict: "E",
				templateUrl: 'app/common/app-activity.directive.html'
			};
		}
	);

})();
