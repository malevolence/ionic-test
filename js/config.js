/**
 * Created by Bill on 8/7/2014.
 */
(function(app) {

    // configure routing
    app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', function($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
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

            .state('app.blog', {
                url: '/blog',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/blog.html',
                        controller: 'BlogListCtrl'
                    }
                }
            })

            .state('app.singlepost', {
                url: '/blog/:postId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/blogpost.html',
                        controller: 'BlogPostCtrl'
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
    }]);

})(angular.module('starter'));