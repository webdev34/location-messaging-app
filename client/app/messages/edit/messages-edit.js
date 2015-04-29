(function() {
  'use strict';

  angular.module('messages.edit', [])
  	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('messages.edit', {
				url: '/:_id/edit',
				templateUrl: '/app/messages/edit/messages-edit.tmpl.html',
				controller: 'EditMessageCtrl as editMessageCtrl'
			});

	}])
	.controller('EditMessageCtrl', ['$scope', function ($scope) {
		console.log('editing')
	}])
  ;


})();