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

const createMessageObj = (message, topicId, userId) => {
  return {
    body: message,
    author_id: userId,
    topic_id: topicId
  };
};