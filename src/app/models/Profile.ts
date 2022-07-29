import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index";
import { WorkExperience } from "./WorkExperience";

export const Profile = sequelize.define(
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
      allowNull: false,
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
