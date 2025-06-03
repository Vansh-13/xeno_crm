import customers from "../models/Customers.js";

const getCustomer = async (req, res) => {
  try {
    const allCustomers = await customers.find();
    res.json(allCustomers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createCustomer = async (req, res) => {
  try {
    const createdCustomer = await customers.create(req.body);
    res.json(createdCustomer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default { createCustomer, getCustomer };
