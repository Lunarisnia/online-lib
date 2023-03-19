import { wrap } from "../services/error/errorHandler";
import { Router } from "express";
import { fetchBorrowSchedules } from "../controllers/borrow.co";
import { adminAuth } from "../controllers/auth.co";

export default (router: Router) => {
  router.get("/borrow/list", wrap(adminAuth), wrap(fetchBorrowSchedules));
};
