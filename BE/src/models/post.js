'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, { foreignKey: 'userId' });
      Post.belongsTo(models.Topic, { foreignKey: 'topicId' });
      Post.hasMany(models.Comment, { foreignKey: 'postId' });
    }
  }
  Post.init({
    title: { type: DataTypes.STRING, unique: true },
    article: DataTypes.STRING,
    views: { type: DataTypes.INTEGER, defaultValue: 0 },
    censorship: { type: DataTypes.BOOLEAN, defaultValue: false },
    userId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    sequelize,
    modelName: 'Post',
    freezeTableName: true
  });
  return Post;
};