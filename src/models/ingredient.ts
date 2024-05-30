import { ObjectId } from "mongodb";
import mongoose, { Schema, Model } from "mongoose";

export interface IIngredient {
  name: string;
  item: string;
  price: string;
  cpu: string;
}

const ingredientSchema = new Schema({
  name: {
    type: String,
    // alias: "name",
  },
  item: {
    type: String,
    // alias: "Item",
  },
  price: {
    type: String,
    // alias: "Price",
  },
  cpu: {
    type: String,
    // alias: "Cost Per Unit",
  },
});

export default mongoose.model<IIngredient>(
  "Ingredient",
  ingredientSchema
);

