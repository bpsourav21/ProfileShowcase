

import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";
import sequelize from "../db/index";
import { ProfileModel } from "./Profile";

export type WorkExperienceAttribute = InferAttributes<PictureModel>;
export type WorkExperienceDto = InferCreationAttributes<PictureModel>;
interface PictureModel
    extends Model<WorkExperienceAttribute, WorkExperienceDto> {
    id: CreationOptional<string>;
    imageName: string;
    mimetype: string;
    // Timestamps
    createdAt?: Date;
    updatedAt?: Date;
}

export const PictureModel = sequelize.define<PictureModel>(
    "picture",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        imageName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mimetype: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        // Other model options go here
    }
);