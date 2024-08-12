"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
/******
 * @function cleanEnv validating and accessing environment variables.
 * Ensure that your program only runs when all of its environment dependencies are met.
 */
const env = (0, envalid_1.cleanEnv)(process.env, {
    DB_URL: (0, envalid_1.str)(),
    PORT: (0, envalid_1.port)(),
    JWT_SECRET: (0, envalid_1.str)(),
    JWT_EXPIRES_IN: (0, envalid_1.str)(),
    MAILTRAP_HOST: (0, envalid_1.str)(),
    MAILTRAP_PORT: (0, envalid_1.port)(),
    MAILTRAP_USER: (0, envalid_1.str)(),
    MAILTRAP_PASS: (0, envalid_1.str)()
});
exports.default = env;
