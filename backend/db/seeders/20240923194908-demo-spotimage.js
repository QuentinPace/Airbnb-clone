'use strict';

const { SpotImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate( [
      {
        spotId: 1,
        url: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuc2lvbnxlbnwwfHwwfHx8MA%3D%3D',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://cf42c4dc.rocketcdn.me/wp-content/uploads/2023/08/Oliver-Mansion-2.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Seqpc26cQ-Y5Lk9zeQjlRjDOvjifTOW8_A&s',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Seqpc26cQ-Y5Lk9zeQjlRjDOvjifTOW8_A&s',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Seqpc26cQ-Y5Lk9zeQjlRjDOvjifTOW8_A&s',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Seqpc26cQ-Y5Lk9zeQjlRjDOvjifTOW8_A&s',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://cf42c4dc.rocketcdn.me/wp-content/uploads/2023/08/Oliver-Mansion-2.jpg',
        preview: false
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['https://images.unsplash.com/photo-1505843513577-22bb7d21e455?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuc2lvbnxlbnwwfHwwfHx8MA%3D%3D',
         'https://cf42c4dc.rocketcdn.me/wp-content/uploads/2023/08/Oliver-Mansion-2.jpg',
         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Seqpc26cQ-Y5Lk9zeQjlRjDOvjifTOW8_A&s'] }
    }, {});
  }
};
