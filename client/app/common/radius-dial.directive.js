(function() {
	'use strict';

	angular.module('enterprise-portal')
	
	.directive('radiusDial', [

		function () {
			return {
				restrict: "E",
				templateUrl: 'app/common/radius-dial.directive.html',
				scope: {
					range: '=rangeValue'
				},
				link: function (scope, el, attrs) {

					scope.map_range_change = function(operator) {
						var currentRange = parseFloat(scope.range);
						if(operator == 'addRange'){
							if(currentRange != 100){
							  	scope.range = currentRange + 0.50;
							}
						}
						else{
							if(currentRange != 0){
								scope.range = currentRange - 0.50;
							}
						}
					};
						
				}
			};
		}
	]);

})();
