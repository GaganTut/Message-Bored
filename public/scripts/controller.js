const createUserObj = (username) => {
  return {
    name: username
  };
};

const createTopicObj = (name, id) => {
  return {
    created_by: id,
    name: name
  };
};

angular.module('app')
  .controller('UsersCtrl',
    ['$rootScope', '$scope', 'UserService',
    function($rootScope, $scope, UserService){
      $scope.getUser = function(id) {
        if(id === '') {
          $scope.userId = 'Enter Login ID';
          return;
        }
        UserService.getUser(id)
          .then(response => {
            localStorage.setItem('user', response.data.name);
            localStorage.setItem('user_id', response.data.id);
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
            localStorage.setItem('user_id', response.data.id);
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
  .controller('TopicsCtrl',
    ['$rootScope', '$scope', 'TopicService',
    function($rootScope, $scope, TopicService) {

      TopicService.getTopics()
        .then(data => {
          $scope.topics = data.data;
        })
        .catch(err => {
          console.log(err);
        });

      $scope.createTopic = function(name) {
        console.log('Heyyyyyyy');
        TopicService.addTopic(createTopicObj(name, $rootScope.user_id))
          .then(data => {
            console.log(data);
            location.reload();
          })
          .catch(err => {
            console.log(err);
          });
      };
    }
  ]);