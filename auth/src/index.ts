import express from "express";
import mongoose from "mongoose";
import 'express-async-errors';
import { errorHandler } from "./middlewares/error-handler";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { NotFoundError } from "./errors/not-found-error";
const app = express();

app.use(express.json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(errorHandler);

app.all("*", async (req, res) => {
   throw new NotFoundError();
});

const start =async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
      console.log("Connected to mongodb");
  }catch(err) {
      console.error(err);
    }
}
app.listen(3000, () => {
  console.log("Server is running on port 3000 v2");
});

start();
