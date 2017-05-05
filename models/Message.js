module.exports = function(sequelize, DataTypes) {
  let Message = sequelize.define("Message", {
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Message.belongsTo(models.Topic, {
          foreignKey: {
            name: 'topic_id',
            allowNull: false
          }
        });
        Message.belongsTo(models.User, {
          as: 'Author',
          foreignKey: {
            name: 'author_id',
            allowNull: false
          }
        });
      }
    }
  });
  return Message;
};