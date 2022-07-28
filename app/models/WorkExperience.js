const { DataTypes } = require("sequelize");
const sequelize = require("../db/index");

const WorkExperience = sequelize.define(
  "work_experience",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
    },
    companyLogo: {
      type: DataTypes.BLOB,
    },
    jobDescription: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    isContinuing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = WorkExperience;
