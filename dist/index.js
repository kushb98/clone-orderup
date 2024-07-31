"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const recipe_1 = __importDefault(require("./routes/recipe"));
/** require all independent collections (no foreign keys) */
/**Note: Only "require" compiles mongoose models. "import" statements don't*/
const ingredient = require("./models/ingredient");
const recipeType = require("./models/recipeType");
const allergies = require("./models/allergies");
const recipe = require("./models/recipe");
const cors = require("cors");
const api = process.env.API_URL;
dotenv.config({ path: __dirname + "/.env" });
const dbConnString = process.env.DB_CONN_STRING; // Retrieve the environment variable
const dbName = process.env.DB_NAME; // Retrieve the environment variable
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default
            .connect(dbConnString, {
            dbName: dbName,
        })
            .then(() => {
            console.log("Successfully connected to the database");
        })
            .catch((err) => {
            console.log("Could not connect to the database. Exiting now...", err);
            process.exit();
        });
    });
}
exports.connectToDatabase = connectToDatabase;
connectToDatabase().then(() => {
    const app = (0, express_1.default)();
    const port = process.env.PORT || 5000;
    app.use(cors());
    app.options("*", cors());
    app.use(`/recipes`, recipe_1.default);
    app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.status(200).send({ message: "Hello World" });
    }));
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
});
