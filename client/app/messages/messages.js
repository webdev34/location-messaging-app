(function() {
	'use strict';

	angular.module('messages', [
		'enterprise-portal.models.messages',
		'messages.dashboard',
		'messages.detail',
		'messages.new',
		'messages.edit'
	])

	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('messages', {
				url: '/campaign',
				templateUrl: 'app/messages/messages.tmpl.html',
				abstract: true
			})
			.state('messages.dashboard', {
				url: '/',
				templateUrl: 'app/messages/dashboard/messages-dashboard.tmpl.html'
			})
			.state('messages.new', {
				url: '/message/new',
				templateUrl: 'app/messages/new/messages-new.tmpl.html',
				controller: 'NewMessageCtrl as newMessageCtrl'
			})
			.state('messages.detail', {
				url: '/message/:_id',
				templateUrl: 'app/messages/detail/messages-detail.tmpl.html',
				controller: 'MessageDetailCtrl as messageDetailCtrl'
			})
			.state('messages.edit', {
				url: '/message/:_id/edit',
				templateUrl: 'app/messages/edit/messages-edit.tmpl.html',
				controller: 'EditMessageCtrl as editMessageCtrl'
			});

		$urlRouterProvider.otherwise('messages.dashboard');
	}])

	.controller('MessageListCtrl', [
		'MessageListModel',
		
		function(MessageListModel) {
			var messageListCtrl = this;

			MessageListModel.getMessageList()
				.then(function(result) {
					messageListCtrl.messages = result;
				});
		}
	])
	
	.controller('MapCoordinatesCtrl', [
		'$scope',
		'$compile',
		
		function(
			$scope,
			$compile
		) {
			var TILE_SIZE = 256;

			function bound(value, opt_min, opt_max) {
				if (opt_min != null) value = Math.max(value, opt_min);
				if (opt_max != null) value = Math.min(value, opt_max);
				return value;
			}

			function degreesToRadians(deg) {
				return deg * (Math.PI / 180);
			}

			function radiansToDegrees(rad) {
				return rad / (Math.PI / 180);
			}

			function MercatorProjection() {
				this.pixelOrigin_ = new google.maps.Point(TILE_SIZE / 2, TILE_SIZE / 2);
				this.pixelsPerLonDegree_ = TILE_SIZE / 360;
				this.pixelsPerLonRadian_ = TILE_SIZE / (2 * Math.PI);
			}

			MercatorProjection.prototype.fromLatLngToPoint = function(latLng, opt_point) {
				var me = this;
				var point = opt_point || new google.maps.Point(0, 0);
				var origin = me.pixelOrigin_;

				point.x = origin.x + latLng.lng() * me.pixelsPerLonDegree_;

				// Truncating to 0.9999 effectively limits latitude to 89.189. This is
				// about a third of a tile past the edge of the world tile.
				var siny = bound(Math.sin(degreesToRadians(latLng.lat())), -0.9999,
					0.9999);
				point.y = origin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) *
					-me.pixelsPerLonRadian_;
				return point;
			};

			MercatorProjection.prototype.fromPointToLatLng = function(point) {
				var me = this;
				var origin = me.pixelOrigin_;
				var lng = (point.x - origin.x) / me.pixelsPerLonDegree_;
				var latRadians = (point.y - origin.y) / -me.pixelsPerLonRadian_;
				var lat = radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) -
					Math.PI / 2);
				return new google.maps.LatLng(lat, lng);
			};

			$scope.$on('mapInitialized', function(event, map) {
				var numTiles = 1 << map.getZoom();
				var projection = new MercatorProjection();
				$scope.toronto = map.getCenter();
				$scope.worldCoordinate = projection.fromLatLngToPoint($scope.toronto);
				$scope.pixelCoordinate = new google.maps.Point(
					$scope.worldCoordinate.x * numTiles,
					$scope.worldCoordinate.y * numTiles);
				$scope.tileCoordinate = new google.maps.Point(
					Math.floor($scope.pixelCoordinate.x / TILE_SIZE),
					Math.floor($scope.pixelCoordinate.y / TILE_SIZE));
			});
		}
	]);

})();