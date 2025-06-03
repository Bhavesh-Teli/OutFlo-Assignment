import express from "express";
import { generatePersonalizedMessage } from "../controllers/message.controller";

const router = express.Router();

router.post("/", generatePersonalizedMessage);

export default router;
