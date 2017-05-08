angular.module('app')
  .service('UserService',
    ['$http', function($http) {
      return {
        addUser: function(dataObj) {
          return $http.post('api/users', dataObj);
        },
        getUser: function(username) {
          return $http.get(`/api/users/${username}`);
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
        getSingleTopic: function(topic_id) {
          return $http.get(`/api/topics/${topic_id}`);
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