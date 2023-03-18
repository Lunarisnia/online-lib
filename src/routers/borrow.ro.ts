import { wrap } from "../services/error/errorHandler";
import { Router } from "express";
import {
  createBorrowSchedule,
  fetchBorrowSchedules,
} from "../controllers/borrow.co";
import { adminAuth, auth } from "../controllers/auth.co";

export default (router: Router) => {
  router.get("/", wrap(auth), wrap(fetchBorrowSchedules));
  router.get("/admin/list", wrap(adminAuth), wrap(fetchBorrowSchedules));
  router.post("/", wrap(auth), wrap(createBorrowSchedule));
};
