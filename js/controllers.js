angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('SectionsCtrl', function($scope, $ionicLoading, LookupRepo) {
	$scope.loaded = false;
	$scope.sections = [];
	$scope.loadSections = function() {
		$scope.loaded = false;
		$ionicLoading.show({
			template: 'Loading...'
		});

		LookupRepo.sections({}, function (data) {
			$scope.sections = data;
			$ionicLoading.hide();
			$scope.loaded = true;
		});
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

.controller('ProfileListCtrl', function($scope, $ionicLoading, $stateParams, ProfileRepo) {
	$scope.loaded = false;
	$scope.profiles = [];
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

		ProfileRepo.query({ category: $stateParams.categoryId, page: page }, function(data, responseHeaders) {
			$scope.profiles = data;
			$scope.page = page;
			$scope.pagination = angular.fromJson(responseHeaders('X-Pagination'));
			$ionicLoading.hide();
			$scope.loaded = true;
		});
	};
	
	$scope.loadProfiles(1);
})

.controller('ProfileItemCtrl', function($scope, $ionicLoading, $stateParams, ProfileRepo) {
	$scope.profile = ProfileRepo.get({ id: $stateParams.id });
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
	$scope.id = $stateParams.playlistId;
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