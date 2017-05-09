//CONTROLLERS PREPARE DATA FOR THE HTML PAGES TO USE BY USING DATA THAT IS REQUESTED FROM THE SERVICES. SAVES THAT DATA TO '$scope' AND ALLOWS HTML PAGE TO USE IT FOR RENDERING

angular.module('app')
  .controller('createUserCtrl',
    ['$rootScope', '$scope', '$location', 'UserService',
    function($rootScope, $scope, $location, UserService){
      // Adds a user into database and uses helper function to create the request body
      $scope.createUser = function(username) {
        UserService.addUser(createUserObj(username))
          .then(response => {
            // Log in user right when the request to create user returns
            localStorage.setItem('user', response.data.name);
            localStorage.setItem('user_id', response.data.id);
            $rootScope.loggedIn = true;
            $rootScope.username = localStorage.user;
            $location.path('/');
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
      //Gets all the topics and save them in scope.topics
      TopicService.getTopics()
        .then(data => {
          $scope.topics = data.data;
        })
        .catch(err => {
          console.log(err);
        });

      //Creates a new topic and I changed server side to return a list of all topics so I dont have to reload page anymore to display new topic in list
      $scope.createTopic = function(name) {
        TopicService.addTopic(createTopicObj(name, localStorage.user_id))
          .then(data => {
            $scope.topics = data.data;
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

      //Grabs the topic's ID by using the pathname and grabbing the value after the '/'
      $scope.topicId = window.location.href.slice(window.location.href.lastIndexOf('/')+1);

      //Uses the above topicID to then get the topic info from database and then saves the data returned to scope.topicInfo
      TopicService.getTopicInfo($scope.topicId)
        .then(response => {
          $scope.topicInfo = response.data;
        });

      //Like above, but grabs all the messages that belong to that certain topic and saves them to scope.messages
      TopicService.getMessages($scope.topicId)
        .then(response => {
          $scope.messages = response.data;
        });

      //Similar to creating topic...Adds message and I changed server side so it returns list of all messages in that topic
      $scope.addMessage = function(message) {
        MessageService.addMessage(createMessageObj(message, $scope.topicId, localStorage.user_id))
          .then(data => {
            $scope.messages = data.data;
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

      //gets all the messages that the user posted
      UserService.getUserMessages($scope.userId)
        .then(response => {
          $scope.userMessages = response.data;
        });
    }]);