import express from "express";
import orderController from "../controller/orderController.js";
const router = express.Router();

router.get("/",orderController.getOrder);
router.post("/",orderController.createOrder);

export default router; 