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
        name: 'Warsaw Getaway',
        price: 150.00,
        description: "Vitae luctus finibus natoque vulputate lectus finibus elit euismod. Non gravida metus eget dictumst sociosqu ac praesent bibendum etiam. Nisi enim suscipit mattis augue praesent dignissim pulvinar tellus. Eros morbi feugiat congue vel elit gravida augue hendrerit. Etiam morbi massa vivamus nunc in condimentum. Sapien nascetur praesent placerat semper litora. Lacus elit etiam condimentum; donec gravida ut. Lectus morbi senectus eget eleifend molestie."
      },
      {
        ownerId: 2,
        address: '456 Oak Ave',
        city: 'Raleigh',
        state: 'North Carolina',
        country: 'United States',
        lat: 4.5698437,
        lng: -12.3456794,
        name: 'Cozy Retreat',
        price: 760.00,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        ownerId: 2,
        address: '678 Lohnson Rd',
        city: 'New York',
        state: 'New York',
        country: 'United States',
        lat: 17.5645337,
        lng: -12.3498694,
        name: 'Urban Getaway',
        price: 625.00,
        description: "Lobortis sem donec tempus augue at cras. Ornare semper turpis ultrices sed hendrerit luctus nostra. Convallis aliquam diam quisque litora donec purus libero platea nostra. Praesent morbi lobortis mi class, semper nunc sit. Morbi sociosqu sodales odio est molestie. Quis fames nec leo, tortor libero platea. Commodo bibendum penatibus iaculis fringilla mauris."
      },
      {
        ownerId: 3,
        address: '123 Elm St',
        city: 'Boise',
        state: 'Idaho',
        country: 'United States',
        lat: 17.5645337,
        lng: -12.3498694,
        name: 'Boise Home',
        price: 120.00,
        description: "Dictum curabitur donec elementum vivamus litora mauris. Class odio sem nascetur litora mus egestas massa. Habitasse dignissim ut congue adipiscing natoque tempus eu accumsan sagittis. Nibh fusce sed platea ridiculus; hac dictumst. Nullam lobortis tempus pulvinar felis ut ad nisi dictum. Varius pharetra urna ligula lobortis leo ornare orci ac curabitur. Curae volutpat velit; ridiculus phasellus volutpat dictum condimentum. Nec maecenas diam luctus posuere est lectus rhoncus auctor."
      },
      {
        ownerId: 3,
        address: '456 W PineCreek',
        city: 'Lakeway',
        state: 'Texas',
        country: 'United States',
        lat: 4.5698437,
        lng: -12.3456794,
        name: 'Roomy Lakehouse',
        price: 760.00,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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
