import express, { Express } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import applyRouter from "./routers";
import { errHandler } from "./services/error/errorHandler";

export const server = () => {
  const app: Express = express();

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  applyRouter(app);
  app.use(errHandler);

  return app;
};
