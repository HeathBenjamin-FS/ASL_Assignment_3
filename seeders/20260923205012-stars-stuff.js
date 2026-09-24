"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "Stars",
      [
        {
          name: "Sol",
          createdAt: new Date(),
          updatedAt: new Date(),
          size: 5000,
          description: "Sol is a cool name and so I picked it.",
        },
        {
          name: "Brighticus",
          createdAt: new Date(),
          updatedAt: new Date(),
          size: 3500,
          description: "Brighticus is a name that is far less cooler than Sol.",
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Stars", null, {});
  },
};
