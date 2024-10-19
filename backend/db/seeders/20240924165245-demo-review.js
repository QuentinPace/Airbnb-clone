'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Review } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate( [
      {
        userId: 1,
        spotId: 2,
        review: "This was an awesome spot!",
        stars: 5,
      },
      {
        userId: 1,
        spotId: 3,
        review: "This was an awful spot!",
        stars: 1,
      },
      {
        userId: 3,
        spotId: 2,
        review: "This was a hot spot!",
        stars: 4,
      },
      {
        userId: 3,
        spotId: 1,
        review: "Loved This spot, had everything we needed!",
        stars: 4,
      },
      {
        userId: 2,
        spotId: 4,
        review: "Terrible, I did not enjoy myself!",
        stars: 1,
      },
      {
        userId: 3,
        spotId: 3,
        review: "This spot was so nice for me and my family!",
        stars: 4,
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ["This was an awesome spot!","This was an awful spot!","This was a hot spot!"] }
    }, {});
  }
};
