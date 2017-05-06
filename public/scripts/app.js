angular.module('app', ['ngRoute'])
  .config([
    '$routeProvider','$locationProvider',
    function($routeProvider, $locationProvider){

      $routeProvider
        .when('/', {
          templateUrl: '/views/home.html'
        })
        .when('/users', {
          templateUrl: '/views/users.html',
          controller: 'UsersCtrl',
          controllerAs: 'users'
        })
        .when('/topics', {
          templateUrl: '/views/topics.html',
          controller: 'TopicsCtrl',
          controllerAs: 'topics'
        });

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
    }])
  .run(['$rootScope',
    function($rootScope) {
      if (localStorage.user !== undefined) {
        $rootScope.user = localStorage.user;
        $rootScope.loggedIn = true;
      } else {
        $rootScope.loggedIn = false;
      }
    }
  ]);
