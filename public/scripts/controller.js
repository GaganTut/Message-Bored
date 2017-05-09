angular.module('app')
  .controller('createUserCtrl',
    ['$scope', '$location', 'UserService',
    function($scope, $location, UserService){

      $scope.createUser = function(username) {
        UserService.addUser(createUserObj(username))
          .then(response => {
            localStorage.setItem('user', response.data.name);
            localStorage.setItem('user_id', response.data.id);
            $location.path('/');
            location.reload();
          })
          .catch(err => {
            console.log(err);
          });
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
        TopicService.addTopic(createTopicObj(name, $rootScope.user_id))
          .then(data => {
            location.reload();
          })
          .catch(err => {
            console.log(err);
          });
      };
    }]
  )

  .controller('SingleTopicCtrl',
    ['$rootScope', '$scope', 'TopicService', 'MessageService',
    function($rootScope, $scope, TopicService, MessageService) {
      $scope.topicId = window.location.href.slice(window.location.href.lastIndexOf('/')+1);

      TopicService.getTopicInfo($scope.topicId)
        .then(response => {
          $scope.topicInfo = response.data;
        });

      TopicService.getMessages($scope.topicId)
        .then(response => {
          $scope.messages = response.data;
        });

      $scope.addMessage = function(message) {
        MessageService.addMessage(createMessageObj(message, $scope.topicId, $rootScope.user_id))
          .then(data => {
            location.reload();
          });
      };
    }]
  )
  .controller('MessageCtrl',
    ['$rootScope', '$scope', 'MessageService',
    function($rootScope, $scope, MessageService) {
      MessageService.getLatestMessages()
        .then(data => {
          if(Array.isArray(data.data)) {
            $scope.messages = data.data;
          } else {
            $scope.messages = [data.data];
          }

        })
        .catch(err => {
          console.log(err);
        }
      );
    }]
  )
  .controller('UsersCtrl',
    ['$scope', 'UserService', 'MessageService',
    function($scope, UserService, MessageService) {
      UserService.getUserList()
        .then(response => {
          $scope.userList = response.data;
        });
    }]
  )
  .controller('singleUserCtrl',
    ['$scope', 'UserService', 'MessageService',
    function($scope, UserService, MessageService) {
      $scope.userId = window.location.href.slice(window.location.href.lastIndexOf('/')+1);

      UserService.getUserMesages($scope.userId)
        .then(response => {
          $scope.userMessages = response.data;
        });
    }]);