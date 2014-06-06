angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
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


.controller('JobsListCtrl', ['$scope', 'JobRepo', function ($scope, JobRepo) {
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
			$scope.loaded = true;
		});
	}

	// Initialize the controller
	$scope.loadJobs(1);
}])
.controller('JobItemCtrl', ['$scope', '$stateParams', 'JobRepo', function($scope, $stateParams, JobRepo) {
	$scope.job = JobRepo.get({ id: $stateParams.jobId });
}]);