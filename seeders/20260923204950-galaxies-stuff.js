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
      "Galaxies",
      [
        {
          name: "Milky Way",
          createdAt: new Date(),
          updatedAt: new Date(),
          size: 10000,
          description: "Not the candy bar!",
        },
        {
          name: "Andromeda",
          createdAt: new Date(),
          updatedAt: new Date(),
          size: 1000000,
          description: "Really, REALLY big galaxy.",
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

    await queryInterface.bulkDelete("Galaxies", null, {});
  },
};
