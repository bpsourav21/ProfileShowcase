"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDbConnection = void 0;
const index_1 = __importDefault(require("./index"));
exports.initDbConnection = new Promise((resolve, reject) => {
    // db sequelize
    // drop the table if resync
    let resync = process.env.NODE_ENV === "Development";
    index_1.default
        .sync({ force: resync })
        .then(() => {
        let msg = resync
            ? "Drop and re-sync db."
            : "Synced db.";
        console.log(msg);
        return resolve("Db connected");
    })
        .catch((err) => {
        console.log("Failed to sync db: " + err.message);
        return reject(err.message);
    });
});
