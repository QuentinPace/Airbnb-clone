'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'cascade',
        reference: {
          model: 'Users',
          key: 'id'
        }
      },
      address: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lat: {
        type: Sequelize.DECIMAL(20, 7)
      },
      lng: {
        type: Sequelize.DECIMAL(20, 7)
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue : Sequelize.literal("CURRENT_TIMESTAMP")

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue : Sequelize.literal("CURRENT_TIMESTAMP")
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    await queryInterface.dropTable(options);
  }
};