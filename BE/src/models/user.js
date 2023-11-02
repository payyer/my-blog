'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, { foreignKey: 'userId' });
      User.hasMany(models.Comment, { foreignKey: 'userId' });
    }
  }
  User.init({
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    role: { type: DataTypes.STRING, defaultValue: "user" },
    opt: { type: DataTypes.INTEGER, },
    verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true
  });
  return User;
};