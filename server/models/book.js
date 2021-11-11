"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      // define association here
      Book.hasMany(models.myList, {
        as: "myList",
        foreignKey: {
          name: "bookId",
        },
      });
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      publicationDate: DataTypes.STRING,
      pages: DataTypes.INTEGER,
      author: DataTypes.STRING,
      isbn: DataTypes.STRING,
      about: DataTypes.TEXT,
      bookFile: DataTypes.TEXT,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
