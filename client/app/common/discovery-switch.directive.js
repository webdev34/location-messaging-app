(function() {
	'use strict';

	angular.module('enterprise-portal')
	
	.directive('discoverySwitch', [

		function () {
			return {
				restrict: "E",
				templateUrl: 'app/common/discovery-switch.directive.html',
				scope: {
					discoverOn: '=discoverOn',
					range: '=range'
				},
				link: function (scope, el, attrs) {
						
				}
			};
		}
	]);

})();
