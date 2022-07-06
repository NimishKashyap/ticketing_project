import express, { Request, Response } from "express";
import cookieSession from "cookie-session";
import "express-async-errors";

import { errorHandler } from "@nimishkashyap031/common";
import { NotFoundError } from "@nimishkashyap031/common";

const app = express();

app.set("trust proxy", true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
