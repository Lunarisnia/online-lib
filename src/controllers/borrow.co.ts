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
    BorrowingScheduleMockDBAdapter;
  const query = (data: IBorrowingScheduleTable) => {
    return res.locals.user.is_admin || data.user_id == res.locals.user.user_id;
  };
  const results = await borrowingSchedule.findAll(query);
  return res.send(results);
};

const createBorrowScheduleSchema = Joi.object({
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

  const result = await Library.makeAppointment(
    req.body.pickup_in,
    req.body.cover_edition_key,
    res.locals.user.user_id
  );
  return res.send(result);
};
