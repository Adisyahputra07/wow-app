"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        as: "Roles",
        foreignKey: {
          name: "roleId",
        },
      });

      User.hasMany(models.myList, {
        as: "myList",
        foreignKey: {
          name: "userId",
        },
      });

      User.hasMany(models.Transactions, {
        as: "Transactions",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.TEXT,
      image: DataTypes.TEXT,
      accountNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
