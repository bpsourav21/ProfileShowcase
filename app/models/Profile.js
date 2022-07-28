const { DataTypes } = require("sequelize");
const sequelize = require("../db/index");
const WorkExperience = require("./WorkExperience");

const Profile = sequelize.define(
  "profile",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    profilePicture: {
      type: DataTypes.BLOB,
    },
  },
  {
    // Other model options go here
  }
);

Profile.hasMany(WorkExperience, { foreignKey: "expId" });

module.exports = Profile;
