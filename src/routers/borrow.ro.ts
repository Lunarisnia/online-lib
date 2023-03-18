import { wrap } from "../services/error/errorHandler";
import { Router } from "express";
import {
  createBorrowSchedule,
  fetchBorrowSchedules,
} from "../controllers/borrow.co";

export default (router: Router) => {
  router.get("/", wrap(fetchBorrowSchedules));
  router.post("/", wrap(createBorrowSchedule));
};
