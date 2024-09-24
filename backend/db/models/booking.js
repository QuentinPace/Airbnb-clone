'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User, {
        onDelete: 'cascade',
        foreignKey: 'userId'
      });

      Booking.belongsTo(models.Spot, {
        onDelete: 'cascade',
        foreignKey: 'spotId'
      });
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      validate :{
        isAfterToday(value){
          const current = new Date()
          const inputDate = new Date(value)
          if(inputDate < current ) {
            throw new Error ("Start date has to be on or after today")
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      validate :{
        isAfterStartDate(value){
          const startDate = new Date(this.startDate)
          const endDate = new Date(value)
          if(endDate <= startDate ) {
            throw new Error ("End date has to be strictly after start date")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};