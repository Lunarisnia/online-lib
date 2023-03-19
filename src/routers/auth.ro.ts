import { wrap } from "../services/error/errorHandler";
import { Router } from "express";
import { login } from "../controllers/auth.co";

export default (router: Router) => {
  router.post("/login", wrap(login));
};
