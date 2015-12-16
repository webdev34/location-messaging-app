(function() {
	'use strict';

	angular.module('enterprise-portal')

	.directive('appHeader',
		function () {
			return {
				restrict: "E",
				templateUrl: 'app/common/app-header/app-header.directive.html'
			};
		}
	);

})();
