import { Router } from "express";
import { handleToken } from "../controller/spotify.controller.js";

const router = Router();

router.get("/artist", handleToken);

export default router;
