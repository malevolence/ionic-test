angular.module('starter.services', [])
.factory('authInterceptorService', ['$q', '$location', 'localStorageService', function($q, $location, localStorageService) {
	var authInterceptorServiceFactory = {};
	var _request = function(config) {
		config.headers = config.headers || {};
		var authData = localStorageService.get('authorizationData');
		if (authData) {
			config.headers.Authorization = 'Bearer ' + authData.token;
		}

		return config;
	};
	
	var _responseError = function(rejection) {
		if (rejection.status === 401) {
			$location.path('/app/login');
		}
		return $q.reject(rejection);
	};
	authInterceptorServiceFactory.request = _request;
	authInterceptorServiceFactory.responseError = _responseError;
	
	return authInterceptorServiceFactory;
}])
.factory('authService', ['$http', '$q', 'localStorageService', 'baseUrl', function($http, $q, localStorageService, baseUrl) {
	var authServiceFactory = {};
	var _authentication = {
		isAuth: false,
		userName: ''
	};

	var _login = function(loginData) {
		var data = 'grant_type=password&username=' + loginData.userName + '&password=' + loginData.password;
		var deferred = $q.defer();
		$http.post(baseUrl + '/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
			localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName });
			_authentication.isAuth = true;
			_authentication.userName = response.userName;
			
			deferred.resolve(response);
		}).error(function(err, status) {
			_logout();
			deferred.reject(err);
		});
		
		return deferred.promise;
	};
	
	var _logout = function() {
		localStorageService.remove('authorizationData');
		_authentication.isAuth = false;
		_authentication.userName = '';
	};
	
	var _fillAuthData = function() {
		var authData = localStorageService.get('authorizationData');
		if (authData) {
			_authentication.isAuth = true;
			_authentication.userName = authData.userName;
		}
	};
	
	authServiceFactory.login = _login;
	authServiceFactory.logout = _logout;
	authServiceFactory.fillAuthData = _fillAuthData;
	authServiceFactory.authentication = _authentication;

	return authServiceFactory;
}])

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
		categories: { method: 'GET', isArray: true, url: baseUrl + '/lookups/sections/:sectionId/categories', params: { sectionId: '@sectionId' }},
		securesections: { method: 'GET', isArray: true, url: baseUrl + '/lookups/securesections' }
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