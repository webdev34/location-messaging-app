(function() {
	'use strict';

	angular.module('enterprise-portal')
	
	.directive('timePicker',
		function () {
			return {
				restrict: "E",
				templateUrl: 'app/common/time-picker.directive.html',
				link: function (scope, el, attrs) {
					angular.extend(scope, {
						"title": attrs.title,
						"fieldName": attrs.name,
						"hour": 12,
						"minute": 0,
						"median": "am",
						"time": ""
					});
					
					scope.adjustHours = function(adjTime){
						scope.hour = scope.hour + adjTime > 12 ? 1 : (scope.hour + adjTime < 1 ? 12 : scope.hour + adjTime);
						makeTime();
					}
					
					scope.adjustMinutes = function(adjTime){
						scope.minute = scope.minute + adjTime > 59 ? 0 : (scope.minute + adjTime < 0 ? 59 : scope.minute + adjTime);
						makeTime();
					}
					
					scope.adjustMedian = function(){
						scope.median = scope.median == "am" ? "pm" : "am";
						makeTime();
					}
					
					function makeTime(){
						scope["fieldName"] = ("00" + scope.hour).slice(-2) + ":" + ("00" + scope.minute).slice(-2) + " " + scope.median;
					}
					
					makeTime();
				}
			};
		}
	);

})();
