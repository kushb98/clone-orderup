import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import recipeRouter from "./routes/recipe";
// import recipeTypeRouter from "./routes/recipe_type";
// import testRouter from "./routes/test";

import bodyParser = require("body-parser");

/** require all independent collections (no foreign keys) */
/**Note: Only "require" compiles mongoose models. "import" statements don't*/
const ingredient = require("./models/ingredient");
const recipeType = require("./models/recipeType");
const allergies = require("./models/allergies");
const recipe = require("./models/recipe");

const cors = require("cors");
const api = process.env.API_URL;

dotenv.config({ path: __dirname + "/.env" });
const dbConnString: string = process.env.DB_CONN_STRING as string; // Retrieve the environment variable
const dbName: string = process.env.DB_NAME as string; // Retrieve the environment variable

export async function connectToDatabase() {
  mongoose.Promise = global.Promise;

  mongoose
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
}

connectToDatabase().then(() => {
  const app: Express = express();
  const port = process.env.PORT || 5000;
  app.use(cors());
  app.options("*", cors());
  app.use(`/recipes`, recipeRouter);

  app.get("/", async (req: Request, res: Response) => {
    res.status(200).send({ message: "Hello World" });
  });

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
});
