import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../db/index";
import { PictureModel } from "./Picture";
import { WorkExperienceModel } from "./WorkExperience";

export type ProfileAttribute = InferAttributes<ProfileModel>;
export type ProfileDto = InferCreationAttributes<ProfileModel, { omit: "id" }>;

interface ProfileModel extends Model<ProfileAttribute, ProfileDto> {
  id: CreationOptional<number>;
  name: string;
  age: number;
  picId: string;
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
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    picId: {
      type: DataTypes.UUID,
      references: {
        model: PictureModel,
        key: "id",
      },
    },
  },
  {
    // Other model options go here
  }
);

ProfileModel.hasMany(WorkExperienceModel, { foreignKey: "expId", as: "workExperiences" });
ProfileModel.belongsTo(PictureModel, { foreignKey: "picId", as: "profilePicture" });
