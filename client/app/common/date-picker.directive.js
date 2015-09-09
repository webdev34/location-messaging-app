(function() {
	'use strict';

	angular.module('enterprise-portal')
	
	.directive('datePicker', [
		'$interval',
		
		function ($interval) {
			return {
				restrict: "E",
				templateUrl: 'app/common/date-picker.directive.html',
				scope: {
					value: '=ngModel',
					startDate: '=startDate',
					startTime: '=startTime',
					endDate: '=endDate',
					endTime: '=endTime',
					disablePreviousDates: '=disablePreviousDates',
					showPicker: '=showPicker'
				},
				link: function (scope, el, attrs) {
					var oldDate = scope.value,
						parsedDate = scope.value.toUpperCase().split("/"),
						i_am = attrs.name;
					
					var monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
					
					angular.extend(scope, {
						"title": attrs.title,
						"day": parsedDate[1],
						"month": parsedDate[0],
						"year": parsedDate[2],
					});
					
					function daysInMonth(month, year) {
						return new Date(year, month, 0).getDate();
					}
					
					function firstDayInMonth(month, year) {
						return new Date(year, month - 1, 1).getDay();
					}
					
					function createDayArray(month, year, totalDays, firstDay){
						var dayArray = [],
							num,
							type,
							offGrid,
							beforeToday,
							between,
							isSelected,
							tsStart,
							tsEnd,
							tsThis,
							len = totalDays + firstDay,
							today = new Date();
						
						len = len - (len + 7)%7 + 7;
							
						var todayObj = {
							"day": today.getDate(),
							"month": today.getMonth() + 1,
							"year": today.getFullYear()
						}
						
						for (var i = 0; i < len; i++){
							num = i - firstDay + 1;
							
							offGrid = num < 1 || num > totalDays;
							
							tsStart = Date.parse(toDateStr(parseDate(scope.startDate, "month"), parseDate(scope.startDate, "day"), parseDate(scope.startDate, "year"), 0, 0, 0, "PM"));
							tsEnd = Date.parse(toDateStr(parseDate(scope.endDate, "month"), parseDate(scope.endDate, "day"), parseDate(scope.endDate, "year"), 0, 0, 0, "PM"));
							tsThis = Date.parse(toDateStr(month, num, year, 0, 0, 0, "PM"));
							
							between = tsThis > tsStart && tsThis < tsEnd;
							beforeToday = tsThis < today.getTime();
							
							isSelected = (num == parseDate(scope.startDate, "day") && month == parseDate(scope.startDate, "month"))
										|| (num == parseDate(scope.endDate, "day") && month == parseDate(scope.endDate, "month"));
							
							


							if (offGrid){
								type = "off";
							}else if (beforeToday && scope.disablePreviousDates){
								type = "beforeToday";
							}else if (isSelected){
								type = "selected";
							}else if (between){
								type = "between";
							}else{
								type = "standard";
							}

							if(scope.disablePreviousDates){
								dayArray.push({
									"num": num,
									"day": !offGrid ? num : "",
									"selectable": !offGrid && !beforeToday,
									"type": type
								});
							}else{
								dayArray.push({
									"num": num,
									"day": !offGrid ? num : "",
									"selectable": true,
									"type": type
								});
							}

						}
						
						return dayArray;
					}
					
					scope.adjustMonth = function(adjDate){
						var month = isNaN(parseInt(scope.month)) ? 0 : parseInt(scope.month),
							year = parseInt(scope.year),
							newMonth = month + adjDate,
							newYear = year;
						
						if (newMonth > 12){
							newMonth = 1;
							newYear = year + 1;
						}else if (newMonth < 1){
							newMonth = 12;
							newYear = year - 1;
						}
						
						var totalDays = daysInMonth(newMonth, newYear),
							firstDay = firstDayInMonth(newMonth, newYear),
							dayArray = createDayArray(newMonth, newYear, totalDays, firstDay);
						
						scope.month = ("00" + newMonth).slice(-2);
						scope.year = newYear;
						scope.monthName = monthNames[newMonth];
						scope.totalDays = totalDays;
						scope.firstDay = firstDay;
						scope.dayArray = dayArray;
					}
					
					scope.setDay = function(day, selectable){
						if (day && selectable){
							scope.day = ("00" + day).slice(-2);
							makeDate();
						}
					}
					
					function formatDate(){
						return ("00" + scope.month).slice(-2) + "/" + ("00" + scope.day).slice(-2) + "/" + scope.year;
					}
					
					function toDateStr(month, day, year, hour, minute, second, median){
						return month + "/" + day + "/" + year + " " + hour + ":" + minute + ":" + second + " " + median;
					}
					
					function parseDate(date, seg){
						var dateArray = date.split("/");
						
						switch(seg){
							case "day":
								return parseInt(dateArray[0]);
								break;
							case "month":
								return parseInt(dateArray[1]);
								break;
							case "year":
								return parseInt(dateArray[2]);
								break;
						}
					}
					
					function makeDate(){
						var newDate = formatDate();
						
						if (i_am == "end-date"){
							var startDate = scope.startDate.split("/"),
								startTime = scope.startTime.toUpperCase().replace(" ", ":").split(":"),
								endDate = [scope.month, scope.day, scope.year],
								endTime = scope.endTime.toUpperCase().replace(" ", ":").split(":");
						}else if (i_am == "start-date"){

							var startDate = [scope.month, scope.day, scope.year],
								startTime = scope.startTime.toUpperCase().replace(" ", ":").split(":"),
								endDate = scope.endDate.split("/"),
								endTime = scope.endTime.toUpperCase().replace(" ", ":").split(":");
						}
						
						// adding one second ":01" takes care of some midnight weirdness
						// month and day are reversed
						var startDateTime = Date.parse(toDateStr(startDate[0], startDate[1], startDate[2], startTime[0], startTime[1], "01", startTime[2])),
							endDateTime = Date.parse(toDateStr(endDate[0], endDate[1], endDate[2], endTime[0], endTime[1], "01", endTime[2]));

						if (startDateTime > endDateTime){
							//scope.disablePreviousDates
							scope.alert = "OOPS! END/TIME EARLIER THAN START/TIME";
							return;
						}else{
							scope.alert = "";
						}
						
						// force update when time hasn't changed to trigger $watch event to close window - dirty hack
						if (newDate == oldDate){
							scope.value = "";
							var t = $interval(function () { 
								scope.value = newDate;
								$interval.cancel(t);
							}, 100);
						}else{
							oldDate = newDate;
							scope.value = newDate;
						}
					}
					
					scope.$watch("startDate", function(newVal, oldVal){
						scope.adjustMonth(0);
					});
					scope.$watch("endDate", function(newVal, oldVal){
						scope.adjustMonth(0);
					});
					
					makeDate();
				}
			};
		}
	]);

})();
