'use strict';

/** @type {import('sequelize-cli').Migration} */

const { ReviewImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate( [
      {
        reviewId: 1,
        url: "https://puracy.com/cdn/shop/articles/sidekix-media-8qNuR1lIv_k-unsplash.jpg?v=1684836702",
      },
      {
        reviewId: 2,
        url:"https://miro.medium.com/v2/resize:fit:640/1*7gZOjdfpuiPMYfQqTtNoLg.jpeg"
      },
      {
        reviewId: 3,
        url:"https://puracy.com/cdn/shop/articles/sidekix-media-8qNuR1lIv_k-unsplash.jpg?v=1684836702"
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: [ "https://miro.medium.com/v2/resize:fit:640/1*7gZOjdfpuiPMYfQqTtNoLg.jpeg",
        "https://puracy.com/cdn/shop/articles/sidekix-media-8qNuR1lIv_k-unsplash.jpg?v=1684836702",
        "https://puracy.com/cdn/shop/articles/sidekix-media-8qNuR1lIv_k-unsplash.jpg?v=1684836702"
      ] }
    }, {});
  }
};
