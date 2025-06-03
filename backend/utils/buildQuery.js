import express from 'express';
import { sendCampaignEmail } from './emailSender.js';
import Campaign from '../models/Campaign.js';

const router = express.Router();

const operatorMap = {
  '>': '$gt',
  '<': '$lt',
  '>=': '$gte',
  '<=': '$lte',
  '==': '$eq',
  '!=': '$ne',
};

export const buildMongoQuery = (logic, rules) => {
  const mongoRules = rules.map(rule => ({
    [rule.field]: {
      [operatorMap[rule.operator]]:
        isNaN(rule.value) ? rule.value : Number(rule.value),
    },
  }));
  return logic === 'AND' ? { $and: mongoRules } : { $or: mongoRules };
};

async function getCustomerById(customerId) {
  return {
    _id: customerId,
    name: 'Sample Customer',
    email: 'samplecustomer@example.com',
  };
}

router.post('/campaigns', async (req, res) => {
  try {
    const { title, message, segmentrule, customerId } = req.body;

    const customer = await getCustomerById(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const mongoQuery = buildMongoQuery(segmentrule.logic, segmentrule.rules);
    console.log('Segment Mongo Query:', mongoQuery);

    const emailHtml = `
  <div style="font-family: Arial, sans-serif;">
    <h3>📢 ${title}</h3>
    <p>Hello ${customer.name},</p>
    <p>${message.replace(/\n/g, '<br/>')}</p>
    <div style="margin-top: 20px; padding: 10px; background-color: #f9f9f9;">
      <p><strong>🎁 Exclusive Deal for You:</strong></p>
      <p>Use promo code <b>WELCOME123</b> to get 10% off on your next order.</p>
    </div>
    <p>Best Regards,<br>Your Company</p>
  </div>
`;

    const emailSuccess = await sendCampaignEmail(customer.email, title, emailHtml);

    await Campaign.create({
      title,
      message,
      segmentrule,
      sent: emailSuccess ? 1 : 0,
      fail: emailSuccess ? 0 : 1,
      audienceSize: 1,
    });

    res.status(200).json({ message: 'Campaign sent successfully' });
  } catch (error) {
    console.error('Campaign error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
