(function() {
	'use strict';

	angular.module('messages', [
		'enterprise-portal.models.messages',
		'messages.dashboard',
		'messages.detail',
		'messages.new',
		'messages.edit',
		'messages.manage-campaign'
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
				templateUrl: 'app/messages/dashboard/messages-dashboard.tmpl.html',
				controller: 'CampaignCenterCtrl as campaignCenterCtrl'
			})
			.state('messages.new', {
				url: '/message/new',
				templateUrl: 'app/messages/new/messages-new.tmpl.html',
				controller: 'NewMessageCtrl as newMessageCtrl'
			})
			.state('messages.edit', {
				url: '/message/:_id',
				templateUrl: 'app/messages/new/messages-new.tmpl.html',
				controller: 'NewMessageCtrl as newMessageCtrl'
			})
			.state('messages.asset', {
				url: '/assets',
				templateUrl: 'app/messages/asset/messages-asset.tmpl.html',
				controller: 'AssetMessageCtrl as assetMessageCtrl'
			})
			.state('messages.manage', {
				url: '/manage',
				templateUrl: 'app/messages/manage/messages-manage.tmpl.html',
				controller: 'MessagesManageCtrl as messagesManageCtrl'
			})
			.state('messages.manage-campaign', {
				url: '/manage-campaign',
				templateUrl: 'app/messages/manage-campaign/manage-campaign.tmpl.html',
				controller: 'ManageCampaignCtrl as manageCampaignCtrl'
			})
			;

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

	.controller('MyCtrl', ['$scope', function ($scope) {
     $scope.types = "['establishment']";
    
	}])
	
	.controller('MapCoordinatesCtrl', [
		'$rootScope',
		'$scope',
		'$compile',
		
		function(
			$rootScope,
			$scope,
			$compile
		) {
			var TILE_SIZE = 256;
			
			var geocoder = new google.maps.Geocoder();

			$scope.placeChanged = function() {
				console.log("new place" + this.getPlace());
	       //$scope.place = this.getPlace();
	      $rootScope.map_search = this.getPlace();

			}
			
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

			/*
			function radiusToZoom(map, r){
				var w = map.getDiv().offsetHeight;;
				var d = r * 2;
				var zooms = [,21282,16355,10064,5540,2909,1485,752,378,190,95,48,24,12,6,3,1.48,0.74,0.37,0.19];
				var z = 20, m;
				while( zooms[--z] ){
					m = zooms[z] * w;
					if( d < m ){
						break;
					}
				}
				return z;
			}
			*/
			
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
				
				$scope.marker = new google.maps.Marker({
					position: map.getCenter(),
					map: map,
					icon: {
						url: 'assets/img/icons/i-location-large.png',
						scaledSize: new google.maps.Size(20, 20),
						origin: new google.maps.Point(0,0),
						anchor: new google.maps.Point(10, 15)
					}
				});
				
				$scope.rangeCircle = new google.maps.Circle({
					'strokeColor': '#00A9CC',
					'strokeOpacity': 1,
					'strokeWeight': 2,
					'fillColor': '#FFFFFF',
					'fillOpacity': 0.3,
					'map': map,
					'center': $scope.toronto,
					'radius': 5000
				});
				map.fitBounds($scope.rangeCircle.getBounds());
				
				var center = map.getCenter();
				$rootScope.map_coords = [center.lat(), center.lng()];
				
				google.maps.event.addListener(map, 'drag', function() {
					var center = map.getCenter();
					
					$scope.marker.setPosition(center);
					$scope.rangeCircle.setCenter(center);
					$rootScope.map_coords = [center.lat(), center.lng()];
				});
				
				$rootScope.$watch("map_range", function(newValue, oldValue){
					$scope.rangeCircle.setRadius(parseInt(newValue) * 1000);
					
					map.fitBounds($scope.rangeCircle.getBounds()); // this shifts the center ever so slightly
					map.setCenter({lat: $rootScope.map_coords[0], lng: $rootScope.map_coords[1]}); // re-center it
				});
				
				$rootScope.$watch("map_search", function(newValue, oldValue){
					geocoder.geocode({'address': newValue}, function(results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							var loc = results[0].geometry.location;
							
							$scope.marker.setPosition(loc);
							$scope.rangeCircle.setCenter(loc);
							
							map.setCenter(loc);
							map.fitBounds($scope.rangeCircle.getBounds());
							
							var center = map.getCenter();
							$rootScope.map_coords = [center.lat(), center.lng()];
						} else {
							console.log("Geocode was not successful for the following reason: " + status);
						}
					});
				});


			});
		}
	]);

})();