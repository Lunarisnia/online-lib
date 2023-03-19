import { Library } from "../services/library/library";
import { Response, Request } from "express";

export const getBooksBySubject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const pageNumber = parseInt(`${req.query.page_number}`) || 1;
  const pageSize = parseInt(`${req.query.page_size}`) || 10;
  const results = await Library.fetchBooksBySubject(
    "horror",
    pageNumber - 1,
    pageSize
  ); // Assuming you really like "Horror"
  return res.send({
    total_work: results.work_count,
    works: results.works,
  });
};
