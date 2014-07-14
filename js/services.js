angular.module('starter.services', [])
.factory('JobRepo', ['$resource', 'baseUrl', function ($resource, baseUrl) {
	return $resource(baseUrl + '/jobs/:id', { jobId: '@id' });
}])
.factory('LookupRepo', ['$resource', 'baseUrl', function($resource, baseUrl) {
	return $resource(baseUrl + '/lookups', {}, {
		countries: { method: 'GET', isArray: true, url: baseUrl + '/lookups/locations' },
		states: { method: 'GET', isArray: true, url: baseUrl + '/lookups/locations/:countryId/states', params: { countryId: '@countryId' }},
		freelance: { method: 'GET', isArray: true, url: baseUrl + '/lookups/freelance' },
		companies: { method: 'GET', isArray: true, url: baseUrl + '/lookups/companies' },
		sections: { method: 'GET', isArray: true, url: baseUrl + '/lookups/sections' },
		categories: { method: 'GET', isArray: true, url: baseUrl + '/lookups/sections/:sectionId/categories', params: { sectionId: '@sectionId' }}
	});
}])
.factory('ProfileRepo', ['$resource', 'baseUrl', function($resource, baseUrl) {
	return $resource(baseUrl + '/profiles/:id', { id: '@id' }, {
		profilegps: { method: 'GET', isArray: true, url: baseUrl + '/profiles/location' }
	});
}])
.factory('BlogRepo', ['$resource', 'baseUrl', function($resource, baseUrl) {
	return $resource(baseUrl + '/blog/:id', { id: '@id' });
}]);