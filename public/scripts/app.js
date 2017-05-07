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
          controllerAs: 'Users'
        })
        .when('/topics', {
          templateUrl: '/views/topics.html',
          controller: 'TopicsCtrl',
          controllerAs: 'Topics'
        })
        .when('/topics/:name', {
          templateUrl: '/views/singleTopic.html',
          controller: 'SingleTopicCtrl',
          controllerAs: 'SingleTopic'
        })
        .when('/messages', {
          templateUrl: '/views/messages.html',
          controller: 'MessageCtrl',
          controllerAs: 'Messages'
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
        $rootScope.user_id = localStorage.user_id;
        $rootScope.loggedIn = true;
      } else {
        $rootScope.loggedIn = false;
      }
    }
  ]);
