angular.module('app')
  .service('UserService',
    ['$http', function($http) {
      return {
        addUser: function(dataObj) {
          return $http.post('api/users', dataObj);
        },
        getUser: function(id) {
          return $http.get(`/api/users/${id}`);
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
        }
      };
    }]
  )
  .service('MessageService',
    ['$http', function($http) {
      return {
        getLatestMessages: function() {
          return $http.get('/api/messages/latest');
        }
      };
    }]);