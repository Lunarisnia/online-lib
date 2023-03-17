"use strict";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import path from "path";

const config = {};
const basePath = path.join(__dirname, "components");

// Require all the files from the components folder and add the imported to a unique configuration object
fs.readdirSync(basePath).forEach((file: any) => {
  if (/.map$/.test(file)) return;
  const componentConfig = require(path.join(basePath, file));
  Object.assign(config, componentConfig);
});

export default config;
