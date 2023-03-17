import { Library } from "../services/library/library";
import { Response, Request } from "express";

export const getBooksBySubject = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const library = new Library();
  const results = await library.fetchBooksBySubject();
  return res.send({
    subject_type: results.subject_type,
    total_work: results.work_count,
    works: results.works,
  });
};
