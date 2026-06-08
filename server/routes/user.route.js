import { Router } from "express";
import {
  handleGetAllUser,
  handleNewUser,
  handleSingInUser,
} from "../controller/user.controller.js";

const router = Router();

router.get("/", handleGetAllUser);
router.get("/search/:email/:password", handleSingInUser);

router.patch("/addUser", handleNewUser);

export default router;
