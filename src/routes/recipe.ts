import express, { Express, Router } from "express";

// import * as recipeType from "../models/recipeType";
// const recipeType = require("../models/recipeType");

import recipes from "../models/recipe";
import recipeTypes from "../models/recipeType";
import allergies from "../models/allergies";

const recipeRouter: Router = express.Router();

recipeRouter.get("/", async (req, res) => {
  const recipeTypeList = await recipeTypes.find({}).sort("_id");

  const allergyList = await allergies.find({});

  const recipeList = await recipes
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
});

recipeRouter.get("/:id", async (req, res) => {
  // console.log(req.params.id);
  const recipe = await recipes
    .findById(req.params.id, "_id Name Item Price Img")
    .populate("ingredients")
    .exec();

  if (!recipe) {
    res.status(500).json({ success: false });
  }
  res.send({ success: true, result: recipe });
});

export default recipeRouter;
