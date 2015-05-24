(function() {
  'use strict';

  angular
  	.module('enterprise-portal')
  	.directive('userSideBar', function () {
	    return {
	      restrict: "E",
	      templateUrl: 'app/common/user-side-bar.directive.html'
	    };
	  });

 

})();
