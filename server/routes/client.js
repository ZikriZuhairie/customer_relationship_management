import express from "express";
import {
  getClient
} from "../controllers/client.js";

const router = express.Router();

router.get("/clientscontact", getClient);

export default router;