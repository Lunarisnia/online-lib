import { Response, Request } from "express";
import { DatabaseDriver } from "../database/base";
import { IBorrowingScheduleTable } from "../database/interfaces/borrowingScheduleTable";
import { BorrowingScheduleMockDBAdapter } from "../database/drivers/mockDatabase/borrowingSchedule.model";
import { paginate } from "../services/request/paginate";

export const adminFetchBorrowSchedules = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const borrowingSchedule: DatabaseDriver<IBorrowingScheduleTable> =
    BorrowingScheduleMockDBAdapter;

  const pageNumber = parseInt(`${req.query.page_number}`) || 1;
  const pageSize = parseInt(`${req.query.page_size}`) || 10;
  const query = () => {
    return true;
  };
  const results = await borrowingSchedule.findAll(query);
  return res.send({
    page_size: pageSize,
    page_number: pageNumber,
    total_appointment: results.length,
    appointments: paginate(results, pageSize, pageNumber),
  });
};
