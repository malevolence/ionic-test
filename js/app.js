// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngResource', 'starter.controllers', 'starter.services', 'LocalStorageModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', function($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
//  $locationProvider.html5Mode(true);
//  $sceDelegateProvider.resourceUrlWhitelist(['self', baseUrl + '/**']);

  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $httpProvider.interceptors.push('authInterceptorService');
  
  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

	.state('app.login', {
		url: '/login',
		views: {
			'menuContent': {
				templateUrl: 'templates/login.html',
				controller: 'LoginCtrl'
			}
		}
	})
	
    .state('app.leads', {
      url: "/leads",
      views: {
        'menuContent' :{
          templateUrl: "templates/leads.html"
        }
      }
    })
	
	.state('app.landing', {
		url: '/landing',
		views: {
			'menuContent': {
				templateUrl: 'templates/landing.html',
				controller: 'LandingCtrl'
			}
		}
	})
	
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    })
	
	.state('app.jobs', {
		url: '/jobs',
		views: {
			'menuContent': {
				templateUrl: 'templates/joblist.html',
				controller: 'JobsListCtrl'
			}
		}
	})
	
	.state('app.singlejob', {
		url: '/jobs/:jobId',
		views: {
			'menuContent': {
				templateUrl: 'templates/singlejob.html',
				controller: 'JobItemCtrl'
			}
		}
	})
	
	.state('app.companies', {
		url: '/companies',
		data: { isCompany: true },
		views: {
			'menuContent': {
				templateUrl: 'templates/sections.html',
				controller: 'SectionsCtrl'
			}
		}
	})
	
	.state('app.freelancers', {
		url: '/freelancers',
		data: { isCompany: false },
		views: {
			'menuContent': {
				templateUrl: 'templates/sections.html',
				controller: 'SectionsCtrl'
			}
		}
	})

	.state('app.categories', {
		url: '/sections/:sectionId',
		views: {
			'menuContent': {
				templateUrl: 'templates/categories.html',
				controller: 'CategoriesCtrl'
			}
		}
	})
	
	.state('app.profilelanding', {
		url: '/profiles',
		views: {
			'menuContent': {
				templateUrl: 'templates/profilelanding.html',
				controller: 'ProfileLandingCtrl'
			}
		}
	})
	
	.state('app.profiles', {
		url: '/profiles/:categoryId',
		views: {
			'menuContent': {
				templateUrl: 'templates/profiles.html',
				controller: 'ProfileListCtrl'
			}
		}
	})
	
	.state('app.singleprofile', {
		url: '/profile/:id',
		views: {
			'menuContent': {
				templateUrl: 'templates/singleprofile.html',
				controller: 'ProfileItemCtrl'
			}
		}
	});

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/landing');
}])

.value('baseUrl', 'http://prohub-api.azurewebsites.net');


