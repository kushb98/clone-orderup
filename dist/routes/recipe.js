"use strict";
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
const express_1 = __importDefault(require("express"));
// import * as recipeType from "../models/recipeType";
// const recipeType = require("../models/recipeType");
const recipe_1 = __importDefault(require("../models/recipe"));
const recipeType_1 = __importDefault(require("../models/recipeType"));
const allergies_1 = __importDefault(require("../models/allergies"));
const recipeRouter = express_1.default.Router();
recipeRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeTypeList = yield recipeType_1.default.find({}).sort("_id");
    const allergyList = yield allergies_1.default.find({});
    const recipeList = yield recipe_1.default
        .find({}, "_id name typeId")
        .populate("typeId")
        .exec();
    if (!recipeList || !recipeTypeList || !allergyList) {
        res.status(500).json({ success: false });
    }
    // recipeList.map((recipe)=> )
    res.send({
        success: true,
        result: {
            recipeTypeList: recipeTypeList,
            allergyList: allergyList,
            recipeList: recipeList,
        },
    });
}));
recipeRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.params.id);
    const recipe = yield recipe_1.default
        .findById(req.params.id, "_id Name Item Price Img")
        .populate("ingredients")
        .exec();
    if (!recipe) {
        res.status(500).json({ success: false });
    }
    res.send({ success: true, result: recipe });
}));
exports.default = recipeRouter;
