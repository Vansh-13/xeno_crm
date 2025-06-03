import express from "express";
import campaignController from "../controller/campaignController.js";
const router = express.Router();

router.get("/",campaignController.getCampaign);
router.post("/",campaignController.createCampaign);

export default router;