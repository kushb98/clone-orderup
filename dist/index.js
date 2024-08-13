"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
mongoose_1.default
    .connect(validateEnv_1.default.DB_URL)
    .then(() => {
    console.log('Database connected!');
    mongoose_1.default.connection.on('disconnected', () => {
        console.log('Database disconnected!!');
    });
    mongoose_1.default.connection.on('reconnected', () => {
        console.log('Database reconnecting!');
    });
    app_1.app.listen(validateEnv_1.default.PORT || 5000, () => {
        console.log('Application running on ' + `http://localhost:${validateEnv_1.default.PORT}`);
    });
})
    .catch((error) => {
    console.log(error.message);
});
