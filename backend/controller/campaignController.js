import Campaign from "../models/Campaign.js";
import Customer from "../models/Customers.js";
import Communication from "../models/Communicationslog.js";

import { sendCampaignEmail } from "../utils/emailSender.js";
import { buildMongoQuery } from "../utils/buildQuery.js";

const getCampaign = async (req, res) => {
  try {
    const allCampaigns = await Campaign.find().sort({ created_at: -1 });
    res.status(200).json(allCampaigns);
  } catch (error) {
    console.error("Failed to retrieve campaigns:", error.message);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

const createCampaign = async (req, res) => {
  try {
    const { title, message, segmentrule, customerId } = req.body;

    let targetCustomers;

    if (customerId) {
      targetCustomers = await Customer.find({ _id: customerId });
    } else {
      const { logic, rules } = segmentrule;
      const mongoQuery = buildMongoQuery(logic, rules);
      targetCustomers = await Customer.find(mongoQuery);
    }

    let emailsSent = 0;
    let emailsFailed = 0;

    const campaign = await Campaign.create({
      title,
      message,
      segmentrule,
      sent: 0,
      fail: 0,
      audienceSize: targetCustomers.length,
    });

    for (const customer of targetCustomers) {
      const emailSuccess = await sendCampaignEmail(customer.email, title, message);

      await Communication.create({
        campaignId: campaign._id,
        customerId: customer._id,
        status: emailSuccess ? "sent" : "failed",
        timestamp: new Date(),
      });

      if (emailSuccess) {
        emailsSent++;
      } else {
        emailsFailed++;
      }
    }

    campaign.sent = emailsSent;
    campaign.fail = emailsFailed;
    await campaign.save();

    res.status(201).json(campaign);
  } catch (error) {
    console.error("Error while creating campaign:", error.message);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

export default { getCampaign, createCampaign };
