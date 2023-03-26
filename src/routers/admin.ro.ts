import { wrap } from "../services/error/errorHandler";
import { Router } from "express";
import { adminAuth } from "../controllers/auth.co";
import { adminFetchBorrowSchedules } from "../controllers/admin.co";

export default (router: Router) => {
  router.get("/borrow/list", wrap(adminAuth), wrap(adminFetchBorrowSchedules));
};
