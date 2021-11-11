"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //  Add seed commands here.

    //  Example:
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          name: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
