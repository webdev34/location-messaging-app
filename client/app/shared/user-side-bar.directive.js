(function() {
  'use strict';

  angular
  	.module('enterprise-portal')
  	.directive('userSideBar', function () {
	    return {
	      restrict: "E",
	      //template: "<div>Here I am to save the day</div>"
	      templateUrl: '/app/shared/user-side-bar.directive.html'
	    };
	  });

 

})();
