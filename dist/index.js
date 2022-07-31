"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Initialize dot env configuration
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const cors_1 = __importDefault(require("cors"));
const init_1 = require("./app/db/init");
const initAppConfig = () => {
    const app = (0, express_1.default)();
    var corsOptions = {
        origin: "http://localhost:8081",
    };
    app.use((0, cors_1.default)(corsOptions));
    // parse requests of content-type - application/json
    app.use(express_1.default.json());
    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(express_1.default.urlencoded({ extended: true }));
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
};
// Initialize Db connection
init_1.initDbConnection.then((res) => {
    console.log(res);
    initAppConfig();
})
    .catch((e) => {
    console.log(e);
});
