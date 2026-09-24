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
      "Planets",
      [
        {
          name: "Pandora",
          createdAt: new Date(),
          updatedAt: new Date(),
          size: 3800,
          description: "Alien planet with tall blue dudes and ladies",
        },
        {
          name: "Earth",
          createdAt: new Date(),
          updatedAt: new Date(),
          size: 2400,
          description: "You already know this place pretty well. (there is chocolate)",
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
    await queryInterface.bulkDelete("Planets", null, {});
  },
};
