'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Post', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
      },
      article: {
        type: Sequelize.STRING
      },
      censorship: {
        type: Sequelize.BOOLEAN
      },
      views: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'User',
          },
          key: 'id'
        },
        allowNull: false
      },
      topicId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Topic',
          },
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Post');
  }
};