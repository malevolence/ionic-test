angular.module('starter.services', [])
.factory('JobRepo', ['$resource', 'baseUrl', function ($resource, baseUrl) {
	return $resource(baseUrl + '/jobs/:id', { jobId: '@id' });
}])
.factory('LookupRepo', ['$resource', 'baseUrl', function($resource, baseUrl) {
	return $resource(baseUrl + '/lookups', {}, {
		countries: { method: 'GET', isArray: true, url: baseUrl + '/lookups/locations' },
		states: { method: 'GET', isArray: true, url: baseUrl + '/lookups/locations/:countryId/states', params: { countryId: '@countryId' }},
		sections: { method: 'GET', isArray: true, url: baseUrl + '/lookups/sections' },
		categories: { method: 'GET', isArray: true, url: baseUrl + '/lookups/sections/:sectionId/categories', params: { sectionId: '@sectionId' }}
	});
}])
.factory('ProfileRepo', ['$resource', function($resource) {
	return $resource('http://192.168.0.20:8084/profiles/:id', { id: '@id' });
}]);