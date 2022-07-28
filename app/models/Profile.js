const { DataTypes } = require("sequelize");
const sequelize = require("../db/index");

const Profile = sequelize.define(
  "profile",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
  }
);

module.exports = Profile;
