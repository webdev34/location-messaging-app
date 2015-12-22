(function() {
	'use strict';

	angular.module('enterprise-portal')
	
	.directive('mapView', [
		'$rootScope', '$compile',
		
		function ($rootScope, $compile) {

			return {
				restrict: "E",
				templateUrl: 'app/common/map-view.directive.html',
				scope: {
					coordinates: '=',
					mapcenter: "=",
					range: "=",
					mapsearch: "=",
					showradius: "="
				},

				link:	function(scope, element, attrs) {
					var TILE_SIZE = 256;

					//console.log('onstart coordinates:' + JSON.stringify(scope.coordinates));
					//console.log('onstart mapcenter:' + scope.mapcenter);

					
					var geocoder = new google.maps.Geocoder();

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


					scope.$on('mapInitialized', function(event, map) {
						var projection = new MercatorProjection();

						scope.marker = new google.maps.Marker({
							//position: map.getCenter(),
							map: map,
							icon: {
								url: 'assets/img/icons/i-location-large.png',
								scaledSize: new google.maps.Size(20, 20),
								origin: new google.maps.Point(0,0),
								anchor: new google.maps.Point(10, 15)
							}
						});


						scope.rangeCircle = new google.maps.Circle({
							'strokeColor': '#00A9CC',
							'strokeOpacity': 1,
							'strokeWeight': 2,
							'fillColor': '#FFFFFF',
							'fillOpacity': 0.3,
							'map': map//,
							//'center': scope.toronto,
							//'radius': scope.range *1000
						});

						function setCoordinate() {
							var coordinates = map.getCenter();
							//console.log("lat: " + map.getCenter().lat());
							//console.log("lng: " + map.getCenter().lng());

							scope.marker.setPosition(coordinates);
							scope.rangeCircle.setCenter(coordinates);
							setRadius();
							scope.coordinates = {
								"lat": coordinates.lat(),
								"lng": coordinates.lng()
							};

						//	console.log("from setCoordinate: " + JSON.stringify(scope.coordinates));
						}

						function setRadius() {

							if(scope.showradius){
								scope.rangeCircle.setRadius(parseInt(scope.range) * 1000);
								map.fitBounds(scope.rangeCircle.getBounds());
							}
							
						}

						setCoordinate();


						google.maps.event.addListener(map, 'drag', function() {
							// var center = map.getCenter();
							// console.log("lat: " + map.getCenter().lat());
							// console.log("lng: " + map.getCenter().lng());

							
							// scope.marker.setPosition(center);
							// scope.rangeCircle.setCenter(center);
							// scope.coordinates = center;
							// console.log("center: " + center);
							if(scope.showradius){
								setCoordinate();
							}

						});

						scope.$watch("range", function(newValue, oldValue) {
							setRadius();
						});

						// scope.$watch("scope.coordinates", function(){
						// 	console.log("watching coordinates :" + scope.coordinates);
						// });

						scope.$watch("mapsearch", function(newValue, oldValue) {

								geocoder.geocode({'address': newValue}, function(results, status) {
								if (status == google.maps.GeocoderStatus.OK) {
									var loc = results[0].geometry.location;

									// scope.marker.setPosition(loc);
									// scope.rangeCircle.setCenter(loc);
									
									map.setCenter(loc);
									//map.fitBounds(scope.rangeCircle.getBounds());
									
									// var center = map.getCenter();
									// scope.coordinates = center;
									setCoordinate();
								} else {
									//console.log("Geocode was not successful for the following reason: " + status);
								}
							});
						});

					});
				}

			}
		}	
	]);

})();
