angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('LoginCtrl', ['$scope', '$location', 'authService', '$ionicLoading', function($scope, $location, authService, $ionicLoading) {
	$ionicLoading.hide();
	$scope.loginData = {
		userName: '',
		password: ''
	};
	
	$scope.message = '';
	
	$scope.login = function() {
		authService.login($scope.loginData).then(function(response) {
			$location.path('/landing');
		}, function(err) {
			$scope.message = err.error_description;
		});
	};
}])

.controller('LandingCtrl', function($scope, $ionicLoading, BlogRepo) {
	$scope.loaded = false;
	$scope.posts = [];

	$scope.loadPosts = function(page) {
		$scope.loaded = false;
		$ionicLoading.show({
			template: 'Loading...'
		});
		
		BlogRepo.query({ page: 1 }, function(data) {
			$scope.posts = data;
			$ionicLoading.hide();
			$scope.loaded = true;
		});
	};
	
	$scope.loadPosts(1);
})

.controller('SectionsCtrl', function($scope, $ionicLoading, $state, LookupRepo) {
	$scope.isCompany = $state.current.data.isCompany;
	$scope.loaded = false;
	$scope.sections = [];
	$scope.loadSections = function() {
		$scope.loaded = false;
		$ionicLoading.show({
			template: 'Loading...'
		});

		LookupRepo.securesections({}, function(data) {
			$scope.sections = data;
			$ionicLoading.hide();
			$scope.loaded = true;
		});
		// if ($state.current.data.isCompany) {
			// LookupRepo.companies({}, function (data) {
				// $scope.sections = data;
				// $ionicLoading.hide();
				// $scope.loaded = true;
			// });
		// } else {
			// LookupRepo.freelance({}, function (data) {
				// $scope.sections = data;
				// $ionicLoading.hide();
				// $scope.loaded = true;
			// });
		// }
	};
	
	$scope.loadSections();
})

.controller('CategoriesCtrl', function($scope, $ionicLoading, $stateParams, LookupRepo) {
	$scope.loaded = false;
	$scope.categories = [];
	$scope.loadCategories = function() {
		$scope.loaded = false;
		$ionicLoading.show({
			template: 'Loading...'
		});
		
		LookupRepo.categories({ sectionId: $stateParams.sectionId }, function(data) {
			$scope.categories = data;
			$ionicLoading.hide();
			$scope.loaded = true;
		});
	};
	
	$scope.loadCategories();
})

.controller('ProfileLandingCtrl', function($scope) {
})

.controller('ProfileListCtrl', function($scope, $ionicLoading, $stateParams, ProfileRepo) {
	$scope.loaded = false;
	$scope.profiles = [];
	$scope.useLocation = true;
	$scope.position = null;
	$scope.page = 0;
	$scope.pagination = {
		totalCount: 0,
		totalPages: 1,
		prevPageLink: '',
		nextPageLink: ''
	};

	$scope.loadProfiles = function(page) {
		$scope.loaded = false;
		$ionicLoading.show({
			template: 'Loading...'
		});
		
		// Restrict paging to bounds of the set
		if (page < 1) {
			page = 1;
		} else if (page > $scope.pagination.totalPages) {
			page = $scope.pagination.totalPages;
		}

		if ($scope.useLocation) {
			$scope.getLocation();
		}
		
		
		if ($scope.position != null) {
			ProfileRepo.profilegps({ catId: $stateParams.categoryId, lat: $scope.latitude, lng: $scope.longitude, page: page }, function(data, responseHeaders) {
				$scope.profiles = data;
				$scope.page = page;
				$scope.pagination = angular.fromJson(responseHeaders('X-Pagination'));
				$ionicLoading.hide();
				$scope.loaded = true;
			});
		} else {
			ProfileRepo.query({ category: $stateParams.categoryId, page: page }, function(data, responseHeaders) {
				$scope.profiles = data;
				$scope.page = page;
				$scope.pagination = angular.fromJson(responseHeaders('X-Pagination'));
				$ionicLoading.hide();
				$scope.loaded = true;
			});
		}
	};
	
	$scope.getLocation = function() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				$scope.position = { latitude: position.coords.latitude, longitude: position.coords.longitude };
			}, function(error) {
				switch (error.code) {
					case error.PERMISSION_DENIED:
						alert('User denied the request for location');
						break;
					case error.POSITION_UNAVAILABLE:
						alert('Location unavailable');
						break;
					case error.TIMEOUT:
						alert('Location request timed out');
						break;
					case error.UNKNOWN_ERROR:
						alert('Unknown error occurred');
						break;
				}
			});
		} else {
			// not supported
			alert('Geolocation is not supported.');
		}
	};
	
	$scope.loadProfiles(1);
})

.controller('ProfileItemCtrl', function($scope, $ionicLoading, $stateParams, ProfileRepo) {
	$scope.profile = ProfileRepo.get({ id: $stateParams.id });
})

.controller('JobsListCtrl', ['$scope', '$ionicLoading', 'JobRepo', function ($scope, $ionicLoading, JobRepo) {
	$scope.loaded = false;
	$scope.page = 0;
	$scope.jobs = [];
	$scope.pagination = {
		totalCount: 0,
		totalPages: 1,
		prevPageLink: '',
		nextPageLink: ''
	};

	$scope.loadJobs = function (page) {
		$scope.loaded = false;
		$ionicLoading.show({
			template: 'Loading...'
		});

		// Restrict paging to bounds of the set
		if (page < 1) {
			page = 1;
		} else if (page > $scope.pagination.totalPages) {
			page = $scope.pagination.totalPages;
		}

		JobRepo.query({ page: page }, function (data, responseHeaders) {
			$scope.jobs = data;
			$scope.page = page;
			$scope.pagination = angular.fromJson(responseHeaders('X-Pagination'));
			$ionicLoading.hide();
			$scope.loaded = true;
		});
	}

	// Initialize the controller
	$scope.loadJobs(1);
}])
.controller('JobItemCtrl', ['$scope', '$stateParams', 'JobRepo', function($scope, $stateParams, JobRepo) {
	$scope.job = JobRepo.get({ id: $stateParams.jobId });
}]);