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
        url: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/265004/pexels-photo-265004.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/1125130/pexels-photo-1125130.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/3288103/pexels-photo-3288103.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/6806396/pexels-photo-6806396.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/5825709/pexels-photo-5825709.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/6032283/pexels-photo-6032283.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/5501626/pexels-photo-5501626.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/6538896/pexels-photo-6538896.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://images.pexels.com/photos/210552/pexels-photo-210552.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://images.pexels.com/photos/534172/pexels-photo-534172.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://images.pexels.com/photos/3316926/pexels-photo-3316926.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://images.pexels.com/photos/3753435/pexels-photo-3753435.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://images.pexels.com/photos/6527068/pexels-photo-6527068.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://images.pexels.com/photos/6580230/pexels-photo-6580230.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://images.pexels.com/photos/3555618/pexels-photo-3555618.jpeg',
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
