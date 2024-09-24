'use strict';

/** @type {import('sequelize-cli').Migration} */


const { Booking } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate( [
      {
        spotId: 1,
        userId :1,
        startDate : "2025-02-02",
        endDate: "2025-02-15"
      },
      {
        spotId: 1,
        userId :2,
        startDate : "2025-09-02",
        endDate: "2025-09-15"
      },
      {
        spotId: 2,
        userId :2,
        startDate : "2025-01-02",
        endDate: "2025-02-10"
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: [ 
            "2025-01-02",
            "2025-09-02",
            "2025-02-02"
      ] }
    }, {});
  }
};
