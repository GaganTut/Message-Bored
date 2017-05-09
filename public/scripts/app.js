//TELLS EACH ROUTE WHICH PAGE TO RENDER AND WHICH CONTROLLER TO USE FOR THAT SAID PAGE

angular.module('app', ['ngRoute'])
  .config([
    '$routeProvider','$locationProvider',
    function($routeProvider, $locationProvider){
      //All the Angular Routes
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
        .when('/users/:id', {
          templateUrl: '/views/singleUser.html',
          controller: 'singleUserCtrl',
          controllerAs: 'sngUser'
        })
        .when('/createUser', {
          templateUrl: '/views/createUser.html',
          controller: 'createUserCtrl',
          controllerAs: 'newUser'
        });

      //Allows for Angular to intercept routes
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
    }])

  // "Runs" this stuff when the application initially Loads
  .run(['$rootScope','$location', 'UserService',
    function($rootScope, $location, UserService) {

      //Check if user already saved in localstorage
      if (localStorage.user !== undefined) {
        $rootScope.username = localStorage.user;
        $rootScope.loggedIn = true;
      }

      //Make server call to login user if that user exists
      $rootScope.getUser = function(username) {
        if(!username) {
          //If dummie tries to login without entering anything, show error
          $rootScope.responseError = 'Enter Login Username';
          return;
        }
        UserService.getUser(username)
          .then(response => {
            if (response.data.length !== 1) {
              //If user is not in database, show error
              $rootScope.responseError = 'User does not exist';
            } else {
              //Store data into localstorage and rootscope to have in background
              localStorage.setItem('user', response.data[0].name);
              localStorage.setItem('user_id', response.data[0].id);
              $rootScope.loggedIn = true;
              $rootScope.username = localStorage.user;
              $location.path('/');
            }
          })
          .catch(err => {
            console.log(err);
          });
      };
      //Logs out user by clearing localstorage and rootscope
      $rootScope.logOutUser = function() {
        localStorage.clear();
        $rootScope.loggedIn = false;
        $rootScope.username = undefined;
      };
    }
  ]);
