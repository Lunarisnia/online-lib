"use strict";

import fs from "fs";
import path from "path";
import express, { Express, Router } from "express";
import { serverConfig } from "../config/components/server.config";
const { detail } = serverConfig;
const routerDefault: Router = express.Router();

const baseName: string = path.basename(__filename);

function applyRouter(app: Express): void {
  routerDefault.get("/", (_, res) =>
    res.send({ data: "OK", version: detail.apiVersion })
  );

  fs.readdirSync(__dirname)
    .filter((file) => file.indexOf(".") !== 0 && file !== baseName)
    .forEach((file) => {
      if (/^v[0-9]+/.test(file)) return;
      if (/.map$/.test(file)) return;
      const router: Router = express.Router();
      const apply: any = require(path.join(__dirname, file));
      const prefix: string = file.split(".")[0];
      apply.default(router);
      app.use(`/v1/${prefix}`, router);
    });

  app.use(`/`, routerDefault);
}

export default applyRouter;
