(function() {
	'use strict';

	angular.module('enterprise-portal')
	
	.directive('timePicker', [
		'$interval',
		
		function ($interval) {
			return {
				restrict: "E",
				templateUrl: 'app/common/time-picker.directive.html',
				scope: {
					value: '=ngModel',
					startDate: '=startDate',
					startTime: '=startTime',
					endDate: '=endDate',
					endTime: '=endTime'
				},
				link: function (scope, el, attrs) {
					var oldTime = scope.value,
						parsedTime = scope.value.toUpperCase().replace(" ", ":").split(":"),
						i_am = attrs.name;
					
					angular.extend(scope, {
						"title": attrs.title,
						"hour": parsedTime[0],
						"minute": parsedTime[1],
						"median": parsedTime[2]
					});
					
					scope.adjustHours = function(adjTime){
						var newHour = (isNaN(parseInt(scope.hour)) ? 0 : parseInt(scope.hour)) + adjTime;
						scope.hour = newHour > 12 ? "01" : (newHour < 1 ? 12 : ("00" + newHour).slice(-2));
					}
					
					scope.adjustMinutes = function(adjTime){
						var newMinutes = (isNaN(parseInt(scope.minute)) ? 0 : parseInt(scope.minute)) + adjTime;
						scope.minute = newMinutes > 59 ? "00" : (newMinutes < 0 ? 59 : ("00" + newMinutes).slice(-2));
					}
					
					scope.adjustMedian = function(){
						scope.median = scope.median == "AM" ? "PM" : "AM";
					}
					
					scope.checkHours = function(){
						var newHour = (isNaN(parseInt(scope.hour)) ? 0 : parseInt(scope.hour));
						scope.hour = newHour > 12 ? "01" : (newHour < 1 ? 12 : newHour);
					}
					
					scope.checkMinutes = function(){
						var newMinutes = (isNaN(parseInt(scope.minute)) ? 0 : parseInt(scope.minute));
						scope.minute = newMinutes > 59 ? "00" : (newMinutes < 0 ? 59 : newMinutes);
					}
					
					var timer;      
					scope.mouseDown = function(unit, adjTime) {
						timer = $interval(function () { 
							switch(unit){
								case "hours":
									scope.adjustHours(adjTime);
									break;
								case "minutes":
									scope.adjustMinutes(adjTime);
									break;
								case "median":
									scope.adjustMedian();
									break;
							}
						}, 200);
					};
					scope.mouseUp = function () {
						$interval.cancel(timer);
					};
					
					function formatTime(){
						return ("00" + scope.hour).slice(-2) + ":" + ("00" + scope.minute).slice(-2) + " " + scope.median;
					}
					
					function toDateStr(month, day, year, hour, minute, second, median){
						return month + "/" + day + "/" + year + " " + hour + ":" + minute + ":" + second + " " + median;
					}
					
					scope.makeTime = function(){
						scope.adjustHours(0);
						scope.adjustMinutes(0);
						
						var newTime = formatTime();
						
						if (i_am == "end-time"){
							var startDate = scope.startDate.split("/"),
								startTime = scope.startTime.toUpperCase().replace(" ", ":").split(":"),
								endDate = scope.endDate.split("/"),
								endTime = [scope.hour, scope.minute, scope.median];
						}else if (i_am == "start-time"){
							var startDate = scope.startDate.split("/"),
								startTime = [scope.hour, scope.minute, scope.median],
								endDate = scope.endDate.split("/"),
								endTime = scope.endTime.toUpperCase().replace(" ", ":").split(":");
						}
						
						// adding one second ":01" takes care of some midnight weirdness
						// month and day are reversed
						var startDateTime = Date.parse(toDateStr(startDate[1], startDate[0], startDate[2], startTime[0], startTime[1], "01", startTime[2])),
							endDateTime = Date.parse(toDateStr(endDate[1], endDate[0], endDate[2], endTime[0], endTime[1], "01", endTime[2]));
						
						if (startDateTime > endDateTime){
							scope.alert = "OOPS! END/TIME EARLIER THAN START/TIME";
							return;
						}else{
							scope.alert = "";
						}
						
						// force update when time hasn't changed to trigger $watch event to close window - dirty hack
						if (newTime == oldTime){
							scope.value = "";
							var t = $interval(function () { 
								scope.value = newTime;
								$interval.cancel(t);
							}, 100);
						}else{
							oldTime = newTime;
							scope.value = newTime;
						}
					}
					
					scope.makeTime();
				}
			};
		}
	]);

})();
