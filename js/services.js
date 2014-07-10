angular.module('starter.services', [])
.factory('JobRepo', ['$resource', function ($resource) {
	return $resource('http://192.168.0.20:8084/jobs/:id', { jobId: '@id' });
}])
.factory('LookupRepo', ['$resource', function($resource) {
	return $resource('http://192.168.0.20:8084/lookups', {}, {
		countries: { method: 'GET', isArray: true, url: 'http://192.168.0.20:8084/lookups/locations' },
		states: { method: 'GET', isArray: true, url: 'http://192.168.0.20:8084/lookups/locations/:countryId/states', params: { countryId: '@countryId' }},
		sections: { method: 'GET', isArray: true, url: 'http://192.168.0.20:8084/lookups/sections' },
		categories: { method: 'GET', isArray: true, url: 'http://192.168.0.20:8084/lookups/sections/:sectionId/categories', params: { sectionId: '@sectionId' }}
	});
}])
.factory('ProfileRepo', ['$resource', function($resource) {
	return $resource('http://192.168.0.20:8084/profiles/:id', { id: '@id' });
}]);