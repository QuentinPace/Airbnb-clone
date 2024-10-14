'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '805, N Johnson St',
        city: 'Warsaw',
        state: 'Indiana',
        country: 'United States',
        lat: 12.5687437,
        lng: -142.3498694,
        name: 'Qs House',
        price: 1500000000.00,
        description: "owned by a billionaire"
      },
      {
        ownerId: 2,
        address: 'W Johnson St 567',
        city: 'San Francisco',
        state: 'California',
        country: 'United States',
        lat: 4.5698437,
        lng: -12.3456794,
        name: 'black house',
        price: 356000.00,
        description: "this is desc"
      },
      {
        ownerId: 2,
        address: '678 Lohnson Rd',
        city: 'New York',
        state: 'New York',
        country: 'United States',
        lat: 17.5645337,
        lng: -12.3498694,
        name: 'white house',
        price: 1200000.00,
        description: "terrible house"
      },
      {
        ownerId: 3,
        address: '678 Lohnson biwen Rd',
        city: 'Fort-Wayne',
        state: 'Indiana',
        country: 'United States',
        lat: 17.5645337,
        lng: -12.3498694,
        name: 'Bat Cave',
        price: 1200000.00,
        description: "Amazinf Cave"
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['black house', 'white house', 'Qs House'] }
    }, {});
  }
};
