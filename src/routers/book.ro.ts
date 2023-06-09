import { wrap } from "../services/error/errorHandler";
import { Router } from "express";
import { getBooksBySubject } from "../controllers/book.co";

export default (router: Router) => {
  router.get("/", wrap(getBooksBySubject));
};
