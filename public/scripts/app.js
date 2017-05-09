angular.module('app', ['ngRoute'])
  .config([
    '$routeProvider','$locationProvider',
    function($routeProvider, $locationProvider){

      $routeProvider
        .when('/', {
          templateUrl: '/views/home.html',
          controller: 'MessageCtrl',
          controllerAs: 'Messages'
        })
        .when('/topics', {
          templateUrl: '/views/topics.html',
          controller: 'TopicsCtrl',
          controllerAs: 'Topics'
        })
        .when('/topics/:id', {
          templateUrl: '/views/singleTopic.html',
          controller: 'SingleTopicCtrl',
          controllerAs: 'SingleTopic'
        })
        .when('/users', {
          templateUrl: '/views/users.html',
          controller: 'UsersCtrl',
          controllerAs: 'user'
        })
        .when('/createUser', {
          templateUrl: '/views/createUser.html',
          controller: 'createUserCtrl',
        });

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
    }])
  .run(['$rootScope','$location', 'UserService',
    function($rootScope, $location, UserService) {
      $rootScope.getUser = function(username) {
        if(!username) {
          $rootScope.responseError = 'Enter Login Username';
          return;
        }
        UserService.getUser(username)
          .then(response => {
            if (response.data.length !== 1) {
              $rootScope.responseError = 'User does not exist';
            } else {
              localStorage.setItem('user', response.data[0].name);
              localStorage.setItem('user_id', response.data[0].id);
              $location.path('/');
              location.reload();
            }
          })
          .catch(err => {
            console.log(err);
          });
      };

      $rootScope.logOutUser = function() {
        localStorage.clear();
        location.reload();
      };

      if (localStorage.user !== undefined) {
        $rootScope.user = localStorage.user;
        $rootScope.user_id = localStorage.user_id;
        $rootScope.loggedIn = true;
      } else {
        $rootScope.loggedIn = false;
      }
    }
  ]);
