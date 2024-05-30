import mongoose, { Schema, Model } from "mongoose";

export interface IRecipeType {
  id: string;
  name: string;
}

const recipeTypeSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    alias: "_id",
  },
  name: String,
});

export default mongoose.model<IRecipeType>("Recipe_Type", recipeTypeSchema);
