module.exports = function(sequelize, DataTypes) {
  let Topic = sequelize.define("Topic", {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Topic.belongsTo(models.User, {
          as: 'Creator',
          foreignKey: {
            name: 'created_by',
            allowNull: false
          }
        });
        Topic.hasMany(models.Message, {
          foreignKey: {
            name: 'topic_id',
            allowNull: false
          }
        });
      }
    }
  });
  return Topic;
};