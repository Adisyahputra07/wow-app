"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add seed commands here.

    // Example:
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          fullName: "John Doe",
          email: "adgmail.com",
          password: "asede",
          roleId: 2,
          gender: "male",
          phone: "0987654321",
          address: "jl.malaka",
          image: "asede.png",
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
