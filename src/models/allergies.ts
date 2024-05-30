import mongoose, { Schema, Model } from "mongoose";

export interface IAllergies {
  id: string;
  name: string;
}

const allergiesSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    alias: "_id",
  },
  name: String,
});

export default mongoose.model<IAllergies>("Allergies", allergiesSchema);
