angular.module('starter.services', [])
.factory('JobRepo', ['$resource', function ($resource) {
	return $resource('http://192.168.0.20:8084/jobs/:id', { jobId: '@id' });
}]);