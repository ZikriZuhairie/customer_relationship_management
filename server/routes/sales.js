import express from 'express';
import { getOverallSales } from "../controllers/sales.js"

const router = express.Router();

router.get("/sales", getOverallSales);

export default router;