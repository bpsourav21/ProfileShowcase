"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const index_1 = __importDefault(require("./app/db/index"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
var corsOptions = {
    origin: "http://localhost:8081",
};
app.use((0, cors_1.default)(corsOptions));
// parse requests of content-type - application/json
app.use(express_1.default.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express_1.default.urlencoded({ extended: true }));
// db sequelize
// sequelize
//   .sync()
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });
// drop the table if it already exists
index_1.default.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hello world" });
});
// application routes
app.use("/api", routes_1.default);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
