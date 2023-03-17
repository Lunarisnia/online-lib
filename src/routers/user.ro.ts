import { wrap } from "../services/error/errorHandler";
import { addUser, getUsers } from "../controllers/user.co";
import { Router } from "express";

export default (router: Router) => {
  router.get("/", wrap(getUsers));
  router.post("/", wrap(addUser));
};
