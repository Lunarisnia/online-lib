import Joi from "joi";
import { schemaValidation } from "../../src/services/request/schemaValidation";
beforeEach(() => {
  jest.resetAllMocks();
});

const mockSchema = Joi.object({ data: Joi.string().required() });
test("Schema validated successfully no problem", () => {
  let err: any;
  try {
    schemaValidation(mockSchema, { data: "Hello" }, { allowUnknown: false });
  } catch (error) {
    err = error;
  }
  expect(err).toBeFalsy();
});
test("Schema validated successfully throw an error", () => {
  let err: any;
  try {
    schemaValidation(mockSchema, { data: "Hello", something: "wrong" }, { allowUnknown: false });
  } catch (error) {
    err = error;
  }
  expect(err).toBeTruthy();
});
