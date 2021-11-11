"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //  Add seed commands here.

    //  Example:
    await queryInterface.bulkInsert(
      "Books",
      [
        {
          title: "Tess On Road",
          publicationDate: "2020-04-1",
          pages: 201,
          author: "Rachel Hariman",
          isbn: 9781789807554,
          about: "in the medieval kingdom there are",
          bookFile: "tess-on-road.epub",
          image: "TessOnRoad.png",
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
