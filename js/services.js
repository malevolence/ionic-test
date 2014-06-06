angular.module('starter.services', [])
.factory('JobRepo', ['$resource', function ($resource) {
	return $resource('http://localhost:8081/jobs/:id', { jobId: '@id' });
}]);