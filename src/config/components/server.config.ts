"use strict";

import Joi from "joi";
import dotenv from "dotenv";
dotenv.config();

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "production", "test").required(),
  PORT: Joi.number().allow("").required(),
  API_VERSION: Joi.string().allow("").optional(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXP: Joi.number().optional(),
  LIBRARY_HOST: Joi.string().required(),
});

/**
 * Validate the env variables using joi.validate()
 */
const { error, value: envVars } = envSchema.validate(process.env, {
  stripUnknown: true,
});
const isTest = envVars.NODE_ENV === "test";
if (error && !isTest) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const serverConfig = {
  env: envVars.NODE_ENV,
  isTest: isTest,
  isDevelopment: envVars.NODE_ENV === "development",
  detail: {
    port: envVars.PORT || 3000,
    apiVersion: envVars.API_VERSION || "1.0.0",
  },
  jwtSecret: envVars.JWT_SECRET,
  jwtExp: envVars.JWT_EXP || "2h",
  libraryHost: envVars.LIBRARY_HOST,
};
