import { ObjectSchema, ValidationOptions } from "joi";

/**
 * Utility function to validate Joi Schema
 * @param schema ObjectSchema
 * @param body Request Body
 * @param options ValidationOptions
 */
export const schemaValidation = (
  schema: ObjectSchema,
  body: any,
  options: ValidationOptions | undefined
) => {
  const valid = schema.validate(body, options);
  if (valid.error) throw valid.error;
};
