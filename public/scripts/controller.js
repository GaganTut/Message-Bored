const createUserObj = (username) => {
  return {
    name: username
  };
};

angular.module('app')
  .controller('UsersCtrl', ['$rootScope', '$scope', 'UserService',
    function($rootScope, $scope, UserService){

      $scope.userId = '';
      $scope.username = '';

      $scope.getUser = function(id) {
        if(id === '') {
          $scope.userId = 'Enter Login ID';
          return;
        }
        UserService.getUser(id)
          .then(response => {
            localStorage.setItem('user', response.data.name);
            location.reload();
          })
          .catch(err => {
            console.log(err);
          });
      };

      $scope.createUser = function(username) {
        UserService.addUser(createUserObj(username))
          .then(response => {
            localStorage.setItem('user', response.data.name);
            location.reload();
          })
          .catch(err => {
            console.log(err);
          });
      };

      $scope.logOutUser = function() {
        localStorage.clear();
        location.reload();
      };
    }
  ])
  .controller('TopicsCtrl', ['$scope',
    function($scope) {
      $scope.testScope = 'This scope works';
    }
  ]);