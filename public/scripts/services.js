//SERVICES TALK TO THE CONTROLLERS AND GIVES THEM THE REQUESTED DATA BY MAKING REQUEST TO DATABASE THROUGH XHR REQUESTS... THEY ALL RETURN PROMISES.....OR ERRORS

angular.module('app')
  .service('UserService',
    ['$http', function($http) {
      return {
        addUser: function(dataObj) {
          return $http.post('api/users', dataObj);
        },
        getUser: function(username) {
          return $http.get(`/api/users/${username}`);
        },
        getUserList: function() {
          return $http.get('/api/users');
        },
        getUserMessages: function(userId) {
          return $http.get(`/api/messages/byUser/${userId}`);
        }
      };
    }]
  )
  .service('TopicService',
    ['$http', function($http) {
      return {
        getTopics: function() {
          return $http.get('/api/topics');
        },
        addTopic: function(topicObj) {
          return $http.post('/api/topics', topicObj);
        },
        getTopicInfo: function(topic_id) {
          return $http.get(`/api/topics/${topic_id}`);
        },
        getMessages: function(topic_id) {
          return $http.get(`/api/messages/bytopic/${topic_id}`);
        }
      };
    }]
  )
  .service('MessageService',
    ['$http', function($http) {
      return {
        getLatestMessages: function() {
          return $http.get('/api/messages/latest');
        },
        addMessage: function(messageObj) {
          return $http.post('/api/messages', messageObj);
        }
      };
    }]);