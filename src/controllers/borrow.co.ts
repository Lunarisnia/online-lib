import { Response, Request } from "express";
import { DatabaseDriver } from "../database/base";
import { IBorrowingScheduleTable } from "../database/interfaces/borrowingScheduleTable";
import { BorrowingScheduleMockDBAdapter } from "../database/drivers/mockDatabase/borrowingSchedule.model";
import { schemaValidation } from "../services/request/schemaValidation";
import Joi from "joi";
import { Library } from "../services/library/library";

export const fetchBorrowSchedules = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const borrowingSchedule: DatabaseDriver<IBorrowingScheduleTable> =
    new BorrowingScheduleMockDBAdapter();

  const byId = (data: IBorrowingScheduleTable) => {
    return data.user_id == "0";
  };
  const results = await borrowingSchedule.findAll(byId);
  return res.send(results);
};

const createBorrowScheduleSchema = Joi.object({
  title: Joi.string().required(),
  authors: Joi.array()
    .items(
      Joi.object({
        key: Joi.string().required(),
        name: Joi.string().required(),
      })
    )
    .required(),
  cover_edition_key: Joi.string().required(),
  pickup_in: Joi.date().required(),
}).required();

export const createBorrowSchedule = async (
  req: Request,
  res: Response
): Promise<Response> => {
  schemaValidation(createBorrowScheduleSchema, req.body, {
    allowUnknown: false,
  });
  const library = new Library();
  const body = <Omit<IBorrowingScheduleTable, "id">>req.body;

  const result = await library.makeAppointment(body);
  return res.send(result);
};
