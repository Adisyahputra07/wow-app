"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    static associate(models) {
      // define association here
      Transactions.belongsTo(models.User, {
        as: "Users",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  Transactions.init(
    {
      userId: DataTypes.INTEGER,
      transferProof: DataTypes.STRING,
      remainingActive: DataTypes.STRING,
      userStatus: DataTypes.STRING,
      paymentStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transactions",
    }
  );
  return Transactions;
};
