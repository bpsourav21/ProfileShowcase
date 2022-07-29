"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkExperience = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../db/index"));
exports.WorkExperience = index_1.default.define("work_experience", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    jobTitle: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    company: {
        type: sequelize_1.DataTypes.STRING,
    },
    companyLogo: {
        type: sequelize_1.DataTypes.BLOB,
    },
    jobDescription: {
        type: sequelize_1.DataTypes.STRING,
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    isContinuing: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
// Other model options go here
});
