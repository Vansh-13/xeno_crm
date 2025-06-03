import express from "express";
import customerController from "../controller/customerController.js";

const router = express.Router();

router.get("/", customerController.getCustomer);
router.post("/", customerController.createCustomer);

export default router;
