"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../db/index"));
const WorkExperience_1 = require("./WorkExperience");
exports.ProfileModel = index_1.default.define("profile", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    profilePicture: {
        type: sequelize_1.DataTypes.BLOB,
    },
}, {
// Other model options go here
});
exports.ProfileModel.hasMany(WorkExperience_1.WorkExperienceModel, { foreignKey: "expId" });
