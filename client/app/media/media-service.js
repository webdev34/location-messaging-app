(function() {
	'use strict';

	angular.module('enterprise-portal.services.media', [])
	
	.factory('MediaService', [
		'$http',
		'API_URL',
		
		function(
			$http,
			API_URL
		) {
			console.log('MediaService Loaded');
			return {

				// get : function(messageId){
				// 	return $http.get(API_URL + '/message/' + messageId);
				// },
				// post : function(messageObj) {
									
				// 	return $http.post(API_URL + '/message', messageObj);
				// },
				// list : function(timestamp, limit){
				// 	//console.log('service testing');
				// 	if (!timestamp){
				// 		// beginning of the month
				// 		var date = new Date();
				// 		timestamp = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
				// 	}
					
				// 	return $http.get(API_URL + '/message/' + timestamp + '/limit/' + (limit || 0));
				// },
				// remove : function(messageId){
				// 	return $http["delete"](API_URL + '/message/' + messageId);
				// }
			};
		}
	]);

})();