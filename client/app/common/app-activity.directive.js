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


(function() {
	'use strict';

	angular.module('enterprise-portal')
	.controller('OverAllActivityCtrl', [
		'$state',
		'$scope',
		'$http',
		function($state, $scope, $http) {
			var overAllActivityCtrl = this;
			$http.get('assets/data/overall-activity.json').success(function(data) {
				$scope.overallActivityFeed = data.overallActivity;
			});
			
		}
	]);

})();
