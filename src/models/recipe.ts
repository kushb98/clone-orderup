import mongoose, { Schema, Model } from "mongoose";
import ingredient from "./ingredient";

interface IRecipe {
  id: string;
  name: string;
  ingredients: [];
  typeId: string;
}

const recipeSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    alias: "_id",
  },
  name: String,
  ingredients: {
    type: [Schema.Types.ObjectId],
    ref: "Ingredient",
  },
  typeId: {
    type: Schema.Types.ObjectId,
    ref: "Recipe_Type",
  },
});

export default mongoose.model("Recipe", recipeSchema);
