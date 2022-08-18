import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../db/index";
import { PictureModel } from "./Picture";
import { ProfileModel } from "./Profile";

export type WorkExperienceAttribute = InferAttributes<WorkExperienceModel>;
export type WorkExperienceDto = InferCreationAttributes<WorkExperienceModel>;
interface WorkExperienceModel
  extends Model<WorkExperienceAttribute, WorkExperienceDto> {
  id: CreationOptional<string>;
  jobTitle: string;
  company: string | null;
  jobDescription: string | null;
  startDate: Date | null;
  endDate: Date | null;
  isContinuing: boolean;
  expId: number;
  logoId: string;
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export const WorkExperienceModel = sequelize.define<WorkExperienceModel>(
  "workExperience",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
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
    expId: {
      type: DataTypes.INTEGER,
      references: {
        model: ProfileModel,
        key: "id",
      },
    },
    logoId: {
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

WorkExperienceModel.belongsTo(PictureModel, { foreignKey: "logoId", as: "companyLogo" });

