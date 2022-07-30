import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../db/index";
import { WorkExperienceModel } from "./WorkExperience";

export type ProfileAttribute = InferAttributes<ProfileModel>;
export type ProfileDto = InferCreationAttributes<ProfileModel, { omit: "id" }>;

interface ProfileModel extends Model<ProfileAttribute, ProfileDto> {
  id: CreationOptional<number>;
  name: string;
  age: number;
  profilePicture: string | null;
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export const ProfileModel = sequelize.define<ProfileModel>(
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

ProfileModel.hasMany(WorkExperienceModel, { foreignKey: "expId" });
