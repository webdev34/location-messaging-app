(function() {
	'use strict';

	angular.module('enterprise-portal')
	
	.directive('timePicker',
		function () {
			return {
				restrict: "E",
				templateUrl: 'app/common/time-picker.directive.html',
				link: function (scope, el, attrs) {
					console.log(attrs.name);

					
				}
			};
		}
	);

})();
